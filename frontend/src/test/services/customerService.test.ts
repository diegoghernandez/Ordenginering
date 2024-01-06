import { getCustomerData } from "../../services/customerService"

describe('Customer service tests', () => {
   describe('getAccountData tests', () => {
      it('Should return the right values', async () => {
         const content = await getCustomerData('random@random.com')

         expect(content).toStrictEqual({
            idCustomer: 3213,
            customerName: "Customer",
            email: "random@random.com",
         })
      })
   })
})