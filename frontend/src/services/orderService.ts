import type { Order } from '@/types'
import { StatusError } from '@/services/exceptions/StatusError'

const URL = import.meta.env.PUBLIC_URL ?? 'http://localhost'
const API = URL +  '/data/order'

export async function saveOrder(order: Order) {   
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