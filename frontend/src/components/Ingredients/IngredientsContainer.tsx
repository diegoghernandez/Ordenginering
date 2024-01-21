import { IngredientTypes } from "../../constants/ingredientTypes";
import { useItemMenu } from "../../hooks/useItemMenu";
import { getAllIngredients } from "../../services/ingredientsService";
import { IngredientCard } from "./IngredientCard";
import Styles from './Ingredients.module.css';

const ingredientsCollection = await getAllIngredients()

interface Props {
   preSelectedIngredients: string[]
}

export function IngredientsContainer({ preSelectedIngredients }: Props) {
   const { type, selectorButtons } = useItemMenu({
      buttonTextList: Object.values(IngredientTypes),
      typeList: Object.keys(IngredientTypes)
   })

   return (
      <div className={Styles.select__container}>
         <h2>Ingredients</h2>
         {selectorButtons}
         <div className={Styles.ingredients__container}>
            {ingredientsCollection.map((ingredient) => (
               <IngredientCard
                  key={ingredient.id}
                  isType={type === ingredient.type} 
                  ingredient={{
                     name: ingredient.name,
                     author: ingredient.author,
                     img: ingredient.img
                  }}
                  isUsed={preSelectedIngredients?.includes(ingredient.name.toLowerCase())}
               />
            ))}
         </div>
      </div>
   )
}
