import supertest from 'supertest'
import { afterAll, describe, expect, it } from 'vitest'
import { app, listen } from '../index'

const api = supertest(app)

describe.concurrent('Jwt routes tests', () => {
   afterAll(() => {
      listen.close()
   })

   describe('healthLiveness tests', () => {
      it('Should return an object with startup data', async () => {
         const { body } = await api
               .get('/health/liveness')
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
               .get('/health/readiness')
               .expect(200)
               .expect('Content-Type', /application\/json/)

         expect(body).toHaveProperty('uptime')
         expect(body).toHaveProperty('uptime')
         expect(body).toHaveProperty('timestamp')
      })
   })
})
