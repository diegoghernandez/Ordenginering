import { getCustomerData } from '@/services/server/customerServer'
import { describe, expect, it } from 'vitest'

describe('Customer server tests', () => {
   describe('getCustomerData tests', () => {
      it('Should be a function', () => {
         expect(typeof getCustomerData).toBe('function')
      })

      it('Should throw a error with the following message', async () => {
         await expect(getCustomerData(42352, undefined))
            .rejects.toThrow('Customer not found')
      })

      it('Should return the right values', async () => {
         const content = await getCustomerData(32, undefined)

         expect(content).toStrictEqual({
            customerName: 'Customer',
            email: 'random@random.com',
            birthDate: '2002-06-12'
         })
      })
   })
})