import type { Quantity } from "./constants/quantity";

export interface Pizza {
   id?:         `${string}-${string}-${string}-${string}-${string}`;
   name:        string;
   size:        Size;
   ingredients: Ingredient[];
   quantity?: number
}

export interface Ingredient {
   id: number
   name: string,
   quantity?: Quantity
}

export interface Customer {
   id: number,
   name: string,
}