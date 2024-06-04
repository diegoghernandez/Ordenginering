import { CardContainer } from '@/components/common/CardContainer'
import { ImgContainer } from '@/components/common/ImgContainer'
import { IngredientsContainer } from '@/components/common/IngredientsContainer'
import { LargeModalContainer } from '@/components/common/LargeModalContainer'
import type { Order } from '@/types'
import Styles from './OrderModal.module.css'

interface Props {
   funToSaveDialog: (element: { showModal: () => void }) => void,
   order: Order
}

export function OrderModal({ funToSaveDialog, order }: Props) {
   return (
      <LargeModalContainer ref={funToSaveDialog} position='right' description='Your order'>
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
               <CardContainer key={pizza.idPizza} styleClass={Styles['order-pizza-container']}>
                  <>
                     <ImgContainer figcaptionText={pizza.pizzaImageAuthor}>
                        <img src={`/client/images/pizza/${pizza.pizzaImageUrl}.jpg`} alt={pizza.pizzaName + ' pizza'} />
                     </ImgContainer>
                     <h2>{pizza.pizzaName}</h2>
                     <p>{pizza.size.at(0) + pizza.size.substring(1).toLocaleLowerCase()}</p>
                     <p>${pizza.price}</p>
                     <IngredientsContainer ingredients={pizza.pizzaIngredients} />
                     <p>X{pizza.quantity}</p>
                  </>
               </CardContainer>
            ))}
         </section>
      </LargeModalContainer>
   )
}