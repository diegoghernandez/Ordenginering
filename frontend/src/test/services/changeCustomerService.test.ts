import { changeEmail, changePassword, changeProfile } from '@/services/changeCustomerService'
import { describe, expect, it } from 'vitest'

describe('ChangeCustomerService tests', () => {
   describe('changeProfile tests', () => {
      it('Should be a function', () => {
         expect(typeof changeProfile).toBe('function')
      })

      it('Should throw a error with the following message', async () => {
         await expect(changeProfile({
            name: 'New name' ,
            birthDate: '2020-02-02',
            id: '23',
            password: 'wrong'
         })).rejects.toThrow('No older enough')
      })

      it('Should return a good message', async () => {
         const response = await changeProfile({
            name: 'New name',
            birthDate: '1990-02-02',
            id: '23',
            password: 'correct'
         })

         expect(response).toBe('Change profile correctly')
      })
   })

   describe('changePassword tests', () => {
      it('Should be a function', () => {
         expect(typeof changePassword).toBe('function')
      })

      it('Should throw a error with the following message', async () => {
         await expect(changePassword({
            newPassword: '1234', 
            id: '23',
            password: 'wrong'
         })).rejects.toThrow('Incorrect password')
      })

      it('Should return a good message', async () => {
         const response = await changePassword({
            newPassword: '1234', 
            id: '23',
            password: 'correct'
         })

         expect(response).toBe('Change password correctly')
      })
   })

   describe('changeEmail tests', () => {
      it('Should be a function', () => {
         expect(typeof changeEmail).toBe('function')
      })

      it('Should throw a error with the following message', async () => {
         await expect(changeEmail({
            email: '1234', 
            id: '23',
            password: 'wrong'
         })).rejects.toThrow('Incorrect password')
      })

      it('Should return a good message', async () => {
         const response = await changeEmail({
            email: '1234', 
            id: '23',
            password: 'correct'
         })

         expect(response).toBe('Change email correctly')
      })
   })
})