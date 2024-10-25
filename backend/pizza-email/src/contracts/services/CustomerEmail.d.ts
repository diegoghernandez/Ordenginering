export interface CustomerEmail {
	#emailProvider
	sendWelcome: (params: {
		email: string
		token: string
		locale: 'es' | 'en'
	}) => Promise<void>
}
