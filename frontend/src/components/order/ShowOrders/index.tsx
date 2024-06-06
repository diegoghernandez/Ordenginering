import { CardContainer } from '@/components/common/CardContainer'
import { SelectQuantity } from '@/components/order/SelectQuantity'
import { PRIMARY__BUTTON, SECONDARY__BUTTON } from '@/constants/styles'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import type { Pizza } from '@/types'
import { getPizzaPrice } from '@/utils/getPizzaPrice'
import { useEffect, useState } from 'react'
import Styles from './ShowOrders.module.css'
import { ImgContainer } from '@/components/common/ImgContainer'
import { IngredientsContainer } from '@/components/common/IngredientsContainer'

export function ShowOrder() {
   const [pizza, setPizza] = useState<Pizza[]>()
   const pizzaList = useShoppingCart((state) => state.pizza)
   const removePizza = useShoppingCart((state) => state.removePizza)
   const updatePizzaQuantity  = useShoppingCart((state) => state.updatePizzaQuantity)
   const clearCart = useShoppingCart((state) => state.clearCart)

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
         <button onClick={clearCart}>Remove all items</button>
         {pizza ? 
            pizza.length !== 0 ? 
               pizza?.map((pizzaInOrder) => (
                  <CardContainer key={pizzaInOrder.idPizza} styleClass={String(Styles['card-separation'])}>
                     <>
                        <ImgContainer figcaptionText={pizzaInOrder.pizzaImageAuthor}>
                           <img 
                              src={pizzaInOrder.pizzaImageUrl} 
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
                        <IngredientsContainer ingredients={pizzaInOrder.pizzaIngredients} />
                        <div className={Styles['quantity-buttons']}>
                           <SelectQuantity 
                              valueToShow={pizzaInOrder.quantity}
                              increase={{
                                 label: 'Add pizza',
                                 fun: () => updatePizzaQuantity(pizzaInOrder.idPizza ?? '', 'add')
                              }}
                              decrease={{
                                 label: 'Subtract pizza',
                                 fun: () => {
                                    updatePizzaQuantity(pizzaInOrder.idPizza ?? '', 'subs')
                                    if (pizzaInOrder.quantity - 1 === 0) {
                                       removePizza(pizzaInOrder.idPizza ?? '')
                                    }
                                 }
                              }}
                           />
                           <button 
                              className={SECONDARY__BUTTON} 
                              type='button' 
                              onClick={() => removePizza(pizzaInOrder.idPizza ?? '')}
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