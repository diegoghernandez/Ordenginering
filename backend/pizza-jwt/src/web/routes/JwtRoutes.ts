import { Router } from 'express'
import { JwtService } from '../../domain/service/JwtService.js'
import { JwtController } from '../controller/JwtController.js'

export function createJwtRouter(jwtService: JwtService): Router {
   const jwtRouter = Router()

   const jwtController = new JwtController(jwtService)

   jwtRouter.get('/create/:email', jwtController.createJwt)
   jwtRouter.get('/verify/:token', jwtController.verifyJwt)

   return jwtRouter
}
