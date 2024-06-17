import { Router } from 'express'
import { CustomerRoleRepository } from '../../../types.js'
import { JwtController } from '../controller/JwtController.js'

export function createJwtRouter(CustomerRoleRepository: CustomerRoleRepository) {
   const jwtRouter = Router()

   const jwtController = new JwtController(CustomerRoleRepository)

   jwtRouter.get('/create/:customerId', jwtController.createJwt)
   jwtRouter.get('/verify/:token', jwtController.verifyJwt)

   return jwtRouter
}
