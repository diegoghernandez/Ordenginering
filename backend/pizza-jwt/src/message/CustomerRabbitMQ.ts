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
		const queue = 'q.save-customer-role'

		await this.#channel.consume(queue, async (msg) => {
			const customerId = Number(
				JSON.parse(msg?.content.toString() ?? '')?.customerId
			)

			if (!(await this.#customerRepository.existById(customerId))) {
				await this.#customerRepository.save(customerId)
			}
		})
	}
}
