import { getPizzaByAccount } from "../../services/pizzaService"

describe('Pizza service tests', () => { 
   describe('getPizzaByAccount tests', () => { 
      it('Should be a function', () => {
         expect(typeof getPizzaByAccount).toBe('function')
      })

      it('Should throw an StatusError if there is no element', async () => {
         await expect(getPizzaByAccount(321423))
            .rejects.toThrow('Pizza not found')
      })

      it('Should return the right values', async () => {
         const content = await getPizzaByAccount(2312)

         expect(content).toStrictEqual([
            {
               id: '480870a9-af45-4d2c-bda2-7a6e6e3a1ab8',
               name: 'Pepperoni',
               price: 32134.43,
               size: 'LARGE',
               requestTime: '2024-06-26T21:02:13.374219',
               image: {
                  url: 'pepperoni',
                  author: 'Foto de Fernando Andrade en Unsplash'
               },
               ingredients: [{
                  name: 'Pepperoni',
                  quantity: 'NORMAL'
               }, {
                  name: 'Mozzarella',
                  quantity: 'EXTRA'
               }]
            },
            {
               id: 'de534482-033a-4629-9238-b9e8fd544fdc',
               name: 'Pepperoni',
               price: 32134.43,
               size: 'LARGE',
               requestTime: '2024-06-26T21:02:13.374219',
               image: {
                  url: 'pepperoni',
                  author: 'Foto de Fernando Andrade en Unsplash'
               },
               ingredients: [{
                  name: 'Pepperoni',
                  quantity: 'NORMAL'
               }, {
                  name: 'Mozzarella',
                  quantity: 'EXTRA'
               }]
            }
         ])
      })
   })
})