import { connect } from 'amqplib'
import { CustomerRoleRepositoryImpl } from '../repository/CustomerRoleRepositoryImpl'
import { CustomerMessage } from '../../types'

const queue = 'q.save-customer-role'

export class CustomerMessageImpl implements CustomerMessage {
   createChannel = async () => {
      const connection = await connect('amqp://localhost')
      const channel = await connection.createChannel()
      await channel.assertQueue(queue, { durable: false })

      return channel
   }

   onSaveCustomerRole = async () => {
      const customerRepository = new CustomerRoleRepositoryImpl()
      const channel = await this.createChannel()

      await channel.consume(queue, async (msg) => {
         const customerId = Number(JSON.parse(msg?.content.toString() ?? '')?.customerId)

         if (!(await customerRepository.existById(customerId))) {
            await customerRepository.save(customerId)
         }
      })
   }
}
