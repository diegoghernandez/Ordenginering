import { Request, Response } from 'express'
import { CustomerRoleRepository } from '../../../types.js'
import { HealthService } from '../../service/HealthService.js'

export class HealthController {
	#healthService: HealthService

	constructor(customerRoleRepository: CustomerRoleRepository) {
		this.#healthService = new HealthService(customerRoleRepository)
	}

	healthLiveness = async (_req: Request, res: Response) => {
		res.status(200).send({
			uptime: globalThis.process.uptime(),
			message: 'OK',
			timestamp: Date.now(),
		})
	}

	healthReadiness = async (_req: Request, res: Response) => {
		const isAvailable =
			await this.#healthService.checkIfAllServicesAreAvailable()

		if (isAvailable) {
			res.status(200).send({
				uptime: globalThis.process.uptime(),
				message: 'OK',
				timestamp: Date.now(),
			})
		} else {
			res.sendStatus(503)
		}
	}
}
