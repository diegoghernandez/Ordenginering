import { LOCALES } from '@/constants/locales'
import { authHandler } from '@/mocks/domains/authHandler'
import { expect, test } from '@/test/e2e/utils/fixture'
import {
	changeLanguage,
	findNavbarElements,
} from '@/test/e2e/utils/navbarUtils'
import { getJSON } from '@/utils/getJSON.mjs'
import { goToLocalizedLink } from './utils/translationUtils'

LOCALES.forEach((locale) => {
	const t = getJSON('../assets/i18n/pages/Login.json')[locale]
	const tForgotPassword = getJSON(
		'../assets/i18n/components/ForgotPassword.json'
	)[locale]
	const { labels, form } = t.logInFormTranslation

	test.describe(`${locale}: Log In page tests`, () => {
		test.beforeEach(async ({ page }) => {
			await page.goto('/client')
			await changeLanguage(locale, page)
			await page.waitForLoadState('load')
			await goToLocalizedLink(locale, page, 'account')
		})

		test('Should render the login page correctly', async ({ page }) => {
			await expect(page).toHaveTitle(t.seo.title)

			await findNavbarElements(locale, page)

			await expect(
				page.getByRole('heading', { name: t.seo.h1 })
			).toBeVisible()
			await expect(
				page.getByText(`${t.accountQuestion} ${t.signUp}`)
			).toBeVisible()

			await expect(page.getByLabel(labels.email).first()).toBeVisible()
			await expect(page.getByLabel(labels.password)).toBeVisible()
			await expect(
				page.getByRole('button', { name: form.submitLabel })
			).toBeVisible()

			await expect(
				page.getByRole('button', { name: tForgotPassword.forgotButton })
			).toBeVisible()
			await page
				.getByRole('button', { name: tForgotPassword.forgotButton })
				.click()

			await expect(
				page.getByRole('heading', { name: tForgotPassword.title })
			).toBeVisible()
			await expect(page.getByLabel(labels.email).last()).toBeVisible()
			await expect(
				page
					.getByRole('button', { name: tForgotPassword.forgotButton })
					.last()
			).toBeVisible()
			await expect(
				page.getByRole('button', { name: tForgotPassword.cancel })
			).toBeVisible()
		})

		test('Should show an alert with an error after use the wrong credentials', async ({
			page,
			worker,
		}) => {
			await page.getByLabel(labels.email).fill('email@email.com')
			await page.getByLabel(labels.password).fill('wrong')

			await worker.use(...authHandler)

			await page.getByRole('button', { name: form.submitLabel }).click()

			await expect(
				page.getByRole('alert').getByText('Warning')
			).toBeVisible()
			await expect(
				page.getByRole('alert').getByText('Invalid credentials')
			).toBeVisible()
		})

		test('Should change to the home page after use the right credentials', async ({
			page,
			worker,
		}) => {
			await page.getByLabel(labels.email).fill('email@email.com')
			await page.getByLabel(labels.password).fill('1234')

			await worker.use(...authHandler)

			await page.getByRole('button', { name: form.submitLabel }).click()

			await expect(
				page.getByRole('alert').getByText('Success', { exact: true })
			).toBeVisible()
			await expect(
				page.getByRole('alert').getByText(form.response)
			).toBeVisible()

			const { seo } = getJSON('../assets/i18n/pages/Home.json')[locale]
			await expect(page).toHaveTitle(seo.title)
		})

		test('Should send an email for reset the password and receive a successful response', async ({
			page,
			worker,
		}) => {
			await page
				.getByRole('button', { name: tForgotPassword.forgotButton })
				.click()

			await worker.use(...authHandler)

			await page.getByLabel(labels.email).last().fill('success@example.com')
			await page
				.getByRole('button', { name: tForgotPassword.forgotButton })
				.last()
				.click()

			await expect(
				page.getByRole('alert').getByText('Success', { exact: true })
			).toBeVisible()
			await expect(
				page
					.getByRole('alert')
					.getByText(tForgotPassword.responses.SUCCESSFUL)
			).toBeVisible()
		})
	})
})
