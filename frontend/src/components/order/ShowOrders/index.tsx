import { SelectQuantity } from '@/components/order/SelectQuantity'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import type { Pizza } from '@/types'
import { useEffect, useState } from 'react'
import { CardContainer } from '@/components/common/CardContainer'
import { getPizzaPrice } from '@/utils/getPizzaPrice'
import Styles from './ShowOrders.module.css'

export function ShowOrder() {
   const [pizza, setPizza] = useState<Pizza[]>()
   const pizzaList = useShoppingCart((state) => state.pizza)
   const removePizza = useShoppingCart((state) => state.removePizza)
   const updatePizzaQuantity  = useShoppingCart((state) => state.updatePizzaQuantity)
   const removeAllPizza = useShoppingCart((state) => state.removeAllPizza)

   useEffect(() => setPizza(pizzaList), [pizzaList])
   
   return (
      <section className={Styles['order-styles']}>
         <h2>Total <strong>${pizzaList.map((pizza) => 
            getPizzaPrice(pizza.ingredientNameDtoList.length, pizza.size, pizza.quantity))
               .reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</strong>
         </h2>
         <a className='primary-button' href='/client/checkout'>
            Checkout ({pizzaList.map(({ quantity }) => quantity).reduce((acc, current) => acc + current, 0)} products)
         </a>
         <button onClick={removeAllPizza}>Remove all items</button>
         {pizza ? 
            pizza.length !== 0 ? 
               pizza?.map((pizzaInOrder) => (
                  <CardContainer key={pizzaInOrder.id} styleClass={String(Styles['card-separation'])}>
                     <>
                        <img 
                           src={pizzaInOrder.image} 
                           alt={`${pizzaInOrder.pizzaName} pizza`} 
                           loading='lazy' 
                           decoding='async'
                           width='112'
                           height='112'
                        />
                        <h3>{pizzaInOrder.pizzaName}</h3>
                        <p>${getPizzaPrice(pizzaInOrder.ingredientNameDtoList.length, pizzaInOrder.size, pizzaInOrder.quantity)}</p>
                        <p>{pizzaInOrder.ingredientNameDtoList?.map((ingredient) => ingredient.name).join(', ')}</p>
                        <div className={Styles['quantity-buttons']}>
                           <SelectQuantity 
                              valueToShow={pizzaInOrder.quantity}
                              increase={{
                                 label: 'Add pizza',
                                 fun: () => updatePizzaQuantity(pizzaInOrder.id ?? '', 'add')
                              }}
                              decrease={{
                                 label: 'Subtract pizza',
                                 fun: () => {
                                    updatePizzaQuantity(pizzaInOrder.id ?? '', 'subs')
                                    if (pizzaInOrder.quantity - 1 === 0) {
                                       removePizza(pizzaInOrder.id ?? '')
                                    }
                                 }
                              }}
                           />
                           <button className='secondary-button' type='button' onClick={() => removePizza(pizzaInOrder.id ?? '')}>Delete</button>
                        </div>
                     </>
                  </CardContainer>
               )) : <p>No orders</p>
            : <div role='progressbar' aria-labelledby='loading content'></div>
         }
      </section>
   )
}