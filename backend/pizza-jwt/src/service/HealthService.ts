import { CustomerMessage, CustomerRoleRepository } from '../../types'

export class HealthService {
   #customerRoleRepository: CustomerRoleRepository
   #customerMessage: CustomerMessage

   constructor(customerRoleRepository: CustomerRoleRepository, customerMessage: CustomerMessage) {
      this.#customerRoleRepository = customerRoleRepository
      this.#customerMessage = customerMessage
   }

   checkIfAllServicesAreAvailable = async () => {
      try {
         const value = await this.#customerRoleRepository.databaseIsAvailable()
         this.#customerMessage.createChannel()

         return value
      } catch (error) {
         console.error(error)
         return false
      }
   }
}
