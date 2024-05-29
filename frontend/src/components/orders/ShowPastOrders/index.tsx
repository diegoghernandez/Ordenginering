import { CardContainer } from '@/components/common/CardContainer'
import { DetectEndOfScroll } from '@/components/common/DetectEndOfScroll'
import { Spin } from '@/components/common/Spin'
import { StatusError } from '@/services/exceptions/StatusError'
import { getOrdersByAccount } from '@/services/orderService'
import type { Order } from '@/types'
import { useState } from 'react'
import Styles from './ShowPastOrders.module.css'

type Data =  { 
   page: {
      number: number
      content: Order[]
   }[],
   pageNumber: number, 
   last: boolean 
}

interface Props {
   id: number
   initialData: Data
}

export function ShowPastOrders({ id, initialData }: Props) {
   const [isLoading, setIsLoading] = useState<boolean>(false)
   const [error, setError] = useState<string>('')
   const [orders, setOrders] = useState<Data>(initialData)
   
   const chargeMore = () => {
      setIsLoading(true)
      setTimeout(() => {
         getOrdersByAccount(id, orders.pageNumber + 1)
            .then(({ content, pageable, last }) => 
               setOrders({
                  page: orders.page.concat({ number: pageable.pageNumber, content: content }),
                  pageNumber: pageable.pageNumber,
                  last
               })
            )
            .catch((error) => {
               if (error instanceof StatusError) {
                  setError(error.message)
               }
            })
            .finally(() => setIsLoading(false))
      }, 1000)
   }

   return (
      <>
         {orders?.page.flatMap(({ content }) => content).map((order) => (
            <CardContainer key={order.orderId} styleClass={Styles['orders-card']}>
               <>
                  <div>
                     <p>{new Intl.DateTimeFormat('en', { dateStyle: 'medium' })
                           .format(new Date(order.orderTimestamp))}</p>
                     <p>{order.pizzaList.length} products</p>
                  </div>
                  <div>
                     <p>Total</p>
                     <p>${order.total}</p>
                  </div>
                  <a aria-label={`Order ${order.orderId}`} href={'/client/order/' + order.orderId}></a>
               </>
            </CardContainer>
         ))}
         {error ? <p>{error}</p> : null}
         {!orders.last ? <DetectEndOfScroll fun={() => {if (!isLoading) chargeMore()}} /> : null}
         {isLoading ? <div className={Styles['spin-container']}><Spin /></div> : null}
      </>
   )
}