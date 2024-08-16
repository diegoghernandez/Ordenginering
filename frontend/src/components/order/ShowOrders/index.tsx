import { CardContainer } from '@/components/common/CardContainer'
import { ImgContainer } from '@/components/common/ImgContainer'
import { IngredientsContainer } from '@/components/common/IngredientsContainer'
import { SelectQuantity } from '@/components/order/SelectQuantity'
import { IMAGE_CDN } from '@/constants/imageCDN'
import { PRIMARY__BUTTON, SECONDARY__BUTTON } from '@/constants/styles'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import showOrderTranslation from '@/i18n/components/showOrder.json'
import type { LocalesString, Pizza } from '@/types'
import { getPizzaPrice } from '@/utils/getPizzaPrice'
import { getRelativeLocaleUrl } from 'astro:i18n'
import { useEffect, useState } from 'react'
import Styles from './ShowOrders.module.css'

interface Props {
   currentLocal: LocalesString
}

export function ShowOrder({ currentLocal }: Props) {
   const [pizza, setPizza] = useState<Pizza[]>()
   const pizzaList = useShoppingCart((state) => state.pizza)
   const removePizza = useShoppingCart((state) => state.removePizza)
   const updatePizzaQuantity  = useShoppingCart((state) => state.updatePizzaQuantity)
   const clearCart = useShoppingCart((state) => state.clearCart)

   const t = showOrderTranslation[currentLocal]

   useEffect(() => setPizza(pizzaList), [pizzaList])

   return (
      <section className={Styles['order-styles']}>
         <h2>Total: <strong>${pizzaList.map((pizza) => 
            getPizzaPrice(pizza.pizzaIngredients?.length, pizza.size, pizza.quantity))
               .reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</strong>
         </h2>
         <a 
            href={getRelativeLocaleUrl(currentLocal, 'checkout')}
            tabIndex={pizzaList.length !== 0 ? 0 : -1}
            className={`${PRIMARY__BUTTON} ${pizzaList.length !== 0 ? '' : Styles['disabled']}`} 
         >
            {t.checkoutLink.name} ({pizzaList.map(({ quantity }) => quantity).reduce((acc, current) => acc + current, 0)} {t.checkoutLink.products})
         </a>
         <button onClick={() => clearCart()}>{t.removeItems}</button>
         {pizza ? 
            pizza.length !== 0 ? 
               pizza?.map((pizzaInOrder) => (
                  <CardContainer key={pizzaInOrder.idPizza} styleClass={String(Styles['card-separation'])}>
                     <>
                        <ImgContainer figcaptionText={pizzaInOrder.pizzaImageAuthor}>
                           <img 
                              src={`${IMAGE_CDN}/pizza/${pizzaInOrder.pizzaImageName}.avif`} 
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
                        <IngredientsContainer ingredients={pizzaInOrder.pizzaIngredients} local={currentLocal} />
                        <div className={Styles['quantity-buttons']}>
                           <SelectQuantity 
                              valueToShow={pizzaInOrder.quantity}
                              decrease={{
                                 label: t.selectQuantityLabels.subtract,
                                 fun: () => {
                                    updatePizzaQuantity(pizzaInOrder.idPizza ?? '', 'subs')
                                    if (pizzaInOrder.quantity - 1 === 0) {
                                       removePizza(pizzaInOrder.idPizza ?? '')
                                    }
                                 }
                              }}
                              increase={{
                                 label: t.selectQuantityLabels.add,
                                 fun: () => updatePizzaQuantity(pizzaInOrder.idPizza ?? '', 'add')
                              }}
                           />
                           <button 
                              className={SECONDARY__BUTTON} 
                              type='button' 
                              onClick={() => removePizza(pizzaInOrder.idPizza ?? '')}
                           >{t.deletePizza}</button>
                        </div>
                     </>
                  </CardContainer>
               )) : <p>{t.noOrders}</p>
            : <div role='progressbar' aria-labelledby='loading content'></div>
         }
      </section>
   )
}