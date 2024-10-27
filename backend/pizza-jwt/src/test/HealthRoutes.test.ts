import supertest from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'
import { app } from '../app.js'

const api = supertest(app)

describe.concurrent('Jwt routes tests', () => {
	beforeEach(() => {
		const listen = app.listen()

		return () => listen.close()
	})

	describe('healthLiveness tests', () => {
		it('Should return an object with startup data', async () => {
			const { body } = await api
				.get('/jwt/health/liveness')
				.expect(200)
				.expect('Content-Type', /application\/json/)

			expect(body).toHaveProperty('uptime')
			expect(body).toHaveProperty('uptime')
			expect(body).toHaveProperty('timestamp')
		})
	})

	describe('healthReadiness tests', () => {
		it('Should return an object with startup data', async () => {
			const { body } = await api
				.get('/jwt/health/readiness')
				.expect(200)
				.expect('Content-Type', /application\/json/)

			expect(body).toHaveProperty('uptime')
			expect(body).toHaveProperty('uptime')
			expect(body).toHaveProperty('timestamp')
		})
	})
})
