import { describe, expect, it } from 'vitest'
import { CustomerMessageImpl } from '../message/CustomerMessages.js'
import { CustomerRoleRepositoryImpl } from '../repository/CustomerRoleRepositoryImpl.js'
import { HealthService } from '../service/HealthService.js'

const healthService = new HealthService(
	new CustomerRoleRepositoryImpl(),
	new CustomerMessageImpl()
)

describe('HealthService tests', () => {
	describe('checkIfAllServicesAreAvailable tests', () => {
		it('Should be a function', async () => {
			expect(typeof healthService.checkIfAllServicesAreAvailable).toBe(
				'function'
			)
		})

		it('Should return true if every service is available', async () => {
			expect(
				await healthService.checkIfAllServicesAreAvailable()
			).toBeTruthy()
		})
	})
})
