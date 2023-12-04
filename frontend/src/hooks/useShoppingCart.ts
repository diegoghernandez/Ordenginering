import { create } from 'zustand';
import type { Pizza } from '../types';

interface CartState {
   pizza: Pizza[],
   addPizza: (pizza: Pizza) => void
}

const listPizza = localStorage.getItem('allPizza') ?? ""

export const useShoppingCart = create<CartState>()((set) => ({
   pizza: listPizza ? [JSON.parse(listPizza)].flat() : [],
   addPizza: (pizza) => set((state) => ({ pizza: [...state.pizza, pizza] }))
}))