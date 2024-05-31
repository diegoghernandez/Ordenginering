import { CardContainer } from '@/components/common/CardContainer'
import { CustomSelect } from '@/components/common/CustomSelect'
import { SelectQuantity } from '@/components/order/SelectQuantity'
import { Size } from '@/constants/size'
import { useDesireIngredients } from '@/hooks/useDesireIngredients'
import { getPizzaPrice } from '@/utils/getPizzaPrice'
import { useState } from 'react'
import { AddCustomizePizza } from '../AddCustomizePizza'
import Styles from './PizzaData.module.css'
import type { Pizza } from '@/types'

export type Characteristics = {
   size: Size
   quantity: number
}

interface Props {
   pizza: Pick<Pizza, 'pizzaName' | 'pizzaImage'>
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
            <div className={Styles['description-ingredients']}>
               {ingredients.length === 0 ? 
                  prebuildIngredients.map((element) => (
                     <p key={element}>{element} <span>X1</span></p>
                  )) :
                  ingredients.map((element) => (
                     <p key={element.name}>{element?.name} <span>X{element.quantity}</span></p>
                  ))
               }
            </div>
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
               increase={{
                  label: 'Increase quantity',
                  fun: () => setCharacteristics((prev) => ({
                     ...prev,
                     quantity: prev.quantity + 1
                  }))
               }}
               decrease={{
                  label: 'Decrease quantity',
                  fun: () => setCharacteristics((prev) => ({
                     ...prev,
                     quantity: prev.quantity - 1
                  }))
               }}
            />
            <AddCustomizePizza
               pizza={{
                  pizzaName: 'Custom ' + pizza.pizzaName.replace('-', ' '),
                  pizzaImage: pizza.pizzaImage
               }}
               characteristics={characteristics} 
               ingredients={ingredients}
            />
         </>
      </CardContainer>
   )
}