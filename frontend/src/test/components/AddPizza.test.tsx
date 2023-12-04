import { render, screen } from "@testing-library/react"
import { AddPizza } from "../../components/AddPizza"

describe('Add pizza tests ', () => { 
   it('Should render correctly', () => {
      render(<AddPizza />)

      expect(screen.getByText('Agregar')).toBeDefined()
   })
})