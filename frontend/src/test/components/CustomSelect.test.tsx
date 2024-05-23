import { describe, it, expect, afterEach } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CustomSelect } from '../../components/common/CustomSelect'

const values = ['First', 'Second', 'Third']

describe('CustomSelect component tests', () => {
   afterEach(() => cleanup())

   it('Should render correctly', () => {
      render(<CustomSelect 
         label='Test'
         values={values} 
         options={values}
      />)
      const selectComponent = screen.getByRole('combobox')

      expect(selectComponent).toBeDefined()
      expect(selectComponent).toHaveValue('First')
      expect(selectComponent).toHaveDisplayValue(['First'])
      expect(screen.getAllByRole('option')).toHaveLength(3)
   })

   it('Should render correctly when the select default value is different', () => {
      render(<CustomSelect 
         label='Test'
         values={values} 
         options={values}
         defaultValue={{
            value: 'td',
            text: 'testDefault'
         }}
      />)
      const selectComponent = screen.getByRole('combobox')

      expect(selectComponent).toBeDefined()
      expect(selectComponent).toHaveValue('td')
      expect(selectComponent).toHaveDisplayValue(['testDefault'])
   })

   it('Should choose an option', async () => {
      render(<CustomSelect 
         label='Test'
         values={values} 
         options={values}
         defaultValue={{
            value: 'td',
            text: 'testDefault'
         }}
      />)
      const user = userEvent.setup()
      const selectComponent = screen.getByRole('combobox')
      

      expect(selectComponent).toBeDefined()
      expect(selectComponent).toHaveValue('td')
      
      await user.selectOptions(selectComponent, 'Third')
      
      expect(selectComponent).not.toHaveValue('First')
      expect(selectComponent).toHaveValue('Third')

   })
})