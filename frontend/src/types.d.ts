import type { Quantity } from '@/constants/quantity'

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
   idIngredient: number
   ingredientName: string,
   ingredientType: string,
   authorImage: string,
   urlImage: string
}

export interface Customer {
   id: number,
   name: string,
}

export interface CustomerDto {
   customerName: string,
   email: string,
   password: string,
   matchingPassword: string,
   birthDate: Date
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