import { expect, test } from '@/test/e2e/utils/fixture'
import { findNavbarElements } from './utils/navbarUtils'
import { getProfileLinks } from '@/utils/getProfileLinks'

test.describe('Customer orders page tests', () => {
   test.beforeEach(async ({ page, context }) => {
      await context.addCookies([{ name: 'jwt', value: 'token', domain: 'localhost', path: '/' }])

      await page.goto('/client/en/customer/32/orders')
   })

   test('Should render correctly', async ({ page }) => {
      await findNavbarElements(page)

      getProfileLinks(32, 'ADMIN', 'ORDER').forEach(async ({ name }) => {
         await expect(page.getByRole('link', { name })).toBeVisible()
      })
      await expect(page.getByRole('link', { name: 'Orders' })).toHaveClass('active')
      
      await expect(page.getByRole('article')).toHaveCount(9)
      await expect(page.getByRole('alert')).not.toBeVisible()
      
      await page.mouse.wheel(0, 600)
      
      await expect(page.getByRole('alert')).toBeVisible()
      await expect(page.getByRole('article')).toHaveCount(12)
      await expect(page.getByRole('alert')).not.toBeVisible()

      for (const element of await page.getByRole('article').all()) {
         await element.screenshot()
         await expect(element.getByText('Apr 16, 2024')).toBeVisible()
         await expect(element.getByText(/[3,6] products/)).toBeVisible()
         await expect(element.getByText('Total')).toBeVisible()
         await expect(element.getByText('$940')).toBeVisible()
         await expect(element.getByRole('button')).toBeVisible()
         await expect(element.getByRole('dialog')).toBeHidden()
      }
   })

   test('Should show correctly one order when you click in one of the cards', async ({ page }) => {
      await page.getByRole('article').nth(3).click()

      const dialogElement = page.getByRole('dialog')
      await expect(dialogElement.getByText('Your order')).toBeVisible()
      await expect(dialogElement.getByText('Date: 4/16/24, 1:55:09 PM')).toBeVisible()
      await expect(dialogElement.getByText('Products: 6')).toBeVisible()
      await expect(dialogElement.getByText('Total: $940')).toBeVisible()
      await expect(dialogElement.getByText('Country: México')).toBeVisible()
      await expect(dialogElement.getByText('State: Bamyan')).toBeVisible()
      await expect(dialogElement.getByText('City: Ashkāsham')).toBeVisible()
      await expect(dialogElement.getByText('Street: Street')).toBeVisible()
      await expect(dialogElement.getByText('House number: 111')).toBeVisible()

      await expect(page.getByRole('dialog').getByRole('article').filter({ has: page.getByRole('figure') })).toHaveCount(6)

      for (const element of await page.getByRole('dialog').getByRole('article').filter({ has: page.getByRole('figure') }).all()) {
         await expect(element.getByRole('heading')).toBeVisible()
         await expect(element.getByText(/\$[140,160,640]/)).toBeVisible();
         (await element.getByText(/[a-zA-Z]+ X1/).all()).forEach((element) => expect(element).toBeVisible())
         await expect(element.getByText('Medium')).toBeVisible()
         await expect(element.getByText(/\SX[1,4]/)).toBeVisible()
      }
   })
})