import type { ReactElement } from 'react'
import Styles from './CardContainer.module.css'

interface Props {
   children: ReactElement,
   styleClass?: string
}

export function CardContainer({ children, styleClass }: Props) {
   return (
      <article className={`${Styles.card__container} ${styleClass}`}>
         {children}
      </article>
   )
}