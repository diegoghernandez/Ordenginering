import type { Quantity } from "./constants/quantity";

export interface Pizza {
   id?:         `${string}-${string}-${string}-${string}-${string}`;
   name:        string;
   size:        Size;
   ingredients: {
      name: string,
      quantity?: Quantity
   }[];
   quantity?: number
}