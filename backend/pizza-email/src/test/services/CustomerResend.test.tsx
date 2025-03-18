import { render } from '@react-email/components'
import { Resend } from 'resend'
import { describe, expect, it, vi } from 'vitest'
import { CustomerResend } from '../../domain/services/CustomerResend.js'
import Welcome from '../../emails/Welcome.js'
import { LOCALES } from '../../constants/Locales.js'

LOCALES.forEach((locale) => {
	describe(`${locale}: CustomerResend tests`, () => {
		it('Should send the email with the right data', async () => {
			const resend = new Resend(process.env.RESEND_KEY)
			const customerResend = new CustomerResend(resend)
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
					from: 'onboarding@rd34124esend.dev',
					to: 'nuevo@email.com',
					subject: 'Hello World',
					html,
					react: <Welcome token={data.token} locale={locale} />,
				})
			})
		})
	})
})
