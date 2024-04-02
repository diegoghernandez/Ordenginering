import { Size } from '@/constants/size'

export function getPizzaPrice(ingredientsLength: number, size: Size, quantity: number) {
   const sizePrices = (size: Size) => {
      switch (size) {
         case Size.SMALL:
            return 50
         case Size.MEDIUM:
            return 100
         case Size.LARGE:
            return 150
      
         default:
            return 0
      }
   }

   let newPrice = 0
   newPrice += ingredientsLength * 20
   newPrice += sizePrices(size)      
   newPrice = quantity * newPrice

   return newPrice
}