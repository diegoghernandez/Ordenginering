import { LOCALES } from '@/constants/locales'
import { expect, test } from '@/test/e2e/utils/fixture'
import { findNavbarElements } from '@/test/e2e/utils/navbarUtils'
import { getJSON } from '@/utils/getJSON.mjs'

LOCALES.forEach((locale) => {
	const t = getJSON('../assets/i18n/pages/Verify.json')[locale]

	test.describe(`${locale}: Verify page tests`, () => {
		test('Should render the verify SUCCESSFUL page correctly', async ({
			page,
		}) => {
			await page.goto(`/client/${locale}/verify?token=correct`)

			await expect(page).toHaveTitle(t.seo.title)

			await findNavbarElements(locale, page)

			await expect(page.getByText(t.token.SUCCESSFUL)).toBeVisible()
			await expect(page.getByRole('link', { name: 'Login' })).toBeVisible()
		})

		test('Should render the verify EXPIRED page correctly', async ({
			page,
		}) => {
			await page.goto(`/client/${locale}/verify?token=expired`)

			await expect(page).toHaveTitle(t.seo.title)

			await findNavbarElements(locale, page)

			await expect(page.getByText(t.token.EXPIRED)).toBeVisible()
			await expect(
				page.getByRole('button', { name: 'Resend token' })
			).toBeVisible()
		})
	})
})
