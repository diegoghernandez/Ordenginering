import { useEffect, useState } from 'react'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import { IncreaseQuantity } from '@/components/IncreaseQuantity'
import type { Pizza } from '@/types'
import Styles from './ShowOrders.module.css'

export function ShowOrders() {
   const [pizza, setPizza] = useState<Pizza[]>()
   const pizzaList = useShoppingCart((state) => state.pizza)
   const removePizza = useShoppingCart((state) => state.removePizza)

   useEffect(() => setPizza(pizzaList), [pizzaList])
   
   return (
      <div>
         {pizza ? 
            pizza.length === 0 ? <p>No orders</p> 
               : pizza?.map((element) => (
                  <article key={element.id}>
                     <h3>{element?.pizzaName}</h3>
                     <p>{element.ingredientNameDtoList?.map((ingredient) => ingredient.name).join(', ')}</p>
                     <IncreaseQuantity defaultValue={element.quantity} />
                     <button type='button' onClick={() => removePizza(element.id ?? '')}>X</button>
                  </article>
               )) 
            : <div role='progressbar' aria-labelledby='loading content' className={Styles.spin}></div>
         }
      </div>
   )
}