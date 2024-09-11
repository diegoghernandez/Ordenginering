import { LOCALES } from '@/constants/locales'
import { expect, test } from '@/test/e2e/utils/fixture'
import {
	changeLanguage,
	findNavbarElements,
} from '@/test/e2e/utils/navbarUtils'
import { getJSON } from '@/utils/getJSON.mjs'
import { getProfileLinks } from '@/utils/getProfileLinks'

LOCALES.forEach((locale) => {
	const t = getJSON('../assets/i18n/pages/Orders.json')[locale]
	const DATE = '2024-04-16T13:55:09'

	test.describe(`${locale}: Customer orders page tests`, () => {
		test.beforeEach(async ({ page, context }) => {
			await context.addCookies([
				{ name: 'jwt', value: 'token', domain: 'localhost', path: '/' },
			])

			await page.goto('/client/en/customer/32/orders')
			await changeLanguage(locale, page)
		})

		test('Should render correctly', async ({ page }) => {
			await expect(page).toHaveTitle(t.seo.title)

			await findNavbarElements(locale, page)

			getProfileLinks({
				customerId: 32,
				role: 'ADMIN',
				active: 'INGREDIENT',
				desireTranslation: locale,
			}).forEach(async ({ name }) => {
				await expect(page.getByRole('link', { name })).toBeVisible()
			})

			const { orders } = getJSON(
				'../assets/i18n/components/profileLinks.json'
			)[locale]
			await expect(page.getByRole('link', { name: orders })).toHaveClass(
				'active'
			)

			await expect(page.getByRole('article')).toHaveCount(9)
			await expect(page.getByRole('alert')).not.toBeVisible()

			await page.mouse.wheel(0, 600)

			await expect(page.getByRole('alert')).toBeVisible()
			await expect(page.getByRole('article')).toHaveCount(12)
			await expect(page.getByRole('alert')).not.toBeVisible()

			const regexProducts = new RegExp(
				`[3,6] ${t.showPastOrdersTranslation.products}`
			)

			for (const element of await page.getByRole('article').all()) {
				await element.screenshot()
				await expect(
					element.getByText(
						new Intl.DateTimeFormat(locale, {
							dateStyle: 'medium',
						}).format(new Date(DATE))
					)
				).toBeVisible()
				await expect(element.getByText(regexProducts)).toBeVisible()
				await expect(element.getByText('Total')).toBeVisible()
				await expect(element.getByText('$940')).toBeVisible()
				await expect(element.getByRole('button')).toBeVisible()
				await expect(element.getByRole('dialog')).toBeHidden()
			}
		})

		test('Should show correctly one order when you click in one of the cards', async ({
			page,
		}) => {
			await page.getByRole('article').nth(3).click()

			const { orderModalTranslation } = t.showPastOrdersTranslation

			const dialogElement = page.getByRole('dialog')
			await expect(
				dialogElement.getByText(orderModalTranslation.dialogTitle)
			).toBeVisible()
			await expect(
				dialogElement.getByText(
					`${orderModalTranslation.date}: ${new Intl.DateTimeFormat(
						locale,
						{ dateStyle: 'short', timeStyle: 'medium' }
					).format(new Date(DATE))}`
				)
			).toBeVisible()
			await expect(
				dialogElement.getByText(`${orderModalTranslation.products}: 6`)
			).toBeVisible()
			await expect(dialogElement.getByText('Total: $940')).toBeVisible()
			await expect(
				dialogElement.getByText(`${orderModalTranslation.country}: México`)
			).toBeVisible()
			await expect(
				dialogElement.getByText(`${orderModalTranslation.state}: Bamyan`)
			).toBeVisible()
			await expect(
				dialogElement.getByText(`${orderModalTranslation.city}: Ashkāsham`)
			).toBeVisible()
			await expect(
				dialogElement.getByText(`${orderModalTranslation.street}: Street`)
			).toBeVisible()
			await expect(
				dialogElement.getByText(`${orderModalTranslation.houseNumber}: 111`)
			).toBeVisible()

			await expect(
				page
					.getByRole('dialog')
					.getByRole('article')
					.filter({ has: page.getByRole('figure') })
			).toHaveCount(6)

			for (const element of await page
				.getByRole('dialog')
				.getByRole('article')
				.filter({ has: page.getByRole('figure') })
				.all()) {
				await expect(element.getByRole('heading')).toBeVisible()
				await expect(element.getByText(/\$[140,160,640]/)).toBeVisible()
				;(await element.getByText(/[a-zA-Z]+ X1/).all()).forEach(
					(element) => expect(element).toBeVisible()
				)
				await expect(element.getByText(/\SX[1,4]/)).toBeVisible()
			}
		})
	})
})
