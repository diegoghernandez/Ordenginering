import { test, expect } from '@/test/e2e/utils/fixture'
import { findNavbarElements } from '@/test/e2e/utils/navbarUtils'
import { checkIfPizzaWasAddToShoppingCart, checkIfShoppingCartIsEmpty } from '@/test/e2e/utils/shoppingCartUtils'
import type { Pizza } from '@/types'
import { Quantity } from '@/constants/quantity'
import { addPizzaInMenu } from '@/test/e2e/utils/menuUtils'

test.describe('Menu page e2e tests', () => {
   test.beforeEach(async ({ page }) => await page.goto('/client/menu'))

   test('Should render the menu page correctly', async ({ page }) => {
      await expect(page).toHaveTitle('Menu page')
   
      await findNavbarElements(page)
      
      await expect(page.getByRole('heading', { name: 'Menu' })).toBeVisible()
      await expect(page.getByRole('article')).toHaveCount(13)
   })

   test('Should save a pizza to the shopping cart', async ({ page }) => {
      await checkIfShoppingCartIsEmpty(page)

      await addPizzaInMenu(page, 0)

      const pizzaList: Pizza[] = [{
         pizzaName: 'Pepperoni',
         image: '/client/images/pizza/pepperoni.jpg',
         size: 'MEDIUM',
         quantity: 1,
         ingredientNameDtoList: [{
               name: 'Pepperoni',
               quantity: Quantity.NORMAL
            },{
               name: 'Mozzarella',
               quantity: Quantity.NORMAL
         }]
      }]

      await checkIfPizzaWasAddToShoppingCart(page, pizzaList)

      await page.getByLabel('Shopping cart').click()
      await expect(page.getByText('Total $140')).toBeVisible()
      await expect(page.getByText('Checkout (1 products)')).toBeVisible()
      await expect(page.getByText('No orders')).not.toBeVisible()
      await expect(page.getByRole('dialog').getByRole('article')).toHaveCount(1)
   })
})


