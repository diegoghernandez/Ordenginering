import { connect } from 'amqplib'
import { RABBIT_CONFIG } from './constants/RabbitConfig.js'
import { CustomerMessageImpl } from './message/CustomerMessages.js'
import { CustomerRoleRepositoryImpl } from './repository/CustomerRoleRepositoryImpl.js'

export async function initializeRabbitSetup() {
	const connection = await connect(RABBIT_CONFIG)
	const channel = await connection.createChannel()
	const customerRepository = new CustomerRoleRepositoryImpl()
	new CustomerMessageImpl(channel, customerRepository)
}
