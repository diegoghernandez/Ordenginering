import { useShoppingCart } from '../../hooks/useShoppingCart';
import type { Pizza } from '../../types';
import '../../index.css'
import Styles from './AddPizza.module.css';

interface Props {
   pizza: Pizza
}


export function AddPizza({ pizza }: React.FC<Props>) {
   const addPizza = useShoppingCart((state) => state.addPizza)

   const handleClick = () => {
      const pizzaWithId = { id: crypto.randomUUID(), ...pizza}
      addPizza(pizzaWithId)

      const getLocalStorage = localStorage.getItem('allPizza') ?? ''
      let newPizzaList: Pizza[] = []

      if (getLocalStorage) newPizzaList = [JSON.parse(getLocalStorage), pizzaWithId].flat()
      else newPizzaList = [pizzaWithId]

      localStorage.setItem('allPizza', JSON.stringify(newPizzaList))
   }

   return (
      <button className={`${Styles.button} add-cart button-styles`} onClick={handleClick} >
         Agregar
      </button>
   )
}