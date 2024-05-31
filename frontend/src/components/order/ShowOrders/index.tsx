import { CardContainer } from '@/components/common/CardContainer'
import { SelectQuantity } from '@/components/order/SelectQuantity'
import { PRIMARY__BUTTON, SECONDARY__BUTTON } from '@/constants/styles'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import type { Pizza } from '@/types'
import { getPizzaPrice } from '@/utils/getPizzaPrice'
import { useEffect, useState } from 'react'
import Styles from './ShowOrders.module.css'
import { ImgContainer } from '@/components/common/ImgContainer'

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
            getPizzaPrice(pizza.pizzaIngredients?.length, pizza.size, pizza.quantity))
               .reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</strong>
         </h2>
         <a className={PRIMARY__BUTTON} href='/client/checkout'>
            Checkout ({pizzaList.map(({ quantity }) => quantity).reduce((acc, current) => acc + current, 0)} products)
         </a>
         <button onClick={removeAllPizza}>Remove all items</button>
         {pizza ? 
            pizza.length !== 0 ? 
               pizza?.map((pizzaInOrder) => (
                  <CardContainer key={pizzaInOrder.id} styleClass={String(Styles['card-separation'])}>
                     <>
                        <ImgContainer figcaptionText={pizzaInOrder.pizzaImage.author}>
                           <img 
                              src={pizzaInOrder.pizzaImage.url} 
                              alt={`${pizzaInOrder.pizzaName} pizza`} 
                              loading='lazy' 
                              decoding='async'
                              width='112'
                              height='112'
                           />
                        </ImgContainer>
                        <h3>{pizzaInOrder.pizzaName}</h3>
                        <p>${getPizzaPrice(pizzaInOrder.pizzaIngredients.length, pizzaInOrder.size, pizzaInOrder.quantity)}</p>
                        <p>{pizzaInOrder.size.at(0) + pizzaInOrder.size.substring(1).toLocaleLowerCase()}</p>
                        <p>{pizzaInOrder.pizzaIngredients?.map((ingredient) => ingredient.name).join(', ')}</p>
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
                           <button 
                              className={SECONDARY__BUTTON} 
                              type='button' 
                              onClick={() => removePizza(pizzaInOrder.id ?? '')}
                           >Delete</button>
                        </div>
                     </>
                  </CardContainer>
               )) : <p>No orders</p>
            : <div role='progressbar' aria-labelledby='loading content'></div>
         }
      </section>
   )
}