import { expect, type Page } from '@playwright/test'

export async function checkIfShoppingCartIsEmpty(page: Page) {
   await page.waitForFunction((value) => {
      return JSON.stringify(localStorage) === value
   }, '{}')
   await expect(page.getByLabel('Shopping cart').getByText('0')).toBeVisible()

   await page.getByLabel('Shopping cart').click()
   await expect(page.getByText('Total: $0')).toBeVisible()
   await expect(page.getByText('Checkout (0 product(s))')).toBeVisible()
   await expect(page.getByText('No orders')).toBeVisible()

   await page.getByRole('button', { name: 'Close menu' }).click()
}