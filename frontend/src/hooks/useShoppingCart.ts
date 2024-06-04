import { create } from 'zustand'
import type { Pizza } from '@/types'

interface CartState {
   pizza: Pizza[];
   addPizza: (pizza: Pizza) => void;
   updatePizzaQuantity: (idPizza: string, operation: 'subs' | 'add', desireQuantity?: number) => Pizza[];
   removePizza: (idPizza: string) => void;
   removeAllPizza: () => void;
}

export const useShoppingCart = create<CartState>()((set, get) => ({
   pizza: [],
   addPizza: (pizza) => {
      set((state) => {
         const checkIfObjectAreEqual = (pizzaState: Pizza, selectedPizza: Pizza) => {
            const { idPizza, quantity: quantityState, ...restState } = pizzaState
            const { quantity: quantityPizza, ...restPizza } = selectedPizza
            return JSON.stringify(restState) === JSON.stringify(restPizza) 
         }
         
         const pizzaList: Pizza[] = []
         
         if (state.pizza.some((pizzaState) => checkIfObjectAreEqual(pizzaState, pizza))) {
            const { idPizza } = state.pizza.filter((pizzaState) => checkIfObjectAreEqual(pizzaState, pizza))[0]
            pizzaList.push(...get().updatePizzaQuantity(idPizza ?? '', 'add', pizza.quantity))
         } else {
            pizzaList.push({idPizza: crypto.randomUUID(), ...pizza})
            pizzaList.push(...state.pizza)
            localStorage.setItem('allPizza', JSON.stringify(pizzaList))
         }
         return { pizza: pizzaList }
      })
   },
   updatePizzaQuantity: (idPizza, operation, desireQuantity = 1) => {
      set((state) => {
         const pizza = [...state.pizza.map((pizza) => {
            if (pizza.idPizza === idPizza) {
               const { quantity, ...rest } = pizza
               const currentQuantity = operation === 'subs' ? 
                  quantity - desireQuantity : quantity + desireQuantity
               
               return { quantity: currentQuantity, ...rest }
            } else return pizza
         })]

         localStorage.setItem('allPizza', JSON.stringify(pizza))
         return { pizza }
      })
      return get().pizza
   },
   removePizza: (desireId) => {
      set((state) => {
         const pizzaList = [...state.pizza.filter(({ idPizza }) => idPizza !== desireId)]
         localStorage.setItem('allPizza', JSON.stringify(pizzaList))
         return { pizza: pizzaList }
      })
   },
   removeAllPizza() {
      set(() => {
         localStorage.setItem('allPizza', '[]')
         return { pizza: [] }
      })
   },
}))