import { LOCALES } from '@/constants/locales'
import { expect, test } from '@/test/e2e/utils/fixture'
import { findNavbarElements } from '@/test/e2e/utils/navbarUtils'
import { getJSON } from '@/utils/getJSON.mjs'

LOCALES.forEach((locale) => {
	const t = getJSON('../assets/i18n/pages/ResetPassword.json')[locale]

	test.describe(`${locale}: Reset password page tests`, () => {
		test('Should render the page correctly', async ({ page }) => {
			await page.goto(`/client/${locale}/reset-password`)

			await expect(page).toHaveTitle(t.seo.title)

			await findNavbarElements(locale, page)

			await expect(
				page.getByRole('heading', { name: t.title })
			).toBeVisible()
			await expect(page.getByLabel(t.labels.newPassword)).toBeVisible()
			await expect(
				page.getByLabel(t.labels.confirmNewPassword)
			).toBeVisible()
			await expect(
				page.getByRole('button', { name: t.submit })
			).toBeVisible()
		})

		test("Should show the passwords don't match error", async ({ page }) => {
			await page.goto(`/client/${locale}/reset-password`)

			await page.getByLabel(t.labels.newPassword).fill('1234')
			await page.getByLabel(t.labels.confirmNewPassword).fill('abcd')
			await page.getByRole('button', { name: t.submit }).click()

			await expect(
				page.getByLabel(t.labels.newPassword)
			).toHaveAccessibleDescription(t.errors['NOT_MATCH'])
			await expect(
				page.getByLabel(t.labels.confirmNewPassword)
			).toHaveAccessibleDescription(t.errors['NOT_MATCH'])
		})

		test('Should show the EXPIRED response', async ({ page }) => {
			await page.goto(`/client/${locale}/reset-password?token=expired`)

			await page.getByLabel(t.labels.newPassword).fill('1234')
			await page.getByLabel(t.labels.confirmNewPassword).fill('1234')
			await page.getByRole('button', { name: t.submit }).click()

			await expect(page.getByText(t.responses.EXPIRED)).toBeVisible()
			await expect(
				page.getByRole('button', { name: t.resend.resendButton })
			).toBeVisible()
		})

		test('Should be able to resend the EXPIRED token and get a successful response', async ({
			page,
		}) => {
			await page.goto(`/client/${locale}/reset-password?token=expired`)

			await page.getByLabel(t.labels.newPassword).fill('1234')
			await page.getByLabel(t.labels.confirmNewPassword).fill('1234')
			await page.getByRole('button', { name: t.submit }).click()

			await expect(page.getByText(t.responses.EXPIRED)).toBeVisible()
			await page.getByRole('button', { name: t.resend.resendButton }).click()
			await expect(page.getByText(t.resend.SUCCESS)).toBeVisible()
		})

		test('Should show the SERVER error', async ({ page }) => {
			await page.goto(`/client/${locale}/reset-password?token=server`)

			await page.getByLabel(t.labels.newPassword).fill('1234')
			await page.getByLabel(t.labels.confirmNewPassword).fill('1234')
			await page.getByRole('button', { name: t.submit }).click()

			await expect(page.getByText(t.responses.SERVER)).toBeVisible()
		})

		test('Should show the SUCCESSFUL response', async ({ page }) => {
			await page.goto(`/client/${locale}/reset-password?token=correct`)

			await page.getByLabel(t.labels.newPassword).fill('1234')
			await page.getByLabel(t.labels.confirmNewPassword).fill('1234')
			await page.getByRole('button', { name: t.submit }).click()

			await expect(page.getByText(t.responses.SUCCESSFUL)).toBeVisible()
		})
	})
})
