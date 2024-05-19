import { expect, test } from '@/test/e2e/utils/fixture'
import { findNavbarElements } from './utils/navbarUtils'

test.describe('Customer orders page tests', () => {
   test.beforeEach(async ({ page, context }) => {
      await context.addCookies([{ name: 'jwt', value: 'token', domain: 'localhost', path: '/' }])

      await page.goto('/client/customer/32/orders')
   })

   test('Should render correctly', async ({ page }) => {
      await findNavbarElements(page)

      await expect(page.getByRole('article')).toHaveCount(3);

      (await page.getByRole('article').all()).forEach(async (element) => {
         await expect(element.getByText('Jun 26, 2024')).toBeVisible()
         await expect(element.getByText('19 products')).toBeVisible()
         await expect(element.getByText('Total')).toBeVisible()
         await expect(element.getByText('$3534534')).toBeVisible()
         await expect(element.getByRole('link')).toBeVisible()
      })
   })
})