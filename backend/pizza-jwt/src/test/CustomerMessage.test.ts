import { connect } from 'amqplib'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { RABBIT_CONFIG } from '../constants/RabbitConfig.js'
import { CustomerMessageImpl } from '../message/CustomerMessages.js'
import { CustomerRoleRepositoryImpl } from '../repository/CustomerRoleRepositoryImpl.js'

const SAVE_CUSTOMER_QUEUE = 'q.save-customer-role'

const connection = await connect(RABBIT_CONFIG)
const channel = await connection.createChannel()
await channel.assertExchange('e.pizza_customer.saved', 'fanout')
await channel.assertQueue(SAVE_CUSTOMER_QUEUE, {
	durable: false,
	autoDelete: true,
})
await channel.bindQueue(SAVE_CUSTOMER_QUEUE, 'e.pizza_customer.saved', '')

describe('CustomerMessage tests', () => {
	beforeEach(async () => await channel.purgeQueue(SAVE_CUSTOMER_QUEUE))

	it('Should process the customer id but no save it, because is already in the database', async () => {
		const customerRepository = new CustomerRoleRepositoryImpl()
		const customerMessage = new CustomerMessageImpl(
			channel,
			customerRepository
		)
		await customerMessage.onSaveCustomerRole()
		vi.spyOn(customerRepository, 'existById')
		vi.spyOn(customerRepository, 'save')

		channel.sendToQueue(
			SAVE_CUSTOMER_QUEUE,
			Buffer.from(JSON.stringify({ customerId: 1 }))
		)

		await vi.waitFor(async () => {
			expect(customerRepository.existById).toBeCalledWith(1)
			expect(customerRepository.existById).toBeCalledTimes(1)
			expect(customerRepository.save).toBeCalledTimes(0)
		})
	})

	it('Should process customer id and save it', async () => {
		const customerRepository = new CustomerRoleRepositoryImpl()
		const customerMessage = new CustomerMessageImpl(
			channel,
			customerRepository
		)
		await customerMessage.onSaveCustomerRole()

		vi.spyOn(customerRepository, 'existById')
		expect(await customerRepository.existById(3463)).toBeFalsy()

		channel.sendToQueue(
			SAVE_CUSTOMER_QUEUE,
			Buffer.from(JSON.stringify({ customerId: 3463 }))
		)

		await vi.waitFor(async () => {
			expect(customerRepository.existById).toBeCalledTimes(1)
			expect(customerRepository.existById).toBeCalledWith(3463)
			expect(await customerRepository.geByCustomerRoleId(3463)).toEqual([
				{
					customer_role_id: 3463,
					role_name: 'USER',
				},
			])
		})
	})
})
