import type { Pizza } from '@/types'
import { useShoppingCart } from '@/hooks/useShoppingCart'

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
      <button className='primary-button' onClick={handleClick} >
         Agregar
      </button>
   )
}