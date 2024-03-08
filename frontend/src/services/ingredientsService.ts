import type { IngredientRequest } from '@/types'

const URL = import.meta.env.VITE_API_URL ?? 'http://localhost'
const API = URL +  '/data/ingredient'

export async function getAllIngredients(): Promise<Array<IngredientRequest>> {
   const response = await fetch(`${API}/all`, {
      method: 'GET',
      mode: 'no-cors',
      headers: {
         'Content-Type': 'application/json',
      },
   })
   return await response.json()
}   