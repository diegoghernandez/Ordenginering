import { http, HttpResponse, type PathParams } from 'msw'
import type { CustomerDto } from '@/types'

const API = 'http://localhost/data/customer'

export const customerHandler = [
   http.get(`${API}/id/:id`, ({ params }) => {
      const { id } = params
      if (id === '32') {
         return HttpResponse.json({
            'idCustomer': 3213,
            'customerName': 'Customer',
            'email': 'random@random.com',
         })
      }
   }),

   http.post<PathParams<never>, CustomerDto>(`${API}/register`, async ({ request }) => {
      const newCustomer = await request.json()

      if (newCustomer.password === newCustomer.matchingPassword) {
         return HttpResponse.text('Account create successfully')
      }

      // eslint-disable-next-line quotes
      return HttpResponse.text("Passwords don't match")
   })
]