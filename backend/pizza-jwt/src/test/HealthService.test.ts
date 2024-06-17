import { describe, expect, it } from 'vitest'
import { CustomerMessageImpl } from '../message/CustomerMessages'
import { CustomerRoleRepositoryImpl } from '../repository/CustomerRoleRepositoryImpl'
import { HealthService } from '../service/HealthService'

const healthService = new HealthService(new CustomerRoleRepositoryImpl(), new CustomerMessageImpl())

describe('HealthService tests', () => {
   describe('checkIfAllServicesAreAvailable tests', () => {
      it('Should be a function', async () => {
         expect(typeof healthService.checkIfAllServicesAreAvailable).toBe('function')
      })

      it('Should return true if every service is available', async () => {
         expect(await healthService.checkIfAllServicesAreAvailable()).toBeTruthy()
      })
   })
})
