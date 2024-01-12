import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { CustomSelect } from '../../components/CustomSelect'

const values = ['First', 'Second', 'Third']

describe('CustomSelect component tests', () => { 
   it('Should render correctly', () => {
      render(<CustomSelect values={values} />)
      const selectComponent = screen.getByRole('combobox')

      expect(selectComponent).toBeDefined()
      expect(selectComponent).toHaveValue('Second')
      expect(screen.getAllByRole('option')).toHaveLength(3)
   })

   it('Should render correctly when the select default value is different', () => {
      render(<CustomSelect values={values} selectedValue={0} />)
      const selectComponent = screen.getByRole('combobox')

      expect(selectComponent).toBeDefined()
      expect(selectComponent).toHaveValue('First')
   })

   it('Should choose an option', async () => {
      render(<CustomSelect values={values} selectedValue={0} />)
      const user = userEvent.setup()
      const selectComponent = screen.getByRole('combobox')
      

      expect(selectComponent).toBeDefined()
      expect(selectComponent).toHaveValue('First')
      
      await user.selectOptions(selectComponent, 'Third')
      
      expect(selectComponent).not.toHaveValue('First')
      expect(selectComponent).toHaveValue('Third')

   })
})