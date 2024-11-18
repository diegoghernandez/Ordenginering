import type { CustomerDto, CustomerLogIn } from '@/types'
import { http, HttpResponse, type PathParams } from 'msw'

const API = 'http://localhost:8765/customer/auth'

export const authHandler = [
	http.post<PathParams<never>, CustomerLogIn>(
		`${API}/login`,
		async ({ request }) => {
			const newCustomer = await request.json()

			if (newCustomer.password === '1234') {
				return new HttpResponse('4', {
					status: 200,
					headers: {
						'set-cookie': 'jwt=token; Domain=localhost; Path=/;',
					},
				})
			}

			return new HttpResponse(null, { status: 403 })
		}
	),

	http.head(`${API}/logout`, async () => {
		return new HttpResponse(null, {
			status: 200,
			headers: {
				'set-cookie': 'jwt=; Domain=localhost; Path=/; Max-Age=0;',
			},
		})
	}),

	http.post<PathParams<never>, CustomerDto>(
		`${API}/register`,
		async ({ request }) => {
			const newCustomer = await request.json()

			if (newCustomer.email !== 'repeat@email.com') {
				return HttpResponse.text('Account create successfully')
			}

			return HttpResponse.json(
				{ desc: 'Email is already used', fieldError: null },
				{ status: 400 }
			)
		}
	),

	http.get(`${API}/verify/:token`, ({ params }) => {
		const token = params?.token

		if (token === 'correct')
			return HttpResponse.text('SUCCESSFUL', { status: 200 })

		if (token === 'expired') {
			return HttpResponse.text('EXPIRED', { status: 200 })
		}

		return new HttpResponse(null, { status: 500 })
	}),
]
