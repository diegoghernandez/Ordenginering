import { getOrdersByAccount, saveOrder } from '@/services/orderService'
import { getJSON } from '@/utils/getJSON.mjs'
import { describe, expect, it } from 'vitest'

describe('Order service tests', () => {
   describe('Get by customer tests', () => {
      it('Should be a function', () => {
         expect(typeof getOrdersByAccount).toBe('function')
      })

      it('Should throw a error with the following message', async () => {
         await expect(getOrdersByAccount(42352, 0)).rejects.toThrow('Orders not found')
      })
   
      it('Should return the right values', async () => {
         const content = await getOrdersByAccount(32, 0)
   
         expect(content).toStrictEqual(getJSON('../mocks/fixtures/orders.json'))
      })
   })

   describe('Save order tests', () => {
      it('Should be a function', () => {
         expect(typeof saveOrder).toBe('function')
      })
   
      it('Should reject the send value', async () => {
         await expect(saveOrder({
            idCustomer: 4235,
            country: 'No Mexico',
            state: 'State',
            city: 'cdmx',
            street: 'some',
            houseNumber: 3213,
            floor: null,
            apartment: null,
            pizzaList: [{
               idPizza: '480870a9-af45-4d2c-bda2-7a6e6e3a1ab8',
               pizzaName: 'Pepperoni',
               pizzaImageUrl: '/client/images/pizza/pepperoni.jpg',
               pizzaImageAuthor: 'Author',
               size: 'LARGE',
               quantity: 2,
               pizzaIngredients: [{
                  name: 'Pepperoni',
                  quantity: 1
               }, {
                  name: 'Mozzarella',
                  quantity: 2
               }]
            }]
         })).rejects.toThrow('Invalid Request Content')
      })
   
      it('Should accept the send value', async () => {
         const responseValue = await saveOrder({
            idCustomer: 234,
            country: 'MEX',
            state: 'State',
            city: 'cdmx',
            street: 'some',
            houseNumber: 3213,
            floor: null,
            apartment: null,
            pizzaList: [{
               idPizza: '480870a9-af45-4d2c-bda2-7a6e6e3a1ab8',
               pizzaName: 'Pepperoni',
               quantity: 2,
               pizzaImageUrl: '/client/images/pizza/pepperoni.jpg',
               pizzaImageAuthor: 'Author',
               size: 'LARGE',
               pizzaIngredients: [{
                  name: 'Pepperoni',
                  quantity: 1
               }, {
                  name: 'Mozzarella',
                  quantity: 2
               }]
            }]
         })
   
         expect(responseValue).toStrictEqual('Order save correctly')
      })
   })
})