import { http, HttpResponse } from 'msw'
import CustomerJSON from '../fixtures/customer.json' with { type: 'json' }

const API = 'http://localhost:8765/api/customer'

export const customerHandler = [
   http.get(`${API}/:id`, ({ params }) => {
      const { id } = params
      if (id === '32') {
         return HttpResponse.json(CustomerJSON)
      }

      return new HttpResponse(null, { status: 404 })
   })
]