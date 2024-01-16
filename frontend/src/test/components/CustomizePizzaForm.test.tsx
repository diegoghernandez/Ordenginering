import { fireEvent, render, screen, within } from "@testing-library/react"
import { CustomizePizzaForm } from "../../components/CustomizePizzaForm"
import userEvent from "@testing-library/user-event"

describe('CustomizePizzaForm component tests', () => { 
   it('Should render correctly', () => {
      const { container } = render(
         <CustomizePizzaForm>
            <img 
               className='pizza-custom' 
               src={`/images/pizza/pepperoni.jpg`}
               alt='Pepperoni pizza'
               width='320'
               height='260'
               decoding='sync'
            />
         </CustomizePizzaForm>
      )

      expect(screen.getByRole('heading', { name: 'Ingredients' })).toBeInTheDocument()
      expect(screen.getByRole('img', { name: 'Pepperoni pizza' })).toBeInTheDocument()
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

   it('Should render correctly a prebuild pizza', () => {
      const { container } = render(
         <CustomizePizzaForm selectedPizza='hawaiana'>
            <img 
               className='pizza-custom' 
               src={`/images/pizza/hawaiana.jpg`}
               alt='Hawaiana pizza'
               width='320'
               height='260'
               decoding='sync'
            />
         </CustomizePizzaForm>
      )

      expect(screen.getByRole('img', { name: 'Hawaiana pizza' })).toBeInTheDocument()
      expect(screen.getByText('$160')).toBeInTheDocument()
      expect(container.querySelectorAll('input:checked')).toHaveLength(3)
   })

   it('Should change the price correctly according to the selected ingredients', async () => {
      const { container } = render(
         <CustomizePizzaForm>
            <img 
               className='pizza-custom' 
               src={`/images/pizza/hawaiana.jpg`}
               alt='Hawaiana pizza'
               width='320'
               height='260'
               decoding='sync'
            />
         </CustomizePizzaForm>
      )
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
      
      await user.click(screen.getByText("+"))
      
      expect(screen.getByText('$240')).toBeInTheDocument()

      await user.selectOptions(screen.getAllByRole('combobox')[0], 'LARGE')      
      expect(screen.getByText('$340')).toBeInTheDocument()
      
   })

   it('Should show the ingredient cards according to the desire type', () => {
      const { container } = render(
         <CustomizePizzaForm>
            <img 
               className='pizza-custom' 
               src={`/images/pizza/hawaiana.jpg`}
               alt='Hawaiana pizza'
               width='320'
               height='260'
               decoding='sync'
            />
         </CustomizePizzaForm>
      )

      fireEvent.click(screen.getByRole('button', { name: 'Meat' }))

      expect(container.querySelectorAll('#no-display')).toHaveLength(25)
      expect(container.querySelectorAll('article:not(#no-display)')).toHaveLength(10)
   })
   it('Should show the ingredient cards according to the desire type', () => {
      const { container } = render(
         <CustomizePizzaForm>
            <img 
               className='pizza-custom' 
               src={`/images/pizza/hawaiana.jpg`}
               alt='Hawaiana pizza'
               width='320'
               height='260'
               decoding='sync'
            />
         </CustomizePizzaForm>
      )

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