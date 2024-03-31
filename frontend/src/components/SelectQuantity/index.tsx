import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import type { Size } from '../../constants/size'
import Styles from './SelectQuantity.module.css'

type Value = {
   quantity: number,
   size: Size,
   ingredients: number
}

interface Props {
   defaultValue?: number
   setValue?: Dispatch<SetStateAction<Value>>
}

export function SelectQuantity({ defaultValue = 1, setValue }: Props) {
   const [number, setNumber] = useState(defaultValue)

   useEffect(() => {
      setValue?.((prevState) => ({
         ...prevState,
         quantity: number
      }))
   }, [number])

   const increase = () => {
      setNumber((prev) => prev + 1)
   }

   const decrease = () => {
      if (number > 1) setNumber((prev) => prev - 1)
   }

   return (
      <div className={`primary--button ${Styles.select__quantity}`}>
         <button aria-label='Subtract pizza' type='button' onClick={decrease}>
            {number !== 1 ? '-' : 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="humbleicons hi-trash">
               <path xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6l.934 13.071A1 1 0 007.93 20h8.138a1 1 0 00.997-.929L18 6m-6 5v4m8-9H4m4.5 0l.544-1.632A2 2 0 0110.941 3h2.117a2 2 0 011.898 1.368L15.5 6"/>
            </svg>}
         </button>
         <p>{number}</p>
         <button aria-label='Add pizza' type='button' onClick={increase}>+</button>
      </div>
   )
}