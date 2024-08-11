import { getJSON } from '@/utils/getJSON.mjs'
import {expect, type Page } from '@playwright/test'
import { shoppingCartTranslation } from './translationUtils'

export async function findNavbarElements(locale: string, page: Page) {
   const navbarTranslation = getJSON('../i18n/components/navbar.json')[locale]
   const { closeLargeModalButton } = getJSON('../i18n/components/largeModal.json')[locale]
   const accountButtonTranslation = getJSON('../i18n/components/accountButton.json')[locale]   

   await page.setViewportSize({ width: 320, height: 900 })
   await page.getByLabel(navbarTranslation.menuButton).click()
   
   await expect(page.getByRole('link', { name: navbarTranslation.links.home })).toBeVisible()
   await expect(page.getByRole('link', { name: navbarTranslation.links.menu })).toBeVisible()
   await expect(page.getByRole('link', { name: navbarTranslation.links.home, exact: true })).toBeVisible()
   
   await page.getByRole('button', { name: closeLargeModalButton }).click()
   
   await page.setViewportSize({ width: 1200, height: 900 })

   await expect(page.getByRole('link', { name: navbarTranslation.links.home })).toBeVisible()
   await expect(page.getByRole('link', { name: navbarTranslation.links.menu })).toBeVisible()
   await expect(page.getByRole('link', { name: navbarTranslation.links.customize, exact: true })).toBeVisible()
   
   await expect(page.getByRole('button', { name: accountButtonTranslation.accountButton })).toBeVisible()
   await page.getByRole('button', { name: accountButtonTranslation.accountButton }).click()
   await expect(page.getByRole('link', { name: accountButtonTranslation.accountDialog.account })).toBeVisible()
   await expect(page.getByRole('button', { name: accountButtonTranslation.accountDialog.darkMode })).toBeVisible()
   await expect(page.getByRole('button', { name: accountButtonTranslation.accountDialog.logout })).toBeVisible()

   await page.getByRole('button', { name: 'Logout' }).click()

   await expect(page.getByRole('heading', { name: accountButtonTranslation.logoutModal.closeQuestion })).toBeVisible()
   await expect(page.getByRole('button', { name: accountButtonTranslation.logoutModal.accept })).toBeVisible()
   await expect(page.getByRole('button', { name: accountButtonTranslation.logoutModal.cancel })).toBeVisible()
   
   await page.getByRole('button', { name: accountButtonTranslation.logoutModal.cancel }).click()
   await expect(page.getByRole('heading', { name: accountButtonTranslation.logoutModal.closeQuestion })).not.toBeVisible()

   await page.getByRole('button', { name: accountButtonTranslation.accountButton }).click()
   await expect(page.getByRole('link', { name: accountButtonTranslation.accountDialog.account })).not.toBeVisible()


   const { shoppingCartText } = shoppingCartTranslation(locale)
   await expect(page.getByLabel(shoppingCartText)).toBeVisible()
   await expect(page.getByLabel(shoppingCartText).getByText('0')).toBeVisible()
}