import type { Order } from "../../types"
import { StatusError } from "./exceptions/StatusError"

const URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4436'
const API = URL +  '/order'

export async function saveOrder(order: Order) {   
   /* const response = await fetch(`${API}/save`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
   }) */


   return true
   /* if (response.ok) return response.status
   else {
      throw new StatusError('Something bad happen')
   } */
}