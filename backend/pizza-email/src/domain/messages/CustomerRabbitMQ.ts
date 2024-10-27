import { Channel } from 'amqplib'
import { CustomerMessage } from '../../contracts/messages/CustomerMessage.js'
import { CustomerEmail } from '../../contracts/services/CustomerEmail.js'

export class CustomerRabbitMQ implements CustomerMessage {
	#channel: Channel
	#customerEmail: CustomerEmail

	constructor(channel: Channel, customerEmail: CustomerEmail) {
		this.#channel = channel
		this.#customerEmail = customerEmail
	}

	async initialize() {
		await this.#onSaveCustomer()
	}

	async #onSaveCustomer() {
		const channel = this.#channel
		const queue = 'q.pizza_customer.welcome_email'

		await channel.consume(queue, async (msg) => {
			if (msg?.content) {
				const emailParams = JSON.parse(msg.content.toString())

				await this.#customerEmail.sendWelcome({
					email: emailParams.email,
					locale: emailParams.locale,
					token: emailParams.token,
				})
			}
		})
	}
}
