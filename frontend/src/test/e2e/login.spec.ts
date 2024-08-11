import { authHandler } from '@/mocks/domains/authHandler'
import { expect, test } from '@/test/e2e/utils/fixture'
import { findNavbarElements } from '@/test/e2e/utils/navbarUtils'
import { getJSON } from '@/utils/getJSON.mjs'

const locale = 'en'

const loginTranslation = getJSON('../i18n/pages/Login.json')
const t = loginTranslation[locale]
const { labels, form } = t.logInFormTranslation

test.describe('Log In page tests', () => {
   test.beforeEach(async ({ page }) => await page.goto('/client/en/login'))

   test('Should render the login page correctly', async ({ page }) => {
      await expect(page).toHaveTitle(t.seo.title)

      await findNavbarElements(locale, page)

      await expect(page.getByRole('heading', { name: t.seo.h1 })).toBeVisible()
      await expect(page.getByText(`${t.accountQuestion} ${t.signUp}`)).toBeVisible()

      await expect(page.getByLabel(labels.email)).toBeVisible()
      await expect(page.getByLabel(labels.password)).toBeVisible()

      await expect(page.getByRole('button', { name: form.submitLabel })).toBeVisible()
   })

   test('Should show an alert with an error after use the wrong credentials', async ({ page, worker }) => {
      await page.getByLabel(labels.email).fill('email@email.com')
      await page.getByLabel(labels.password).fill('wrong')

      await worker.use(...authHandler)

      await page.getByRole('button', { name: form.submitLabel }).click()

      await expect(page.getByRole('alert').getByText('Warning')).toBeVisible()
      await expect(page.getByRole('alert').getByText('Invalid credentials')).toBeVisible()
   })
   
   test('Should change to the home page after use the right credentials', async ({ page, worker }) => {
      await page.getByLabel(labels.email).fill('email@email.com')
      await page.getByLabel(labels.password).fill('1234')

      await worker.use(...authHandler)

      await page.getByRole('button', { name: form.submitLabel }).click()
      
      await expect(page).toHaveTitle('Home page')
   })
})