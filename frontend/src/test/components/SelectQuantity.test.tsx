import { SelectQuantity } from '@/components/order/SelectQuantity'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

describe('SelectQuantity component tests', () => {
	afterEach(() => cleanup())

	it('Should render correctly', () => {
		const spyIncrease = vi.fn()
		const spyDecrease = vi.fn()
		render(
			<SelectQuantity
				valueToShow={1}
				increase={{
					label: 'Increase label',
					fun: spyIncrease,
				}}
				decrease={{
					label: 'Subtract label',
					fun: spyDecrease,
				}}
			/>
		)

		expect(
			screen.getByRole('button', { name: 'Subtract label' })
		).toBeDefined()
		expect(screen.getAllByText('1')[0]).toBeVisible()
		expect(
			screen.getByRole('button', { name: 'Increase label' })
		).toBeDefined()
		expect(spyIncrease).toHaveBeenCalledTimes(0)
		expect(spyDecrease).toHaveBeenCalledTimes(0)
	})

	it('Should call the decrease function only one time', () => {
		const spyIncrease = vi.fn()
		const spyDecrease = vi.fn()
		render(
			<SelectQuantity
				valueToShow={1}
				increase={{
					label: 'Increase label',
					fun: spyIncrease,
				}}
				decrease={{
					label: 'Subtract label',
					fun: spyDecrease,
				}}
			/>
		)

		fireEvent.click(screen.getByRole('button', { name: 'Subtract label' }))
		expect(screen.getAllByText('1')[0]).toBeVisible()
		expect(spyIncrease).toHaveBeenCalledTimes(0)
		expect(spyDecrease).toHaveBeenCalledTimes(1)
	})

	it('Should call the increase function two times', async () => {
		const spyIncrease = vi.fn()
		const spyDecrease = vi.fn()
		render(
			<SelectQuantity
				valueToShow={1}
				increase={{
					label: 'Increase label',
					fun: spyIncrease,
				}}
				decrease={{
					label: 'Subtract label',
					fun: spyDecrease,
				}}
			/>
		)

		fireEvent.click(screen.getByRole('button', { name: 'Increase label' }))
		fireEvent.click(screen.getByRole('button', { name: 'Increase label' }))

		expect(screen.getAllByText('1')[0]).toBeVisible()
		expect(spyIncrease).toHaveBeenCalledTimes(2)
		expect(spyDecrease).toHaveBeenCalledTimes(0)
	})

	it('Should disable the subtract button if the min value is reach', () => {
		render(
			<SelectQuantity
				valueToShow={1}
				minValue={1}
				increase={{
					label: 'Increase label',
					fun: vi.fn(),
				}}
				decrease={{
					label: 'Subtract label',
					fun: vi.fn(),
				}}
			/>
		)

		expect(
			screen.getByRole('button', { name: 'Subtract label' })
		).toBeDisabled()
	})
})
