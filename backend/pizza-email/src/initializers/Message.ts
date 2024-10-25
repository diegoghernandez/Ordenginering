import { connect } from 'amqplib'
import { RABBIT_CONFIG } from '../constants/RabbitConfig.js'
import { CustomerRabbitMQ } from '../domain/messages/CustomerRabbitMQ.js'
import { CustomerResend } from '../domain/services/CustomerResend.js'
import { Resend } from 'resend'
await (async () => {
	const connection = await connect(RABBIT_CONFIG)
	const channel = await connection.createChannel()

	const resend = new Resend(process.env.RESEND_KEY)
	new CustomerRabbitMQ(channel, new CustomerResend(resend))
})()
