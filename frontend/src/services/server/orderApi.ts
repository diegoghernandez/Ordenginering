import type { PageOrder } from '@/types'
import { StatusError } from '@/services/exceptions/StatusError'

const URL = import.meta.env.PRIVATE_URL ?? 'http://localhost:4436'
const API = URL +  '/data/order'

export async function getOrdersByAccount(id: number, cookie: string | undefined, page: number): Promise<PageOrder> {
   const jwtCookie = `jwt=${cookie ?? ''}; Path=/;`
   
   const response = await fetch(`${API}/customer/${id}?page=${page}`, {
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