import { PizzaData } from '@/components/customize/PizzaData'
import { useDesireIngredients } from '@/hooks/useDesireIngredients'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'

describe('PizzaData component tests', () => {
   afterEach(() => cleanup())

   it('Should render correctly', () => {
      setIngredients()
      render(<PizzaData />)

      expect(screen.getByRole('heading')).toBeInTheDocument()
      expect(screen.getByText('Total: $90')).toBeInTheDocument()
      expect(screen.getByText('Pepperoni')).toBeInTheDocument()
      expect(screen.getByText('X2')).toBeInTheDocument()
      expect(screen.getByLabelText('Size')).toBeInTheDocument()
      expect(screen.getByLabelText('Size')).toHaveValue('MEDIUM')
      expect(screen.getByLabelText('Size')).toHaveDisplayValue(['Medium'])
      expect(screen.getByText('Quantity')).toBeInTheDocument()
      expect(screen.getByLabelText('Decrease quantity')).toBeInTheDocument()
      expect(screen.getByLabelText('Decrease quantity')).toBeDisabled()
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByLabelText('Increase quantity')).toBeInTheDocument()
   })

   it('Should change the total value if you play with the the size and quantity components', async () => {
      setIngredients()
      render(<PizzaData />)
      const user = userEvent.setup()

      expect(screen.getByText('Total: $90')).toBeInTheDocument()
      
      await user.selectOptions(screen.getByLabelText('Size'), 'Large')
      
      expect(screen.getByText('Total: $190')).toBeInTheDocument()
      
      await user.click(screen.getByLabelText('Increase quantity'))
      await user.click(screen.getByLabelText('Increase quantity'))
      
      expect(screen.getByText('3')).toBeInTheDocument()
      expect(screen.getByText('Total: $570')).toBeInTheDocument()
      
      await user.click(screen.getByLabelText('Decrease quantity'))
      await user.selectOptions(screen.getByLabelText('Size'), 'Medium')
      
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('Total: $280')).toBeInTheDocument()
   })
})

function setIngredients() {
   useDesireIngredients.setState({
      ingredients: [{
         name: 'Pepperoni',
         quantity: 2
      }]
   })
}