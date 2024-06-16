import { IngredientTypes } from '@/constants/ingredientTypes'
import ingredientList from '@/mocks/fixtures/ingredients.json'
import { getAllIngredients, saveIngredient } from '@/services/ingredientsService'
import { readFile } from 'fs/promises'
import { describe, expect, it } from 'vitest'

describe('Ingredients service tests', () => {
   describe('getAllIngredients', () => { 
      it('Should be a function', () => {
         expect(typeof getAllIngredients).toBe('function')
      })

      it('Should return the right values', async () => {
         const content = await getAllIngredients()

         expect(content).toStrictEqual(ingredientList)
      })   
   })

   describe('saveIngredient', () => { 
      it('Should be a function', () => {
         expect(typeof saveIngredient).toBe('function')
      })

      it('Should throw an error if the image is not sended', async () => {
         const data = new FormData()
         const ingredientDto = JSON.stringify({
            authorImage: 'Author',
            ingredientName: 'Ingredient',
            ingredientType: IngredientTypes.VEGETABLE
         })

         const bytes = new TextEncoder().encode(ingredientDto)
         const ingredientFile = new Blob([bytes], { type: 'application/json' })

         data.set('ingredient', ingredientFile) 

         await expect(saveIngredient(data)).rejects.toThrow('Image is required')
      })

      it('Should throw an error if the ingredient is repeated', async () => {
         const data = new FormData()
         const ingredientDto = JSON.stringify({
            authorImage: 'Author',
            ingredientName: 'Repeated',
            ingredientType: IngredientTypes.VEGETABLE
         })
         const bytes = new TextEncoder().encode(ingredientDto)
         const imageFile = new Blob([await readFile('src/test/e2e/static/test.jpg')])
         const ingredientFile = new Blob([bytes], { type: 'application/json' })

         data.set('file', imageFile)
         data.set('ingredient', ingredientFile)

         await expect(saveIngredient(data)).rejects.toThrow('Repeat names are not allowed')
      })

      it('Should return the right values', async () => {
         const data = new FormData()
         const ingredientDto = JSON.stringify({
            authorImage: 'Author',
            ingredientName: 'Ingredient',
            ingredientType: IngredientTypes.VEGETABLE
         })
         const bytes = new TextEncoder().encode(ingredientDto)
         const imageFile = new Blob([await readFile('src/test/e2e/static/test.jpg')])
         const ingredientFile = new Blob([bytes], { type: 'application/json' })

         data.set('file', imageFile)
         data.set('ingredient', ingredientFile)

         const content = await saveIngredient(data)

         expect(content).toStrictEqual('Ingredient save correctly')
      })   
   })
})