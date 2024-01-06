import type { ThrowStatement } from "typescript";
import type { Pizza } from "../types";
import { StatusError } from "./exceptions/StatusError";

const URL = import.meta.env.VITE_API_URL ?? "http://localhost:4436";
const API = URL +  "/pizza";

type PizzaResponse = (Omit<Response, "json"> & {
   status: 200
   json: () => Pizza | PromiseLike<Pizza>
})

export async function getPizzaByAccount(id: number): Promise<PizzaResponse | ThrowStatement> {
   const response = await fetch(`${API}/account/${id}`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      },
   }) 

   if (response.ok) return response.json()

   throw new StatusError('Pizza not found')
}