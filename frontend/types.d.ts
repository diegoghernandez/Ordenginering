import type { Quantity } from "./src/constants/quantity";

export interface Pizza {
   id?:         `${string}-${string}-${string}-${string}-${string}`;
   name:        string;
   size:        Size;
   ingredients: Ingredient[];
   quantity?: number
}

export interface Ingredient {
   id?: number
   name: string,
   quantity?: Quantity
}

export interface IngredientRequest {
   id: number
   name: string,
   type: string,
   img: string,
   author: string
}

export interface Customer {
   id: number,
   name: string,
}

export interface Order {
   idCustomer: number,
   country: string,
   city: string,
   street: string,
   houseNumber: number,
   apartment?: number,
   floor?: number,
   pizzaList: Pizza[]
}