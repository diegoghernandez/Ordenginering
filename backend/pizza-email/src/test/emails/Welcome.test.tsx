import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Welcome from '../../emails/Welcome.js'

describe('Welcome component tests', () => {
	it('Should render correctly', () => {
		render(<Welcome locale='en' token='token' />)

		expect(
			screen.getByText('Ordeninginering verification email')
		).toBeDefined()
		expect(
			screen.getByText(
				"Welcome to Ordeninginering! You are so close to start to orden pizza, but you need to activate your account first. Click below and we'll be good to go!"
			)
		).toBeDefined()
		expect(screen.getByRole('link')).toBeDefined()
		expect(screen.getByRole('link')).toHaveProperty(
			'href',
			'https://ordeninginering.com/client/en/verify/token'
		)
	})
})
