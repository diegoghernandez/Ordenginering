import { getJSON } from '@/utils/getJSON.mjs'
import { http, HttpResponse } from 'msw'

const API = 'http://localhost:8765/customer'

export const customerHandler = [
   http.get(`${API}/:id`, ({ params }) => {
      const { id } = params
      if (id === '32') {
         return HttpResponse.json(getJSON('../mocks/fixtures/customer.json'))
      }

      return new HttpResponse(null, { status: 404 })
   })
]