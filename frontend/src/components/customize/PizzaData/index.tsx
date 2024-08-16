import { CardContainer } from '@/components/common/CardContainer'
import { CustomSelect } from '@/components/common/CustomSelect'
import { IngredientsContainer } from '@/components/common/IngredientsContainer'
import { AddCustomizePizza } from '@/components/customize/AddCustomizePizza'
import { SelectQuantity } from '@/components/order/SelectQuantity'
import { Size } from '@/constants/size'
import { useDesireIngredients } from '@/hooks/useDesireIngredients'
import type { IngredientRequest, Pizza, QuantityTranslation } from '@/types'
import { getPizzaPrice } from '@/utils/getPizzaPrice'
import { useState } from 'react'
import Styles from './PizzaData.module.css'

export type Characteristics = {
   size: Size
   quantity: number
}

export type PizzaDataTranslation = {
   title: string
   selectLabel: string
   selectOptions: string[]
   addCustomizePizzaTranslation: AddCustomizePizza
}

interface Props {
   pizza: Pick<Pizza, 'pizzaName' | 'pizzaImageName' | 'pizzaImageAuthor'>
   prebuildIngredients?: IngredientRequest[]
   localForModalLinks: string
   t: {
      quantity: QuantityTranslation
      pizzaDataTranslation: PizzaDataTranslation
   }
}

export function PizzaData({ pizza, prebuildIngredients = [], localForModalLinks, t }: Props) {   
   const ingredients = useDesireIngredients((state) => state.ingredients)
   const [characteristics, setCharacteristics] = useState<Characteristics>({
      size: Size.MEDIUM,
      quantity: 1
   })

   const { quantity, pizzaDataTranslation } = t

   return (
      <CardContainer styleClass={Styles['customize-description']}>
         <>
            <h3>{pizzaDataTranslation.title}</h3>
            <p>Total: ${
               getPizzaPrice(
                  ingredients.length === 0 ? prebuildIngredients.length : ingredients.reduce((prev, now) => prev + now.quantity, 0), 
                  characteristics.size, 
                  characteristics.quantity
               )
            }</p>
            <IngredientsContainer 
               ingredients={ingredients.length === 0 
                  ? prebuildIngredients.map((ingredient) => ({ id: ingredient.idIngredient, name: ingredient.ingredientName, quantity: 1 })) 
                  : ingredients
               } local={localForModalLinks}
            />
            <CustomSelect
               label={pizzaDataTranslation.selectLabel}
               values={['SMALL', 'MEDIUM', 'LARGE']}
               options={pizzaDataTranslation.selectOptions}
               selectedOption='MEDIUM'
               onChange={(value: string) => setCharacteristics((prev) => ({
                  ...prev,
                  size: Size[value as Size]
               }))}
            />
            <p>{quantity.name}</p>
            <SelectQuantity
               valueToShow={characteristics.quantity}
               minValue={1}
               decrease={{
                  label: quantity.decrease,
                  fun: () => setCharacteristics((prev) => ({
                     ...prev,
                     quantity: prev.quantity - 1
                  }))
               }}
               increase={{
                  label: quantity.increase,
                  fun: () => setCharacteristics((prev) => ({
                     ...prev,
                     quantity: prev.quantity + 1
                  }))
               }}
            />
            <AddCustomizePizza
               t={pizzaDataTranslation.addCustomizePizzaTranslation}
               localForModalLinks={localForModalLinks}
               pizza={{
                  pizzaName: 'Custom ' + pizza.pizzaName.replace('-', ' '),
                  pizzaImageName: pizza.pizzaImageName,
                  pizzaImageAuthor: pizza.pizzaImageAuthor,
               }}
               characteristics={characteristics} 
               ingredients={ingredients}
            />
         </>
      </CardContainer>
   )
}