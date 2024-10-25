import { connect } from 'amqplib'
import { CustomerRoleRepositoryImpl } from '../repository/CustomerRoleRepositoryImpl.js'
import { CustomerMessage } from '../../types.js'
import { RABBIT_SECRETS } from '../env/rabbitSecrets.js'

const queue = 'q.save-customer-role'
const RABBIT_CONFIG = {
	hostname: RABBIT_SECRETS.RABBIT_HOST ?? 'localhost',
	username: RABBIT_SECRETS.RABBIT_USERNAME ?? 'guest',
	password: RABBIT_SECRETS.RABBIT_PASSWORD ?? 'guest',
	protocol: RABBIT_SECRETS.RABBIT_PROTOCOL ?? 'amqp',
	port: Number(RABBIT_SECRETS.RABBIT_PORT ?? 5672),
}

export class CustomerMessageImpl implements CustomerMessage {
	createChannel = async () => {
		const connection = await connect(RABBIT_CONFIG)
		const channel = await connection.createChannel()
		await channel.assertQueue(queue, { durable: false })

		return channel
	}

	onSaveCustomerRole = async () => {
		const customerRepository = new CustomerRoleRepositoryImpl()
		const channel = await this.createChannel()

		await channel.consume(queue, async (msg) => {
			const customerId = Number(
				JSON.parse(msg?.content.toString() ?? '')?.customerId
			)

			if (!(await customerRepository.existById(customerId))) {
				await customerRepository.save(customerId)
			}
		})
	}
}
