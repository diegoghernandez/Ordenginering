import type { Ingredient } from '@/types'
import { create } from 'zustand'


interface IngredientCart {
   ingredients: Ingredient[],
   addIngredient: (ingredient: string) => void
   removeIngredient: (ingredient: string) => void
}

export const useDesireIngredients = create<IngredientCart>()((set) => ({
   ingredients: [],
   addIngredient: (ingredient) => {
      set((prev) => {
         const desireIngredients = prev.ingredients.filter(({ name }) => name === ingredient)
         if (desireIngredients.length === 0) {
            return {
               ...prev,
               ingredients: [...prev.ingredients, { name: ingredient, quantity: 1 }]
            }
         }

         const newIngredients = [
            ...prev.ingredients.filter(({ name }) => name !== ingredient), 
            { ...desireIngredients[0], quantity: desireIngredients[0].quantity + 1 }
         ]

         return { 
            ...prev,
            ingredients: newIngredients 
         }
      })
   },
   removeIngredient: (ingredient) => {
      set((prev) => {
         const desireIngredients = prev.ingredients.filter(({ name }) => name === ingredient)
         if (desireIngredients.length === 0) return prev
         else if (desireIngredients[0].quantity - 1 === 0) return {
            ...prev,
            ingredients: [...prev.ingredients.filter(({ name }) => name !== ingredient)]
         }

         const newIngredients = prev.ingredients.map((element) => {
            if (element.name === ingredient) {
               return { name: element.name, quantity: element.quantity - 1 }
            }

            return element
         })
         
         return { 
            ...prev,
            ingredients: newIngredients 
         }
      })
   }
}))