import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { Size } from "../../constants/size";
import Styles from "./increaseQuality.module.css";

type Value = {
   quantity: number,
   size: Size,
   ingredients: number
}

interface Props {
   setValue: Dispatch<SetStateAction<Value>>
}

export function IncreaseQuantity({ setValue }: Props) {
   const [number, setNumber] = useState(1)

   useEffect(() => {
      setValue((prevState) => ({
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
         <button type="button" className={`${Styles.left}`} onClick={decrease}>-</button>
         <p>{number}</p>
         <button type="button" className={`${Styles.right}`} onClick={increase}>+</button>
      </div>
   )
}