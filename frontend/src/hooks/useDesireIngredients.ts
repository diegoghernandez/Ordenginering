import type { Ingredient, LocalesObject } from '@/types'
import { create } from 'zustand'

interface IngredientCart {
	ingredients: Ingredient[]
	addIngredient: (ingredientID: number, name: LocalesObject) => void
	removeIngredient: (ingredientID: number) => void
	removeAll: () => void
}

export const useDesireIngredients = create<IngredientCart>()((set) => ({
	ingredients: [],
	addIngredient: (ingredientID, name) => {
		set((prev) => {
			const desireIngredients = prev.ingredients.filter(
				({ id }) => id === ingredientID
			)
			if (desireIngredients.length === 0) {
				return {
					...prev,
					ingredients: [
						...prev.ingredients,
						{ id: ingredientID, name, quantity: 1 },
					],
				}
			}

			const newIngredients = [
				...prev.ingredients.filter(({ id }) => id !== ingredientID),
				{
					...desireIngredients[0],
					quantity: desireIngredients[0].quantity + 1,
				},
			]

			return {
				...prev,
				ingredients: newIngredients,
			}
		})
	},
	removeIngredient: (ingredientID) => {
		set((prev) => {
			const desireIngredients = prev.ingredients.filter(
				({ id }) => id === ingredientID
			)
			if (desireIngredients.length === 0) return prev
			else if (desireIngredients[0].quantity - 1 === 0)
				return {
					...prev,
					ingredients: [
						...prev.ingredients.filter(({ id }) => id !== ingredientID),
					],
				}

			const newIngredients = prev.ingredients.map((element) => {
				if (element.id === ingredientID) {
					return {
						id: element.id,
						name: element.name,
						quantity: element.quantity - 1,
					}
				}

				return element
			})

			return {
				...prev,
				ingredients: newIngredients,
			}
		})
	},
	removeAll: () => {
		set((prev) => ({
			...prev,
			ingredients: [],
		}))
	},
}))
