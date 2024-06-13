import { getJSON } from '@/utils/getJSON.mjs'
import { HttpResponse, http } from 'msw'

const ingredientList = getJSON('../mocks/fixtures/ingredients.json')

const API = 'http://localhost:2222/ingredient'

export const ingredientsHandler = [
   http.get(`${API}/`, () => HttpResponse.json(ingredientList))
]