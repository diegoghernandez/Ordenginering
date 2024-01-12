import { fireEvent, render, screen } from '@testing-library/react'
import { Size } from '../../constants/size'
import { useShoppingCart } from '../../hooks/useShoppingCart'
import { Quantity } from '../../constants/quantity'
import { ShoppingCart } from '../../components/ShoppingCart'

describe('ShoppingCart component tests', () => {
   it('Should render correctly', () => {
      render(<ShoppingCart />)
   
      expect(screen.getByRole('button')).toBeDefined()
      expect(screen.getByText('0')).toBeDefined()
   })

   it('Should render number correctly', () => {
      useShoppingCart.setState({
         pizza: [{
            id: '9398812b-8ba2-4a20-8613-339c13df14ca',
            name: 'Pepperoni',
            size: Size.MEDIUM,
            ingredients: [{
               id: 1,
               name: 'Pepperoni',
               quantity: Quantity.EXTRA
            }]
         }]
      })
      
      render(<ShoppingCart />)

      expect(screen.getByText('1')).toBeDefined()
      fireEvent.click(screen.getByRole('button'))
      expect(screen.getByText('Pepperoni')).toBeDefined()
      expect(screen.getByText('Size: MEDIUM')).toBeDefined()
      expect(screen.getByText('Ingredients: Pepperoni')).toBeDefined()
   })
})