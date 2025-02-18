import { CORS_HEADERS } from '@/constants/corsHeaders'
import type { CustomerDto, CustomerLogIn } from '@/types'
import { http, HttpResponse, type PathParams } from 'msw'

const API = 'http://localhost:8765/customer/auth'

export const authHandler = [
	http.options('*', () => {
		return new Response(null, {
			status: 200,
			headers: CORS_HEADERS,
		})
	}),

	http.post<PathParams<never>, CustomerLogIn>(
		`${API}/login`,
		async ({ request }) => {
			const newCustomer = await request.json()

			if (newCustomer.password === '1234') {
				return new HttpResponse('4', {
					status: 200,
					headers: {
						'set-cookie': 'jwt=token; Domain=localhost; Path=/;',
						...CORS_HEADERS,
					},
				})
			}

			return new HttpResponse(null, { status: 403, headers: CORS_HEADERS })
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
				return HttpResponse.text('CREATED', {
					headers: CORS_HEADERS,
				})
			}

			return HttpResponse.json(
				{ desc: 'EMAIL', fieldError: null },
				{ status: 400, headers: CORS_HEADERS }
			)
		}
	),

	http.get(`${API}/verify/:token`, ({ params }) => {
		const token = params?.token

		if (token === 'correct')
			return HttpResponse.json('SUCCESSFUL', { status: 200 })

		if (token === 'expired' || token === 'failure') {
			return HttpResponse.json('EXPIRED', { status: 200 })
		}

		return new HttpResponse(null, { status: 500 })
	}),

	http.post<PathParams<never>, { token: string }>(
		`${API}/resend`,
		async ({ request }) => {
			const { token } = await request.json()

			if (token === 'expired')
				return HttpResponse.text('SUCCESS', {
					status: 200,
					headers: CORS_HEADERS,
				})

			return HttpResponse.json(
				{
					desc: 'SERVER',
				},
				{
					status: 400,
					headers: CORS_HEADERS,
				}
			)
		}
	),
]
