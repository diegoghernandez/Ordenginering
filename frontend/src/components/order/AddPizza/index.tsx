import type { Pizza } from '@/types'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import { PRIMARY__BUTTON } from '@/constants/styles'

interface Props {
   pizza?: Pizza
   label: string
}

export function AddPizza({ pizza, label }: Props) {     
   const addPizza = useShoppingCart((state) => state.addPizza)
   
   const handleClick = () => {      
      if (pizza) {
         addPizza(pizza)
      }
   }

   return (
      <button className={PRIMARY__BUTTON} onClick={handleClick} >
         {label}
      </button>
   )
}