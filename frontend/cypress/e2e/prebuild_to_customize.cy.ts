import { Quantity } from '../../src/constants/quantity'
import type { Pizza } from '../../src/types'

describe('Tests for the customization of a prebuilt pizza from the menu page', () => { 
   beforeEach(() => {
      cy.visit('/menu')

      cy.get('article').first().within(() => cy.findByRole('link').click())
   })

   it('Should render correctly the prebuild pizza', () => {
      cy.get('title').should('have.text', 'Customize your pepperoni pizza')

      cy.findByRole('heading', { name: 'Customize your Pepperoni pizza' }).should('exist')

      cy.findByRole('img').first().should('have.attr', 'alt', 'Pepperoni pizza')
      cy.findByText('$140').should('exist')
      cy.get('input:checked').should('have.length', '2')
   })
   
   it('Should render correctly the prebuild pizza', () => {
      cy.wait(200)
      cy.clickVisibleArticleInCustomizePizza(3)
      cy.clickVisibleArticleInCustomizePizza(0)
      cy.findByText('$180').should('exist')
      
      cy.findByRole('button', { name: 'Meat' }).click()
      cy.clickVisibleArticleInCustomizePizza(0)
      cy.findByText('$200').should('exist')
      
      cy.findByRole('button', { name: '+' }).click()
      cy.findByText('$400').should('exist')
      
      cy.findByRole('combobox').select('LARGE')
      cy.findByText('$500').should('exist')

      cy.checkIfShoppingCartIsEmpty()

      cy.findByText('Agregar').click()

      const pizzaList: Pizza[] = [{
         pizzaName: 'Custom pepperoni',
         size: 'LARGE',
         ingredientNameDtoList: [{
               name: 'Pineapple',
               quantity: Quantity.NORMAL
            }, {
               name: 'Bell Peppers',
               quantity: Quantity.NORMAL
            }, {
               name: 'Grilled Chicken',
               quantity: Quantity.NORMAL
            }, {
               name: 'Pepperoni',
               quantity: Quantity.NORMAL
            }, {
               name: 'Mozzarella',
               quantity: Quantity.NORMAL
            }],
         quantity: 2,
      }]

      cy.checkIfPizzaIsAddToShoppingCart(pizzaList)

      cy.findByText('Cart').click()

      cy.findByRole('dialog').within(() => {
         cy.findByRole('article').should('have.length', 1)
         cy.findByRole('heading', { name: 'Custom pepperoni' }).should('exist')
         cy.findByText('Size: LARGE').should('exist')
         cy.findByText('Ingredients: Pineapple, Bell Peppers, Grilled Chicken, Pepperoni, Mozzarella').should('exist')
         cy.findByText('Quantity: 2').should('exist')
         cy.findByRole('link').should('exist')
      })
   })
})