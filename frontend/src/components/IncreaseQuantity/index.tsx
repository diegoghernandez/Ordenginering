import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import type { Size } from '../../constants/size';
import Styles from './IncreaseQuality.module.css';

type Value = {
   quantity: number,
   size: Size,
   ingredients: number
}

interface Props {
   defaultValue?: number
   setValue?: Dispatch<SetStateAction<Value>>
}

export function IncreaseQuantity({ defaultValue = 1, setValue }: Props) {
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
      if (number > 1) {
         setNumber((prev) => prev - 1)
      }
   }

   return (
      <div className={`${Styles.increase}`}>
         <button type='button' className={`${Styles.left}`} onClick={decrease}>-</button>
         <p>{number}</p>
         <button type='button' className={`${Styles.right}`} onClick={increase}>+</button>
      </div>
   )
}