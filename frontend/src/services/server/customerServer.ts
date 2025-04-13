import { SERVER_DOMAIN_VARIABLES } from '@/lib/env/serverDomainVariables'
import { StatusError } from '@/services/exceptions/StatusError'
import type { Customer } from '@/types'

const URL = SERVER_DOMAIN_VARIABLES.CUSTOMER_DOMAIN ?? 'http://localhost:8765'
export const API = URL + '/api/customer'

export async function getCustomerData(
	id: number,
	cookie: string | undefined
): Promise<Customer> {
	const jwtCookie = `jwt=${cookie ?? ''}; Path=/;`

	const response = await fetch(`${API}/${id}`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Cookie: jwtCookie,
		},
	})

	if (response.ok) return response.json()
	else throw new StatusError('Customer not found', response.status)
}
