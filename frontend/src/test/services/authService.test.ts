import {
	logIn,
	logOut,
	registerCustomer,
	resendToken,
	verifyAccount,
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
			).rejects.toThrow('Email is already used')
		})

		it('Should return a good message', async () => {
			const content = await registerCustomer({
				customerName: 'Juan',
				email: 'email@email.com',
				password: '1234',
				matchingPassword: '1234',
				birthDate: '2002-2-12',
			})

			expect(content).toStrictEqual('Account create successfully')
		})
	})

	describe('verifyAccount tests', () => {
		it('Should be a function', () => {
			expect(typeof verifyAccount).toBe('function')
		})

		it('Should get the ERROR response', async () => {
			const tokenStatus = await verifyAccount('fail')

			expect(tokenStatus).toStrictEqual('ERROR')
		})

		it('Should get the EXPIRED response', async () => {
			const tokenStatus = await verifyAccount('expired')

			expect(tokenStatus).toStrictEqual('EXPIRED')
		})

		it('Should get the SUCCESSFUL response', async () => {
			const tokenStatus = await verifyAccount('correct')

			expect(tokenStatus).toStrictEqual('SUCCESSFUL')
		})
	})

	describe('resend token tests', () => {
		it('Should be a function', () => {
			expect(typeof resendToken).toBe('function')
		})

		it('Should receive an error', async () => {
			await expect(resendToken({ token: 'whatever' })).rejects.toThrow(
				new StatusError('Server error', 400)
			)
		})

		it('Should send the token correctly', async () => {
			const tokenStatus = await resendToken({
				token: '950f0699-d6be-4c54-8e6c-c5713ab53c43',
			})

			expect(tokenStatus).toStrictEqual('SUCCESS')
		})
	})
})
