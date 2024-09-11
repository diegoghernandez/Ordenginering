import { LOCALES } from '@/constants/locales'
import { expect, test } from '@/test/e2e/utils/fixture'
import {
	addPizzaInMenu,
	checkIfSelectQuantityHasTheRightQuantity,
} from '@/test/e2e/utils/generalUtils'
import {
	changeLanguage,
	findNavbarElements,
} from '@/test/e2e/utils/navbarUtils'
import { checkIfShoppingCartIsEmpty } from '@/test/e2e/utils/shoppingCartUtils'
import { shoppingCartTranslation } from '@/test/e2e/utils/translationUtils'
import { getJSON } from '@/utils/getJSON.mjs'

LOCALES.forEach((locale) => {
	const t = getJSON('../assets/i18n/pages/Menu.json')[locale]
	const shoppingCartTranslationUtils = shoppingCartTranslation(locale)

	test.describe(`${locale}: Menu page e2e tests`, () => {
		test.beforeEach(async ({ page }) => {
			await page.goto('/client/en/menu')
			await changeLanguage(locale, page)
		})

		test('Should render the menu page correctly', async ({ page }) => {
			await expect(page).toHaveTitle(t.seo.title)

			await findNavbarElements(locale, page)

			await expect(
				page.getByRole('heading', { name: t.seo.h1 })
			).toBeVisible()
			const pizzaArticles = page
				.getByRole('article')
				.filter({ has: page.getByRole('figure') })
			await expect(pizzaArticles).toHaveCount(9)

			for (const element of await pizzaArticles.all()) {
				await element.screenshot()
				await expect(element.getByRole('figure')).toBeVisible()
				await expect(element.getByRole('heading')).toBeVisible()
				await expect(element.getByText('$')).toBeVisible()
				await expect(element.getByText(', ')).toBeVisible()
				await expect(element.getByRole('button')).toBeVisible()
				await expect(element.getByRole('link')).toBeVisible()
			}
		})

		test('Should save a pizza to the shopping cart', async ({ page }) => {
			await checkIfShoppingCartIsEmpty(locale, page)

			await addPizzaInMenu(page, 1)

			await page
				.getByLabel(shoppingCartTranslationUtils.shoppingCartText)
				.click()
			await expect(page.getByText('Total: $140')).toBeVisible()

			const showOrdersDialog = page.getByRole('dialog')
			await expect(
				shoppingCartTranslationUtils.getCheckoutLink(page, 1)
			).toBeVisible()
			await expect(page.getByText('No orders')).not.toBeVisible()
			await expect(showOrdersDialog.getByRole('article')).toHaveCount(1)
			await expect(
				showOrdersDialog.getByRole('heading', { name: 'Pepperoni' })
			).toBeVisible()
			await expect(
				showOrdersDialog.getByRole('article').getByText('$140')
			).toBeVisible()
			await expect(
				showOrdersDialog.getByRole('article').getByText('Pepperoni X1')
			).toBeVisible()
			await expect(
				showOrdersDialog.getByRole('article').getByText('Mozzarella X1')
			).toBeVisible()
			await checkIfSelectQuantityHasTheRightQuantity(
				page.getByRole('dialog').getByRole('article'),
				1
			)
		})
	})
})
