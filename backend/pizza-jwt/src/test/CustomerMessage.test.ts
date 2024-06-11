import { describe, expect, it, vi } from "vitest"
import { CustomerMessage } from "../message/CustomerMessages"
import { connect } from "amqplib"
import { CustomerRoleRepositoryImpl } from "../repository/CustomerRoleRepositoryImpl"

const customerMessage = new CustomerMessage()
const connection = await connect('amqp://localhost')
const channel = await connection.createChannel()
const queue = 'q.save-customer-role'
await channel.assertQueue(queue, { durable: false })

describe('CustomerMessage tests', () => {
   it('Should be a function', () => {
      expect(typeof customerMessage.onSaveCustomerRole).toBe('function')
   })

   it('Should process the customer id but no save it, because is already in the database', () => {
      const customerRepository = new CustomerRoleRepositoryImpl()
      vi.spyOn(customerRepository, 'existById')
      vi.spyOn(customerRepository, 'save')

      channel.sendToQueue(queue, Buffer.from('1'))

      vi.waitFor(() => {
         expect(customerRepository.existById).toBeCalledTimes(1)
         expect(customerRepository.save).toBeCalledTimes(0)
      })
   })

   it('Should process customer id and save it', async () => {
      const customerRepository = new CustomerRoleRepositoryImpl()
      expect((await customerRepository.geByCustomerRoleId(5432)).length).toBe(0)
      expect(await customerRepository.geByCustomerRoleId(5432)).toEqual([])

      channel.sendToQueue(queue, Buffer.from('5432'))

      await vi.waitFor(async () => {
         expect(await customerRepository.geByCustomerRoleId(5432)).toEqual([{ 
            customer_role_id: 5432,
            role_name: 'USER'
         }])
      })
   })
})