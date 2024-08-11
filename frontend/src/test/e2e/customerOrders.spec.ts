import { expect, test } from '@/test/e2e/utils/fixture'
import { findNavbarElements } from '@/test/e2e/utils/navbarUtils'
import { getJSON } from '@/utils/getJSON.mjs'
import { getProfileLinks } from '@/utils/getProfileLinks'

const locale = 'en'

const ordersTranslation = getJSON('../i18n/pages/Orders.json')
const t = ordersTranslation[locale]

test.describe('Customer orders page tests', () => {
   test.beforeEach(async ({ page, context }) => {
      await context.addCookies([{ name: 'jwt', value: 'token', domain: 'localhost', path: '/' }])

      await page.goto('/client/en/customer/32/orders')
   })

   test('Should render correctly', async ({ page }) => {
      await findNavbarElements(locale, page)
      await expect(page).toHaveTitle(t.seo.title)

      getProfileLinks({
         customerId: 32, 
         role: 'ADMIN', 
         active: 'INGREDIENT'
      }).forEach(async ({ name }) => {
         await expect(page.getByRole('link', { name })).toBeVisible()
      })

      const { orders } = getJSON('../i18n/components/profileLinks.json')[locale]
      await expect(page.getByRole('link', { name: orders })).toHaveClass('active')
      
      await expect(page.getByRole('article')).toHaveCount(9)
      await expect(page.getByRole('alert')).not.toBeVisible()
      
      await page.mouse.wheel(0, 600)
      
      await expect(page.getByRole('alert')).toBeVisible()
      await expect(page.getByRole('article')).toHaveCount(12)
      await expect(page.getByRole('alert')).not.toBeVisible()

      const regexProducts = new RegExp(`[3,6] ${t.showPastOrdersTraduction.products}`)

      for (const element of await page.getByRole('article').all()) {
         await element.screenshot()
         await expect(element.getByText('Apr 16, 2024')).toBeVisible()
         await expect(element.getByText(regexProducts)).toBeVisible()
         await expect(element.getByText('Total')).toBeVisible()
         await expect(element.getByText('$940')).toBeVisible()
         await expect(element.getByRole('button')).toBeVisible()
         await expect(element.getByRole('dialog')).toBeHidden()
      }
   })

   test('Should show correctly one order when you click in one of the cards', async ({ page }) => {
      await page.getByRole('article').nth(3).click()

      const { orderModalTraduction } = t.showPastOrdersTraduction

      const dialogElement = page.getByRole('dialog')
      await expect(dialogElement.getByText(orderModalTraduction.dialogTitle)).toBeVisible()
      await expect(dialogElement.getByText(`${orderModalTraduction.date}: 4/16/24, 1:55:09 PM`)).toBeVisible()
      await expect(dialogElement.getByText(`${orderModalTraduction.products}: 6`)).toBeVisible()
      await expect(dialogElement.getByText('Total: $940')).toBeVisible()
      await expect(dialogElement.getByText(`${orderModalTraduction.country}: México`)).toBeVisible()
      await expect(dialogElement.getByText(`${orderModalTraduction.state}: Bamyan`)).toBeVisible()
      await expect(dialogElement.getByText(`${orderModalTraduction.city}: Ashkāsham`)).toBeVisible()
      await expect(dialogElement.getByText(`${orderModalTraduction.street}: Street`)).toBeVisible()
      await expect(dialogElement.getByText(`${orderModalTraduction.houseNumber}: 111`)).toBeVisible()

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