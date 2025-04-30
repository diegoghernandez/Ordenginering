import { render } from '@react-email/components'
import { Resend } from 'resend'
import { describe, expect, it, vi } from 'vitest'
import { CustomerResend } from '../../domain/services/CustomerResend.js'
import Welcome from '../../emails/Welcome.js'
import { LOCALES } from '../../constants/Locales.js'
import ResetPassword from '../../emails/ResetPassword.js'

const resend = new Resend(process.env.RESEND_KEY)
const customerResend = new CustomerResend(resend)
const senderEmail = 'Diego <sender@alerts.ordenginering.com>'

LOCALES.forEach((locale) => {
	describe(`${locale}: CustomerResend tests`, () => {
		it('Should send the welcome email with the right data', async () => {
			vi.spyOn(resend.emails, 'send')
			const data = {
				email: 'nuevo@email.com',
				token: 'token',
				locale,
			}

			await customerResend.sendWelcome(data)

			const html = await render(
				<Welcome token={data.token} locale={locale} />
			)
			await vi.waitFor(() => {
				expect(resend.emails.send).toBeCalledTimes(1)
				expect(resend.emails.send).toHaveBeenCalledWith({
					from: senderEmail,
					to: 'nuevo@email.com',
					subject: 'Sender',
					html,
					react: <Welcome token={data.token} locale={locale} />,
				})
			})
		})

		it('Should send the reset password email with the right data', async () => {
			vi.spyOn(resend.emails, 'send')
			const data = {
				email: 'nuevo@email.com',
				token: 'token',
				locale,
			}

			await customerResend.resetPassword(data)

			const html = await render(
				<ResetPassword token={data.token} locale={locale} />
			)
			await vi.waitFor(() => {
				expect(resend.emails.send).toBeCalledTimes(1)
				expect(resend.emails.send).toHaveBeenCalledWith({
					from: senderEmail,
					to: 'nuevo@email.com',
					subject: 'Sender',
					html,
					react: <ResetPassword token={data.token} locale={locale} />,
				})
			})
		})
	})
})
