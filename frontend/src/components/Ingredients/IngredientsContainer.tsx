import { useState } from "react";
import { IngredientTypes } from "../../constants/ingredientTypes";
import { getAllIngredients } from "../../services/ingredientsService";
import { IngredientCard } from "./IngredientCard";
import Styles from './Ingredients.module.css';

const ingredientsCollection = await getAllIngredients()

interface Props {
   preSelectedIngredients: string[]
}

export function IngredientsContainer({ preSelectedIngredients }: Props) {
   const [selectedType, setSelectedType] = useState('VEGETABLE')

   return (
      <div className={Styles.select__container}>
         <h2>Ingredients</h2>
         <ul>
            {Object.entries(IngredientTypes).map((type) => (
               <li key={type[0]}>
                  <button 
                     type='button'
                     onClick={() => setSelectedType(type[0])}
                  >{type[1]}</button>
               </li>
            ))}
         </ul>
         <div className={Styles.ingredients__container}>
            {ingredientsCollection.map((ingredient) => (
               <IngredientCard
                  key={ingredient.id}
                  isType={selectedType === ingredient.type} 
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
