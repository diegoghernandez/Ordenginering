import { create } from 'zustand';
import type { Pizza } from '../../types';

interface CartState {
   pizza: Pizza[],
   addPizza: (pizza: Pizza) => void
   removePizza: (id: string) => void
}

export const useShoppingCart = create<CartState>()((set) => ({
   pizza: [],
   addPizza: (pizza) => {
      set((state) => {
         const pizzaList = [...state.pizza,  {id: crypto.randomUUID(), ...pizza}]
         localStorage.setItem('allPizza', JSON.stringify(pizzaList))
         return { pizza: pizzaList }
      })
   },
   removePizza: (id) => {
      set((state) => {
         const pizzaList = [...state.pizza.filter((element) => element.id !== id)]
         localStorage.setItem('allPizza', JSON.stringify(pizzaList))
         return { pizza: pizzaList }
      })
   }
}))