import type { Customer, CustomerDto } from '@/types'
import { StatusError } from '@/services/exceptions/StatusError'

const PUBLIC_URL = import.meta.env.PUBLIC_URL ?? 'http://localhost'
const PRIVATE_URL = import.meta.env.PRIVATE_URL ?? 'http://localhost'
const API = (url: string)  => url +  '/customer'

export async function getCustomerData(id: number): Promise<Customer> {
   const response = await fetch(`${API(PRIVATE_URL)}/${id}`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      },
   })

   return response.json()
}

export async function registerCustomer(customerDto: CustomerDto): Promise<string> {
   const response = await fetch(`${API(PUBLIC_URL)}/register`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerDto)
   })

   if (response.ok) return response.text()
   else {
      const errorResponse = await response.json()
      throw new StatusError(errorResponse.desc, response.status, errorResponse.fieldError)
   }
}