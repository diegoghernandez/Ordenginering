import { HttpResponse, http } from 'msw'
import ingredientList from '@/mocks/fixtures/ingredients.json' assert { type: 'json' }

const API = 'http://localhost:4436/data/ingredient'

export const ingredientsHandler = [
   http.get(`${API}/`, () => HttpResponse.json(ingredientList))
]