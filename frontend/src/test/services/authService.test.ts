import {
	logIn,
	logOut,
	registerCustomer,
	resendToken,
	resetPassword,
	sendResetPassword,
	verifyToken,
} from '@/services/authService'
import { StatusError } from '@/services/exceptions/StatusError'
import { describe, expect, it } from 'vitest'

describe('Auth service tests', () => {
	describe('login tests', () => {
		it('Should be a function', () => {
			expect(typeof logIn).toBe('function')
		})

		it('Should throw a error with the following message', async () => {
			await expect(
				logIn({
					email: 'email@email.com',
					password: 'wrong',
				})
			).rejects.toThrow('Invalid credentials')
		})

		it('Should return a good message', async () => {
			const response = await logIn({
				email: 'email@email.com',
				password: '1234',
			})

			expect(response).toBe('4')
		})
	})

	describe('logout tests', () => {
		it('Should be a function', () => {
			expect(typeof logOut).toBe('function')
		})

		it('Should return true if the response is ok', async () => {
			const result = await logOut()
			expect(result).toBe(true)
		})
	})

	describe('registerCustomer tests', () => {
		it('Should be a function', () => {
			expect(typeof registerCustomer).toBe('function')
		})

		it('Should return a bad message', async () => {
			await expect(
				registerCustomer({
					customerName: 'Juan',
					email: 'repeat@email.com',
					password: '1234',
					matchingPassword: '1234',
					birthDate: '2002-2-12',
				})
			).rejects.toThrow('EMAIL')
		})

		it('Should return a good message', async () => {
			const content = await registerCustomer({
				customerName: 'Juan',
				email: 'email@email.com',
				password: '1234',
				matchingPassword: '1234',
				birthDate: '2002-2-12',
			})

			expect(content).toStrictEqual('CREATED')
		})
	})

	describe('verifyToken tests', () => {
		it('Should be a function', () => {
			expect(typeof verifyToken).toBe('function')
		})

		it('Should get the ERROR response', async () => {
			const tokenStatus = await verifyToken('fail')

			expect(tokenStatus).toStrictEqual('ERROR')
		})

		it('Should get the EXPIRED response', async () => {
			const tokenStatus = await verifyToken('expired')

			expect(tokenStatus).toStrictEqual('EXPIRED')
		})

		it('Should get the SUCCESSFUL response', async () => {
			const tokenStatus = await verifyToken('correct')

			expect(tokenStatus).toStrictEqual('SUCCESSFUL')
		})
	})

	describe('sendResetPassword tests', () => {
		it('Should be a function', () => {
			expect(typeof sendResetPassword).toBe('function')
		})

		it('Should get a SERVER error', async () => {
			await expect(sendResetPassword('')).rejects.toThrowError(
				new StatusError('SERVER', 500)
			)
		})

		it('Should get the SUCCESSFUL response', async () => {
			const tokenStatus = await sendResetPassword('email@example.test')

			expect(tokenStatus).toStrictEqual('SUCCESSFUL')
		})
	})

	describe('reset password tests', () => {
		it('Should be a function', () => {
			expect(typeof resetPassword).toBe('function')
		})

		it('Should get the EXPIRED response', async () => {
			await expect(
				resetPassword({
					token: 'expired',
					newPassword: 'same',
					repeatNewPassword: 'same',
				})
			).rejects.toThrowError(new StatusError('EXPIRED', 400))
		})

		it('Should get a bad request if the password are not equals', async () => {
			await expect(
				resetPassword({
					token: 'correct',
					newPassword: 'same',
					repeatNewPassword: 'no-same',
				})
			).rejects.toThrowError(new StatusError('BAD', 400))
		})

		it('Should get the SUCCESSFUL response', async () => {
			const tokenStatus = await resetPassword({
				token: 'correct',
				newPassword: 'same',
				repeatNewPassword: 'same',
			})

			expect(tokenStatus).toStrictEqual('SUCCESSFUL')
		})
	})

	describe('resend token tests', () => {
		it('Should be a function', () => {
			expect(typeof resendToken).toBe('function')
		})

		it('Should receive an error', async () => {
			await expect(resendToken({ token: 'whatever' })).rejects.toThrow(
				new StatusError('SERVER', 400)
			)
		})

		it('Should resend the token correctly', async () => {
			const tokenStatus = await resendToken({
				token: 'expired',
			})

			expect(tokenStatus).toStrictEqual('SUCCESS')
		})
	})
})
