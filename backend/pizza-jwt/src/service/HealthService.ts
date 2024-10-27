import { connect } from 'amqplib'
import { CustomerRoleRepository } from '../../types.js'
import { RABBIT_CONFIG } from '../constants/RabbitConfig.js'

export class HealthService {
	#customerRoleRepository: CustomerRoleRepository

	constructor(customerRoleRepository: CustomerRoleRepository) {
		this.#customerRoleRepository = customerRoleRepository
	}

	checkIfAllServicesAreAvailable = async () => {
		try {
			const value = await this.#customerRoleRepository.databaseIsAvailable()
			const connection = await connect(RABBIT_CONFIG)
			await connection.createChannel()

			return value
		} catch (error) {
			console.error(error)
			return false
		}
	}
}
