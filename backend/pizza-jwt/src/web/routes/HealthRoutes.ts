import { Router } from 'express'
import { HealthController } from '../controller/HealthController.js'
import { CustomerMessage, CustomerRoleRepository } from '../../../types.js'

export function createHealthRoute(
	customerRoleRepository: CustomerRoleRepository,
	customerMessage: CustomerMessage
) {
	const healthRouter = Router()

	const healthController = new HealthController(
		customerRoleRepository,
		customerMessage
	)

	healthRouter.get('/liveness', healthController.healthLiveness)
	healthRouter.get('/readiness', healthController.healthReadiness)

	return healthRouter
}
