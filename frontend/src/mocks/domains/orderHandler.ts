import { HttpResponse, http, type PathParams } from 'msw'
import type { Order } from '@/types'

const API = 'http://localhost:4436/data/order'

export const orderHandler = [
   http.post<PathParams<never>, Order>(`${API}/save`, async ({ request }) => {
      const { country } = await request.json()

      if (country === 'MEX') {
         return new HttpResponse('Order save correctly', { status: 201 })
      }      

      return HttpResponse.json({
         desc: 'Invalid Request Content',
         fieldError: {
            name: 'Name must not be blank'
         }
      }, { status: 400 })
   })
]