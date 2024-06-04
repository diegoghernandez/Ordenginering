import { forwardRef, type ReactElement } from 'react'
import Styles from './SmallModalContainer.module.css'
import { CardContainer } from '../CardContainer'

interface Props {
   children: ReactElement
}

export const SmallModalContainer = forwardRef<HTMLDialogElement, Props>(function({ children }, ref) {
   return (
      <dialog ref={ref} className={Styles['information-dialog']}>
         <CardContainer styleClass={Styles['information-card']}>
            {children}
         </CardContainer>
      </dialog>
   )
})