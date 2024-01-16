import type { IngredientRequest } from '../../types';
import ingredientList from '../mocks/fixtures/ingredients.json';

const URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4436';
const API = URL +  '/ingredient';

/* type IngredientResponse = (Omit<Response, 'json'> & {
   status: 200
   json: () => IngredientRequest | PromiseLike<IngredientRequest>
}) */

export async function getAllIngredients() {
   /* const response = await fetch(`${API}/all`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      },
   }) */

   //return response.json()
   const formatList: IngredientRequest[] = ingredientList.map((ingredient, index) => ({ id: index + 1, ...ingredient }))
   return Promise.resolve(formatList)
}