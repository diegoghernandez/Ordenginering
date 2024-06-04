import { SmallModalContainer } from '@/components/common/SmallModalContainer'
import { PRIMARY__BUTTON, SECONDARY__BUTTON } from '@/constants/styles'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import type { Ingredient, Pizza } from '@/types'
import { useRef, useState } from 'react'
import type { Characteristics } from './PizzaData'

interface Props {
   pizza: Pick<Pizza, 'pizzaName' | 'pizzaImageUrl' | 'pizzaImageAuthor'>
   characteristics: Characteristics,
   ingredients: Ingredient[]
}

export function AddCustomizePizza({ pizza, characteristics, ingredients }: Props) {
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
            pizzaImageUrl: pizza.pizzaImageUrl,
            pizzaImageAuthor: pizza.pizzaImageAuthor,
            size: characteristics.size,
            quantity: characteristics.quantity,
            pizzaIngredients: ingredients.map((element) => ({ name: element.name, quantity: element.quantity }))
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
            Add order
         </button>
         <SmallModalContainer ref={dialogRef}>
            <>
               <h2>Added to shopping cart correctly</h2>
               <a className={PRIMARY__BUTTON} href='/client/menu'>Keep ordering</a>
               <a className={SECONDARY__BUTTON} href='/client/checkout'>Checkout</a>
            </>
         </SmallModalContainer>
      </>
   )
}