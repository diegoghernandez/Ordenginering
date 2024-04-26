import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { JwtServiceImpl } from '../domain/JwtServiceImpl.js'
import { JwtController } from '../web/controller/JwtController.js'

const jwtController = new JwtController(new JwtServiceImpl())

describe('Jwt controller tests', () => {
   describe('createJwt controller', () => {
      it('Should be a function', () => {
         assert.strictEqual(typeof jwtController.createJwt, 'function')
      })
   })

   describe('verifyJwt controller', () => {
      it('Should be a function', () => {
         assert.strictEqual(typeof jwtController.verifyJwt, 'function')
      })
   })
   })
