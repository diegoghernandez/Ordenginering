import type { Quantity } from '@/constants/quantity'

export interface Pizza {
   id?:         `${string}-${string}-${string}-${string}-${string}`;
   pizzaName:        string;
   size:        Size;
   ingredientNameDtoList: Ingredient[];
   quantity?: number
}

export interface Ingredient {
   id?: number;
   name: string;
   quantity: Quantity;
}

export interface IngredientRequest {
   idIngredient: number;
   ingredientName: string;
   ingredientType: IngredientTypes;
   authorImage: string;
   urlImage: string;
}

export interface Customer {
   id: number;
   name: string;
}

export interface CustomerDto {
   customerName: string;
   email: string;
   password: string;
   matchingPassword: string;
   birthDate: Date;
}

export interface Order {
   idCustomer: number;
   country: string;
   city: string;
   street: string;
   houseNumber: number;
   apartment: number | null;
   floor: number | null;
   pizzaList: Pizza[];
}