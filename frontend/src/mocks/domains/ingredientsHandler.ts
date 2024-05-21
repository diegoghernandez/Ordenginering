import { getJSON } from '@/utils/getJSON.mjs'
import { HttpResponse, http } from 'msw'

const ingredientList = getJSON('../mocks/fixtures/ingredients.json')

const API = 'http://localhost:4436/data/ingredient'

export const ingredientsHandler = [
   http.get(`${API}/`, () => HttpResponse.json(ingredientList))
]