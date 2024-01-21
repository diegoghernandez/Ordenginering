import { HttpResponse, http, type PathParams } from "msw";
import type { Order } from "../../../types";

const API = 'http://localhost:4436/order';

export const orderHandler = [
   http.post<PathParams<never>, Order>(`${API}/save`, async ({ request }) => {
      const { idCustomer } = await request.json()

      if (String(idCustomer) === '234') {
         return new HttpResponse(null, { status: 201 })
      }      

      return new HttpResponse(null, { status: 400 })
   })
]