import { connect } from 'amqplib'
import { Resend } from 'resend'
import { RABBIT_CONFIG } from '../constants/RabbitConfig.js'
import { CustomerRabbitMQ } from '../domain/messages/CustomerRabbitMQ.js'
import { CustomerResend } from '../domain/services/CustomerResend.js'

export async function initializeMessagesQueue() {
	const connection = await connect(RABBIT_CONFIG)
	const channel = await connection.createChannel()

	const resend = new Resend(process.env.RESEND_KEY)
	await new CustomerRabbitMQ(channel, new CustomerResend(resend)).initialize()
}
