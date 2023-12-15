import type { Pizza } from "../types";

export function pizzaToLocalStorage(pizza: Pizza) {
   const pizzaWithId = { id: crypto.randomUUID(), ...pizza}
   
   const getLocalStorage = localStorage.getItem('allPizza') ?? ''
   let newPizzaList: Pizza[] = []

   if (getLocalStorage) newPizzaList = [JSON.parse(getLocalStorage), pizzaWithId].flat()
   else newPizzaList = [pizzaWithId]

   localStorage.setItem('allPizza', JSON.stringify(newPizzaList))
}