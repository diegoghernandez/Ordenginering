import { LOCALES } from '@/constants/locales'
import { orderHandler } from '@/mocks/domains/orderHandler'
import { expect, test } from '@/test/e2e/utils/fixture'
import { addPizzaInMenu } from '@/test/e2e/utils/generalUtils'
import {
	changeLanguage,
	findNavbarElements,
} from '@/test/e2e/utils/navbarUtils'
import { checkIfShoppingCartIsEmpty } from '@/test/e2e/utils/shoppingCartUtils'
import {
	goToLocalizedLink,
	shoppingCartTranslation,
} from '@/test/e2e/utils/translationUtils'
import { getJSON } from '@/utils/getJSON.mjs'

LOCALES.forEach((locale) => {
	const t = getJSON('../assets/i18n/pages/Checkout.json')[locale]
	const { addLabel: addMenuButton } = getJSON(
		'../assets/i18n/pages/Menu.json'
	)[locale]
	const shoppingCartTranslationUtils = shoppingCartTranslation(locale)

	test.describe(`${locale}: Checkout page tests`, () => {
		test.beforeEach(async ({ page }) => {
			await page.goto('/')
			await page.waitForLoadState('load')
			await changeLanguage(locale, page)
		})

		test('Should render the checkout page correctly after login and get the cookie', async ({
			page,
			context,
		}) => {
			await context.addCookies([
				{ name: 'jwt', value: 'token', domain: 'localhost', path: '/' },
			])
			await page.goto(`/${locale}/checkout`, {
				waitUntil: 'load',
			})

			await expect(page).toHaveTitle(t.seo.title)

			await findNavbarElements(locale, page)

			await expect(
				page.getByRole('heading', { name: t.seo.h1 })
			).toBeVisible()
			await expect(page.getByText(t.require)).toBeVisible()

			const locationInputs = Object.values(t.form.labels)
			locationInputs.forEach(async (input) => {
				await expect(page.getByLabel(input as string)).toBeVisible()
			})

			await expect(
				page.getByRole('button', { name: t.form.submitLabel })
			).toBeVisible()
			await expect(
				page.getByRole('link', { name: t.returnToChoose })
			).toBeVisible()
		})

		test('Should save four orders in the menu page, and go to the checkout page with cookie, then make the order and show an alert with an error', async ({
			page,
			context,
			worker,
			browserName,
		}) => {
			await context.addCookies([
				{ name: 'jwt', value: 'token', domain: 'localhost', path: '/' },
			])
			await goToLocalizedLink(locale, page, 'menu')
			if (browserName === 'firefox')
				await page.waitForLoadState('networkidle')

			await checkIfShoppingCartIsEmpty(locale, page)

			await addPizzaInMenu(page, 3, addMenuButton)
			await addPizzaInMenu(page, 2, addMenuButton)
			await addPizzaInMenu(page, 1, addMenuButton)
			await addPizzaInMenu(page, 7, addMenuButton)

			await expect(
				page
					.getByLabel(shoppingCartTranslationUtils.shoppingCartText)
					.getByText('4')
			).toBeVisible()
			await page
				.getByLabel(shoppingCartTranslationUtils.shoppingCartText)
				.click()
			await shoppingCartTranslationUtils.getCheckoutLink(page, 4).click()
			await expect(page).toHaveTitle(t.seo.title)
			await page.waitForLoadState('load')

			const labels = t.form.labels

			await page.getByLabel(labels.country).selectOption({ index: 1 })
			await page.getByLabel(labels.state).fill('Something')
			await page.getByLabel(labels.city).fill('Something')
			await page.getByLabel(labels.street).fill('street')
			await page.getByLabel(labels.houseNumber).fill('123')
			await page.getByLabel(labels.floor).fill('32')
			await page.getByLabel(labels.apartment).fill('5643')

			await worker.use(...orderHandler)

			await page.getByRole('button', { name: t.form.submitLabel }).click()
			await expect(
				page.getByRole('alert').getByText('Warning')
			).toBeVisible()
			await expect(
				page.getByRole('alert').getByText('Invalid request content')
			).toBeVisible()
		})

		test('Should save four orders in the menu page, and go to the checkout page with cookie, then make the order and show an alert with an successful message', async ({
			page,
			context,
			worker,
			browserName,
		}) => {
			await context.addCookies([
				{ name: 'jwt', value: 'token', domain: 'localhost', path: '/' },
			])
			await goToLocalizedLink(locale, page, 'menu')
			if (browserName === 'firefox')
				await page.waitForLoadState('networkidle')

			await checkIfShoppingCartIsEmpty(locale, page)

			await addPizzaInMenu(page, 3, addMenuButton)
			await addPizzaInMenu(page, 2, addMenuButton)
			await addPizzaInMenu(page, 1, addMenuButton)
			await addPizzaInMenu(page, 7, addMenuButton)

			await expect(
				page
					.getByLabel(shoppingCartTranslationUtils.shoppingCartText)
					.getByText('4')
			).toBeVisible()
			await page
				.getByLabel(shoppingCartTranslationUtils.shoppingCartText)
				.click()
			await shoppingCartTranslationUtils.getCheckoutLink(page, 4).click()
			await expect(page).toHaveTitle(t.seo.title)

			const labels = t.form.labels

			await page.getByLabel(labels.country).selectOption('Mexico')
			await page.getByLabel(labels.state).fill('Something')
			await page.getByLabel(labels.city).fill('Something')
			await page.getByLabel(labels.street).fill('street')
			await page.getByLabel(labels.houseNumber).fill('123')
			await page.getByLabel(labels.floor).fill('32')
			await page.getByLabel(labels.apartment).fill('5643')

			await worker.use(...orderHandler)

			await page.getByRole('button', { name: t.form.submitLabel }).click()
			await expect(
				page.getByRole('heading', { name: 'Order save correctly' })
			).toBeVisible()
			await expect(
				page.getByRole('link', { name: t.form.dialogAccept })
			).toBeVisible()
		})
	})
})
