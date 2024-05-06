import { Router } from 'express'
import { JwtController } from '../controller/JwtController.js'
import { CustomerRoleRepositoryImpl } from '../../repository/CustomerRoleRepositoryImpl.js'

export function createJwtRouter(customerRoleRepositoryImpl: CustomerRoleRepositoryImpl) {
   const jwtRouter = Router()

   const jwtController = new JwtController(customerRoleRepositoryImpl)

   jwtRouter.get('/create/:customerId', jwtController.createJwt)
   jwtRouter.get('/verify/:token', jwtController.verifyJwt)

   return jwtRouter
}
