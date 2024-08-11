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

export type PizzaDataTranslation = {
   title: string
   selectLabel: string
   selectOptions: string[]
   quantity: string
   selectedQuantity: {
      decrease: string
      increase: string
   },
   addCustomizePizzaTranslation: AddCustomizePizza
}

interface Props {
   pizza: Pick<Pizza, 'pizzaName' | 'pizzaImageName' | 'pizzaImageAuthor'>
   prebuildIngredients?: string[]
   localForModalLinks: string
   t: PizzaDataTranslation
}

export function PizzaData({ pizza, prebuildIngredients = [], localForModalLinks, t }: Props) {   
   const ingredients = useDesireIngredients((state) => state.ingredients)
   const [characteristics, setCharacteristics] = useState<Characteristics>({
      size: Size.MEDIUM,
      quantity: 1
   })

   return (
      <CardContainer styleClass={Styles['customize-description']}>
         <>
            <h3>{t.title}</h3>
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
               label={t.selectLabel}
               values={['SMALL', 'MEDIUM', 'LARGE']}
               options={t.selectOptions}
               selectedOption='MEDIUM'
               onChange={(value: string) => setCharacteristics((prev) => ({
                  ...prev,
                  size: Size[value as Size]
               }))}
            />
            <p>{t.quantity}</p>
            <SelectQuantity
               valueToShow={characteristics.quantity}
               minValue={1}
               decrease={{
                  label: t.selectedQuantity.decrease,
                  fun: () => setCharacteristics((prev) => ({
                     ...prev,
                     quantity: prev.quantity - 1
                  }))
               }}
               increase={{
                  label: t.selectedQuantity.increase,
                  fun: () => setCharacteristics((prev) => ({
                     ...prev,
                     quantity: prev.quantity + 1
                  }))
               }}
            />
            <AddCustomizePizza
               t={t.addCustomizePizzaTranslation}
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