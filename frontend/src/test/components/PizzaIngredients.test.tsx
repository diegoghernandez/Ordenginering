import { PizzaIngredients } from '@/components/customize/PizzaIngredients'
import { en } from '@/assets/i18n/pages/Customize.json'
import ingredientList from '@/mocks/fixtures/ingredients.json'
import {
	cleanup,
	fireEvent,
	render,
	screen,
	within,
} from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

const { quantity, ingredientTypeList } = en

describe('PizzaIngredients component tests', () => {
	afterEach(() => cleanup())

	it('Should render correctly', () => {
		render(
			<PizzaIngredients
				t={{ quantity, ingredientTypeList }}
				locale='en'
				ingredientList={ingredientList}
			/>
		)
		;['All', 'Vegetable', 'Meat', 'Cheese', 'Sauce'].forEach((type) =>
			expect(screen.getByRole('button', { name: type })).toBeInTheDocument()
		)
		expect(screen.getByRole('button', { name: 'All' })).toHaveClass(/active/)

		expect(screen.getAllByRole('article')).length(34)
		screen.getAllByRole('article').forEach((element) => {
			expect(within(element).getByRole('img')).toBeInTheDocument()
			expect(within(element).getByRole('figure')).toBeInTheDocument()
			expect(within(element).getByRole('heading')).toBeInTheDocument()
			expect(within(element).getByText('Quantity')).toBeInTheDocument()
			expect(
				within(element).getByLabelText('Decrease quantity')
			).toBeInTheDocument()
			expect(
				within(element).getByLabelText('Decrease quantity')
			).toBeDisabled()
			expect(within(element).getAllByText('0')[0]).toBeInTheDocument()
			expect(
				within(element).getByLabelText('Increase quantity')
			).toBeInTheDocument()
		})
	})

	it('Should disable the increase quantity button once you get the maximum quantity', () => {
		render(
			<PizzaIngredients
				t={{ quantity, ingredientTypeList }}
				locale='en'
				ingredientList={ingredientList}
			/>
		)

		const firstArticle = screen.getAllByRole('article')[0]
		expect(within(firstArticle).getAllByText('0')[0]).toBeInTheDocument()
		expect(
			within(firstArticle).getByLabelText('Increase quantity')
		).not.toBeDisabled()
		expect(
			within(firstArticle).getByLabelText('Increase quantity')
		).toBeInTheDocument()

		fireEvent.click(within(firstArticle).getByLabelText('Increase quantity'))
		fireEvent.click(within(firstArticle).getByLabelText('Increase quantity'))

		expect(within(firstArticle).getAllByText('2')[0]).toBeInTheDocument()
		expect(
			within(firstArticle).getByLabelText('Decrease quantity')
		).not.toBeDisabled()
		expect(
			within(firstArticle).getByLabelText('Increase quantity')
		).toBeDisabled()
	})

	it('Should change the quantity of cards according to the selected type', () => {
		render(
			<PizzaIngredients
				t={{ quantity, ingredientTypeList }}
				locale='en'
				ingredientList={ingredientList}
			/>
		)

		expect(screen.getByRole('button', { name: 'All' })).toHaveClass(/active/)
		expect(screen.getAllByRole('article')).length(34)

		fireEvent.click(screen.getByRole('button', { name: 'Vegetable' }))
		expect(screen.getByRole('button', { name: 'Vegetable' })).toHaveClass(
			/active/
		)
		expect(screen.getAllByRole('article')).length(14)

		fireEvent.click(screen.getByRole('button', { name: 'Meat' }))
		expect(screen.getByRole('button', { name: 'Meat' })).toHaveClass(/active/)
		expect(screen.getAllByRole('article')).length(10)

		fireEvent.click(screen.getByRole('button', { name: 'Cheese' }))
		expect(screen.getByRole('button', { name: 'Cheese' })).toHaveClass(
			/active/
		)
		expect(screen.getAllByRole('article')).length(7)

		fireEvent.click(screen.getByRole('button', { name: 'Sauce' }))
		expect(screen.getByRole('button', { name: 'Sauce' })).toHaveClass(
			/active/
		)
		expect(screen.getAllByRole('article')).length(3)
	})
})
