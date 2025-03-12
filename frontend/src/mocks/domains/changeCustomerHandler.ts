import { CORS_HEADERS } from '@/constants/corsHeaders'
import type { ChangeProfileValues } from '@/services/changeCustomerService'
import type { ValuesForChangeDto } from '@/types'
import { HttpResponse, http, type PathParams } from 'msw'

const API = 'http://localhost:8765/api/customer/change'

type ChangePasswordParam = {
	password: string
}

type ChangeEmailParam = {
	email: string
}

export const changeCustomerHandler = [
	http.patch<PathParams<never>, ChangeProfileValues>(
		`${API}/profile`,
		async ({ request }) => {
			const { birthDate } = await request.json()

			if (birthDate !== '2020-02-02') {
				return HttpResponse.text('Change profile correctly', {
					headers: CORS_HEADERS,
				})
			}

			return new HttpResponse('No older enough', {
				status: 400,
				headers: CORS_HEADERS,
			})
		}
	),

	http.patch<ChangePasswordParam, ValuesForChangeDto>(
		`${API}/password/:password`,
		async ({ request }) => {
			const { password } = await request.json()

			if (password === 'correct') {
				return HttpResponse.text('Change password correctly', {
					headers: CORS_HEADERS,
				})
			}

			return new HttpResponse('Incorrect password', {
				status: 400,
				headers: CORS_HEADERS,
			})
		}
	),

	http.patch<ChangeEmailParam, ValuesForChangeDto>(
		`${API}/email/:email`,
		async ({ request }) => {
			const { password } = await request.json()

			if (password === 'correct') {
				return HttpResponse.text('Change email correctly', {
					headers: CORS_HEADERS,
				})
			}

			return new HttpResponse('Incorrect password', {
				status: 400,
				headers: CORS_HEADERS,
			})
		}
	),
]
