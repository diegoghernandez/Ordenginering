import { type Locator, type Page, expect } from '@playwright/test'


export async function checkIfSelectQuantityHasTheRightQuantity(element: Locator, quantity: number) {
   const regex = new RegExp(`^${quantity}`)
   await expect(element.locator('p').filter({ hasText: regex })).toBeVisible()
}

export async function addPizzaInMenu(page: Page, position: number) {
   const articlesArray = await page.getByRole('article')
      .filter({ has: page.getByRole('link') }).all()

   await articlesArray?.at(position - 1)?.getByRole('button').click()
}

export async function checkIfIngredientHasTheRightQuantity(
   page: Page, 
   ingredient: string | undefined, 
   quantity: number
) {
   await checkIfSelectQuantityHasTheRightQuantity(
      page.getByRole('article').filter({ has: page.getByRole('heading', { name: ingredient }) }), 
      quantity
   )
}
