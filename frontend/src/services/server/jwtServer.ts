import { StatusError } from '@/services/exceptions/StatusError'
import type { CustomerRole } from '@/types'

const URL = import.meta.env.PRIVATE_URL ?? 'http://localhost:3000'
const API = URL +  '/jwt'

export async function getRoles(token: string | undefined): Promise<CustomerRole> {
   const response = await fetch(`${API}/verify/${token}`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json'
      }
   })

   if (response.ok) return response.json()
      else throw new StatusError('Invalid token', response.status)
}
