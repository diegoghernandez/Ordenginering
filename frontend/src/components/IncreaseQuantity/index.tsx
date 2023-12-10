import { useState } from "react"
import Styles from "./IncreaseQuality.module.css";

export function IncreaseQuantity() {
   const [number, setNumber] = useState(0)

   const increase = () => {
      setNumber((prev) => prev + 1)
   }

   const decrease = () => {
      if (number > 0) {
         setNumber((prev) => prev - 1)
      }
   }

   return (
      <div className={`${Styles.increase}`}>
         <button className={`${Styles.left}`} onClick={decrease}>-</button>
         <p>{number}</p>
         <button className={`${Styles.right}`}onClick={increase}>+</button>
      </div>
   )
}