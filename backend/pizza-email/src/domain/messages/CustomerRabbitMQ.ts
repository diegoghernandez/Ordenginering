import { Channel, ConsumeMessage } from 'amqplib'
import { CustomerMessage } from '../../contracts/messages/CustomerMessage.js'
import {
	CustomerEmail,
	EmailParams,
} from '../../contracts/services/CustomerEmail.js'

export class CustomerRabbitMQ implements CustomerMessage {
	#channel: Channel
	#customerEmail: CustomerEmail

	constructor(channel: Channel, customerEmail: CustomerEmail) {
		this.#channel = channel
		this.#customerEmail = customerEmail
	}

	async initialize() {
		await this.#onSaveCustomer()
		await this.#onResetPassword()
	}

	async #onSaveCustomer() {
		const channel = this.#channel
		const queue = 'q.pizza_customer.welcome_email'

		await channel.consume(
			queue,
			async (msg) => {
				const emailParams = this.#processMessage<EmailParams>(channel, msg)
				if (emailParams && msg) {
					this.#customerEmail.sendWelcome({
						email: emailParams.email,
						locale: emailParams.locale,
						token: emailParams.token,
					})

					channel.ack(msg)
				}
			},
			{ noAck: false }
		)
	}

	async #onResetPassword() {
		const channel = this.#channel
		const queue = 'q.pizza_customer.reset_password_email'

		await channel.consume(
			queue,
			async (msg) => {
				const emailParams = this.#processMessage<EmailParams>(channel, msg)
				if (emailParams && msg) {
					channel.ack(msg)

					await this.#customerEmail.resetPassword({
						email: emailParams.email,
						locale: emailParams.locale,
						token: emailParams.token,
					})
				}
			},
			{ noAck: false }
		)
	}

	#processMessage<T>(
		channel: Channel,
		msg: ConsumeMessage | null
	): T | undefined {
		if (!msg) return
		if (!msg.content) {
			channel.reject(msg)
			return
		}

		let msgContent

		try {
			msgContent = JSON.parse(msg.content.toString())
		} catch (error) {
			console.error('Process message error:', error?.message)
			channel.reject(msg)
			return
		}

		return msgContent
	}
}
