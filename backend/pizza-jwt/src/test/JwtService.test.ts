import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { JwtServiceImpl } from '../domain/JwtServiceImpl.js'

const jwtService = new JwtServiceImpl()

describe('Jwt Service tests', () => {
   describe('create JWT', () => {
      it('Should be a function', () => {
         assert.equal(typeof jwtService.createJwt, 'function')
      })

      it('Should create a jwt token with an email and return it', async () => {
         const token = await jwtService.createJwt('email@example.com')

         assert.equal(typeof token, 'string')
         assert.equal(token.length, 190)
      })
   })

   describe('verify JWT', () => {
      it('Should be a function', () => {
         assert.equal(typeof jwtService.verifyJwt, 'function')
      })

      it('Should throw an error if is not a valid token', async () => {
         assert.rejects(jwtService.verifyJwt('invalid')).catch((e) =>
            assert.strictEqual(e, 'Invalid Compact JWS')
         )
      })

      it('Should return a value when verify the jwt created for createJwt function', async () => {
         const value = await jwtService.verifyJwt(await jwtService.createJwt('email@example.com'))

         assert.equal(value.payload.iss, 'pizza-jwt')
         assert.equal(value.payload.sub, 'email@example.com')
         assert.equal(value.protectedHeader.role, 'USER')
      })
   })
})
