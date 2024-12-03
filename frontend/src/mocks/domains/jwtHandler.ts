import { HttpResponse, http } from 'msw'

const API = 'http://localhost:3000/jwt'

export const jwtHandler = [
	http.get(`${API}/verify/:token`, ({ params }) => {
		const { token } = params
		if (token === 'token') {
			return HttpResponse.json({ id: 432, role: 'ADMIN' }, { status: 200 })
		}

		return new HttpResponse(null, { status: 400 })
	}),
]
