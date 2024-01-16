import { getAllIngredients } from '../../services/ingredientsService'
import ingredientList from '../../mocks/fixtures/ingredients.json'

describe('Ingredients service tests', () => {
   describe('getAllIngredients', () => { 
      it('Should return the right values', async () => {
         const content = await getAllIngredients()

         expect(content).toStrictEqual(ingredientList.map((ingredient, index) => ({ id: index + 1, ...ingredient })))
      })   
   })
})