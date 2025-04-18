import { StatusError } from '@/services/exceptions/StatusError'
import type {
	CustomerDto,
	CustomerLogIn,
	TokenStatus,
	VerifyTokenDto,
} from '@/types'

const URL = import.meta.env.PUBLIC_URL ?? 'http://localhost:8765'
export const API = URL + '/api/customer/auth'

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

	const errorResponse = await response.json()
	throw new StatusError(
		errorResponse.desc,
		response.status,
		errorResponse.fieldError
	)
}

export async function verifyToken(
	verifyTokenDto: VerifyTokenDto
): Promise<TokenStatus> {
	const response = await fetch(`${API}/verify`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(verifyTokenDto),
	})

	if (response.status === 500) return 'ERROR'

	return response.json() as Promise<TokenStatus>
}

export async function sendResetPassword({
	email,
	locale,
}: {
	email: string
	locale: string
}): Promise<string> {
	const response = await fetch(`${API}/send-reset-password`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, locale }),
	})

	if (response.ok) return response.text()

	throw new StatusError('SERVER', response.status)
}

export async function resetPassword({
	token,
	newPassword,
	repeatNewPassword,
}: VerifyTokenDto): Promise<TokenStatus> {
	const response = await fetch(`${API}/reset-password`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token, newPassword, repeatNewPassword }),
	})

	if (response.status === 500) throw new StatusError('SERVER', response.status)
	else if (!response.ok) {
		let body = ''
		try {
			body = await response.json()
		} catch {
			body = 'BAD'
		}
		throw new StatusError(body, response.status)
	}

	return response.json() as Promise<TokenStatus>
}

export async function resendToken({
	token,
	locale,
}: {
	token: string
	locale: string
}): Promise<string> {
	const response = await fetch(`${API}/resend`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token, locale }),
	})

	if (response.ok) return response.text()

	const errorResponse = await response.json()
	throw new StatusError(errorResponse.desc, response.status)
}
