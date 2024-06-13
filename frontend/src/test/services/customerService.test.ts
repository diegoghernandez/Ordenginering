import { logIn, registerCustomer } from '@/services/customerService'
import { describe, expect, it } from 'vitest'

describe('Customer service tests', () => {
   describe('registerCustomer tests', () => {
      it('Should be a function', () => {
         expect(typeof logIn).toBe('function')
      })

      it('Should throw a error with the following message', async () => {
         await expect(logIn({
            email: 'email@email.com',
            password: 'wrong',
         })).rejects.toThrow('Invalid credentials')
      })

      it('Should return a good message', async () => {
         const response = await logIn({
            email: 'email@email.com',
            password: '1234',
         })

         expect(response).toBe('4')
      })
   })

   describe('registerCustomer tests', () => {
      it('Should be a function', () => {
         expect(typeof registerCustomer).toBe('function')
      })

      it('Should return a bad message', async () => {
         await expect(registerCustomer({
            customerName: 'Juan',
            email: 'repeat@email.com',
            password: '1234',
            matchingPassword: '1234',
            birthDate: '2002-2-12'
         })).rejects.toThrow('Email is already used')
      })

      it('Should return a good message', async () => {
         const content = await registerCustomer({
            customerName: 'Juan',
            email: 'email@email.com',
            password: '1234',
            matchingPassword: '1234',
            birthDate: '2002-2-12'
         })

         expect(content).toStrictEqual('Account create successfully')
      })
   })
})