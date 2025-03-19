type EmailParams = {
	email: string
	token: string
	locale: 'es' | 'en'
}

export interface CustomerEmail {
	sendWelcome: (params: EmailParams) => Promise<void>

	resetPassword: (params: EmailParams) => Promise<void>
}
