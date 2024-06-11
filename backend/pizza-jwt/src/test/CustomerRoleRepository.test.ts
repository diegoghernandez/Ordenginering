import assert from 'node:assert/strict'
import { describe, it } from 'vitest'
import { CustomerRoleRepositoryImpl } from '../repository/CustomerRoleRepositoryImpl.js'

const customerRoleRepository = new CustomerRoleRepositoryImpl()

describe('CustomRoleRepository tests', () => {
   describe('existById tests', () => {
      it('Should be a function', async () => {
         assert.equal(typeof customerRoleRepository.existById, 'function')
      })

      it("Should get an empty array if the customerRoleId doesn't exist", async () => {
         assert.deepEqual(await customerRoleRepository.existById(9045385342), [])
      })

      it('Should get an array with the desired customerRoleId', async () => {
         assert.deepEqual(
            await customerRoleRepository.existById(3),
            [{ customer_role_id: 3 }]
         )
      })
   })

   describe('geByCustomerRoleId tests', () => {
      it('Should be a function', async () => {
         assert.equal(typeof customerRoleRepository.geByCustomerRoleId, 'function')
      })

      it("Should get an empty array if desired CustomerRole value doesn't exist", async () => {
         assert.deepEqual(await customerRoleRepository.geByCustomerRoleId(453678), [])
      })

      it('Should get an array with the desired CustomerRole value', async () => {
         assert.deepEqual(
            await customerRoleRepository.geByCustomerRoleId(3),
            [{ customer_role_id: 3, role_name: 'DEMO' }]
         )
      })
   })

   describe('save tests', () => {
      it('Should be a function', async () => {
         assert.equal(typeof customerRoleRepository.save, 'function')
      })

      it('Should save one Customer Role correctly', async () => {
         await customerRoleRepository.save(6345)

         assert.deepEqual(
            await customerRoleRepository.geByCustomerRoleId(6345),
            [{ customer_role_id: 6345, role_name: 'USER' }]
         )
      })
   })
})
