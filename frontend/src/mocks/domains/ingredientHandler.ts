import type { IngredientDto } from '@/types'
import { getJSON } from '@/utils/getJSON.mjs'
import { HttpResponse, http } from 'msw'

const API = 'http://localhost:2222/ingredient'

export const ingredientHandler = [
   http.get(API, () => HttpResponse.json(getJSON('../mocks/fixtures/ingredients.json'))),

   http.post(API, async ({ request }) => {
      const data = await request.formData()
      const image = data.get('file')
      const ingredient = data.get('ingredient')

      if (!(image instanceof File)) {
         return HttpResponse.json({ desc: 'Image is required' }, { status: 400 })
      }

      if (ingredient instanceof File) {
         const ingredientObject: IngredientDto = JSON.parse(await ingredient.text())
         
         if (ingredientObject.ingredientName === 'Repeated') {
            return HttpResponse.json({ desc: 'Repeat names are not allowed' }, { status: 400 })
         }
      }

      return new HttpResponse('Ingredient save correctly', { status: 201 })
   })
]