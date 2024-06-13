import type { OrderRequest } from '@/types'
import { getJSON } from '@/utils/getJSON.mjs'
import { HttpResponse, http, type PathParams } from 'msw'

const API = 'http://localhost:4436/order'

export const orderHandler = [
   http.get(`${API}/customer/:id`, ({ params }) => {
      const { id } = params
      if (id === '32') {
         return HttpResponse.json(getJSON('../mocks/fixtures/orders.json'))
      }

      return new HttpResponse(null, { status: 404 })
   }),

   http.post<PathParams<never>, OrderRequest>(`${API}`, async ({ request }) => {
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