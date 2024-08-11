import { expect, test } from '@/test/e2e/utils/fixture'
import { findNavbarElements } from '@/test/e2e/utils/navbarUtils'
import { getJSON } from '@/utils/getJSON.mjs'
import { getLocalizedIngredientsButtonsFromCustomizePage, shoppingCartTranslation } from './utils/translationUtils'

const locale = 'en'

const customizeTranslation = getJSON('../i18n/pages/Customize.json')
const t = customizeTranslation[locale]
const { pizzaData, pizzaIngredients } = t
const shoppingCartTranslationUtils = shoppingCartTranslation(locale)

test.describe('Customize page e2e tests', () => {
   test('Should render correctly', async ({ page }) => {
      test.setTimeout(1000 * 50)
      await page.goto('/client/en/customize/empty')
      await expect(page).toHaveTitle(t.seo.title)

      await findNavbarElements(locale, page)

      await expect(page.getByRole('img', { name: 'Empty pizza' })).toBeVisible()
      /* await expect(page.getByRole('figure')
         .filter({ has: page.getByRole('img', { name: 'Empty pizza' }) })
         .getByLabel('Show author image')).toBeVisible() */

      const pizzaDataArticle = page.getByRole('article').filter({ has: page.getByRole('heading', { name: pizzaData.title }) })

      await expect(pizzaDataArticle.getByRole('heading')).toBeVisible()
      await expect(pizzaDataArticle.getByText('Total: $100')).toBeVisible()
      await expect(pizzaDataArticle.getByLabel(pizzaData.selectLabel)).toBeVisible()
      await expect(pizzaDataArticle.getByLabel(pizzaData.selectLabel)).toHaveValue('MEDIUM')
      await expect(pizzaDataArticle.getByText(pizzaData.quantity)).toBeVisible()
      await expect(pizzaDataArticle.getByLabel(pizzaData.selectedQuantity.decrease)).toBeVisible()
      await expect(pizzaDataArticle.getByLabel(pizzaData.selectedQuantity.decrease)).toBeDisabled()
      await expect(pizzaDataArticle.getByText('1', { exact: true })).toBeVisible()
      await expect(pizzaDataArticle.getByLabel(pizzaData.selectedQuantity.increase)).toBeVisible()
      await expect(pizzaDataArticle.getByRole('button', { name: pizzaData.addCustomizePizzaTranslation.label })).toBeVisible()

      pizzaIngredients.ingredientTypeList.forEach(async (type: string) =>
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
         await expect(element.getByText(pizzaData.quantity)).toBeVisible()
         await expect(element.getByLabel(pizzaData.selectedQuantity.decrease)).toBeVisible()
         await expect(element.getByLabel(pizzaData.selectedQuantity.decrease)).toBeDisabled()
         await expect(element.getByText('0')).toBeVisible()
         await expect(element.getByLabel(pizzaData.selectedQuantity.increase)).toBeVisible()
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
      await expect(pizzaDataArticle.getByLabel(pizzaData.selectLabel)).toHaveValue('MEDIUM')
      await expect(pizzaDataArticle.getByText('1', { exact: true })).toBeVisible()

      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Pepperoni' }) }).getByText('1')).toBeVisible()
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Tomato sauce' }) }).getByText('1')).toBeVisible()
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Bell Peppers' }) }).getByText('1')).toBeVisible()
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Onions' }) }).getByText('1')).toBeVisible()
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Black Olives' }) }).getByText('1')).toBeVisible()
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Mozzarella' }) }).getByText('1')).toBeVisible()
   })

   test('Should change the total value, the quantity and the desire ingredients when you interact with the page', async ({ page }) => {
      const ingredientTypeList = getLocalizedIngredientsButtonsFromCustomizePage(locale)
      await page.goto('/client/en/customize/empty')
      const pizzaDataArticle = page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Customize your pizza' }) })

      await expect(page.getByText('Total: $100')).toBeVisible()
      await expect(pizzaDataArticle.getByText('1', { exact: true })).toBeVisible()
      await expect(page.getByRole('article').filter({ has: page.getByRole('figure') })).toHaveCount(34)
      
      await pizzaDataArticle.getByLabel(pizzaData.selectedQuantity.increase).click()
      await expect(pizzaDataArticle.getByText('2', { exact: true })).toBeVisible()
      await expect(page.getByText('Total: $200')).toBeVisible()
      
      await page.getByLabel(pizzaData.selectLabel).selectOption('LARGE')
      await expect(page.getByText('Total: $300')).toBeVisible()
      
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Basil' }) }).getByText('0')).toBeVisible()
      await page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Basil' }) }).getByLabel(pizzaIngredients.selectQuantity.increase).click()
      await page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Basil' }) }).getByLabel(pizzaIngredients.selectQuantity.increase).click()
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Basil' }) }).getByText('2')).toBeVisible()

      await expect(page.getByText('Total: $380')).toBeVisible()
      await expect(page.getByText('Basil X2')).toBeVisible()

      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Red Onions' }) }).getByText('0')).toBeVisible()
      await page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Red Onions' }) }).getByLabel(pizzaIngredients.selectQuantity.increase).click()
      await page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Red Onions' }) }).getByLabel(pizzaIngredients.selectQuantity.increase).click()
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Red Onions' }) }).getByText('2')).toBeVisible()

      await expect(page.getByText('Total: $460')).toBeVisible()
      await expect(page.getByText('Red Onions X2')).toBeVisible()

      await page.getByRole('button', { name: ingredientTypeList.sauce }).click()
      await expect(page.getByRole('article').filter({ has: page.getByRole('figure') })).toHaveCount(3)
      
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'BBQ sauce' }) }).getByText('0')).toBeVisible()
      await page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'BBQ sauce' }) }).getByLabel(pizzaIngredients.selectQuantity.increase).click()
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'BBQ sauce' }) }).getByText('1')).toBeVisible()

      await expect(page.getByText('Total: $500')).toBeVisible()
      await expect(page.getByText('BBQ sauce  X1')).toBeVisible()

      await page.getByRole('button', { name: ingredientTypeList.cheese }).click()
      await expect(page.getByRole('article').filter({ has: page.getByRole('figure') })).toHaveCount(7)
      
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Mozzarella' }) }).getByText('0')).toBeVisible()
      await page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Mozzarella' }) }).getByLabel(pizzaIngredients.selectQuantity.increase).click()
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Mozzarella' }) }).getByText('1')).toBeVisible()

      await expect(page.getByText('Total: $540')).toBeVisible()
      await expect(page.getByText('Mozzarella  X1')).toBeVisible()

      await page.getByRole('button', { name: ingredientTypeList.meat }).click()
      await expect(page.getByRole('article').filter({ has: page.getByRole('figure') })).toHaveCount(10)

      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Grilled Chicken' }) }).getByText('0')).toBeVisible()
      await page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Grilled Chicken' }) }).getByLabel(pizzaIngredients.selectQuantity.increase).click()
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Grilled Chicken' }) }).getByText('1')).toBeVisible()

      await expect(page.getByText('Total: $580')).toBeVisible()
      await expect(page.getByText('Grilled Chicken  X1')).toBeVisible()

      await page.getByRole('button', { name: ingredientTypeList.vegetable }).click()
      await expect(page.getByRole('article').filter({ has: page.getByRole('figure') })).toHaveCount(14)
      
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Pineapple' }) }).getByText('0')).toBeVisible()
      await page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Pineapple' }) }).getByLabel(pizzaIngredients.selectQuantity.increase).click()
      await expect(page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Pineapple' }) }).getByText('1')).toBeVisible()
      
      await expect(page.getByText('Total: $620')).toBeVisible()
      await expect(page.getByText('Pineapple  X1')).toBeVisible()

      await page.getByRole('button', { name: ingredientTypeList.all }).click()
      await expect(page.getByRole('article').filter({ has: page.getByRole('figure') })).toHaveCount(34)

      await pizzaDataArticle.getByLabel(pizzaData.selectedQuantity.decrease).click()
      await expect(pizzaDataArticle.locator('div').filter({ hasText: '+' }).getByText('1')).toBeVisible()
      await expect(page.getByText('Total: $310', { exact: true })).toBeVisible()
   })

   test('Should interact with the ingredients and save the order correctly', async ({ page }) => {
      await page.goto('/client/en/customize/empty')

      await page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Grilled Chicken' }) })
         .getByLabel(pizzaData.selectedQuantity.increase).click({ delay: 1000 * 2 })
      await page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Mozzarella' }) }).getByLabel(pizzaData.selectedQuantity.increase).click()
      await page.getByRole('article').filter({ hasNot: page.getByRole('figure') }).getByLabel(pizzaData.selectedQuantity.increase).click()
      
      await expect(page.getByText('Total: $280')).toBeVisible()
      await expect(page.getByText('Grilled Chicken X1')).toBeVisible()
      await expect(page.getByText('Mozzarella X1')).toBeVisible()
      await expect(page.getByRole('article').filter({ hasNot: page.getByRole('figure') }).getByText('2', { exact: true })).toBeVisible()

      const { addCustomizePizzaTranslation } = pizzaData
      
      await expect(page.getByRole('button', { name: addCustomizePizzaTranslation.label })).not.toBeDisabled()
      await page.getByRole('button', { name: addCustomizePizzaTranslation.label }).click()
      
      await expect(page.getByText(addCustomizePizzaTranslation.dialog.title)).toBeVisible()
      await expect(page.getByRole('link', { name: addCustomizePizzaTranslation.dialog.keepOrdering })).toBeVisible()
      await expect(page.getByRole('link', { name: addCustomizePizzaTranslation.dialog.checkout })).toBeVisible()

      await page.getByRole('link', { name: addCustomizePizzaTranslation.dialog.keepOrdering }).click()
      await expect(page).toHaveTitle('Menu')

      await page.getByLabel(shoppingCartTranslationUtils.shoppingCartText).click()

      await expect(page.getByText('Total: $280')).toBeVisible()
      await expect(page.getByText(shoppingCartTranslationUtils.getCheckoutLink(2))).toBeVisible()
      await expect(page.getByText('No orders')).not.toBeVisible()
      await expect(page.getByRole('dialog').getByRole('article')).toHaveCount(1)
      await expect(page.getByRole('article').getByText('Custom empty')).toBeVisible()
      await expect(page.getByRole('article').getByText('$280')).toBeVisible()
      await expect(page.getByRole('article').getByText('Grilled Chicken X1')).toBeVisible()
      await expect(page.getByRole('article').getByText('Mozzarella X1')).toBeVisible()
      await expect(page.getByRole('article').getByText('2', { exact: true })).toBeVisible()
   })
})