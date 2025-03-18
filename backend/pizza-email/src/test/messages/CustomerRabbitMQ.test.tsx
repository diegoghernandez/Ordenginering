import { connect } from 'amqplib'
import { afterEach, beforeEach } from 'node:test'
import { Resend } from 'resend'
import { describe, expect, it, vi } from 'vitest'
import { RABBIT_CONFIG } from '../../constants/RabbitConfig.js'
import { CustomerRabbitMQ } from '../../domain/messages/CustomerRabbitMQ.js'
import { CustomerResend } from '../../domain/services/CustomerResend.js'
import Welcome from '../../emails/Welcome.js'
import { render } from '@react-email/components'
import { cleanup } from '@testing-library/react'

const WELCOME_QUEUE = 'q.pizza_customer.welcome_email'

const connection = await connect(RABBIT_CONFIG)
const channel = await connection.createChannel()
await channel.assertExchange('e.pizza_customer.saved', 'fanout')
await channel.assertQueue(WELCOME_QUEUE, {
	durable: false,
	autoDelete: true,
})
await channel.bindQueue(WELCOME_QUEUE, 'e.pizza_customer.saved', '')

describe('CustomerMessage tests', () => {
	beforeEach(async () => await channel.purgeQueue(WELCOME_QUEUE))

	afterEach(() => cleanup())

	it('Should verify if the queue "q.pizza_customer.welcome_email" is consumed with the desire data', async () => {
		const resend = new Resend(process.env.RESEND_KEY)
		const customerResend = new CustomerResend(resend)
		await new CustomerRabbitMQ(channel, customerResend).initialize()
		const data = {
			email: 'test@test.test',
			locale: 'es',
			token: 'r2qrv321vbg',
		}

		vi.spyOn(customerResend, 'sendWelcome')
		vi.spyOn(resend.emails, 'send')

		await vi.waitFor(async () => {
			expect(customerResend.sendWelcome).toBeCalledTimes(0)
			expect(customerResend.sendWelcome).not.toHaveBeenCalledWith(data)
			expect(resend.emails.send).toBeCalledTimes(0)
		})

		channel.sendToQueue(WELCOME_QUEUE, Buffer.from(JSON.stringify(data)))

		const html = await render(
			<Welcome token={data.token} locale={data.locale as 'es'} />
		)
		await vi.waitFor(() => {
			expect(customerResend.sendWelcome).toBeCalledTimes(1)
			expect(customerResend.sendWelcome).toHaveBeenCalledWith(data)
			expect(resend.emails.send).toBeCalledTimes(1)
			expect(resend.emails.send).toHaveBeenCalledWith({
				from: 'onboarding@rd34124esend.dev',
				to: 'test@test.test',
				subject: 'Hello World',
				html,
				react: <Welcome token={data.token} locale={data.locale as 'es'} />,
			})
		})
	})
})
