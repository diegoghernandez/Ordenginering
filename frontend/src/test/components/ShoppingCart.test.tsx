import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { ShoppingCart } from '@/components/order/ShoppingCart'
import { Size } from '@/constants/size'
import { useShoppingCart } from '@/hooks/useShoppingCart'

describe('ShoppingCart component tests', () => {
   afterEach(() => cleanup())

   it('Should render correctly', () => {
      render(<ShoppingCart />)
   
      expect(screen.getByRole('button')).toBeDefined()
      expect(screen.getByText('0')).toBeDefined()
   })

   it('Should render number correctly', () => {
      useShoppingCart.setState({
         pizza: [{
            id: '9398812b-8ba2-4a20-8613-339c13df14ca',
            image: '/client/images/pizza/pepperoni.jpg',
            pizzaName: 'Pepperoni',
            size: Size.MEDIUM,
            quantity: 2,
            ingredientNameDtoList: [{
               id: 1,
               name: 'Pepperoni',
               quantity: 2
            }]
         }]
      })
      
      render(<ShoppingCart />)

      expect(screen.getByText('2')).toBeDefined()
   })
})