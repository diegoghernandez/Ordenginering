import { connect } from 'amqplib'
import { RABBIT_CONFIG } from './constants/RabbitConfig.js'
import { CustomerRabbitMQ } from './message/CustomerRabbitMQ.js'
import { CustomerRoleMysql } from './repository/CustomerRoleMysql.js'

export async function initializeRabbitSetup() {
	const connection = await connect(RABBIT_CONFIG)
	const channel = await connection.createChannel()

	await new CustomerRabbitMQ(channel, new CustomerRoleMysql()).initialize()
}
