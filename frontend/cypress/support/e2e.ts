/// <reference types="@testing-library/cypress" />
import '@testing-library/cypress/add-commands'
import type { Pizza } from '../../types'

declare global {
   // eslint-disable-next-line @typescript-eslint/no-namespace
   namespace Cypress {
      interface Chainable {
         navbarElements(): void,
         addPizzaInMenu(position: number): void
         clickVisibleArticleInCustomizePizza(position: number): Chainable<JQuery<HTMLElement>>,
         checkIfShoppingCartIsEmpty(): void,
         checkIfPizzaIsAddToShoppingCart(pizzaList: Pizza[]): void
      }
   }
}

Cypress.on('uncaught:exception', () => false)

Cypress.Commands.add('navbarElements', () => {
   cy.findByRole('link', { name: 'Home' }).should('exist')
   cy.findByRole('link', { name: 'Menu' }).should('exist')
   cy.findByRole('link', { name: 'Customize' }).should('exist')
   cy.findByText('Cart').should('exist')
   cy.findByText('0').should('exist')
})

Cypress.Commands.add('addPizzaInMenu', (position) => 
cy.get('article').eq(position).within(() => cy.get('button').click())
)

Cypress.Commands.add('clickVisibleArticleInCustomizePizza', (position) => 
   cy.get('article').not('#no-display').eq(position).within(() => cy.findByText('Add').click())
)

Cypress.Commands.add('checkIfShoppingCartIsEmpty' , () => {
   cy.getAllLocalStorage().then((result) => expect(result).to.be.deep.equal({}))
   
   const shoppingCart = cy.findByText('Cart')
   shoppingCart.within(() => cy.get('span').should('have.text', 0))
   
   cy.wait(600)
   
   shoppingCart.click()
   cy.findByRole('dialog').within(() => cy.get('article').should('have.length', 0))
   shoppingCart.click()
})

Cypress.Commands.add('checkIfPizzaIsAddToShoppingCart' , (pizzaList) => {
   cy.getAllLocalStorage().then((result) => { 
      const localStoragePizza = JSON.parse(result['http://localhost:4321'].allPizza ?? '[]')
      localStoragePizza.forEach((object) => delete object.id)

      const resultModified = {
         'http://localhost:4321' : {
            allPizza: JSON.stringify(localStoragePizza)
         }
      }      
      
      expect(resultModified).to.deep.equal({
         'http://localhost:4321': {
            allPizza: JSON.stringify(pizzaList),
         },
      })
   })

   cy.findByText('Cart').within(() => cy.get('span').should('have.text', 1))
})