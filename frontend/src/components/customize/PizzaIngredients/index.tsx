import { CardContainer } from '@/components/common/CardContainer'
import { ImgContainer } from '@/components/common/ImgContainer'
import { SelectQuantity } from '@/components/order/SelectQuantity'
import { IMAGE_CDN } from '@/constants/imageCDN'
import { useDesireIngredients } from '@/hooks/useDesireIngredients'
import type { IngredientRequest } from '@/types'
import { compareStringsOfNames } from '@/utils/compareStringsOfNames'
import { useEffect, useState } from 'react'
import Styles from './PizzaIngredients.module.css'
import { en } from '@/i18n/pages/Customize.json'

export type PizzaIngredientTranslation = {
   ingredientTypeList: string[]
   quantity: string
   selectQuantity : {
      decrease: string
      increase: string
   }
}

interface Props {
   ingredientList: IngredientRequest[]
   prebuildIngredients?: string[]
   t: PizzaIngredientTranslation
}

const ingredientTypeList = en.pizzaIngredients.ingredientTypeList

export function PizzaIngredients({ ingredientList, prebuildIngredients = [], t }: Props) {
   const ingredients = useDesireIngredients((state) => state.ingredients)
   const addIngredient = useDesireIngredients((state) => state.addIngredient)
   const removeIngredient = useDesireIngredients((state) => state.removeIngredient)
   const [desiredType, setDesiredType] = useState(ingredientTypeList[0])
   const ingredientTypeListTranslate = t.ingredientTypeList

   useEffect(() => {
      for (const prebuildIngredient of prebuildIngredients) {
         addIngredient(prebuildIngredient)
      }
   }, [prebuildIngredients, addIngredient])

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
                           alt={ingredient.ingredientName}
                           width='130'
                           height='80'
                           loading='lazy'
                           decoding='async'
                        />
                     </ImgContainer>
                     <h3>{ingredient.ingredientName}</h3>
                     <p>{t.quantity}</p>
                     <SelectQuantity 
                        valueToShow={ingredients.length === 0 ? 
                           prebuildIngredients?.includes(ingredient.ingredientName) ? 1 : 0 
                           : ingredients.filter((element) => compareStringsOfNames(element?.name, ingredient.ingredientName))[0]?.quantity ?? 0
                        }
                        minValue={0}
                        maxValue={2}
                        decrease={{
                           label: t.selectQuantity.decrease,
                           fun: () => removeIngredient(ingredient.ingredientName)
                        }}
                        increase={{
                           label: t.selectQuantity.increase,
                           fun: () => addIngredient(ingredient.ingredientName)
                        }}
                     />
                  </>
               </CardContainer>
            ))}
         </div>
      </>
   )
}