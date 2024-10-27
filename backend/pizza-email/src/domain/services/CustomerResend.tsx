import { Resend } from 'resend'
import { CustomerEmail } from '../../contracts/services/CustomerEmail.js'
import Welcome from '../../emails/Welcome.js'

export class CustomerResend implements CustomerEmail {
	#emailProvider

	constructor(emailProvider: Resend) {
		this.#emailProvider = emailProvider
	}

	async sendWelcome({
		email,
		token,
		locale,
	}: {
		email: string
		token: string
		locale: 'es' | 'en'
	}) {
		await this.#emailProvider.emails.send({
			from: 'onboarding@rd34124esend.dev',
			to: email,
			subject: 'Hello World',
			react: <Welcome locale={locale} token={token} />,
		})
	}
}
