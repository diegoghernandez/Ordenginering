import { HttpResponse, http } from 'msw';

const API = 'http://localhost:4436/ingredient';

export const ingredientsHandler = [
   http.get(`${API}/all`, () => HttpResponse.json([
      {
         'id': 1,
         'name': 'BBQ sauce', 
         'urlImage': 'sauces/bbq',
         'authorImage': 'Image by KamranAydinov on Freepik'
      },{ 
         'id': 2,
         'name': 'Pesto sauce', 
         'urlImage': 'sauces/pesto',
         'authorImage': 'Foto de Artur Rutkowski en Unsplash'
      },{ 
         'id': 3,
         'name': 'Buffalo sauce', 
         'urlImage': 'sauces/buffalo',
         'authorImage': 'Image by jcomp on Freepik'
      },{ 
         'id': 4,
         'name': 'Tomato sauce',
         'urlImage': 'sauces/tomato',
         'authorImage': 'Foto de D. L. Samuels en Unsplash'
      }
   ]))
]