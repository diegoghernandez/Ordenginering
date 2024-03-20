import { http, HttpResponse, type PathParams } from 'msw'
import type { CustomerDto } from '@/types'

const API = 'http://localhost/customer'

export const customerHandler = [
   http.get(`${API}/:id`, ({ params }) => {
      const { id } = params
      if (id === '32') {
         return HttpResponse.json({
            'customerName': 'Customer',
            'email': 'random@random.com',
            'birthDate': '2002-06-12'
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