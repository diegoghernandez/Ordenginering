import { ShowOrder } from '@/components/order/ShowOrders'
import { Size } from '@/constants/size'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import {
	cleanup,
	fireEvent,
	render,
	screen,
	within,
} from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

describe('ShowOrders component tests', () => {
	afterEach(() => cleanup())

	it('Should show a message if there is no pizza', () => {
		render(<ShowOrder currentLocal='en' />)
		expect(screen.getByText('No orders')).toBeInTheDocument()
	})

	it('Should render correctly', async () => {
		setPizza()
		render(<ShowOrder currentLocal='en' />)
		const pizzaContainers = screen.getAllByRole('article')

		expect(pizzaContainers).toHaveLength(2)
		expect(
			screen.getByRole('heading', { name: 'Total: $1180' })
		).toBeInTheDocument()
		expect(
			screen.getByRole('link', { name: 'Checkout 7 product(s)' })
		).toBeInTheDocument()
		expect(
			screen.getByRole('button', { name: 'Remove all items' })
		).toBeInTheDocument()
		expect(
			within(pizzaContainers[0]).getByRole('heading', { name: 'Pepperoni' })
		).toBeInTheDocument()
		expect(
			within(pizzaContainers[0]).getByRole('img', {
				name: 'Pepperoni pizza',
			})
		).toBeInTheDocument()
		expect(within(pizzaContainers[0]).getAllByText(2)[0]).toBeInTheDocument()
		expect(within(pizzaContainers[0]).getByText('$280')).toBeInTheDocument()
		expect(
			within(pizzaContainers[1]).getByRole('heading', {
				name: 'BBQ Chicken',
			})
		).toBeInTheDocument()
		expect(
			within(pizzaContainers[1]).getByRole('img', {
				name: 'BBQ Chicken pizza',
			})
		).toBeInTheDocument()
		expect(within(pizzaContainers[1]).getAllByText(5)[0]).toBeInTheDocument()
		expect(within(pizzaContainers[1]).getByText('$900')).toBeInTheDocument()
	})

	it('Should update the price and products correctly when you interact with the select quantity component', async () => {
		setPizza()
		render(<ShowOrder currentLocal='en' />)
		const pizzaContainers = screen.getAllByRole('article')

		expect(
			screen.getByRole('heading', { name: 'Total: $1180' })
		).toBeInTheDocument()
		expect(
			screen.getByRole('link', { name: 'Checkout 7 product(s)' })
		).toBeInTheDocument()

		fireEvent.click(
			within(pizzaContainers[1]).getByRole('button', {
				name: 'Subtract pizza',
			})
		)
		fireEvent.click(
			within(pizzaContainers[1]).getByRole('button', {
				name: 'Subtract pizza',
			})
		)

		expect(
			screen.getByRole('heading', { name: 'Total: $820' })
		).toBeInTheDocument()
		expect(
			screen.getByRole('link', { name: 'Checkout 5 product(s)' })
		).toBeInTheDocument()

		fireEvent.click(
			within(pizzaContainers[0]).getByRole('button', { name: 'Add pizza' })
		)
		fireEvent.click(
			within(pizzaContainers[0]).getByRole('button', { name: 'Add pizza' })
		)

		expect(
			screen.getByRole('heading', { name: 'Total: $1100' })
		).toBeInTheDocument()
		expect(
			screen.getByRole('link', { name: 'Checkout 7 product(s)' })
		).toBeInTheDocument()
	})

	it('Should delete one card and update the price and products correctly', async () => {
		setPizza()
		render(<ShowOrder currentLocal='en' />)

		expect(
			screen.getByRole('heading', { name: 'Total: $1180' })
		).toBeInTheDocument()
		expect(
			screen.getByRole('link', { name: 'Checkout 7 product(s)' })
		).toBeInTheDocument()
		expect(screen.getAllByRole('article')).toHaveLength(2)

		fireEvent.click(screen.getAllByText('Delete')[0])

		expect(
			screen.getByRole('heading', { name: 'Total: $900' })
		).toBeInTheDocument()
		expect(
			screen.getByRole('link', { name: 'Checkout 5 product(s)' })
		).toBeInTheDocument()
		expect(screen.getAllByRole('article')).toHaveLength(1)
	})

	it('Should delete all cards and update the price and products correctly', async () => {
		setPizza()
		render(<ShowOrder currentLocal='en' />)

		expect(
			screen.getByRole('heading', { name: 'Total: $1180', hidden: true })
		).toBeInTheDocument()
		expect(
			screen.getByRole('link', { name: 'Checkout 7 product(s)' })
		).toBeInTheDocument()
		expect(screen.getAllByRole('article')).toHaveLength(2)

		fireEvent.click(screen.getByText('Remove all items'))

		expect(
			screen.getByRole('heading', { name: 'Total: $0' })
		).toBeInTheDocument()
		expect(
			screen.getByRole('link', { name: 'Checkout 0 product(s)' })
		).toBeInTheDocument()
		expect(screen.getByText('No orders')).toBeInTheDocument()
	})
})

const setPizza = () => {
	useShoppingCart.setState({
		pizza: [
			{
				idPizza: '9398812b-8ba2-4a20-8613-339c13df14ca',
				pizzaName: {
					en: 'Pepperoni',
					es: 'Pepperoni',
				},
				pizzaImageName: '/images/pizza/pepperoni',
				pizzaImageAuthor: {
					en: 'Author',
					es: 'Autor',
				},
				size: Size.MEDIUM,
				quantity: 2,
				pizzaIngredients: [
					{
						id: 1,
						name: {
							en: 'Pepperoni',
							es: 'Pepperoni',
						},
						quantity: 1,
					},
					{
						id: 2,
						name: {
							en: 'Mozzarella',
							es: 'Mozzarella',
						},
						quantity: 1,
					},
				],
			},
			{
				idPizza: 'dbac95de-1552-4320-826a-2ba6c08c81ae',
				pizzaName: {
					en: 'BBQ Chicken',
					es: 'Pollo BBQ',
				},
				pizzaImageName: '/images/pizza/pepperoni',
				pizzaImageAuthor: {
					en: 'Author',
					es: 'Autor',
				},
				size: Size.MEDIUM,
				quantity: 5,
				pizzaIngredients: [
					{
						id: 5,
						name: {
							en: 'BBQ Sauce',
							es: 'Salsa BBQ',
						},
						quantity: 1,
					},
					{
						id: 7,
						name: {
							en: 'Grilled Chicken',
							es: 'Pollo a la parilla',
						},
						quantity: 1,
					},
					{
						id: 8,
						name: {
							en: 'Red Onions',
							es: 'Cebollas rojas',
						},
						quantity: 1,
					},
					{
						id: 9,
						name: {
							en: 'Mozzarella',
							es: 'Mozzarella',
						},
						quantity: 1,
					},
				],
			},
		],
	})
}
