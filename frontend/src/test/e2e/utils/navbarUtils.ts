import {expect, type Page } from '@playwright/test'

export async function findNavbarElements(page: Page) {
   await page.getByLabel('Open menu').click()
   
   await expect(page.getByRole('link', { name: 'Home' })).toBeVisible()
   await expect(page.getByRole('link', { name: 'Menu' })).toBeVisible()
   await expect(page.getByRole('link', { name: 'Customize' })).toBeVisible()

   await page.getByRole('button', { name: 'Close menu' }).click()
   
   await expect(page.getByRole('link', { name: 'Account' })).toBeVisible()
   await expect(page.getByLabel('Shopping cart')).toBeVisible()
   await expect(page.getByLabel('Shopping cart').getByText('0')).toBeVisible()
}