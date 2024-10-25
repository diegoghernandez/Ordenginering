import { Resend } from 'resend'
import { CustomerEmail } from '../../contracts/services/CustomerEmail.js'
import Welcome from '../../emails/Welcome.js'

export class CustomerResend implements CustomerEmail {
	#resend: Resend

	constructor(emailProvider: Resend) {
		this.#resend = emailProvider
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
		await this.#resend.emails.send({
			from: 'onboarding@rd34124esend.dev',
			to: email,
			subject: 'Hello World',
			react: <Welcome locale={locale} token={token} />,
		})
	}
}
