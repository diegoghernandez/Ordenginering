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

   console.log(ingredientTypeList);
   

   const ingredientList = ingredientTypeList.map((ingredient: string) => ingredient.at(0) + ingredient.substring(1).toLocaleLowerCase())

   return {
      all: ingredientList[0],
      vegetable: ingredientList[1],
      meat: ingredientList[2],
      cheese: ingredientList[3],
      sauce: ingredientList[4],
   }
}