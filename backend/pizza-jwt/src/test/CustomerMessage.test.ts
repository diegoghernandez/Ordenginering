import { describe, expect, it, vi } from 'vitest'
import { CustomerMessageImpl } from '../message/CustomerMessages'
import { CustomerRoleRepositoryImpl } from '../repository/CustomerRoleRepositoryImpl'

const customerMessage = new CustomerMessageImpl()
const channel = await customerMessage.createChannel()
customerMessage.onSaveCustomerRole()
const queue = 'q.save-customer-role'

describe('CustomerMessage tests', () => {
   it('Should be a function', () => {
      expect(typeof customerMessage.onSaveCustomerRole).toBe('function')
   })

   it('Should process the customer id but no save it, because is already in the database', () => {
      const customerRepository = new CustomerRoleRepositoryImpl()
      vi.spyOn(customerRepository, 'existById')
      vi.spyOn(customerRepository, 'save')

      channel.sendToQueue(queue, Buffer.from(JSON.stringify({ customerId: 1 })))

      vi.waitFor(() => {
         expect(customerRepository.existById).toBeCalledTimes(1)
         expect(customerRepository.save).toBeCalledTimes(0)
      })
   })

   it('Should process customer id and save it', async () => {
      const customerRepository = new CustomerRoleRepositoryImpl()
      expect((await customerRepository.existById(3463))).toBeFalsy()

      channel.sendToQueue(queue, Buffer.from(JSON.stringify({ customerId: 3463 })))

      await vi.waitFor(async () => {
         expect(await customerRepository.geByCustomerRoleId(3463)).toEqual([{
            customer_role_id: 3463,
            role_name: 'USER'
         }])
      })
   })
})
