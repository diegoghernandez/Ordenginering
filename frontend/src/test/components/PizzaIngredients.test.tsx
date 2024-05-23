import { PizzaIngredients } from '@/components/customize/PizzaIngredients'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('PizzaIngredients component tests', () => {
   it('Should render correctly', () => {
      render(<PizzaIngredients />);

      ['All', 'Vegetables', 'Meat', 'Cheese', 'Sauces'].forEach((type) =>
         expect(screen.getByRole('button', { name: type })).toBeInTheDocument()
      )
      expect(screen.getByRole('button', { name: 'All' })).toHaveClass(/active/)

      expect(screen.getAllByRole('article')).length(35)
      screen.getAllByRole('article').forEach((element) => {
         expect(within(element).getByRole('img')).toBeInTheDocument()
         expect(within(element).getByRole('figure')).toBeInTheDocument()
         expect(within(element).getByRole('heading')).toBeInTheDocument()
         expect(within(element).getByText('Quantity')).toBeInTheDocument()
         expect(within(element).getByLabelText('Decrease quantity')).toBeInTheDocument()
         expect(within(element).getByLabelText('Decrease quantity')).toBeDisabled()
         expect(within(element).getByText('0')).toBeInTheDocument()
         expect(within(element).getByLabelText('Increase quantity')).toBeInTheDocument()
      })
   })

   it('Should disable the increase quantity button once you get the maximum quantity', () => {
      const firstArticle  = screen.getAllByRole('article')[0]
      expect(within(firstArticle).getByText('0')).toBeInTheDocument()
      expect(within(firstArticle).getByLabelText('Increase quantity')).not.toBeDisabled()
      expect(within(firstArticle).getByLabelText('Increase quantity')).toBeInTheDocument()

      fireEvent.click(within(firstArticle).getByLabelText('Increase quantity'))
      fireEvent.click(within(firstArticle).getByLabelText('Increase quantity'))

      expect(within(firstArticle).getByText('2')).toBeInTheDocument()
      expect(within(firstArticle).getByLabelText('Decrease quantity')).not.toBeDisabled()
      expect(within(firstArticle).getByLabelText('Increase quantity')).toBeDisabled()
   })

   it('Should change the quantity of cards according to the selected type', () => {
      expect(screen.getByRole('button', { name: 'All' })).toHaveClass(/active/)
      expect(screen.getAllByRole('article')).length(35)

      fireEvent.click(screen.getByRole('button', { name: 'Vegetables' }))
      expect(screen.getByRole('button', { name: 'Vegetables' })).toHaveClass(/active/)
      expect(screen.getAllByRole('article')).length(14)

      fireEvent.click(screen.getByRole('button', { name: 'Meat' }))
      expect(screen.getByRole('button', { name: 'Meat' })).toHaveClass(/active/)
      expect(screen.getAllByRole('article')).length(10)

      fireEvent.click(screen.getByRole('button', { name: 'Cheese' }))
      expect(screen.getByRole('button', { name: 'Cheese' })).toHaveClass(/active/)
      expect(screen.getAllByRole('article')).length(7)

      fireEvent.click(screen.getByRole('button', { name: 'Sauces' }))
      expect(screen.getByRole('button', { name: 'Sauces' })).toHaveClass(/active/)
      expect(screen.getAllByRole('article')).length(4)
   })
})