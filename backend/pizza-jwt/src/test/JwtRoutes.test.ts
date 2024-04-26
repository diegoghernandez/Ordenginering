import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import supertest from 'supertest'
import { app } from '../index.js'

const api = supertest(app)

describe('Jwt routes tests', () => {
   describe('create jwt route', () => {
      it('Should get a error message from no send a correct email', async () => {
         const { text } = await api
            .get('/jwt/create/example@com')
            .expect(400)
            .expect('Content-Type', /text\/html/)

            assert.equal(text, 'Email not valid')
      })

      it('Should get the jwt from the route', async () => {
         const { text: token } = await api
            .get('/jwt/create/email@example.com')
            .expect(200)
            .expect('Content-Type', /text\/html/)

            assert.equal(typeof token, 'string')
            assert.equal(token.length, 190)
      })
   })

   describe('verify jwt route', () => {
      it('Should get a 401 if the token is not valid', async () => {
         await api
            .get('/jwt/verify/invalid')
            .expect(401)
      })

      it('Should validate the token of create route, and get a 200 and an object', async () => {
         const { text } = await api.get('/jwt/create/email@example.com')
         const { body } = await api
            .get(`/jwt/verify/${text}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

         assert.notStrictEqual(body, { role: 'USER', subject: 'email@example.com' })
      })
   })
})
