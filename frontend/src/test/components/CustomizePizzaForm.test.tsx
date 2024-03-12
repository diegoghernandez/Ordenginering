import { fireEvent, render, screen, within } from '@testing-library/react'
import { CustomizePizzaForm } from '@/components/CustomizePizzaForm'
import userEvent from '@testing-library/user-event'
import { getAllIngredients } from '@/services/ingredientsService'

describe('CustomizePizzaForm component tests', () => { 
   it('Should render correctly', async () => {
      const container = await customRender()

      expect(screen.getByRole('heading', { name: 'Ingredients' })).toBeInTheDocument()
      expect(screen.getByRole('img', { name: 'Empty pizza' })).toBeInTheDocument()
      expect(screen.getByText('$100')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Vegetable' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Meat' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Cheese' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Sauce' })).toBeInTheDocument()
      expect(screen.getAllByRole('article', { hidden: true })).toHaveLength(35)
      expect(container.querySelectorAll('#no-display')).toHaveLength(21)
      expect(container.querySelectorAll('article:not(#no-display)')).toHaveLength(14)
      expect(container.querySelectorAll('input:checked')).toHaveLength(0)
   })

   it('Should render correctly a prebuild pizza', async () => {
      const container = await customRender('hawaiana')
      
      expect(screen.getByRole('img', { name: 'Hawaiana pizza' })).toBeInTheDocument()
      expect(screen.getByText('$160')).toBeInTheDocument()
      expect(container.querySelectorAll('input:checked')).toHaveLength(3)
   })

   it('Should change the price correctly according to the selected ingredients', async () => {
      const container = await customRender()
      const user = userEvent.setup()

      expect(screen.getByText('$100')).toBeInTheDocument()
      expect(container.querySelectorAll('input:checked')).toHaveLength(0)
      
      await user.click(within(container.querySelectorAll('article')?.[0]).getByLabelText('Add'))
      await user.click(within(container.querySelectorAll('article')?.[1]).getByLabelText('Add'))
      
      expect(screen.getByText('$140')).toBeInTheDocument()
      expect(container.querySelectorAll('input:checked')).toHaveLength(2)

      await user.click(within(container.querySelectorAll('article')?.[1]).getByLabelText('Add'))

      expect(screen.getByText('$120')).toBeInTheDocument()
      expect(container.querySelectorAll('input:checked')).toHaveLength(1)
      
      await user.click(screen.getByText('+'))
      
      expect(screen.getByText('$240')).toBeInTheDocument()

      await user.selectOptions(screen.getAllByRole('combobox')[0], 'LARGE')      
      expect(screen.getByText('$340')).toBeInTheDocument()
      
   })

   it('Should show the ingredient cards according to the desire type', async () => {
      const container = await customRender()

      fireEvent.click(screen.getByRole('button', { name: 'Meat' }))

      expect(container.querySelectorAll('#no-display')).toHaveLength(25)
      expect(container.querySelectorAll('article:not(#no-display)')).toHaveLength(10)
   })
   it('Should show the ingredient cards according to the desire type', async () => {
      const container = await customRender()

      expect(container.querySelectorAll('#no-display')).toHaveLength(21)
      expect(container.querySelectorAll('article:not(#no-display)')).toHaveLength(14)

      fireEvent.click(screen.getByRole('button', { name: 'Meat' }))

      expect(container.querySelectorAll('#no-display')).toHaveLength(25)
      expect(container.querySelectorAll('article:not(#no-display)')).toHaveLength(10)

      fireEvent.click(screen.getByRole('button', { name: 'Sauce' }))

      expect(container.querySelectorAll('#no-display')).toHaveLength(31)
      expect(container.querySelectorAll('article:not(#no-display)')).toHaveLength(4)
   })
})

async function customRender(selectedPizza: string = 'empty') {
   const data = await getAllIngredients()
   const pizzaName = selectedPizza.charAt(0).toUpperCase() + selectedPizza.slice(1).replace('-', ' ')

   const { container } = render(<CustomizePizzaForm ingredients={data} selectedPizza={selectedPizza}>
      <img 
         className='pizza-custom' 
         src={`/images/pizza/${selectedPizza}.jpg`}
         alt={`${pizzaName} pizza`}
         width='320'
         height='260'
         decoding='sync'
      />
   </CustomizePizzaForm>)     

   return container
}
