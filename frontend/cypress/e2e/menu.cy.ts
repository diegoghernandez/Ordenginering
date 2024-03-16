import { Quantity } from '../../src/constants/quantity'
import type { Pizza } from '../../src/types'

describe('Menu page e2e tests', () => {
   beforeEach(() => cy.visit('/menu'))

   it('Should render the page correctly', () => {
      cy.get('title').should('have.text', 'Menu page')

      cy.navbarElements()

      cy.findByRole('heading', { name: 'Menu' }).should('exist')
      cy.findAllByRole('article').should('have.length', '13')
   })

   it('Should save a pizza to the shopping cart', () => {
      cy.checkIfShoppingCartIsEmpty()

      cy.addPizzaInMenu(0)

      const pizzaList: Pizza[] = [{
         pizzaName: 'Pepperoni',
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

      
      cy.checkIfPizzaIsAddToShoppingCart(pizzaList)
      
      cy.findByText('Cart').click()
      
      cy.findByRole('dialog').within(() => {
         cy.findByRole('article').should('have.length', 1)
         cy.findByRole('heading', { name: 'Pepperoni' }).should('exist')
         cy.findByText('Size: MEDIUM').should('exist')
         cy.findByText('Ingredients: Pepperoni, Mozzarella').should('exist')
         cy.findByRole('link').should('exist')
      })
   })
})