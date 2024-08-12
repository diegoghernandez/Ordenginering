import { SmallModalContainer } from '@/components/common/SmallModalContainer'
import { PRIMARY__BUTTON, SECONDARY__BUTTON } from '@/constants/styles'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import type { Ingredient, Pizza } from '@/types'
import { useRef, useState } from 'react'
import type { Characteristics } from './PizzaData'
import { getRelativeLocaleUrl } from 'astro:i18n'

export type AddCustomizePizza = {
   label: string,
   dialog: {
      title: string
      keepOrdering: string
      checkout: string
   }
}

interface Props {
   t: AddCustomizePizza
   localForModalLinks: string
   pizza: Pick<Pizza, 'pizzaName' | 'pizzaImageName' | 'pizzaImageAuthor'>
   characteristics: Characteristics,
   ingredients: Ingredient[]
}

export function AddCustomizePizza({ t, localForModalLinks, pizza, characteristics, ingredients }: Props) {
   const addPizza = useShoppingCart((state) => state.addPizza)
   const [isLoading, setIsLoading] = useState(false)
   const dialogRef = useRef<HTMLDialogElement>(null)

   const showModal = () => {
      setIsLoading(false)

      const result = dialogRef?.current
      if (result instanceof HTMLDialogElement) result.showModal()
   }

   const addOrder = () => {
      setIsLoading(true)
      setTimeout(() => {
         showModal()
         addPizza({
            pizzaName: pizza.pizzaName,
            pizzaImageName: pizza.pizzaImageName,
            pizzaImageAuthor: pizza.pizzaImageAuthor,
            size: characteristics.size,
            quantity: characteristics.quantity,
            pizzaIngredients: ingredients
         })
      }, 1000)
   }

   return (
      <>
         <button 
            className={PRIMARY__BUTTON}
            disabled={ingredients.length === 0 || isLoading}
            onClick={addOrder}
         >
            {t.label}
         </button>
         <SmallModalContainer ref={dialogRef}>
            <>
               <h2>{t.dialog.title}</h2>
               <a className={PRIMARY__BUTTON} href={getRelativeLocaleUrl(localForModalLinks, 'menu')}>{t.dialog.keepOrdering}</a>
               <a className={SECONDARY__BUTTON} href={getRelativeLocaleUrl(localForModalLinks, 'checkout')}>{t.dialog.checkout}</a>
            </>
         </SmallModalContainer>
      </>
   )
}