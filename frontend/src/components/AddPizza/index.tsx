import type { Pizza } from '@/types'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import '@/index.css'
import Styles from './addPizza.module.css'

interface Props {
   pizza?: Pizza
}

export function AddPizza({ pizza }: Props) {   
   
   const addPizza = useShoppingCart((state) => state.addPizza)
   const handleClick = () => {      
      if (pizza) {
         addPizza(pizza)
      }
   }

   return (
      <button className={`${Styles.button} add-cart button-styles`} onClick={handleClick} >
         Agregar
      </button>
   )
}