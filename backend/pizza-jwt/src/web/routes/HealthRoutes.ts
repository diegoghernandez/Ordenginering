import { Router } from 'express'
import { CustomerRoleRepository } from '../../../types.js'
import { HealthController } from '../controller/HealthController.js'

export function createHealthRoute(
	customerRoleRepository: CustomerRoleRepository
) {
	const healthRouter = Router()

	const healthController = new HealthController(customerRoleRepository)

	healthRouter.get('/liveness', healthController.healthLiveness)
	healthRouter.get('/readiness', healthController.healthReadiness)

	return healthRouter
}
