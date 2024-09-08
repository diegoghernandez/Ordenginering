import type { IngredientRequest, LocalesObject, LocalesString } from '@/types'
import { getJSON } from '@/utils/getJSON.mjs'
import type { Page } from '@playwright/test'

type Links = 'home' | 'menu' | 'customize' | 'account'

export async function goToLocalizedLink(
	locale: string,
	page: Page,
	link: Links
) {
	const { links } = getJSON('../i18n/components/navbar.json')[locale]
	const { accountButton, accountDialog } = getJSON(
		'../i18n/components/accountButton.json'
	)[locale]
	switch (link) {
		case 'home':
			await page.getByRole('link', { name: links.home }).click()
			break
		case 'menu':
			await page.getByRole('link', { name: links.menu }).click()
			break
		case 'customize':
			await page.getByRole('link', { name: links.customize }).click()
			break
		case 'account':
			await page.getByRole('button', { name: accountButton }).click()
			await page.getByRole('link', { name: accountDialog.account }).click()
			break

		default:
			break
	}
}

export function shoppingCartTranslation(locale: string) {
	const { shoppingCartButton } = getJSON('../i18n/components/navbar.json')[
		locale
	]
	const { checkoutLink } = getJSON('../i18n/components/showOrder.json')[locale]

	function getCheckoutLink(page: Page, numberOfProducts: number) {
		return page.getByRole('link', {
			name: `${checkoutLink.name} ${numberOfProducts} ${checkoutLink.products}`,
		})
	}

	return {
		shoppingCartText: shoppingCartButton,
		getCheckoutLink,
	}
}

export function getLocalizedIngredientsButtonsFromCustomizePage(
	locale: string
) {
	const { ingredientTypeList } = getJSON('../i18n/pages/Customize.json')[
		locale
	]

	const ingredientList = ingredientTypeList.map(
		(ingredient: string) =>
			ingredient.at(0) + ingredient.substring(1).toLocaleLowerCase()
	)

	return {
		all: ingredientList[0],
		vegetable: ingredientList[1],
		meat: ingredientList[2],
		cheese: ingredientList[3],
		sauce: ingredientList[4],
	}
}

type PizzaJSON = {
	name: LocalesObject
	image: {
		name: string
		author: LocalesObject
	}
	ingredients: string[]
}

export function getLocalizedPizza(locale: string, imageName: string) {
	const pizza: PizzaJSON[] = getJSON('../data/pizza.json')

	const currentPizza = pizza.filter(({ image }) => image.name === imageName)[0]

	return {
		name: currentPizza.name[locale as LocalesString],
		image: {
			name: currentPizza.image.name,
			author: currentPizza.image.author,
		},
		ingredients: currentPizza.ingredients,
	}
}

export function getLocalizedIngredient(locale: string, ingredient: string) {
	const ingredients: LocalesObject[] = getJSON(
		'../mocks/fixtures/ingredients.json'
	).map((element: IngredientRequest) => element.ingredientName)

	const desireIngredientIndex = ingredients
		.map((ingredientName) => ingredientName.en)
		.findIndex(
			(element) =>
				element.toLocaleLowerCase() === ingredient.toLocaleLowerCase()
		)

	return ingredients
		.map((element) => element[locale as LocalesString])
		.at(desireIngredientIndex)
}
