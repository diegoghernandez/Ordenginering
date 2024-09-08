import { AddPizza } from '@/components/menu/AddPizza'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('AddPizza component tests ', () => {
	it('Should render correctly', () => {
		render(<AddPizza label='Add' />)

		expect(screen.getByText('Add')).toBeDefined()
	})
})
