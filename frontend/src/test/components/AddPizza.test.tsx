import { render, screen } from "@testing-library/react"
import { AddPizza } from "../../components/AddPizza"

describe('AddPizza component tests ', () => { 
   it('Should render correctly', () => {
      render(<AddPizza />)

      expect(screen.getByText('Agregar')).toBeDefined()
   })
})