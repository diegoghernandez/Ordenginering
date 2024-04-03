import { IngredientTypes } from '@/constants/ingredientTypes'
import { useItemMenu } from '@/hooks/useItemMenu'
import type { IngredientRequest } from '@/types'
import { IngredientCard } from './IngredientCard'
import Styles from './Ingredients.module.css'

interface Props {
   ingredients: IngredientRequest[],
   preSelectedIngredients: string[]
}

export function IngredientsContainer({ ingredients, preSelectedIngredients }: Props) {
   const { type, selectorButtons } = useItemMenu({
      buttonTextList: Object.values(IngredientTypes),
      typeList: Object.keys(IngredientTypes)
   })

   return (
      <div className={Styles.select__container}>
         <h2>Ingredients</h2>
         {selectorButtons}
         <div className={Styles.ingredients__container}>
            {ingredients.map((ingredient) => (
               <IngredientCard
                  key={ingredient.idIngredient}
                  isType={type === ingredient.ingredientType} 
                  ingredient={{
                     name: ingredient.ingredientName,
                     author: ingredient.authorImage,
                     img: ingredient.urlImage
                  }}
                  isUsed={preSelectedIngredients?.includes(ingredient.ingredientName.toLowerCase())}
               />
            ))}
         </div>
      </div>
   )
}
