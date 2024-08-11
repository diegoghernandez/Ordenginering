import { type Page } from '@playwright/test'

export async function addPizzaInMenu(page: Page, position: number) {
   const articlesArray = await page.getByRole('article')
      .filter({ has: page.getByRole('link') }).all()
   
   await articlesArray?.at(position - 1)?.getByRole('button').click()
}
