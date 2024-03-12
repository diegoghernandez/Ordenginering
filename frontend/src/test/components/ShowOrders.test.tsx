import { fireEvent, render, screen, within } from '@testing-library/react'
import { ShowOrders } from '../../components/ShowOrders'
import { Quantity } from '../../constants/quantity'
import { Size } from '../../constants/size'
import { useShoppingCart } from '../../hooks/useShoppingCart'

describe('ShowOrders component tests', () => { 
   it('Should show a message if there is no pizza' , () => {
      render(<ShowOrders />)
      expect(screen.getByText('No orders')).toBeInTheDocument()
   })

   it('Should render correctly', async () => {
      setPizza()
      render(<ShowOrders />)
      const pizzaContainers = screen.getAllByRole('article')

      expect(pizzaContainers).toHaveLength(2)
      expect(within(pizzaContainers[0]).getByRole('heading', { name: 'Pepperoni' })).toBeInTheDocument()
      expect(within(pizzaContainers[0]).getByText(2)).toBeInTheDocument()
      expect(within(pizzaContainers[1]).getByText('Custom')).toBeInTheDocument()
      expect(within(pizzaContainers[1]).getByText('Pepperoni, Blue Cheese')).toBeInTheDocument()
   })

   it('Should delete correctly one card', async () => {
      setPizza()
      render(<ShowOrders />)

      expect(screen.getAllByRole('article')).toHaveLength(2)
      
      fireEvent.click(screen.getAllByRole('button', { name: 'X' })[0])

      expect(screen.getAllByRole('article')).toHaveLength(1)
   })
})

const setPizza = () => {
   useShoppingCart.setState({
      pizza: [{
         id: '9398812b-8ba2-4a20-8613-339c13df14ca',
         pizzaName: 'Pepperoni',
         size: Size.MEDIUM,
         quantity: 2,
         ingredientNameDtoList: [{
            id: 1,
            name: 'Pepperoni',
            quantity: Quantity.EXTRA
         }]
      }, {
         id: 'dbac95de-1552-4320-826a-2ba6c08c81ae',
         pizzaName: 'Custom',
         size: Size.MEDIUM,
         ingredientNameDtoList: [{
            id: 1,
            name: 'Pepperoni',
            quantity: Quantity.EXTRA
         }, {
            id: 6,
            name: 'Blue Cheese',
            quantity: Quantity.EXTRA
         }]
      }]
   })
}