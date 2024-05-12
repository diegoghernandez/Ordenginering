import { test, expect } from '@/test/e2e/utils/fixture'
import { findNavbarElements } from './utils/navbarUtils'
import { customerHandler } from '@/mocks/domains/customerHandler'

test.describe('Log In page tests', () => {
   test.beforeEach(async ({ page }) => await page.goto('http://localhost:4321/client/login'))

   test('Should render the checkout page correctly', async ({ page }) => {
      await expect(page).toHaveTitle('Login')

      await findNavbarElements(page)

      await expect(page.getByRole('heading', { name: 'Log in to your account' })).toBeVisible()
      await expect(page.getByText("Don't have an account? Sign Up")).toBeVisible()

      await expect(page.getByLabel('Email')).toBeVisible()
      await expect(page.getByLabel('Password')).toBeVisible()

      await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible()
   })

   test('Should show an alert with an error after use the wrong credentials', async ({ page, worker }) => {
      await page.getByLabel('Email').fill('email@email.com')
      await page.getByLabel('Password').fill('wrong')

      await worker.use(...customerHandler)

      await page.getByRole('button', { name: 'Sign In' }).click()

      await expect(page.getByRole('alert').getByText('Warning')).toBeVisible()
      await expect(page.getByRole('alert').getByText('Invalid credentials')).toBeVisible()
   })
   
   test('Should change to the home page after use the right credentials', async ({ page, worker }) => {
      await page.getByLabel('Email').fill('email@email.com')
      await page.getByLabel('Password').fill('1234')

      await worker.use(...customerHandler)

      await page.getByRole('button', { name: 'Sign In' }).click()
      
      await expect(page).toHaveTitle('Home page')
   })
})