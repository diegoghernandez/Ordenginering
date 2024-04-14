import type { Quantity } from '@/constants/quantity'

export interface Pizza {
   id?:         `${string}-${string}-${string}-${string}-${string}`;
   pizzaName:        string;
   image: string;
   size:        Size;
   quantity: number;
   ingredientNameDtoList: Ingredient[];
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
   customerName: string;
   email: string;
   birthDate: Date;
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
   state: string;
   city: string;
   street: string;
   houseNumber: number;
   apartment: number | null;
   floor: number | null;
   pizzaList: Pizza[];
}

export interface UserInputProps {
   label: string;
   description?: string;
   required?: boolean;
   error?: boolean;
   disable?: boolean;
}