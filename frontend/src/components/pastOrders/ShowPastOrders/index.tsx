import { CardContainer } from '@/components/common/CardContainer'
import { DetectEndOfScroll } from '@/components/common/DetectEndOfScroll'
import { Spin } from '@/components/common/Spin'
import { OrderModal } from '@/components/pastOrders/OrderModal'
import { StatusError } from '@/services/exceptions/StatusError'
import { getOrdersByAccount } from '@/services/orderService'
import type { Order } from '@/types'
import { Fragment, useRef, useState } from 'react'
import Styles from './ShowPastOrders.module.css'

type Data =  { 
   content: Order[][],
   pageNumber: number, 
   last: boolean 
}

interface Props {
   id: number
   initialData: Data
}

type OrderId = string

export function ShowPastOrders({ id, initialData }: Props) {
   const [isLoading, setIsLoading] = useState<boolean>(false)
   const [error, setError] = useState<string>('')
   const [orders, setOrders] = useState<Data>(initialData)
   const dialogRef = useRef<Map<OrderId, { showModal: () => void }>>(new Map())

   const pushDialog = (id: OrderId, element: { showModal: () => void } | null) => {      
      if (element !== null) {
         dialogRef.current.set(id, element)
      }
   }
   
   const showModal = (id: OrderId) => {
      if (dialogRef !== null) {
         dialogRef?.current?.get(id)?.showModal()
      }
   }   
   
   const chargeMore = () => {
      setIsLoading(true)
      setTimeout(() => {
         getOrdersByAccount(id, orders.pageNumber + 1)
            .then(({ content, pageable, last }) => 
               setOrders({
                  content: orders.content.concat([content]),
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
         {orders?.content.flatMap((content) => content.map((order) => (
            <Fragment key={order.orderId}>
               <CardContainer styleClass={Styles['orders-card']}>
                  <>
                     <div>
                        <p><time dateTime={order.orderTimestamp}>
                              {new Intl.DateTimeFormat('en', { dateStyle: 'medium' })
                                 .format(new Date(order.orderTimestamp))}
                        </time></p>
                        <p>{order.pizzaList.length} products</p>
                     </div>
                     <div>
                        <p>Total</p>
                        <p>${order.total}</p>
                     </div>
                     <button aria-label={`Show order ${order.orderId}`} onClick={() => showModal(order.orderId)}></button>
                  </>
               </CardContainer>
               <OrderModal funToSaveDialog={(element) => pushDialog(order.orderId, element)} order={order} />
            </Fragment>
         )))}
         {error ? <p>{error}</p> : null}
         {!orders.last ? <DetectEndOfScroll fun={() => {if (!isLoading) chargeMore()}} /> : null}
         {isLoading ? <div className={Styles['spin-container']}><Spin /></div> : null}
      </>
   )
}