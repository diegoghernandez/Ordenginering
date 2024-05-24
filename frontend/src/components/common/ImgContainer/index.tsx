import type { ReactElement } from 'react'
import Styles from './ImgContainer.module.css'

interface Props {
   styleClass?: string
   figcaptionText: string
   children: ReactElement,
}

export function ImgContainer({ styleClass, figcaptionText, children }: Props) {
   return (
      <figure className={`${Styles['img-container']} ${styleClass}`}>
         {children}
         <figcaption>
            <p>{figcaptionText}</p>
         </figcaption>
         <span aria-label='Show author image'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="humbleicons hi-image">
               <path xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 17l-3.293-3.293a1 1 0 00-1.414 0l-.586.586a1 1 0 01-1.414 0l-2.879-2.879a2 2 0 00-2.828 0L3 17M21 5v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1h16a1 1 0 011 1zm-5 3a1 1 0 11-2 0 1 1 0 012 0z"/>
            </svg>
         </span>
      </figure>
   )
}