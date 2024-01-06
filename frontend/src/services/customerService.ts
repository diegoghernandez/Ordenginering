import type { Customer } from "../types";

const URL = import.meta.env.VITE_API_URL ?? "http://localhost:4436";
const API = URL +  "/customer";

type CustomerResponse = (Omit<Response, "json"> & {
   status: 200
   json: () => Customer | PromiseLike<Customer>
})

export async function getCustomerData(email: string): Promise<CustomerResponse> {
   const response = await fetch(`${API}/email/${email}`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      },
   })

   return response.json()
}