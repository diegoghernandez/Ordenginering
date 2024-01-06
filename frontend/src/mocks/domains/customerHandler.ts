import { http, HttpResponse } from 'msw'

const API = 'http://localhost:4436/customer'

export const customerHandler = [
   http.get(`${API}/email/:email`, ({ params }) => {
      const { email } = params
      if (email === 'random@random.com') {
         return HttpResponse.json({
            'idCustomer': 3213,
            'customerName': 'Customer',
            'email': 'random@random.com',
         })
      }
   })
]