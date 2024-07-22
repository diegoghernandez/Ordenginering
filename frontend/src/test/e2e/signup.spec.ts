import { expect, test } from '@/test/e2e/utils/fixture'
import { findNavbarElements } from './utils/navbarUtils'
import { authHandler } from '@/mocks/domains/authHandler'

test.describe('Sign Up page tests', () => {
   test.beforeEach(async ({ page }) => await page.goto('http://localhost:4321/client/signup'))

   test('Should render the sign up page correctly', async ({ page }) => {
      await expect(page).toHaveTitle('Sign Up')

      await findNavbarElements(page)

      await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible()
      await expect(page.getByText('Have an account? Log in now')).toBeVisible()

      await expect(page.getByLabel('Name')).toBeVisible()
      await expect(page.getByLabel('Email')).toBeVisible()
      await expect(page.getByLabel('Password', { exact: true })).toBeVisible()
      await expect(page.getByLabel('Confirm Password')).toBeVisible()
      await expect(page.getByLabel('Birth Date')).toBeVisible()

      await expect(page.getByRole('button', { name: 'Sign Up' })).toBeVisible()
   })

   test('Should show an accessible description with an error in the password and confirm password inputs after put different passwords', async ({ page }) => {
      await page.getByLabel('Name').fill('Test')
      await page.getByLabel('Email').fill('test@email.com')
      await page.getByLabel('Password', { exact: true }).fill('wrong')
      await page.getByLabel('Confirm password', { exact: true }).fill('1234')
      await page.getByLabel('Birth Date').fill('2020-02-02')

      await page.getByRole('button', { name: 'Sign Up' }).click()
      
      await expect(page.getByLabel('Password', { exact: true })).toHaveAccessibleDescription("Passwords don't match")
      await expect(page.getByLabel('Confirm password', { exact: true })).toHaveAccessibleDescription("Passwords don't match")
   })

   test('Should show an alert with an error after put a repeat email', async ({ page, worker }) => {
      await page.getByLabel('Name').fill('Test')
      await page.getByLabel('Email').fill('repeat@email.com')
      await page.getByLabel('Password', { exact: true }).fill('1234')
      await page.getByLabel('Confirm password', { exact: true }).fill('1234')
      await page.getByLabel('Birth Date').fill('2020-02-02')
      
      await worker.use(...authHandler)
      
      await page.getByRole('button', { name: 'Sign Up' }).click()
      
      await expect(page.getByRole('alert').getByText('Warning')).toBeVisible()
      await expect(page.getByRole('alert').getByText('Email is already used')).toBeVisible()
   })

   test('Should show an alert with the a successful message', async ({ page, worker }) => {
      await page.getByLabel('Name').fill('Test')
      await page.getByLabel('Email').fill('good@email.com')
      await page.getByLabel('Password', { exact: true }).fill('1234')
      await page.getByLabel('Confirm password', { exact: true }).fill('1234')
      await page.getByLabel('Birth Date').fill('2000-02-02')
      
      await worker.use(...authHandler)
      
      await page.getByRole('button', { name: 'Sign Up' }).click()
      
      await expect(page.getByRole('alert').getByText('Success', { exact: true })).toBeVisible()
      await expect(page.getByRole('alert').getByText('Account create successfully')).toBeVisible()
   })
})