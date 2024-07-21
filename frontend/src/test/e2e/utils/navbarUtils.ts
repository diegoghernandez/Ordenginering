import {expect, type Page } from '@playwright/test'

export async function findNavbarElements(page: Page) {
   await page.setViewportSize({ width: 320, height: 900 })
   await page.getByLabel('Open menu').click()
   
   await expect(page.getByRole('link', { name: 'Home' })).toBeVisible()
   await expect(page.getByRole('link', { name: 'Menu' })).toBeVisible()
   await expect(page.getByRole('link', { name: 'Customize', exact: true })).toBeVisible()
   
   await page.getByRole('button', { name: 'Close menu' }).click()
   
   await page.setViewportSize({ width: 1200, height: 900 })

   await expect(page.getByRole('link', { name: 'Home' })).toBeVisible()
   await expect(page.getByRole('link', { name: 'Menu' })).toBeVisible()
   await expect(page.getByRole('link', { name: 'Customize', exact: true })).toBeVisible()
   
   await expect(page.getByRole('button', { name: 'Account' })).toBeVisible()
   await page.getByRole('button', { name: 'Account' }).click()
   await expect(page.getByRole('link', { name: 'Customer' })).toBeVisible()
   await expect(page.getByRole('button', { name: 'Dark mode' })).toBeVisible()
   
   await page.getByRole('button', { name: 'Account' }).click()
   await expect(page.getByRole('link', { name: 'Customer' })).not.toBeVisible()

   await expect(page.getByLabel('Shopping cart')).toBeVisible()
   await expect(page.getByLabel('Shopping cart').getByText('0')).toBeVisible()
}