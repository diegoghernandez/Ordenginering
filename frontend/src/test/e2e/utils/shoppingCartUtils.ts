import type { Pizza } from '@/types'
import { expect, type Page } from '@playwright/test'

export async function checkIfShoppingCartIsEmpty(page: Page) {
   await page.waitForFunction((value) => {
      return JSON.stringify(localStorage) === value
   }, '{}')
   await expect(page.getByLabel('Shopping cart').getByText('0')).toBeVisible()

   await page.getByLabel('Shopping cart').click()
   await expect(page.getByText('Total $0')).toBeVisible()
   await expect(page.getByText('Checkout (0 products)')).toBeVisible()
   //await expect(page.getByText('No orders')).toBeVisible()

   await page.getByRole('button', { name: 'Close menu' }).click()
}

export async function checkIfPizzaWasAddToShoppingCart(page: Page, pizzaList: Pizza[]) {
   await page.waitForFunction((value) => {
      let localStoragePizza = JSON.parse(localStorage.getItem('allPizza') ?? '[]')
      localStoragePizza = localStoragePizza.map((object: Pizza) => {
         const { id, ...rest } = object
         return rest
      })
      
      return JSON.stringify(localStoragePizza) === value
   }, JSON.stringify(pizzaList))
   
   await expect(page.getByLabel('Shopping cart').getByText(String(pizzaList.length))).toBeVisible()
}