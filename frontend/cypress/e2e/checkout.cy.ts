describe('Checkout page e2e tests', () => {
   it('Should render the page correctly', () => {
      cy.visit('/checkout')
      cy.get('title').should('have.text', 'Checkout order')

      cy.navbarElements()

      const locationInputs = ['Country', 'City', 'Street', 'House number', 'Aparment', 'Floor']

      cy.findByRole('heading', { name: 'My order' }).should('exist')

      cy.findByRole('heading', { name: 'Delivery address' }).should('exist')
      locationInputs.forEach((name) => cy.findByLabelText(name).should('exist'))
      cy.findByRole('button', { name: 'Accept' }).should('exist')

      cy.findByRole('heading', { name: 'Your order' }).should('exist')
      cy.findByText('No orders').should('exist')
   })

   it('Should save two orders in the menu page and show them in the checkout page', () => {
      cy.visit('/menu')
      cy.checkIfShoppingCartIsEmpty()
      cy.addPizzaInMenu(2)
      cy.addPizzaInMenu(5)
      
      cy.visit('/checkout')

      cy.findByText('Cart').within(() => cy.get('span').should('have.text', '2'))
      cy.findAllByRole('article').should('have.length', '2')
   })

   it('Should save four orders in the menu page, and make the order correctly', () => {
      cy.visit('/menu')
      cy.checkIfShoppingCartIsEmpty()
      cy.addPizzaInMenu(3)
      cy.addPizzaInMenu(2)
      cy.addPizzaInMenu(9)
      cy.addPizzaInMenu(7)

      cy.visit('/checkout')

      cy.findByText('Cart').within(() => cy.get('span').should('have.text', '4'))
      cy.findAllByRole('article').should('have.length', '4')

      cy.findByRole('button', { name: 'Accept' }).click()
      cy.findByText('Order made correctly').should('not.be.visible')
      
      cy.findByLabelText('Country').type('México')
      cy.findByLabelText('City').type('Some')
      cy.findByLabelText('Street').type('stree')
      cy.findByLabelText('House number').type('4242')

      cy.intercept('POST', 'http://localhost/data/order/save', {
         statusCode: 201
      })

      cy.findByRole('button', { name: 'Accept' }).click()
      cy.findByText('Order made correctly').should('be.visible')
   })
})