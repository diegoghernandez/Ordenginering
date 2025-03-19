import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { LOCALES } from '../../constants/Locales.js'
import Welcome, { WelcomeTranslation } from '../../emails/Welcome.js'
import { getTranslation } from '../../utils/getTranslations.js'
import { CLIENT_DOMAIN } from '../../constants/ClientDomain.js'

LOCALES.forEach((locale) => {
	describe('Welcome component tests', () => {
		afterEach(() => cleanup())

		it('Should render correctly', () => {
			render(<Welcome token='token' locale={locale} />)
			const t = getTranslation<WelcomeTranslation>('welcome')[locale]

			expect(screen.getByText(t.preview)).toBeDefined()
			expect(screen.getByText(t.message)).toBeDefined()
			expect(
				screen.getByRole('link', { name: t.activationLink })
			).toBeDefined()
			expect(screen.getByRole('link')).toHaveProperty(
				'href',
				`${CLIENT_DOMAIN}/${locale}/verify?token=token`
			)
		})
	})
})
