import { type Page } from '@playwright/test'

export async function addPizzaInMenu(page: Page, position: number) {
   return (await page.getByRole('article').all()).at(position)?.getByRole('button').click()
}
