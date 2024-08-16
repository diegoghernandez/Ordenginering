import { CardContainer } from '@/components/common/CardContainer'
import { ImgContainer } from '@/components/common/ImgContainer'
import { SelectQuantity } from '@/components/order/SelectQuantity'
import { IMAGE_CDN } from '@/constants/imageCDN'
import { useDesireIngredients } from '@/hooks/useDesireIngredients'
import { en } from '@/i18n/pages/Customize.json'
import type { IngredientRequest, LocalesString, QuantityTranslation } from '@/types'
import { useEffect, useState } from 'react'
import Styles from './PizzaIngredients.module.css'

export type IngredientTypeTranslation = string[]

interface Props {
   ingredientList: IngredientRequest[]
   prebuildIngredientIDs?: number[]
   t: {
      quantity: QuantityTranslation
      ingredientTypeList: IngredientTypeTranslation
   }
   local: LocalesString
}

const ingredientTypeList = en.ingredientTypeList

export function PizzaIngredients({ ingredientList, prebuildIngredientIDs = [], t, local }: Props) {
   const ingredients = useDesireIngredients((state) => state.ingredients)
   const addIngredient = useDesireIngredients((state) => state.addIngredient)
   const removeIngredient = useDesireIngredients((state) => state.removeIngredient)
   const [desiredType, setDesiredType] = useState(ingredientTypeList[0])
   const ingredientTypeListTranslate = t.ingredientTypeList

   
   
   useEffect(() => {
      for (const prebuildIngredientID of prebuildIngredientIDs) {
         const ingredientName = ingredientList
            .filter(({ idIngredient }) => idIngredient === prebuildIngredientID)
            .map(({ ingredientName }) => ingredientName)[0]

         addIngredient(prebuildIngredientID, ingredientName)
      }
   }, [prebuildIngredientIDs, addIngredient, ingredientList])

   return (
      <>
         <div className={Styles['ingredient-buttons']}>
            {ingredientTypeList.map((type, index) => (
               <button 
                  key={type}
                  className={type === desiredType ? Styles['active'] : ''}
                  onClick={() => setDesiredType(type)}
               >
                  {ingredientTypeListTranslate[index][0] + ingredientTypeListTranslate[index].substring(1).toLowerCase()}
               </button>
            ))}
         </div>
         <div className={Styles['ingredients-container']}>
            {ingredientList.filter(({ ingredientType }) => (desiredType === ingredientTypeList[0] || desiredType === ingredientType))
               .map((ingredient) => (
               <CardContainer key={ingredient.idIngredient} styleClass={Styles['ingredients-card']}>
                  <>
                     <ImgContainer styleClass={Styles['ingredients-image']} figcaptionText={ingredient.authorImage}>
                        <img 
                           src={`${IMAGE_CDN}/ingredients/${ingredient.fileNameImage}.avif`}
                           alt={ingredient.ingredientName[local]}
                           width='130'
                           height='80'
                           loading='lazy'
                           decoding='async'
                        />
                     </ImgContainer>
                     <h3>{ingredient.ingredientName[local]}</h3>
                     <p>{t.quantity.name}</p>
                     <SelectQuantity 
                        valueToShow={ingredients.length === 0 ? 
                           prebuildIngredientIDs?.includes(ingredient.idIngredient) ? 1 : 0 
                           : ingredients.filter((element) => element.id === ingredient.idIngredient)[0]?.quantity ?? 0
                        }
                        minValue={0}
                        maxValue={2}
                        decrease={{
                           label: t.quantity.decrease,
                           fun: () => removeIngredient(ingredient.idIngredient)
                        }}
                        increase={{
                           label: t.quantity.increase,
                           fun: () => addIngredient(ingredient.idIngredient, ingredient.ingredientName)
                        }}
                     />
                  </>
               </CardContainer>
            ))}
         </div>
      </>
   )
}