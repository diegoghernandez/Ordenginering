interface Page {
   pageable: {
      pageNumber: number;
      pageSize:   number;
      offset:     number;
      paged:      boolean;
      unpaged:    boolean;
   },
   totalPages:       number;
   totalElements:    number;
   last:             boolean;
   first:            boolean;
   size:             number;
   number:           number;
   numberOfElements: number;
   empty:            boolean;
}

export interface Ingredient {
   id?: number;
   name: string;
   quantity: number;
}

export interface IngredientDto {
   imageFile: FormData
   ingredientName: string;
   ingredientType: IngredientTypes;
   authorImage: string;
}

export interface IngredientRequest {
   idIngredient: number;
   ingredientName: string;
   ingredientType: IngredientTypes;
   authorImage: string;
   imageFileName: string;
}

export interface CustomerLogIn {
   email: string;
   password: string;
}

export interface CustomerRole {
   id: number
   role: 'USER' | 'ADMIN'
}

export interface Customer {
   customerName: string;
   email: string;
   birthDate: string;
}

export interface ValuesForChangeDto {
   id: string,
   password: string
}

export interface CustomerDto {
   customerName: string;
   email: string;
   password: string;
   matchingPassword: string;
   birthDate: string;
}

export interface Pizza {
   idPizza?:         `${string}-${string}-${string}-${string}-${string}`
   pizzaName:        string
   pizzaImageName: string,
   pizzaImageAuthor: string
   price?: number
   size:        Size
   quantity: number
   pizzaIngredients: Ingredient[]
}

export interface OrderRequest {
   idCustomer: number
   country: string
   state: string
   city: string
   street: string
   houseNumber: number
   apartment: number | null
   floor: number | null
   pizzaList: Pizza[]
}

export interface Order extends OrderRequest{
   orderId: string
   orderTimestamp: string
   total: number
}

export interface PageOrder extends Page {
   content: Order[]
}

export interface UserInputProps {
   label: string;
   description?: string;
   required?: boolean;
   error?: string;
   disable?: boolean;
}

export type ActiveLink = 'Home' | 'Menu' | 'Customize' | 'Account' | ''

export interface ProfileLinks {
   url: string,
   name: string,
   active?: boolean
}