import { StatusError } from '@/services/exceptions/StatusError'
import type { Customer } from '@/types'

const URL = import.meta.env.PRIVATE_URL ?? 'http://localhost:8765'
export const API = URL +  '/customer'

export async function getCustomerData(id: number, cookie: string | undefined): Promise<Customer> {
   const jwtCookie = `jwt=${cookie ?? ''}; Path=/;`

   const response = await fetch(`${API}/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
         'Cookie': jwtCookie
      }
   })

   if (response.ok) return response.json()
   else throw new StatusError('Customer not found', response.status)
}
