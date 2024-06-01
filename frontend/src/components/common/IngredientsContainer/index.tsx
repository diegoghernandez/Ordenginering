import type { Ingredient } from '@/types'
import Styles from './IngredientsContainer.module.css'

interface Props {
   ingredients: Ingredient[]
}

export function IngredientsContainer({ ingredients }: Props) {
   return (
      <div className={Styles['ingredients-container']}>
         {ingredients.map((element) => (
            <p key={element.name}>{element?.name} <span>X{element.quantity}</span></p>
         ))}
      </div>
   )
}