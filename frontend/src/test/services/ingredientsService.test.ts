import { getAllIngredients } from "../../services/ingredientsService"

describe('Ingredients service tests', () => {
   describe('getAllIngredients', () => { 
      it('Should return the right values', async () => {
         const content = await getAllIngredients()

         expect(content).toStrictEqual([
            {
               id: 1,
               name: "BBQ sauce", 
               urlImage: "sauces/bbq",
               authorImage: "Image by KamranAydinov on Freepik"
            }, { 
               id: 2,
               name: "Pesto sauce", 
               urlImage: "sauces/pesto",
               authorImage: "Foto de Artur Rutkowski en Unsplash"
            }, { 
               id: 3,
               name: "Buffalo sauce", 
               urlImage: "sauces/buffalo",
               authorImage: "Image by jcomp on Freepik"
            }, { 
               id: 4,
               name: "Tomato sauce",
               urlImage: "sauces/tomato",
               authorImage: "Foto de D. L. Samuels en Unsplash"
            }
         ])
      })   
   })
})