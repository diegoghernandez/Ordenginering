import { Channel, connect } from 'amqplib'
import { Resend } from 'resend'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { RABBIT_CONFIG } from '../../constants/RabbitConfig.js'
import { CustomerRabbitMQ } from '../../domain/messages/CustomerRabbitMQ.js'
import { CustomerResend } from '../../domain/services/CustomerResend.js'

const WELCOME_QUEUE = 'q.pizza_customer.welcome_email'
const RESET_PASSWORD_QUEUE = 'q.pizza_customer.reset_password_email'

let channel!: Channel

const customerResend = new CustomerResend(new Resend('resend_key'))
const data = {
	email: 'test@test.test',
	locale: 'es',
	token: 'r2qrv321vbg',
}

vi.spyOn(customerResend, 'sendWelcome')
vi.spyOn(customerResend, 'resetPassword')

describe('CustomerMessage tests', () => {
	beforeEach(async () => {
		const connection = await connect(RABBIT_CONFIG)
		channel = await connection.createChannel()
		await channel.assertExchange('e.pizza_customer.saved', 'fanout')
		await channel.assertQueue(WELCOME_QUEUE, {
			durable: false,
			autoDelete: true,
		})
		await channel.bindQueue(WELCOME_QUEUE, 'e.pizza_customer.saved', '')

		await channel.assertExchange('e.pizza_customer.reset_password', 'fanout')
		await channel.assertQueue(RESET_PASSWORD_QUEUE, {
			durable: false,
			autoDelete: true,
		})
		await channel.bindQueue(
			RESET_PASSWORD_QUEUE,
			'e.pizza_customer.reset_password',
			''
		)

		await new CustomerRabbitMQ(channel, customerResend).initialize()

		vi.resetAllMocks()
	})

	afterEach(async () => {
		await channel.close()
	})

	describe('Queue q.pizza_customer.welcome_email tests', () => {
		it('Should sendWelcome not be called if is not a json and clear the queue', async () => {
			await vi.waitFor(async () => {
				expect(customerResend.sendWelcome).toBeCalledTimes(0)
				expect(customerResend.sendWelcome).not.toHaveBeenCalledWith(data)
			})

			channel.sendToQueue(WELCOME_QUEUE, Buffer.from('failure'))

			await vi.waitFor(async () => {
				const countQueue = await channel.checkQueue(WELCOME_QUEUE)
				expect(countQueue?.messageCount).toBe(0)

				expect(customerResend.sendWelcome).not.toBeCalledTimes(1)
				expect(customerResend.sendWelcome).not.toHaveBeenCalledWith(data)
			})
		})

		it('Should verify if the queue is consumed by sendWelcome with the desire data and clear the message', async () => {
			await vi.waitFor(async () => {
				expect(customerResend.sendWelcome).toBeCalledTimes(0)
				expect(customerResend.sendWelcome).not.toHaveBeenCalledWith(data)
			})

			channel.sendToQueue(WELCOME_QUEUE, Buffer.from(JSON.stringify(data)))

			await vi.waitFor(async () => {
				const checkQueue = await channel.checkQueue(WELCOME_QUEUE)
				expect(checkQueue.messageCount).not.toBe(1)

				expect(customerResend.sendWelcome).toBeCalledTimes(1)
				expect(customerResend.sendWelcome).toHaveBeenCalledWith(data)
			})
		})
	})

	describe('Queue q.pizza_customer.reset_password_email tests', () => {
		it('Should resetPassword not be called if is not a json and clear the message', async () => {
			await vi.waitFor(async () => {
				expect(customerResend.resetPassword).toBeCalledTimes(0)
				expect(customerResend.resetPassword).not.toHaveBeenCalledWith(data)
			})

			channel.sendToQueue(RESET_PASSWORD_QUEUE, Buffer.from('failure'))

			await vi.waitFor(async () => {
				const countQueue = await channel.checkQueue(RESET_PASSWORD_QUEUE)
				expect(countQueue.messageCount).not.toBe(1)

				expect(customerResend.resetPassword).not.toBeCalledTimes(1)
				expect(customerResend.resetPassword).not.toHaveBeenCalledWith(data)
			})
		})

		it('Should verify if the queue is consumed by resetPassword with the desire data and clear the message', async () => {
			await vi.waitFor(async () => {
				expect(customerResend.resetPassword).toBeCalledTimes(0)
				expect(customerResend.resetPassword).not.toHaveBeenCalledWith(data)
			})

			channel.sendToQueue(
				RESET_PASSWORD_QUEUE,
				Buffer.from(JSON.stringify(data))
			)

			await vi.waitFor(async () => {
				const checkQueue = await channel.checkQueue(RESET_PASSWORD_QUEUE)
				expect(checkQueue.messageCount).toBe(0)

				expect(customerResend.resetPassword).toBeCalledTimes(1)
				expect(customerResend.resetPassword).toHaveBeenCalledWith(data)
			})
		})
	})
})
