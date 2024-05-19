import { HttpResponse, http, type PathParams } from 'msw'
import type { Order } from '@/types'
import { getJSON } from '@/utils/getJSON'

const API = 'http://localhost:4436/data/order'

export const orderHandler = [
   http.get(`${API}/customer/:id`, ({ params }) => {
      const { id } = params
      if (id === '32') {
         return HttpResponse.json(getJSON('../mocks/fixtures/orders.json'))
      }

      return new HttpResponse(null, { status: 404 })
   }),

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