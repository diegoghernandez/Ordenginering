import { IncreasePopover } from '@/components/menu/IncreasePopover'
import { PRIMARY__BUTTON } from '@/lib/constants/styles'
import { useShoppingCart } from '@/lib/hooks/useShoppingCart'
import type { Pizza } from '@/types'
import { useState } from 'react'
import Styles from './AddPizza.module.css'

interface Props {
	pizza?: Pizza
	label: string
}

export function AddPizza({ pizza, label }: Props) {
	const [counter, setCounter] = useState(0)
	const [queue, setQueue] = useState<number[]>([])
	const addPizza = useShoppingCart((state) => state.addPizza)

	const handleClick = () => {
		if (pizza) {
			setQueue((prev) => [...prev, counter])

			setTimeout(() => {
				setQueue((prev) => {
					prev.shift()
					return [...prev]
				})
			}, 1200)

			setCounter((prev) => prev + 1)
			addPizza(pizza)
		}
	}

	return (
		<div className={Styles['add-pizza-container']}>
			<button className={PRIMARY__BUTTON} onClick={handleClick}>
				{label}
			</button>
			<IncreasePopover queue={queue} />
		</div>
	)
}
