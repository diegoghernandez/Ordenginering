import type { Customer, CustomerDto } from '@/types'

const URL = import.meta.env.PUBLIC_URL ?? 'http://localhost'
const API = URL +  '/data/customer'

type CustomerResponseJson = (Omit<Response, 'json'> & {
   status: 200
   json: () => Customer | PromiseLike<Customer>
})

type CustomerResponseText = (Omit<Response, string>)

export async function getCustomerData(id: number): Promise<CustomerResponseJson> {
   const response = await fetch(`${API}/id/${id}`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      },
   })

   return response.json()
}

export async function registerCustomer(customerDto: CustomerDto): Promise<CustomerResponseText> {
   const response = await fetch(`${API}/register`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerDto)
   })

   return response.text()
}