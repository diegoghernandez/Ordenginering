import { getJSON } from '@/utils/getJSON.mjs'
import { expect, type Page } from '@playwright/test'
import { shoppingCartTranslation } from './translationUtils'

export async function checkIfShoppingCartIsEmpty(locale: string, page: Page) {
	const shoppingCartTranslationUtils = shoppingCartTranslation(locale)
	const { noOrders } = getJSON('../assets/i18n/components/showOrder.json')[
		locale
	]
	const { closeLargeModalButton } = getJSON(
		'../assets/i18n/components/largeModal.json'
	)[locale]

	await expect(
		page
			.getByLabel(shoppingCartTranslationUtils.shoppingCartText)
			.getByText('0')
	).toBeVisible()

	await page.getByLabel(shoppingCartTranslationUtils.shoppingCartText).click()
	await expect(page.getByText('Total: $0')).toBeVisible()
	await expect(
		shoppingCartTranslationUtils.getCheckoutLink(page, 0)
	).toBeVisible()
	await expect(page.getByText(noOrders)).toBeVisible()

	await page.getByRole('button', { name: closeLargeModalButton }).click()
}
