import type { Ingredient, LocalesObject, LocalesString } from '@/types'
import Styles from './IngredientsContainer.module.css'

interface Props {
	ingredients: Ingredient[]
	local: string
}

export function IngredientsContainer({ ingredients, local }: Props) {
	return (
		<ul className={Styles['ingredients-container']}>
			{ingredients.map((element) => (
				<li key={crypto.randomUUID()}>
					{getLocalizedIngredients(element?.name, local)}{' '}
					<span>X{element.quantity}</span>
				</li>
			))}
		</ul>
	)
}

function getLocalizedIngredients(
	ingredientName: LocalesObject | undefined,
	locale: string
) {
	if (typeof ingredientName === 'string') {
		return JSON.parse(ingredientName)[locale]
	}

	return ingredientName?.[locale as LocalesString]
}
