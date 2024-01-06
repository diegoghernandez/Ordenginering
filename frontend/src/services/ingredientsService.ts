import type { Ingredient } from "../types";

const URL = import.meta.env.VITE_API_URL ?? "http://localhost:4436";
const API = URL +  "/ingredient";

type IngredientResponse = (Omit<Response, "json"> & {
   status: 200
   json: () => Ingredient | PromiseLike<Ingredient>
})

export async function getAllIngredients(): Promise<IngredientResponse> {
   const response = await fetch(`${API}/all`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      },
   })

   return response.json()
}