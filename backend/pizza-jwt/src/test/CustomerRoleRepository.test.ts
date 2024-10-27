import assert from 'node:assert/strict'
import { describe, it } from 'vitest'
import { CustomerRoleMysql } from '../repository/CustomerRoleMysql.js'

const customerRoleRepository = new CustomerRoleMysql()

describe('CustomRoleRepository tests', () => {
	describe('databaseIsAvailable tests', () => {
		it('Should be a function', async () => {
			assert.equal(
				typeof customerRoleRepository.databaseIsAvailable,
				'function'
			)
		})

		it('Should get an array with the desired customerRoleId', async () => {
			assert.equal(await customerRoleRepository.databaseIsAvailable(), true)
		})
	})

	describe('existById tests', () => {
		it('Should be a function', async () => {
			assert.equal(typeof customerRoleRepository.existById, 'function')
		})

		it("Should get an empty array if the customerRoleId doesn't exist", async () => {
			assert.equal(await customerRoleRepository.existById(9045385342), false)
		})

		it('Should get an array with the desired customerRoleId', async () => {
			assert.equal(await customerRoleRepository.existById(3), true)
		})
	})

	describe('geByCustomerRoleId tests', () => {
		it('Should be a function', async () => {
			assert.equal(
				typeof customerRoleRepository.geByCustomerRoleId,
				'function'
			)
		})

		it("Should get an empty array if desired CustomerRole value doesn't exist", async () => {
			assert.deepEqual(
				await customerRoleRepository.geByCustomerRoleId(453678),
				[]
			)
		})

		it('Should get an array with the desired CustomerRole value', async () => {
			assert.deepEqual(await customerRoleRepository.geByCustomerRoleId(3), [
				{ customer_role_id: 3, role_name: 'DEMO' },
			])
		})
	})

	describe('save tests', () => {
		it('Should be a function', async () => {
			assert.equal(typeof customerRoleRepository.save, 'function')
		})

		it('Should save one Customer Role correctly', async () => {
			await customerRoleRepository.save(54365)

			assert.deepEqual(
				await customerRoleRepository.geByCustomerRoleId(54365),
				[{ customer_role_id: 54365, role_name: 'USER' }]
			)
		})
	})
})
