import { LOCALES } from '@/constants/locales'
import { expect, test } from '@/test/e2e/utils/fixture'
import {
	checkIfIngredientHasTheRightQuantity,
	checkIfSelectQuantityHasTheRightQuantity,
} from '@/test/e2e/utils/generalUtils'
import {
	changeLanguage,
	findNavbarElements,
} from '@/test/e2e/utils/navbarUtils'
import {
	getLocalizedIngredient,
	getLocalizedIngredientsButtonsFromCustomizePage,
	getLocalizedPizza,
	goToLocalizedLink,
	shoppingCartTranslation,
} from '@/test/e2e/utils/translationUtils'
import { getJSON } from '@/utils/getJSON.mjs'

LOCALES.forEach((locale) => {
	const t = getJSON('../assets/i18n/pages/Customize.json')[locale]
	const { quantity, pizzaData } = t
	const shoppingCartTranslationUtils = shoppingCartTranslation(locale)
	const pizzaEmptyName = locale === 'en' ? 'Empty pizza' : 'Pizza vacía'

	test.describe(`${locale}: Customize page e2e tests`, () => {
		test.beforeEach(async ({ page }) => {
			await page.goto('/client/')
			await changeLanguage(locale, page)
		})

		test('Should render correctly', async ({ page }) => {
			test.setTimeout(1000 * 50)
			await goToLocalizedLink(locale, page, 'customize')

			await expect(page).toHaveTitle(t.seo.title)

			await findNavbarElements(locale, page)

			await expect(
				page.getByRole('img', { name: pizzaEmptyName })
			).toBeVisible()
			/* await expect(page.getByRole('figure')
            .filter({ has: page.getByRole('img', { name: 'Empty pizza' }) })
            .getByLabel('Show author image')).toBeVisible() */

			const pizzaDataArticle = page
				.getByRole('article')
				.filter({
					has: page.getByRole('heading', { name: pizzaData.title }),
				})

			await expect(pizzaDataArticle.getByRole('heading')).toBeVisible()
			await expect(pizzaDataArticle.getByText('Total: $100')).toBeVisible()
			await expect(
				pizzaDataArticle.getByLabel(pizzaData.selectLabel)
			).toBeVisible()
			await expect(
				pizzaDataArticle.getByLabel(pizzaData.selectLabel)
			).toHaveValue('MEDIUM')
			await expect(pizzaDataArticle.getByText(quantity.name)).toBeVisible()
			await expect(
				pizzaDataArticle.getByLabel(quantity.decrease)
			).toBeVisible()
			await expect(
				pizzaDataArticle.getByLabel(quantity.decrease)
			).toBeDisabled()
			await checkIfSelectQuantityHasTheRightQuantity(pizzaDataArticle, 1)
			await expect(
				pizzaDataArticle.getByLabel(quantity.increase)
			).toBeVisible()
			await expect(
				pizzaDataArticle.getByRole('button', {
					name: pizzaData.addCustomizePizzaTranslation.label,
				})
			).toBeVisible()

			t.ingredientTypeList.forEach(
				async (type: string) =>
					await expect(
						page.getByRole('button', { name: type })
					).toBeVisible()
			)
			const ingredientTypeList =
				getLocalizedIngredientsButtonsFromCustomizePage(locale)
			await expect(
				page.getByRole('button', { name: ingredientTypeList.all })
			).toHaveClass(/active/)

			await expect(
				page.getByRole('article').filter({ has: page.getByRole('figure') })
			).toHaveCount(34)

			const ingredientsCards = page
				.getByRole('article')
				.filter({ has: page.getByRole('figure') })
			for (const element of await ingredientsCards.all()) {
				await element.screenshot()
				await expect(element.getByRole('figure')).toBeVisible()
				// await expect(element.getByLabel('Show author image')).toBeVisible()
				await expect(element.getByRole('heading')).toBeVisible()
				await expect(element.getByText(quantity.name)).toBeVisible()
				await expect(element.getByLabel(quantity.decrease)).toBeVisible()
				await expect(element.getByLabel(quantity.decrease)).toBeDisabled()
				await checkIfSelectQuantityHasTheRightQuantity(element, 0)
				await expect(element.getByLabel(quantity.increase)).toBeVisible()
			}
		})

		test('Should render correctly if you choose click in the personalize link in the prebuild pizza in the menu page', async ({
			page,
		}) => {
			await goToLocalizedLink(locale, page, 'menu')

			const pizza = getLocalizedPizza(locale, 'supreme')

			await page
				.getByRole('article')
				.filter({ hasText: pizza.name })
				.getByRole('link')
				.click()

			await expect(page.getByRole('img', { name: pizza.name })).toBeVisible()

			await expect(page.getByText('Total: $220')).toBeVisible()
			await expect(
				page.getByText(getLocalizedIngredient(locale, 'Pepperoni') + ' X1')
			).toBeVisible()
			await expect(
				page.getByText(
					getLocalizedIngredient(locale, 'Tomato sauce') + ' X1'
				)
			).toBeVisible()
			await expect(
				page.getByText(
					getLocalizedIngredient(locale, 'Bell Peppers') + ' X1'
				)
			).toBeVisible()
			await expect(
				page.getByText(getLocalizedIngredient(locale, 'Onions') + ' X1')
			).toBeVisible()
			await expect(
				page.getByText(
					getLocalizedIngredient(locale, 'Black Olives') + ' X1'
				)
			).toBeVisible()
			await expect(
				page.getByText(getLocalizedIngredient(locale, 'Mozzarella') + ' X1')
			).toBeVisible()

			const pizzaDataArticle = page
				.getByRole('article')
				.filter({
					has: page.getByRole('heading', { name: pizzaData.title }),
				})
			await expect(
				pizzaDataArticle.getByLabel(pizzaData.selectLabel)
			).toHaveValue('MEDIUM')
			await checkIfSelectQuantityHasTheRightQuantity(pizzaDataArticle, 1)

			await checkIfIngredientHasTheRightQuantity(
				page,
				getLocalizedIngredient(locale, 'Pepperoni'),
				1
			)
			await checkIfIngredientHasTheRightQuantity(
				page,
				getLocalizedIngredient(locale, 'Tomato sauce'),
				1
			)
			await checkIfIngredientHasTheRightQuantity(
				page,
				getLocalizedIngredient(locale, 'Bell Peppers'),
				1
			)
			await checkIfIngredientHasTheRightQuantity(
				page,
				getLocalizedIngredient(locale, 'Onions'),
				1
			)
			await checkIfIngredientHasTheRightQuantity(
				page,
				getLocalizedIngredient(locale, 'Black Olives'),
				1
			)
			await checkIfIngredientHasTheRightQuantity(
				page,
				getLocalizedIngredient(locale, 'Mozzarella'),
				1
			)
		})

		test('Should change the total value, the quantity and the desire ingredients when you interact with the page', async ({
			page,
		}) => {
			const ingredientTypeList =
				getLocalizedIngredientsButtonsFromCustomizePage(locale)
			await goToLocalizedLink(locale, page, 'customize')

			const pizzaDataArticle = page
				.getByRole('article')
				.filter({
					has: page.getByRole('heading', { name: pizzaData.title }),
				})

			await expect(page.getByText('Total: $100')).toBeVisible()
			await checkIfSelectQuantityHasTheRightQuantity(pizzaDataArticle, 1)
			await expect(
				page.getByRole('article').filter({ has: page.getByRole('figure') })
			).toHaveCount(34)

			await pizzaDataArticle.getByLabel(quantity.increase).click()
			await checkIfSelectQuantityHasTheRightQuantity(pizzaDataArticle, 2)
			await expect(page.getByText('Total: $200')).toBeVisible()

			await page.getByLabel(pizzaData.selectLabel).selectOption('LARGE')
			await expect(page.getByText('Total: $300')).toBeVisible()

			const basil = getLocalizedIngredient(locale, 'Basil')
			await checkIfIngredientHasTheRightQuantity(page, basil, 0)
			await page
				.getByRole('article')
				.filter({ has: page.getByRole('heading', { name: basil }) })
				.getByLabel(quantity.increase)
				.click()
			await page
				.getByRole('article')
				.filter({ has: page.getByRole('heading', { name: basil }) })
				.getByLabel(quantity.increase)
				.click()
			await checkIfIngredientHasTheRightQuantity(page, basil, 2)

			await expect(page.getByText('Total: $380')).toBeVisible()
			await expect(page.getByText(basil + ' X2')).toBeVisible()

			const redOnion = getLocalizedIngredient(locale, 'Red Onions')
			await checkIfIngredientHasTheRightQuantity(page, redOnion, 0)
			await page
				.getByRole('article')
				.filter({ has: page.getByRole('heading', { name: redOnion }) })
				.getByLabel(quantity.increase)
				.click()
			await page
				.getByRole('article')
				.filter({ has: page.getByRole('heading', { name: redOnion }) })
				.getByLabel(quantity.increase)
				.click()
			await checkIfIngredientHasTheRightQuantity(page, redOnion, 2)

			await expect(page.getByText('Total: $460')).toBeVisible()
			await expect(page.getByText(redOnion + ' X2')).toBeVisible()

			await page
				.getByRole('button', { name: ingredientTypeList.sauce })
				.click()
			await expect(
				page.getByRole('article').filter({ has: page.getByRole('figure') })
			).toHaveCount(3)

			const bbqSauce = getLocalizedIngredient(locale, 'BBQ sauce')
			await checkIfIngredientHasTheRightQuantity(page, bbqSauce, 0)
			await page
				.getByRole('article')
				.filter({ has: page.getByRole('heading', { name: bbqSauce }) })
				.getByLabel(quantity.increase)
				.click()
			await checkIfIngredientHasTheRightQuantity(page, bbqSauce, 1)

			await expect(page.getByText('Total: $500')).toBeVisible()
			await expect(page.getByText(bbqSauce + ' X1')).toBeVisible()

			await page
				.getByRole('button', { name: ingredientTypeList.cheese })
				.click()
			await expect(
				page.getByRole('article').filter({ has: page.getByRole('figure') })
			).toHaveCount(7)

			const mozzarella = getLocalizedIngredient(locale, 'Mozzarella')
			await checkIfIngredientHasTheRightQuantity(page, mozzarella, 0)
			await page
				.getByRole('article')
				.filter({ has: page.getByRole('heading', { name: mozzarella }) })
				.getByLabel(quantity.increase)
				.click()
			await checkIfIngredientHasTheRightQuantity(page, mozzarella, 1)

			await expect(page.getByText('Total: $540')).toBeVisible()
			await expect(page.getByText(mozzarella + '  X1')).toBeVisible()

			await page
				.getByRole('button', { name: ingredientTypeList.meat })
				.click()
			await expect(
				page.getByRole('article').filter({ has: page.getByRole('figure') })
			).toHaveCount(10)

			const grilledChicken = getLocalizedIngredient(
				locale,
				'Grilled Chicken'
			)
			await checkIfIngredientHasTheRightQuantity(page, grilledChicken, 0)
			await page
				.getByRole('article')
				.filter({
					has: page.getByRole('heading', { name: grilledChicken }),
				})
				.getByLabel(quantity.increase)
				.click()
			await checkIfIngredientHasTheRightQuantity(page, grilledChicken, 1)

			await expect(page.getByText('Total: $580')).toBeVisible()
			await expect(page.getByText(grilledChicken + ' X1')).toBeVisible()

			await page
				.getByRole('button', { name: ingredientTypeList.vegetable })
				.click()
			await expect(
				page.getByRole('article').filter({ has: page.getByRole('figure') })
			).toHaveCount(14)

			const pineapple = getLocalizedIngredient(locale, 'Pineapple')
			await checkIfIngredientHasTheRightQuantity(page, pineapple, 0)
			await page
				.getByRole('article')
				.filter({ has: page.getByRole('heading', { name: pineapple }) })
				.getByLabel(quantity.increase)
				.click()
			await checkIfIngredientHasTheRightQuantity(page, pineapple, 1)

			await expect(page.getByText('Total: $620')).toBeVisible()
			await expect(page.getByText(pineapple + ' X1')).toBeVisible()

			await page
				.getByRole('button', { name: ingredientTypeList.all })
				.click()
			await expect(
				page.getByRole('article').filter({ has: page.getByRole('figure') })
			).toHaveCount(34)

			await pizzaDataArticle.getByLabel(quantity.decrease).click()
			await checkIfSelectQuantityHasTheRightQuantity(
				pizzaDataArticle.locator('div').filter({ hasText: '+' }),
				1
			)
			await expect(
				page.getByText(/Total: \$310/, { exact: true })
			).toBeVisible()
		})

		test('Should interact with the ingredients and save the order correctly', async ({
			page,
		}) => {
			await goToLocalizedLink(locale, page, 'customize')

			await page
				.getByRole('article')
				.filter({
					has: page.getByRole('heading', {
						name: getLocalizedIngredient(locale, 'Grilled Chicken'),
					}),
				})
				.getByLabel(quantity.increase)
				.click({ delay: 1000 * 2 })
			await page
				.getByRole('article')
				.filter({
					has: page.getByRole('heading', {
						name: getLocalizedIngredient(locale, 'Mozzarella'),
					}),
				})
				.getByLabel(quantity.increase)
				.click()
			await page
				.getByRole('article')
				.filter({ hasNot: page.getByRole('figure') })
				.getByLabel(quantity.increase)
				.click()

			await expect(page.getByText('Total: $280')).toBeVisible()
			await expect(
				page.getByText(
					getLocalizedIngredient(locale, 'Grilled Chicken') + ' X1'
				)
			).toBeVisible()
			await expect(
				page.getByText(getLocalizedIngredient(locale, 'Mozzarella') + ' X1')
			).toBeVisible()
			await checkIfSelectQuantityHasTheRightQuantity(
				page
					.getByRole('article')
					.filter({ hasNot: page.getByRole('figure') }),
				2
			)

			const { addCustomizePizzaTranslation } = pizzaData

			await expect(
				page.getByRole('button', {
					name: addCustomizePizzaTranslation.label,
				})
			).not.toBeDisabled()
			await page
				.getByRole('button', { name: addCustomizePizzaTranslation.label })
				.click()

			await expect(
				page.getByText(addCustomizePizzaTranslation.dialog.title)
			).toBeVisible()
			await expect(
				page.getByRole('link', {
					name: addCustomizePizzaTranslation.dialog.keepOrdering,
				})
			).toBeVisible()
			await expect(
				page.getByRole('link', {
					name: addCustomizePizzaTranslation.dialog.checkout,
				})
			).toBeVisible()

			await page
				.getByRole('link', {
					name: addCustomizePizzaTranslation.dialog.keepOrdering,
				})
				.click()
			const { seo } = getJSON('../assets/i18n/pages/Menu.json')[locale]
			await expect(page).toHaveTitle(seo.title)

			await page
				.getByLabel(shoppingCartTranslationUtils.shoppingCartText)
				.click()

			await expect(page.getByText('Total: $280')).toBeVisible()
			await expect(
				shoppingCartTranslationUtils.getCheckoutLink(page, 2)
			).toBeVisible()
			await expect(page.getByText('No orders')).not.toBeVisible()
			await expect(
				page.getByRole('dialog').getByRole('article')
			).toHaveCount(1)
			await expect(
				page.getByRole('article').getByText(pizzaEmptyName)
			).toBeVisible()
			await expect(page.getByRole('article').getByText('$280')).toBeVisible()
			await expect(
				page
					.getByRole('article')
					.getByText(
						getLocalizedIngredient(locale, 'Grilled Chicken') + ' X1'
					)
			).toBeVisible()
			await expect(
				page
					.getByRole('article')
					.getByText(getLocalizedIngredient(locale, 'Mozzarella') + ' X1')
			).toBeVisible()
			await checkIfSelectQuantityHasTheRightQuantity(
				page.getByRole('article'),
				2
			)
		})
	})
})
