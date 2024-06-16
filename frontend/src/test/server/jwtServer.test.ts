import { getRoles } from '@/services/server/jwtServer'
import { describe, expect, it } from 'vitest'

describe('Jwt server  tests', () => {
   describe('getRoles tests', () => {
      it('Should be a function', () => {
         expect(typeof getRoles).toBe('function')
      })

      it('Should throw a error with the following message', async () => {
         await expect(getRoles('wrong')).rejects.toThrow('Invalid token')
      })

      it('Should return the right values', async () => {
         const content = await getRoles('token')
   
         expect(content).toStrictEqual({ id: 432, role: 'USER' })
      })
   })
})