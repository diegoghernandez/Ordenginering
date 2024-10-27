export interface CustomerEmail {
	sendWelcome: (params: {
		email: string
		token: string
		locale: 'es' | 'en'
	}) => Promise<void>
}
