import { Quantity } from "../../src/constants/quantity"

describe('Menu page e2e tests', () => {
   beforeEach(() => cy.visit('/customize/empty'))

   it('Should render the page correctly', () => {
      cy.get('title').should('have.text', 'Customize your empty pizza')

      cy.navbarElements()

      cy.findByRole('heading', { name: 'Customize your Empty pizza' }).should('exist')

      cy.findAllByRole('img').first().should('have.attr', 'alt', 'Empty pizza')
      cy.findByText('$100').should('exist')
      cy.findByText('Agregar').should('exist')
      cy.findByRole('heading', { level: 2, name: 'Quantity' }).should('exist')
      cy.findByRole('button', { name: '-' }).should('exist')
      cy.findByText('1').should('exist')
      cy.findByRole('button', { name: '+' }).should('exist')
      cy.findByRole('heading', { name: 'Size' }).should('exist')
      cy.findAllByRole('combobox').first().should('have.value', 'MEDIUM')
      
      cy.findByRole('heading', { name: 'Ingredients' }).should('exist')
      cy.findByRole('list').within(() => {
         cy.findByRole('button', { name: 'Vegetable' }).should('exist')
         cy.findByRole('button', { name: 'Meat' }).should('exist')
         cy.findByRole('button', { name: 'Cheese' }).should('exist')
         cy.findByRole('button', { name: 'Sauce' }).should('exist')
      })
      cy.get('article').not('#no-display').should('have.length', '14')
   })

   it('Should choose the characteristic correctly and save it in the shopping cart', () => {
      cy.findByText('$100').should('exist')

      cy.clickVisibleArticleInCustomizePizza(3)
      cy.findByText('$120').should('exist')
      
      cy.findByRole('button', { name: 'Meat' }).click()
      cy.clickVisibleArticleInCustomizePizza(3)
      cy.clickVisibleArticleInCustomizePizza(6)
      cy.clickVisibleArticleInCustomizePizza(8)
      cy.findByText('$180').should('exist')
      
      cy.findByRole('button', { name: 'Cheese' }).click()
      cy.clickVisibleArticleInCustomizePizza(1)
      cy.findByText('$200').should('exist')
      
      cy.findByRole('button', { name: 'Sauce' }).click()
      cy.clickVisibleArticleInCustomizePizza(0)
      cy.clickVisibleArticleInCustomizePizza(2)
      cy.findByText('$240').should('exist')
      
      cy.findAllByRole('combobox').first().select('SMALL')
      cy.findAllByRole('combobox').first().should('have.value', 'SMALL')
      cy.findByText('$190').should('exist')
      
      cy.findByText('+').dblclick()
      cy.findByText('3').should('exist')
      cy.findByText('$570').should('exist')

      cy.checkIfShoppingCartIsEmpty()

      cy.findByText('Agregar').click()

      const pizzaList = [{
         name: 'Custom empty',
         size: 'SMALL',
         ingredients: [{
               name: "Bell Peppers",
               quantity: Quantity.NORMAL
            }, {
               name: "Turkey",
               quantity: Quantity.NORMAL
            }, {
               name: "Chorizo",
               quantity: Quantity.NORMAL
            }, {
               name: "Calamar",
               quantity: Quantity.NORMAL
            }, {
               name: "Cheddar",
               quantity: Quantity.NORMAL
            }, {
               name: "BBQ sauce",
               quantity: Quantity.NORMAL
            }, {
               name: "Buffalo sauce",
               quantity: Quantity.NORMAL
         }],
         quantity: 3,
      }]

      cy.checkIfPizzaIsAddToShoppingCart(pizzaList)

      cy.findByText('Cart').click()

      cy.findByRole('dialog').within(() => {
         cy.findByRole('article').should('have.length', 1)
         cy.findByRole('heading', { name: 'Custom empty' }).should('exist')
         cy.findByText('Size: SMALL').should('exist')
         cy.findByText('Ingredients: Bell Peppers, Turkey, Chorizo, Calamar, Cheddar, BBQ sauce, Buffalo sauce').should('exist')
         cy.findByText('Quantity: 3').should('exist')
         cy.findByRole('link').should('exist')
      })
   })
})