import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AddPizza } from '../../components/order/AddPizza'

describe('AddPizza component tests ', () => { 
   it('Should render correctly', () => {
      render(<AddPizza />)

      expect(screen.getByText('Add')).toBeDefined()
   })
})