import { getOrdersByAccount } from '@/services/server/orderApi'
import { getJSON } from '@/utils/getJSON'
import { describe, expect, it } from 'vitest'

describe('getCustomerData tests', () => {
   it('Should be a function', () => {
      expect(typeof getOrdersByAccount).toBe('function')
   })

   it('Should throw a error with the following message', async () => {
      await expect(getOrdersByAccount(42352, undefined)).rejects.toThrow('Orders not found')
   })

   it('Should return the right values', async () => {
      const content = await getOrdersByAccount(32, undefined)

      expect(content).toStrictEqual(getJSON('../mocks/fixtures/orders.json'))
   })
})