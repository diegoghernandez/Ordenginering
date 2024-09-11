import { LOCALES } from '@/constants/locales'
import { authHandler } from '@/mocks/domains/authHandler'
import { expect, test } from '@/test/e2e/utils/fixture'
import {
	changeLanguage,
	findNavbarElements,
} from '@/test/e2e/utils/navbarUtils'
import { getJSON } from '@/utils/getJSON.mjs'

LOCALES.forEach((locale) => {
	const t = getJSON('../assets/i18n/pages/SignUp.json')[locale]
	const { labels, submitLabel } = t.signUpFormTranslation

	test.describe(`${locale}: Sign Up page tests`, () => {
		test.beforeEach(async ({ page }) => {
			await page.goto('/client/en/signup')
			await changeLanguage(locale, page)
		})

		test('Should render the sign up page correctly', async ({ page }) => {
			await expect(page).toHaveTitle(t.seo.title)

			await findNavbarElements(locale, page)

			await expect(
				page.getByRole('heading', { name: t.seo.h1 })
			).toBeVisible()
			await expect(
				page.getByText(`${t.haveAccount} ${t.login}`)
			).toBeVisible()

			await expect(page.getByLabel(labels.customerName)).toBeVisible()
			await expect(page.getByLabel(labels.email)).toBeVisible()
			await expect(
				page.getByLabel(labels.password, { exact: true })
			).toBeVisible()
			await expect(page.getByLabel(labels.confirmPassword)).toBeVisible()
			await expect(page.getByLabel(labels.birthDate)).toBeVisible()

			await expect(
				page.getByRole('button', { name: submitLabel })
			).toBeVisible()
		})

		test('Should show an accessible description with an error in the password and confirm password inputs after put different passwords', async ({
			page,
		}) => {
			await page.getByLabel(labels.customerName).fill('Test')
			await page.getByLabel(labels.email).fill('test@email.com')
			await page.getByLabel(labels.password, { exact: true }).fill('wrong')
			await page
				.getByLabel(labels.confirmPassword, { exact: true })
				.fill('1234')
			await page.getByLabel(labels.birthDate).fill('2020-02-02')

			await page.getByRole('button', { name: submitLabel }).click()

			await expect(
				page.getByLabel(labels.password, { exact: true })
			).toHaveAccessibleDescription(t.signUpFormTranslation.passwordError)
			await expect(
				page.getByLabel(labels.confirmPassword, { exact: true })
			).toHaveAccessibleDescription(t.signUpFormTranslation.passwordError)
		})

		test('Should show an alert with an error after put a repeat email', async ({
			page,
			worker,
		}) => {
			await page.getByLabel(labels.customerName).fill('Test')
			await page.getByLabel(labels.email).fill('repeat@email.com')
			await page.getByLabel(labels.password, { exact: true }).fill('1234')
			await page
				.getByLabel(labels.confirmPassword, { exact: true })
				.fill('1234')
			await page.getByLabel(labels.birthDate).fill('2020-02-02')

			await worker.use(...authHandler)

			await page.getByRole('button', { name: submitLabel }).click()

			await expect(
				page.getByRole('alert').getByText('Warning')
			).toBeVisible()
			await expect(
				page.getByRole('alert').getByText('Email is already used')
			).toBeVisible()
		})

		test('Should show an alert with the a successful message', async ({
			page,
			worker,
		}) => {
			await page.getByLabel(labels.customerName).fill('Test')
			await page.getByLabel(labels.email).fill('good@email.com')
			await page.getByLabel(labels.password, { exact: true }).fill('1234')
			await page
				.getByLabel(labels.confirmPassword, { exact: true })
				.fill('1234')
			await page.getByLabel(labels.birthDate).fill('2000-02-02')

			await worker.use(...authHandler)

			await page.getByRole('button', { name: submitLabel }).click()

			await expect(
				page.getByRole('alert').getByText('Success', { exact: true })
			).toBeVisible()
			await expect(
				page.getByRole('alert').getByText('Account create successfully')
			).toBeVisible()
		})
	})
})
