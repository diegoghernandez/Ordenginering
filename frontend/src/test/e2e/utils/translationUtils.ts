import type { IngredientRequest, LocalesObject, LocalesString } from '@/types'
import { getJSON } from '@/utils/getJSON.mjs'

export function shoppingCartTranslation(locale: string) {
   const { shoppingCartButton } = getJSON('../i18n/components/navbar.json')[locale]
   const { checkoutLink } = getJSON('../i18n/components/showOrder.json')[locale]

   function getCheckoutLink(numberOfProducts: number) {
      return `${checkoutLink.name} (${numberOfProducts} ${checkoutLink.products})`
   }

   return {
      shoppingCartText: shoppingCartButton,
      getCheckoutLink
   }
}

export function getLocalizedIngredientsButtonsFromCustomizePage(locale: string) {
   const { ingredientTypeList } = getJSON('../i18n/pages/Customize.json')[locale]

   const ingredientList = ingredientTypeList.map((ingredient: string) => ingredient.at(0) + ingredient.substring(1).toLocaleLowerCase())

   return {
      all: ingredientList[0],
      vegetable: ingredientList[1],
      meat: ingredientList[2],
      cheese: ingredientList[3],
      sauce: ingredientList[4],
   }
}

type PizzaJSON = {
   name: string,
   image: {
      name: string
      author: string
   },
   ingredients: string[]
}

export function getLocalizedPizza(locale: string, imageName: string) {
   const pizza: PizzaJSON[] = getJSON('../data/pizza.json')[locale]

   return pizza.filter(({ image }) => image.name === imageName)[0]
}

export function getLocalizedIngredient(locale: string, ingredient: string) {
   const ingredients: LocalesObject[] = getJSON('../mocks/fixtures/ingredients.json')
      .map((element: IngredientRequest) => element.ingredientName)

   const desireIngredientIndex = ingredients
      .map((ingredientName) => ingredientName.en)
      .findIndex((element) => element.toLocaleLowerCase() === ingredient.toLocaleLowerCase())

   return ingredients.map((element) => element[locale]).at(desireIngredientIndex)
}