import type { AstroCookies } from 'astro'
import { StatusError } from '../exceptions/StatusError'
import type { PageOrder } from '@/types'

const URL = import.meta.env.PRIVATE_URL ?? 'http://localhost:4436'
const API = URL +  '/data/order'

export async function getOrdersByAccount(id: number, cookie: AstroCookies | undefined): Promise<PageOrder> {
   const jwtCookie = `jwt=${cookie?.get('jwt')?.value ?? ''}; Path=/;`
   
   const response = await fetch(`${API}/customer/${id}?page=0`, {
      method: 'GET',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
         'Cookie': jwtCookie
      }
   })
   
   if (response.ok) return response.json()
   else throw new StatusError('Orders not found', response.status)
}