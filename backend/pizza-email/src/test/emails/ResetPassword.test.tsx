import { afterEach, describe, expect, it } from 'vitest'
import { LOCALES } from '../../constants/Locales.js'
import { cleanup, render, screen } from '@testing-library/react'
import { getTranslation } from '../../utils/getTranslations.js'
import ResetPassword, {
	ResetPasswordTranslation,
} from '../../emails/ResetPassword.js'

LOCALES.forEach((locale) => {
	describe('Welcome component tests', () => {
		afterEach(() => cleanup())

		it('Should render correctly', () => {
			render(<ResetPassword token='token' locale={locale} />)
			const t = getTranslation<ResetPasswordTranslation>(
				'resetPassword',
				locale
			)

			expect(screen.getByText(t.preview)).toBeDefined()
			expect(screen.getByText(t.message1)).toBeDefined()
			expect(screen.getByRole('link', { name: t.resetLink })).toBeDefined()
			expect(screen.getByText(t.message2)).toBeDefined()
			expect(screen.getByRole('link')).toHaveProperty(
				'href',
				`https://ordenginering.com/${locale}/auth/reset-password/token`
			)
		})
	})
})
