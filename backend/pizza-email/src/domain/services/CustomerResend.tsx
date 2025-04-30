import { Resend } from 'resend'
import {
	CustomerEmail,
	EmailParams,
} from '../../contracts/services/CustomerEmail.js'
import ResetPassword from '../../emails/ResetPassword.js'
import Welcome from '../../emails/Welcome.js'

export class CustomerResend implements CustomerEmail {
	#senderEmail = 'Diego <sender@alerts.ordenginering.com>'
	#emailProvider

	constructor(emailProvider: Resend) {
		this.#emailProvider = emailProvider
	}

	async sendWelcome({ email, token, locale }: EmailParams) {
		await this.#emailProvider.emails.send({
			from: this.#senderEmail,
			to: email,
			subject: 'Sender',
			react: <Welcome token={token} locale={locale} />,
		})
	}

	async resetPassword({ email, token, locale }: EmailParams) {
		await this.#emailProvider.emails.send({
			from: this.#senderEmail,
			to: email,
			subject: 'Sender',
			react: <ResetPassword token={token} locale={locale} />,
		})
	}
}
