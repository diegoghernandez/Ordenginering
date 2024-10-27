import { connect } from 'amqplib'
import { Server } from 'node:http'
import { AddressInfo } from 'node:net'
import { app } from './app.js'
import { RABBIT_CONFIG } from './constants/RabbitConfig.js'
import { GENERAL_SECRETS } from './env/generalSecrets.js'
import { CustomerMessageImpl } from './message/CustomerMessages.js'
import { CustomerRoleRepositoryImpl } from './repository/CustomerRoleRepositoryImpl.js'

const connection = await connect(RABBIT_CONFIG)
const channel = await connection.createChannel()
const customerRepository = new CustomerRoleRepositoryImpl()
const customerMessage = new CustomerMessageImpl(channel, customerRepository)
await customerMessage.onSaveCustomerRole()

const SAVE_CUSTOMER_QUEUE = 'q.save-customer-role'

await channel.assertExchange('e.pizza_customer.saved', 'fanout')
await channel.assertQueue(SAVE_CUSTOMER_QUEUE, {
	durable: false,
	autoDelete: true,
})
await channel.bindQueue(SAVE_CUSTOMER_QUEUE, 'e.pizza_customer.saved', '')

const PORT = GENERAL_SECRETS.PORT ?? 0

app.listen(PORT, function (this: Server | null) {
	if (this instanceof Server) {
		const { port } = this.address() as AddressInfo
		console.log(`Server running on port ${port}`)
	}
})
