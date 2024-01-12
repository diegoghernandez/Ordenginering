import { fireEvent, render, screen } from '@testing-library/react';
import { IncreaseQuantity } from '../../components/IncreaseQuantity';

describe('IncreaseQuantity component tests', () => { 
   it('Should render correctly', () => {
      render(<IncreaseQuantity />)

      expect(screen.getByRole('button', { name: '-' })).toBeDefined()
      expect(screen.getByText(1)).toBeDefined()
      expect(screen.getByRole('button', { name: '+' })).toBeDefined()
   })

   it('Should subtract the number correctly', () => {
      render(<IncreaseQuantity defaultValue={2} />)

      expect(screen.getByText(2)).toBeDefined()
      fireEvent.click(screen.getByRole('button', { name: '-' }))
      expect(screen.getByText(1)).toBeDefined()
   })

   it('Should increase the number correctly', () => {
      render(<IncreaseQuantity defaultValue={2} />)

      expect(screen.getByText(2)).toBeDefined()
      fireEvent.click(screen.getByRole('button', { name: '+' }))
      expect(screen.getByText(3)).toBeDefined()
   })
})