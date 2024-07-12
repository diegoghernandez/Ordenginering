import { CardContainer } from '@/components/common/CardContainer'
import { CustomSelect } from '@/components/common/CustomSelect'
import { IngredientsContainer } from '@/components/common/IngredientsContainer'
import { AddCustomizePizza } from '@/components/customize/AddCustomizePizza'
import { SelectQuantity } from '@/components/order/SelectQuantity'
import { Size } from '@/constants/size'
import { useDesireIngredients } from '@/hooks/useDesireIngredients'
import type { Pizza } from '@/types'
import { getPizzaPrice } from '@/utils/getPizzaPrice'
import { useState } from 'react'
import Styles from './PizzaData.module.css'

export type Characteristics = {
   size: Size
   quantity: number
}

interface Props {
   pizza: Pick<Pizza, 'pizzaName' | 'pizzaImageName' | 'pizzaImageAuthor'>
   prebuildIngredients?: string[]
}

export function PizzaData({ pizza, prebuildIngredients = [] }: Props) {   
   const ingredients = useDesireIngredients((state) => state.ingredients)
   const [characteristics, setCharacteristics] = useState<Characteristics>({
      size: Size.MEDIUM,
      quantity: 1
   })   

   return (
      <CardContainer styleClass={Styles['customize-description']}>
         <>
            <h3>Customize your pizza</h3>
            <p>Total: ${
               getPizzaPrice(
                  ingredients.length === 0 ? prebuildIngredients.length : ingredients.reduce((prev, now) => prev + now.quantity, 0), 
                  characteristics.size, 
                  characteristics.quantity
               )
            }</p>
            <IngredientsContainer 
               ingredients={ingredients.length === 0 ? 
                  prebuildIngredients.map((element) => ({ name: element, quantity: 1 })) : 
                  ingredients
               }
            />
            <CustomSelect
               label='Size'
               values={['SMALL', 'MEDIUM', 'LARGE']}
               options={['Small', 'Medium', 'Large']}
               selectedOption='MEDIUM'
               onChange={(value: string) => setCharacteristics((prev) => ({
                  ...prev,
                  size: Size[value as Size]
               }))}
            />
            <p>Quantity</p>
            <SelectQuantity
               valueToShow={characteristics.quantity}
               minValue={1}
               decrease={{
                  label: 'Decrease quantity',
                  fun: () => setCharacteristics((prev) => ({
                     ...prev,
                     quantity: prev.quantity - 1
                  }))
               }}
               increase={{
                  label: 'Increase quantity',
                  fun: () => setCharacteristics((prev) => ({
                     ...prev,
                     quantity: prev.quantity + 1
                  }))
               }}
            />
            <AddCustomizePizza
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