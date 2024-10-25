import assert from 'node:assert/strict'
import supertest from 'supertest'
import { afterAll, describe, it } from 'vitest'
import { app, listen } from '../index.js'

const api = supertest(app)

describe('Jwt routes tests', () => {
	afterAll(() => {
		listen.close()
	})

	describe('create jwt route', () => {
		it('Should get a error message from no send a correct email', async () => {
			const { text } = await api
				.get('/jwt/create/-213')
				.expect(400)
				.expect('Content-Type', /text\/html/)

			assert.equal(text, 'Invalid id')
		})

		it('Should get the jwt from the route', async () => {
			const { text: token } = await api
				.get('/jwt/create/2')
				.expect(200)
				.expect('Content-Type', /text\/html/)

			assert.equal(typeof token, 'string')
			assert.equal(token.length > 1, true)
		})
	})

	describe('verify jwt route', () => {
		it('Should get a 401 if the token is not valid', async () => {
			await api.get('/jwt/verify/invalid').expect(401)
		})

		it('Should validate the token of create route, and get a 200 and an object', async () => {
			const { text } = await api.get('/jwt/create/2')
			const { body } = await api
				.get(`/jwt/verify/${text}`)
				.expect(200)
				.expect('Content-Type', /application\/json/)

			assert.deepEqual(body, { id: 2, role: 'USER' })
		})
	})
})
