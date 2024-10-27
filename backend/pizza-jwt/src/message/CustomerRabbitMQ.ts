import { Channel } from 'amqplib'
import { CustomerMessage, CustomerRoleRepository } from '../../types.js'

export class CustomerRabbitMQ implements CustomerMessage {
	#channel: Channel
	#customerRepository: CustomerRoleRepository

	constructor(channel: Channel, customerRepository: CustomerRoleRepository) {
		this.#channel = channel
		this.#customerRepository = customerRepository
	}

	async initialize() {
		await this.#onSaveCustomerRole()
	}

	#onSaveCustomerRole = async () => {
		const queue = 'q.pizza_customer.save_customer_role'

		await this.#channel.consume(queue, async (msg) => {
			const { customerId } = JSON.parse(
				msg?.content.toString('utf8') ?? '{}'
			)

			if (
				!(await this.#customerRepository.existById(customerId)) &&
				customerId
			) {
				await this.#customerRepository.save(customerId)
			}
		})
	}
}
