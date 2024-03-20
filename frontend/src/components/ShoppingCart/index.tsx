import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import type { Pizza } from '@/types'
import '@/index.css'
import Styles from './shoppingCart.module.css'

export function ShoppingCart() {
   const [isOpen, setIsOpen] = useState(false)
   const [pizza, setPizza] = useState<Pizza[]>()
   const pizzaList = useShoppingCart((state) => state.pizza)
   const addPizza = useShoppingCart((state) => state.addPizza)

   useEffect(() => setPizza(pizzaList), [ pizzaList])

   useEffect(() => {
      if (pizzaList.length === 0) {
         const getLocalStorage = localStorage.getItem('allPizza') ?? ''
         if (getLocalStorage) {
            const pizza = JSON.parse(getLocalStorage)
   
            for (const pizzaElement of pizza) {
               addPizza(pizzaElement)
            }
         }
      }
   }, [])
   
   return (
      <button
         className={`${Styles.button} add-cart button-styles`}
         onClick={() => setIsOpen(!isOpen)}
      >
         Cart
         <svg fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M 5 7 C 4.449219 7 4 7.449219 4 8 C 4 8.550781 4.449219 9 5 9 L 7.21875 9 L 9.84375 19.5 C 10.066406 20.390625 10.863281 21 11.78125 21 L 23.25 21 C 24.152344 21 24.917969 20.402344 25.15625 19.53125 L 27.75 10 L 11 10 L 11.5 12 L 25.15625 12 L 23.25 19 L 11.78125 19 L 9.15625 8.5 C 8.933594 7.609375 8.136719 7 7.21875 7 Z M 22 21 C 20.355469 21 19 22.355469 19 24 C 19 25.644531 20.355469 27 22 27 C 23.644531 27 25 25.644531 25 24 C 25 22.355469 23.644531 21 22 21 Z M 13 21 C 11.355469 21 10 22.355469 10 24 C 10 25.644531 11.355469 27 13 27 C 14.644531 27 16 25.644531 16 24 C 16 22.355469 14.644531 21 13 21 Z M 13 23 C 13.5625 23 14 23.4375 14 24 C 14 24.5625 13.5625 25 13 25 C 12.4375 25 12 24.5625 12 24 C 12 23.4375 12.4375 23 13 23 Z M 22 23 C 22.5625 23 23 23.4375 23 24 C 23 24.5625 22.5625 25 22 25 C 21.4375 25 21 24.5625 21 24 C 21 23.4375 21.4375 23 22 23 Z"/>
         </svg>
         <span className={Styles.quantity}>{pizzaList?.length}</span>
         {pizza ? 
            createPortal(
               <dialog className={Styles.dialog} open={isOpen}>
                  {pizza?.map((pizza) => (
                     <article key={pizza?.id}>
                        <h3>{pizza?.pizzaName}</h3>
                        <p>Size: {pizza?.size}</p>
                        <p>Ingredients: {pizza?.ingredientNameDtoList?.map((ingredient) => ingredient?.name).join(', ')}</p>
                        {pizza?.quantity ? <p>Quantity: {pizza?.quantity}</p> : null}
                     </article>
                  ))}
                  <a href='/client/checkout'>Buy</a>
               </dialog>
            , document.body) : null
         }
      </button>
   )
}