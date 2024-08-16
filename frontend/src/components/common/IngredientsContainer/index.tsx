import type { Ingredient, LocalesObject, LocalesString } from '@/types'
import Styles from './IngredientsContainer.module.css'

interface Props {
   ingredients: Ingredient[]
   local: string
}

export function IngredientsContainer({ ingredients, local }: Props) {
   return (
      <div className={Styles['ingredients-container']}>
         {ingredients.map((element) => (
            <p key={crypto.randomUUID()}>{getLocalizedIngredients(element?.name, local)} <span>X{element.quantity}</span></p>
         ))}
      </div>
   )
}

function getLocalizedIngredients(ingredientName: LocalesObject | undefined, locale: string) {
   if (typeof ingredientName === 'string') {
      return JSON.parse(ingredientName)[locale]
   }
   
   return ingredientName?.[locale as LocalesString]
}