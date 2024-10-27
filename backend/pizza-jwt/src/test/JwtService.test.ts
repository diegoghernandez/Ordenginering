import assert from 'node:assert/strict'
import { describe, it } from 'vitest'
import { CustomerRoleMysql } from '../repository/CustomerRoleMysql.js'
import { JwtService } from '../service/JwtService.js'

const jwtService = new JwtService(new CustomerRoleMysql())

describe('Jwt Service tests', () => {
	describe('create JWT', () => {
		it('Should be a function', () => {
			assert.equal(typeof jwtService.createJwt, 'function')
		})

		it('Should throw an error if the customer role is not found', async () => {
			await assert.rejects(jwtService.createJwt(43245), {
				message: 'Customer not found',
			})
		})

		it('Should create a jwt token with an email and return it', async () => {
			const token = await jwtService.createJwt(1)

			assert.equal(typeof token, 'string')
			assert.equal(token.length > 1, true)
		})
	})

	describe('verify JWT', () => {
		it('Should be a function', () => {
			assert.equal(typeof jwtService.verifyJwt, 'function')
		})

		it('Should throw an error if is not a valid token', async () => {
			await assert.rejects(jwtService.verifyJwt('invalid'), {
				message: 'Invalid Compact JWS',
			})
		})

		it('Should return a value when verify the jwt created for createJwt function', async () => {
			const value = await jwtService.verifyJwt(await jwtService.createJwt(1))

			assert.equal(value.payload.iss, 'pizza-jwt')
			assert.equal(value.protectedHeader.id, 1)
			assert.equal(value.protectedHeader.role, 'USER')
		})
	})
})
