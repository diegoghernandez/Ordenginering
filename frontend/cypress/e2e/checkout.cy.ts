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

      //cy.wait(200)
      cy.findByRole('heading', { name: 'Your order' }).should('exist')
      cy.findByText('No orders').should('exist')
   })

   it('Should save two orders in the menu page and show them in the checkout page', () => {
      cy.visit('/menu')
      cy.checkIfShoppingCartIsEmpty()
      cy.get('article').eq(2).within(() => cy.get('button').click())
      cy.get('article').eq(5).within(() => cy.get('button').click())
      
      cy.visit('/checkout')

      cy.findByText('Cart').within(() => cy.get('span').should('have.text', '2'))
      cy.findAllByRole('article').should('have.length', '2')
   })
})