import { fireEvent, render, screen } from '@testing-library/react'
import { Size } from '../../constants/size'
import { useShoppingCart } from '../../hooks/useShoppingCart'
import { Quantity } from '../../constants/quantity'
import { ShoppingCart } from '../../components/ShoppingCart'

describe('Shopping cart tests', () => {
   it('Should render correctly', () => {
      render(<ShoppingCart />)
   
      expect(screen.getByRole('button')).toBeDefined()
      expect(screen.getByText('0')).toBeDefined()
   })

   it('Should render number correctly', () => {
      useShoppingCart.setState({
         pizza: [{
            id: 1,
            name: 'Pepperoni',
            size: Size.MEDIUM,
            cheese: Quantity.NORMAL,
            ingredients: ['Pepperoni']
         }]
      })
      
      render(<ShoppingCart />)

      expect(screen.getByText('1')).toBeDefined()
      fireEvent.click(screen.getByRole('button'))

      expect(screen.getByText('Pepperoni')).toBeDefined()
      expect(screen.getByText('Size: MEDIUM')).toBeDefined()
      expect(screen.getByText('Cheese: NORMAL')).toBeDefined()
      expect(screen.getByText('Ingredients: Pepperoni')).toBeDefined()
   })
})