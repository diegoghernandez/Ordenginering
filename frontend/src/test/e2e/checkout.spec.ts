import { test, expect } from '@/test/e2e/utils/fixture'
import { orderHandler } from '@/mocks/domains/orderHandler'
import { addPizzaInMenu } from '@/test/e2e/utils/menuUtils'
import { findNavbarElements } from '@/test/e2e/utils/navbarUtils'
import { checkIfShoppingCartIsEmpty } from '@/test/e2e/utils/shoppingCartUtils'

test.describe('Checkout page tests', () => {
   test('Should render the checkout page correctly', async ({ page }) => {
      await page.goto('http://localhost:4321/client/checkout')
      await expect(page).toHaveTitle('Checkout order')

      await findNavbarElements(page)

      await expect(page.getByRole('heading', { name: 'Choose delivery address' })).toBeVisible()
      await expect(page.getByText('* Required field')).toBeVisible()

      const locationInputs = ['Country*', 'State*', 'City*', 'Street*', 'House number*', 'Apartment', 'Floor']

      locationInputs.forEach(async (input) => {
         await expect(page.getByLabel(input)).toBeVisible()
      })

      await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible()
      await expect(page.getByRole('link', { name: 'Return to choose' })).toBeVisible()
   })

   test('Should show an alert with an error', async ({ page, worker }) => {
      await page.goto('http://localhost:4321/client/menu')

      await checkIfShoppingCartIsEmpty(page)

      await page.waitForTimeout(800)

      await addPizzaInMenu(page, 3)
      await addPizzaInMenu(page, 2)
      await addPizzaInMenu(page, 9)
      await addPizzaInMenu(page, 7)

      await expect(page.getByLabel('Shopping cart').getByText('4')).toBeVisible()
      await page.getByLabel('Shopping cart').click()
      await page.getByRole('link', { name: 'Checkout (4 products)' }).click()
      await expect(page).toHaveTitle('Checkout order')

      await page.getByLabel('Country*').selectOption({ index: 1 })
      await page.getByLabel('State*').selectOption({ index: 1 })
      await page.getByLabel('City*').selectOption({ index: 1 })
      await page.getByLabel('Street*').fill('street')
      await page.getByLabel('House number*').fill('123')
      await page.getByLabel('Apartment').fill('5643')
      await page.getByLabel('Floor').fill('32')

      await worker.use(...orderHandler)

      await page.getByRole('button', { name: 'Checkout' }).click()
      await expect(page.getByRole('alert').getByText('Warning')).toBeVisible()
      await expect(page.getByRole('alert').getByText('Invalid request content')).toBeVisible()
   })

   test('Should save four orders in the menu page, and make the order correctly', async ({ page, worker }) => {
      await page.goto('http://localhost:4321/client/menu')

      await checkIfShoppingCartIsEmpty(page)

      await page.waitForTimeout(800)

      await addPizzaInMenu(page, 3)
      await addPizzaInMenu(page, 2)
      await addPizzaInMenu(page, 9)
      await addPizzaInMenu(page, 7)

      await expect(page.getByLabel('Shopping cart').getByText('4')).toBeVisible()
      await page.getByLabel('Shopping cart').click()
      await page.getByRole('link', { name: 'Checkout (4 products)' }).click()
      await expect(page).toHaveTitle('Checkout order')

      await page.getByLabel('Country*').selectOption('Mexico')
      await page.getByLabel('State*').selectOption({ index: 1 })
      await page.getByLabel('City*').selectOption({ index: 1 })
      await page.getByLabel('Street*').fill('street')
      await page.getByLabel('House number*').fill('123')
      await page.getByLabel('Apartment').fill('5643')
      await page.getByLabel('Floor').fill('32')

      await worker.use(...orderHandler)

      await page.getByRole('button', { name: 'Checkout' }).click()
      await expect(page.getByRole('alert').getByText('Success')).toBeVisible()
      await expect(page.getByRole('alert').getByText('Order save correctly')).toBeVisible()
   })
})