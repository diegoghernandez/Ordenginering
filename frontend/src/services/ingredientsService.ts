import type { IngredientRequest } from '@/types'
import { StatusError } from './exceptions/StatusError'

const URL = import.meta.env.PUBLIC_URL ?? 'http://localhost:2222'
const API = URL +  '/ingredient'

export async function getAllIngredients(): Promise<Array<IngredientRequest>> {   
   const response = await fetch(`${API}/`, {
      method: 'GET',
      mode: 'no-cors',
      headers: {
         'Content-Type': 'application/json',
      },
   })

   if (response.ok) {
      return await response.json()
   }

   throw new StatusError('Ingredients not found', 404)
}   