import { describe, expect, it } from 'vitest'
import { getCustomerData, registerCustomer } from '../../services/customerService'

describe('Customer service tests', () => {
   describe('getCustomerData tests', () => {
      it('Should be a function', () => {
         expect(typeof getCustomerData).toBe('function')
      })

      it('Should return the right values', async () => {
         const content = await getCustomerData(32)

         expect(content).toStrictEqual({
            customerName: 'Customer',
            email: 'random@random.com',
            birthDate: '2002-06-12'
         })
      })
   }),

   describe('registerCustomer tests', () => {
      it('Should be a function', () => {
         expect(typeof registerCustomer).toBe('function')
      })

      it('Should return a bad message', async () => {
         const content = await registerCustomer({
            customerName: 'Juan',
            email: 'email@email.com',
            password: '1234',
            matchingPassword: '252523',
            birthDate: '2002-2-12'
         })

         // eslint-disable-next-line quotes
         expect(content).toStrictEqual("Passwords don't match")
      })

      it('Should return a good message', async () => {
         const content = await registerCustomer({
            customerName: 'Juan',
            email: 'email@email.com',
            password: '1234',
            matchingPassword: '1234',
            birthDate: '2002-2-12'
         })

         expect(content).toStrictEqual('Account create successfully')
      })
   })
})