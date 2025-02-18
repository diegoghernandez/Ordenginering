import { LOCALES } from '@/constants/locales'
import { expect, test } from '@/test/e2e/utils/fixture'
import { findNavbarElements } from '@/test/e2e/utils/navbarUtils'
import { getJSON } from '@/utils/getJSON.mjs'

LOCALES.forEach((locale) => {
	const t = getJSON('../assets/i18n/pages/Verify.json')[locale]

	test.describe(`${locale}: Verify page tests`, () => {
		test('Should render the verify EXPIRED page correctly', async ({
			page,
		}) => {
			await page.goto(`/client/${locale}/verify?token=expired`)

			await expect(page).toHaveTitle(t.seo.title)

			await findNavbarElements(locale, page)

			await expect(page.getByText(t.token.EXPIRED)).toBeVisible()
			await expect(
				page.getByRole('button', { name: t.resend, exact: true })
			).toBeVisible()
		})

		test('Should send the token to the respective email and get a server error', async ({
			page,
		}) => {
			await page.goto(`/client/${locale}/verify?token=failure`)

			await expect(page).toHaveTitle(t.seo.title)

			await page.getByRole('button', { name: t.resend, exact: true }).click()
			await expect(
				page.getByRole('button', { name: t.resend, exact: true })
			).toBeDisabled()

			await expect(page.getByText(t.responses.SERVER)).toBeVisible()
		})

		test('Should send the token to the respective email', async ({
			page,
		}) => {
			await page.goto(`/client/${locale}/verify?token=expired`)

			await expect(page).toHaveTitle(t.seo.title)

			await page.getByRole('button', { name: t.resend, exact: true }).click()
			await expect(
				page.getByRole('button', { name: t.resend, exact: true })
			).toBeDisabled()

			await expect(page.getByText(t.responses.SUCCESS)).toBeVisible()
		})

		test('Should render the verify SUCCESSFUL page correctly', async ({
			page,
		}) => {
			await Promise.all([
				page.goto(`/client/${locale}/verify?token=correct`),

				expect(page).toHaveTitle(t.seo.title),

				findNavbarElements(locale, page),

				expect(page.getByText(t.token.SUCCESSFUL)).toBeVisible(),
				expect(page.getByRole('link', { name: t.login })).toBeVisible(),
			])
		})
	})
})
