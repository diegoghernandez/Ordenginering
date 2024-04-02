import { create } from 'zustand'
import type { Pizza } from '@/types'

interface CartState {
   pizza: Pizza[];
   addPizza: (pizza: Pizza) => void;
   updatePizzaQuantity: (id: string, operation: 'subs' | 'add') => Pizza[];
   removePizza: (id: string) => void;
   removeAllPizza: () => void;
}

export const useShoppingCart = create<CartState>()((set, get) => ({
   pizza: [],
   addPizza: (pizza) => {
      set((state) => {
         const checkIfObjectAreEqual = (pizzaState: Pizza, selectedPizza: Pizza) => {
            const { id, quantity: quantityState, ...restState } = pizzaState
            const { quantity: quantityPizza, ...restPizza } = selectedPizza
            return JSON.stringify(restState) === JSON.stringify(restPizza) 
         }
         
         const pizzaList: Pizza[] = []
         
         if (state.pizza.some((pizzaState) => checkIfObjectAreEqual(pizzaState, pizza))) {
            const { id } = state.pizza.filter((pizzaState) => checkIfObjectAreEqual(pizzaState, pizza))[0]
            pizzaList.push(...get().updatePizzaQuantity(id ?? '', 'add'))
         } else {
            pizzaList.push({id: crypto.randomUUID(), ...pizza})
            pizzaList.push(...state.pizza)
            localStorage.setItem('allPizza', JSON.stringify(pizzaList))
         }
         return { pizza: pizzaList }
      })
   },
   updatePizzaQuantity: (id, operation) => {
      set((state) => {
         const pizza = [...state.pizza.map((pizza) => {
            if (pizza.id === id) {
               const { quantity, ...rest } = pizza
               const currentQuantity = operation === 'subs' ? quantity - 1 : quantity + 1
               
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
         const pizzaList = [...state.pizza.filter(({ id }) => id !== desireId)]
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