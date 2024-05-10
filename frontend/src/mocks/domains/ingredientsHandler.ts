import { HttpResponse, http } from 'msw'
import ingredientList from '@/mocks/fixtures/ingredients.json' assert { type: 'json' }

const API = 'http://localhost/data/ingredient'

export const ingredientsHandler = [
   http.get(`${API}/`, () => HttpResponse.json(ingredientList))
]