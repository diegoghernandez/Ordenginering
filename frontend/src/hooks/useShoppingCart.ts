import { create } from 'zustand';
import type { Pizza } from '../types';

interface CartState {
   pizza: Pizza[],
   addPizza: (pizza: Pizza) => void
   removePizza: (id: string) => void
}

export const useShoppingCart = create<CartState>()((set) => ({
   pizza: [],
   addPizza: (pizza) => {
      set((state) => ({ pizza: [...state.pizza,  {id: crypto.randomUUID(), ...pizza}] }))
   },
   removePizza: (id) => {
      set((state) => ({ pizza: [...state.pizza.filter((element) => element.id !== id)] }))
   }
}))