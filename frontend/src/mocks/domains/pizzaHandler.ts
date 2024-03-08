import { HttpResponse, http } from 'msw';

const API = 'http://localhost/pizza';

export const pizzaHandler = [
   http.get(`${API}/account/:id`, ({ params }) => {
      const { id } = params

      if (id === '2312') {
         return HttpResponse.json([
            {
               'id': '480870a9-af45-4d2c-bda2-7a6e6e3a1ab8',
               'name': 'Pepperoni',
               'price': 32134.43,
               'size': 'LARGE',
               'requestTime': '2024-06-26T21:02:13.374219',
               'image': {
                  'url': 'pepperoni',
                  'author': 'Foto de Fernando Andrade en Unsplash'
               },
               'ingredients': [{
                  'name': 'Pepperoni',
                  'quantity': 'NORMAL'
               }, {
                  'name': 'Mozzarella',
                  'quantity': 'EXTRA'
               }]
            },
            {
               'id': 'de534482-033a-4629-9238-b9e8fd544fdc',
               'name': 'Pepperoni',
               'price': 32134.43,
               'size': 'LARGE',
               'requestTime': '2024-06-26T21:02:13.374219',
               'image': {
                  'url': 'pepperoni',
                  'author': 'Foto de Fernando Andrade en Unsplash'
               },
               'ingredients': [{
                  'name': 'Pepperoni',
                  'quantity': 'NORMAL'
               }, {
                  'name': 'Mozzarella',
                  'quantity': 'EXTRA'
               }]
            }
         ])
      }

      return new HttpResponse(null, { status: 404 })
   })
]
