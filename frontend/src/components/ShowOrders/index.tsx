import { SelectQuantity } from '@/components/SelectQuantity'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import type { Pizza } from '@/types'
import { useEffect, useState } from 'react'
import { CardContainer } from '../containers/CardContainer'
import Styles from './ShowOrders.module.css'

export function ShowOrder() {
   const [pizza, setPizza] = useState<Pizza[]>()
   const pizzaList = useShoppingCart((state) => state.pizza)
   const removePizza = useShoppingCart((state) => state.removePizza)

   useEffect(() => setPizza(pizzaList), [pizzaList])
   
   return (
      <div>
         {pizza ? 
            pizza.length === 0 ? <p>No orders</p> 
               : pizza?.map((element) => (
                  <CardContainer key={element.id} styleClass={String(Styles.card__separation)}>
                     <>
                        <h3>{element?.pizzaName}</h3>
                        <h3>Size: {element?.size}</h3>
                        <p>{element.ingredientNameDtoList?.map((ingredient) => ingredient.name).join(', ')}</p>
                        <SelectQuantity defaultValue={element.quantity} />
                        <button type='button' onClick={() => removePizza(element.id ?? '')}>X</button>
                     </>
                  </CardContainer>
               )) 
            : <div role='progressbar' aria-labelledby='loading content'></div>
         }
      </div>
   )
}