import { en as t } from '@/i18n/components/largeModal.json'
import { forwardRef, useImperativeHandle, useRef, type ReactElement } from 'react'
import Styles from './LargeModalContainer.module.css'

interface Props {
   description?: string
   children: ReactElement
   position: 'left' | 'right'
}

export const LargeModalContainer = forwardRef<{ showModal: () => void }, Props>(function LargeModalContainer({
   description, 
   children, 
   position 
}, ref) {
   const dialogRef = useRef<HTMLDialogElement>(null)

   const closeModal = () => {
      if (dialogRef.current instanceof HTMLDialogElement) {
         dialogRef.current.close()
      }
   }

   useImperativeHandle(ref, () => ({   
      showModal() {         
         if (dialogRef.current instanceof HTMLDialogElement) {
            dialogRef.current.showModal()
         }
      }
   }), [])

   return (
      <dialog ref={dialogRef} className={`${Styles['dialog-container']} ${Styles[position]}`}>
         <nav>
            <button aria-label={t.closeLargeModalButton} onClick={closeModal}>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="humbleicons hi-times">
                  <g xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeLinecap="round" strokeWidth="2"><path d="M6 18L18 6M18 18L6 6"/></g>
               </svg>
            </button>
            {description ? <p>{description}</p> : null}
         </nav>
         {children}
      </dialog>
   )
})