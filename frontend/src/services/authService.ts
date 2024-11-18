import type { CustomerDto, CustomerLogIn, TokenStatus } from '@/types'
import { StatusError } from '@/services/exceptions/StatusError'

const URL = import.meta.env.PUBLIC_URL ?? 'http://localhost:8765'
export const API = URL + '/customer/auth'

export async function logIn(customerLogIn: CustomerLogIn): Promise<string> {
	const response = await fetch(`${API}/login`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(customerLogIn),
	})

	if (response.ok) return response.text()
	else throw new StatusError('Invalid credentials', response.status)
}

export async function logOut(): Promise<boolean> {
	const response = await fetch(`${API}/logout`, {
		method: 'HEAD',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	if (response.ok) return true

	throw new StatusError('Server is not reachable', response.status)
}

export async function registerCustomer(
	customerDto: CustomerDto
): Promise<string> {
	const response = await fetch(`${API}/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(customerDto),
	})

	if (response.ok) return response.text()
	else {
		const errorResponse = await response.json()
		throw new StatusError(
			errorResponse.desc,
			response.status,
			errorResponse.fieldError
		)
	}
}

export async function verifyAccount(
	token: string | undefined
): Promise<TokenStatus> {
	const response = await fetch(`${API}/verify/${token}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	if (response.status === 500) return 'ERROR'

	return response.text() as Promise<TokenStatus>
}
