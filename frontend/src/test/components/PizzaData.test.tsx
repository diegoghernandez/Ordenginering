import { PizzaData } from '@/components/customize/PizzaData'
import { useDesireIngredients } from '@/hooks/useDesireIngredients'
import { en } from '@/i18n/pages/Customize.json'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'

const { quantity, pizzaData } = en

describe('PizzaData component tests', () => {
   afterEach(() => cleanup())

   it('Should render correctly', () => {
      setIngredients()
      render(<PizzaData 
         localForModalLinks='en' 
         t={{
            quantity,
            pizzaDataTranslation: pizzaData
         }} 
         pizza={{
            pizzaName: 'Pizza',
            pizzaImageName: 'url',
            pizzaImageAuthor: 'author'
         }}
      />)

      expect(screen.getByRole('heading')).toBeInTheDocument()
      expect(screen.getByText('Total: $140')).toBeInTheDocument()
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
      expect(screen.getByRole('button', { name: 'Add order' })).toBeInTheDocument()
   })

   it('Should render correctly with the desire ingredients', () => {
      useDesireIngredients.setState({ ingredients: [] })
      render(<PizzaData 
         localForModalLinks='en' 
         t={{
            quantity,
            pizzaDataTranslation: pizzaData
         }} 
         pizza={{
            pizzaName: 'Pizza',
            pizzaImageName: 'url',
            pizzaImageAuthor: 'author'
         }}
         prebuildIngredients={[
            {
               idIngredient: 32,
               ingredientName: {
                  en: 'BBQ Sauce',
                  es: 'Salsa BBQ'
               },
               ingredientType: 'SAUCE',
               authorImage: null,
               fileNameImage: 'bbq-sauce'
            },
            {
               idIngredient: 15,
               ingredientName: {
                  en: 'Grilled Chicken',
                  es: 'Pollo a la parilla'
               },
               ingredientType: 'MEAT',
               authorImage: {
                  en: "Denis Agati's photo on Unsplash",
                  es: 'Foto de Denis Agati'
               },
               fileNameImage: 'grilled-chicken'
            },
            {
               idIngredient: 9,
               ingredientName: {
                  en: 'Red Onions',
                  es: 'Cebollas rojas'
               },
               ingredientType: 'VEGETABLE',
               authorImage: {
                  en: "Eric Prouzet's photo on Unsplash",
                  es: 'Foto de Eric Prouzet'
               },
               fileNameImage: 'red-onions'
            },
            {
               idIngredient: 25,
               ingredientName: {
                  en: 'Mozzarella',
                  es: 'Mozzarella'
               },
               ingredientType: 'CHEESE',
               authorImage: null,
               fileNameImage: 'mozzarella'
            },
         ]}
      />)

      expect(screen.getByText('Total: $180')).toBeInTheDocument()
      expect(screen.getByText('BBQ Sauce')).toBeInTheDocument()
      expect(screen.getByText('Grilled Chicken')).toBeInTheDocument()
      expect(screen.getByText('Red Onions')).toBeInTheDocument()
      expect(screen.getByText('Mozzarella')).toBeInTheDocument()
      expect(screen.getAllByText('X1')).length(4)
      expect(screen.getByLabelText('Size')).toHaveValue('MEDIUM')
      expect(screen.getByText('1')).toBeInTheDocument()
   })

   it('Should change the total value if you play with the the size and quantity components', async () => {
      setIngredients()
      render(<PizzaData 
         localForModalLinks='en' 
         t={{
            quantity,
            pizzaDataTranslation: pizzaData
         }} 
         pizza={{
            pizzaName: 'Pizza',
            pizzaImageName: 'url',
            pizzaImageAuthor: 'author'
         }}
      />)

      const user = userEvent.setup()

      expect(screen.getByText('Total: $140')).toBeInTheDocument()
      
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

   it('Should render correctly the added message', async () => {
      setIngredients()
      render(<PizzaData 
         localForModalLinks='en' 
         t={{
            quantity,
            pizzaDataTranslation: pizzaData
         }} 
         pizza={{
            pizzaName: 'Pizza',
            pizzaImageName: 'url',
            pizzaImageAuthor: 'author'
         }}
      />)

      fireEvent.click(screen.getByRole('button', { name: 'Add order' }))

      expect(screen.getByRole('button', { name: 'Add order' })).toBeDisabled()

      await waitFor(() => {
         expect(screen.getByRole('heading', { name: 'Added to shopping cart correctly' })).toBeInTheDocument()
         expect(screen.getByRole('link', { name: 'Keep ordering' })).toBeInTheDocument()
         expect(screen.getByRole('link', { name: 'Checkout' })).toBeInTheDocument()
      }, { timeout: 2000 })
   })
})

function setIngredients() {
   useDesireIngredients.setState({
      ingredients: [{
         id: 1,
         name: {
            en: 'Pepperoni',
            es: 'Pepperoni'
         },
         quantity: 2
      }]
   })
}