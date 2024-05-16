import type { Customer, CustomerDto, CustomerLogIn } from '@/types'
import { StatusError } from '@/services/exceptions/StatusError'
import type { AstroCookies } from 'astro'

const PUBLIC_URL = import.meta.env.PUBLIC_URL ?? 'http://localhost:8765'
const PRIVATE_URL = import.meta.env.PRIVATE_URL ?? 'http://localhost:8765'
const API = (url: string)  => url +  '/customer'

export async function getCustomerData(id: number, cookie: AstroCookies | undefined): Promise<Customer> {
   const jwtCookie = `jwt=${cookie?.get('jwt')?.value ?? ''}; Path=/;`
   
   const response = await fetch(`${API(PRIVATE_URL)}/${id}`, {
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

export async function logIn(customerLogIn: CustomerLogIn): Promise<string> {
   const response = await fetch(`${API(PUBLIC_URL)}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerLogIn)
   })
   
   if (response.ok) return response.text()
   else throw new StatusError('Invalid credentials', response.status)
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