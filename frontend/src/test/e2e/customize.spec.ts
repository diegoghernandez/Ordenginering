import { expect, test } from '@/test/e2e/utils/fixture'
import { findNavbarElements } from './utils/navbarUtils'

test.describe('Customize page e2e tests', () => {
   test('Should render correctly', async ({ page }) => {
      test.setTimeout(1000 * 50)
      await page.goto('/client/en/customize/empty')
      await expect(page).toHaveTitle('Customize pizza')

      await findNavbarElements(page)

      await expect(page.getByRole('img', { name: 'Empty pizza' })).toBeVisible()
      /* await expect(page.getByRole('figure')
         .filter({ has: page.getByRole('img', { name: 'Empty pizza' }) })
         .getByLabel('Show author image')).toBeVisible() */

      const pizzaDataArticle = page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Customize your pizza' }) })

      await expect(pizzaDataArticle.getByRole('heading')).toBeVisible()
      await expect(pizzaDataArticle.getByText('Total: $100')).toBeVisible()
      await expect(pizzaDataArticle.getByLabel('Size')).toBeVisible()
      await expect(pizzaDataArticle.getByLabel('Size')).toHaveValue('MEDIUM')
      await expect(pizzaDataArticle.getByText('Quantity')).toBeVisible()
      await expect(pizzaDataArticle.getByLabel('Decrease quantity')).toBeVisible()
      await expect(pizzaDataArticle.getByLabel('Decrease quantity')).toBeDisabled()
      await expect(pizzaDataArticle.getByText('1', { exact: true })).toBeVisible()
      await expect(pizzaDataArticle.getByLabel('Increase quantity')).toBeVisible()
      await expect(pizzaDataArticle.getByRole('button', { name: 'Add order' })).toBeVisible();

      ['All', 'Vegetable', 'Meat', 'Cheese', 'Sauce'].forEach(async (type) =>
         await expect(page.getByRole('button', { name: type })).toBeVisible()
      )
      await expect(page.getByRole('button', { name: 'All' })).toHaveClass(/active/)

      await expect(page.getByRole('article').filter({ has: page.getByRole('figure') })).toHaveCount(34)

      const ingredientsCards = page.getByRole('article').filter({ has: page.getByRole('figure') })
      for (const element of await ingredientsCards.all()) {
         await element.screenshot()
         await expect(element.getByRole('figure')).toBeVisible()
         // await expect(element.getByLabel('Show author image')).toBeVisible()
         await expect(element.getByRole('heading')).toBeVisible()
         await expect(element.getByText('Quantity')).toBeVisible()
         await expect(element.getByLabel('Decrease quantity')).toBeVisible()
         await expect(element.getByLabel('Decrease quantity')).toBeDisabled()
         await expect(element.getByText('0')).toBeVisible()
         await expect(element.getByLabel('Increase quantity')).toBeVisible()
      }
   })

   test('Should render correctly if you choose click in the personalize link in the prebuild pizza in the menu page', async ({ page }) => {
      await page.goto('/client/en/menu')

      await page.getByRole('article').filter({ hasText: 'Supreme' }).getByRole('link').click()

      await expect(page.getByRole('img', { name: 'Supreme pizza' })).toBeVisible()

      await expect(page.getByText('Total: $220')).toBeVisible()
      await expect(page.getByText('Pepperoni X1')).toBeVisible()
      await expect(page.getByText('Tomato sauce X1')).toBeVisible()
      await expect(page.getByText('Bell Peppers X1')).toBeVisible()
      await expect(page.getByText('Onions X1')).toBeVisible()
      await expect(page.getByText('Black Olives X1')).toBeVisible()
      await expect(page.getByText('Mozzarella X1')).toBeVisible()

      const pizzaDataArticle = page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Customize your pizza' }) })
      await expect(pizzaDataArticle.getByLabel('Size')).toHaveValue('MEDIUM')
      await expect(pizzaDataArticle.getByText('1', { exact: true })).toBeVisible()

      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Pepperoni' }) }).getByText('1')).toBeVisible()
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Tomato sauce' }) }).getByText('1')).toBeVisible()
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Bell Peppers' }) }).getByText('1')).toBeVisible()
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Onions' }) }).getByText('1')).toBeVisible()
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Black Olives' }) }).getByText('1')).toBeVisible()
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Mozzarella' }) }).getByText('1')).toBeVisible()
   })

   test('Should change the total value, the quantity and the desire ingredients when you interact with the page', async ({ page }) => {
      await page.goto('/client/en/customize/empty')
      const pizzaDataArticle = page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Customize your pizza' }) })

      await expect(page.getByText('Total: $100')).toBeVisible()
      await expect(pizzaDataArticle.getByText('1', { exact: true })).toBeVisible()
      await expect(page.getByRole('article').filter({ has: page.getByRole('figure') })).toHaveCount(34)
      
      await pizzaDataArticle.getByLabel('Increase quantity').click()
      await expect(pizzaDataArticle.getByText('2', { exact: true })).toBeVisible()
      await expect(page.getByText('Total: $200')).toBeVisible()
      
      await page.getByLabel('Size').selectOption('LARGE')
      await expect(page.getByText('Total: $300')).toBeVisible()
      
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Basil' }) }).getByText('0')).toBeVisible()
      await page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Basil' }) }).getByLabel('Increase quantity').click()
      await page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Basil' }) }).getByLabel('Increase quantity').click()
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Basil' }) }).getByText('2')).toBeVisible()

      await expect(page.getByText('Total: $380')).toBeVisible()
      await expect(page.getByText('Basil X2')).toBeVisible()

      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Red Onions' }) }).getByText('0')).toBeVisible()
      await page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Red Onions' }) }).getByLabel('Increase quantity').click()
      await page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Red Onions' }) }).getByLabel('Increase quantity').click()
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Red Onions' }) }).getByText('2')).toBeVisible()

      await expect(page.getByText('Total: $460')).toBeVisible()
      await expect(page.getByText('Red Onions X2')).toBeVisible()

      await page.getByRole('button', { name: 'Sauce' }).click()
      await expect(page.getByRole('article').filter({ has: page.getByRole('figure') })).toHaveCount(3)
      
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'BBQ sauce' }) }).getByText('0')).toBeVisible()
      await page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'BBQ sauce' }) }).getByLabel('Increase quantity').click()
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'BBQ sauce' }) }).getByText('1')).toBeVisible()

      await expect(page.getByText('Total: $500')).toBeVisible()
      await expect(page.getByText('BBQ sauce  X1')).toBeVisible()

      await page.getByRole('button', { name: 'Cheese' }).click()
      await expect(page.getByRole('article').filter({ has: page.getByRole('figure') })).toHaveCount(7)
      
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Mozzarella' }) }).getByText('0')).toBeVisible()
      await page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Mozzarella' }) }).getByLabel('Increase quantity').click()
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Mozzarella' }) }).getByText('1')).toBeVisible()

      await expect(page.getByText('Total: $540')).toBeVisible()
      await expect(page.getByText('Mozzarella  X1')).toBeVisible()

      await page.getByRole('button', { name: 'Meat' }).click()
      await expect(page.getByRole('article').filter({ has: page.getByRole('figure') })).toHaveCount(10)

      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Grilled Chicken' }) }).getByText('0')).toBeVisible()
      await page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Grilled Chicken' }) }).getByLabel('Increase quantity').click()
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Grilled Chicken' }) }).getByText('1')).toBeVisible()

      await expect(page.getByText('Total: $580')).toBeVisible()
      await expect(page.getByText('Grilled Chicken  X1')).toBeVisible()

      await page.getByRole('button', { name: 'Vegetable' }).click()
      await expect(page.getByRole('article').filter({ has: page.getByRole('figure') })).toHaveCount(14)
      
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Pineapple' }) }).getByText('0')).toBeVisible()
      await page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Pineapple' }) }).getByLabel('Increase quantity').click()
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Pineapple' }) }).getByText('1')).toBeVisible()
      
      await expect(page.getByText('Total: $620')).toBeVisible()
      await expect(page.getByText('Pineapple  X1')).toBeVisible()

      await page.getByRole('button', { name: 'All' }).click()
      await expect(page.getByRole('article').filter({ has: page.getByRole('figure') })).toHaveCount(34)

      await pizzaDataArticle.getByLabel('Decrease quantity').click()
      await expect(pizzaDataArticle.locator('div').filter({ hasText: '+' }).getByText('1')).toBeVisible()
      await expect(page.getByText('Total: $310', { exact: true })).toBeVisible()
   })

   test('Should interact with the ingredients and save the order correctly', async ({ page }) => {
      await page.goto('/client/en/customize/empty')

      await page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Grilled Chicken' }) })
         .getByLabel('Increase quantity').click({ delay: 1000 * 2 })
      await page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Mozzarella' }) }).getByLabel('Increase quantity').click()
      await page.getByRole('article').filter({ hasNot: page.getByRole('figure') }).getByLabel('Increase quantity').click()
      
      await expect(page.getByText('Total: $280')).toBeVisible()
      await expect(page.getByText('Grilled Chicken X1')).toBeVisible()
      await expect(page.getByText('Mozzarella X1')).toBeVisible()
      await expect(page.getByRole('article').filter({ hasNot: page.getByRole('figure') }).getByText('2', { exact: true })).toBeVisible()
      
      await expect(page.getByRole('button', { name: 'Add order' })).not.toBeDisabled()
      await page.getByRole('button', { name: 'Add order' }).click()
      
      await expect(page.getByText('Added to shopping cart correctly')).toBeVisible()
      await expect(page.getByRole('link', { name: 'Keep ordering' })).toBeVisible()
      await expect(page.getByRole('link', { name: 'Checkout' })).toBeVisible()

      await page.getByRole('link', { name: 'Keep ordering' }).click()
      await expect(page).toHaveTitle('Menu page')

      await page.getByLabel('Shopping cart').click()

      await expect(page.getByText('Total: $280')).toBeVisible()
      await expect(page.getByText('Checkout (2 product(s))')).toBeVisible()
      await expect(page.getByText('No orders')).not.toBeVisible()
      await expect(page.getByRole('dialog').getByRole('article')).toHaveCount(1)
      await expect(page.getByRole('article').getByText('Custom empty')).toBeVisible()
      await expect(page.getByRole('article').getByText('$280')).toBeVisible()
      await expect(page.getByRole('article').getByText('Grilled Chicken X1')).toBeVisible()
      await expect(page.getByRole('article').getByText('Mozzarella X1')).toBeVisible()
      await expect(page.getByRole('article').getByText('2', { exact: true })).toBeVisible()
   })
})