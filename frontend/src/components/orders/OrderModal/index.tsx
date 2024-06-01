import { CardContainer } from '@/components/common/CardContainer'
import { ImgContainer } from '@/components/common/ImgContainer'
import { ModalContainer } from '@/components/common/ModalContainer'
import { Size } from '@/constants/size'
import type { Order } from '@/types'
import { getPizzaPrice } from '@/utils/getPizzaPrice'
import Styles from './OrderModal.module.css'
import { IngredientsContainer } from '@/components/common/IngredientsContainer'

interface Props {
   funToSaveDialog: (element: { showModal: () => void }) => void,
   order: Order
}

export function OrderModal({ funToSaveDialog, order }: Props) {
   return (
      <ModalContainer ref={funToSaveDialog} position='right' description='Your order'>
         <section className={Styles['order-container']}>
            <CardContainer styleClass={Styles['order-description-container']}>
               <>
                  <p>Date: <time dateTime={order.orderTimestamp}>
                     {new Intl.DateTimeFormat('en', { dateStyle: 'short', timeStyle: 'medium' })
                        .format(new Date(order.orderTimestamp))}   
                  </time></p>
                  <p>Products: <span>{order.pizzaList.length}</span></p>
                  <p>Total: <span>${order.total}</span></p>
                  <p>Country: <span>{order.country}</span></p>
                  <p>State: <span>{order.state}</span></p>
                  <p>City: <span>{order.city}</span></p>
                  <p>Street: <span>{order.street}</span></p>
                  <p>House number: <span>{order.houseNumber}</span></p>
                  {order.floor ? <p>Floor: <span>{order.floor}</span></p> : null}
                  {order.apartment ? <p>Apartment: <span>{order.apartment}</span></p> : null}
               </>
            </CardContainer>
            {order.pizzaList.map((pizza) => (
               <CardContainer key={pizza.id} styleClass={Styles['order-pizza-container']}>
                  <>
                     <ImgContainer figcaptionText={pizza.pizzaImage.author}>
                        <img src={`/client/images/pizza/${pizza.pizzaImage.url}.jpg`} alt={pizza.pizzaName + ' pizza'} />
                     </ImgContainer>
                     <h2>{pizza.pizzaName}</h2>
                     <p>${getPizzaPrice(pizza.pizzaIngredients.length, Size[pizza.size as Size], pizza.quantity)}</p>
                     <p>{pizza.size.at(0) + pizza.size.substring(1).toLocaleLowerCase()}</p>
                     <IngredientsContainer ingredients={pizza.pizzaIngredients} />
                     <p>X{pizza.quantity}</p>
                  </>
               </CardContainer>
            ))}
         </section>
      </ModalContainer>
   )
}