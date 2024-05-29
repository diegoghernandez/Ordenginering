import { StatusError } from '@/services/exceptions/StatusError'
import type { OrderRequest, PageOrder } from '@/types'

const URL = import.meta.env.PUBLIC_URL ?? 'http://localhost:4436'
const API = URL +  '/data/order'

export async function getOrdersByAccount(id: number, page: number): Promise<PageOrder> {   
   const response = await fetch(`${API}/customer/${id}?page=${page}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json'
      }
   })
   
   if (response.ok) return response.json()
   else throw new StatusError('Orders not found', response.status)
}

export async function saveOrder(order: OrderRequest) {   
   const response = await fetch(`${API}/save`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(order)   
   })
   
   if (response.ok) return await response.text()
   else {
      const errorResponse = await response.json()
      throw new StatusError(errorResponse.desc, response.status, errorResponse.fieldError)
   }
}