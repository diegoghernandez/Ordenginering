import { Request, Response } from 'express'
import { z } from 'zod'
import { JwtService } from '../../service/JwtService.js'
import { CustomerRoleRepository } from '../../../types.js'

export class JwtController {
   #jwtService: JwtService

   constructor(customerRoleRepository: CustomerRoleRepository) {
      this.#jwtService = new JwtService(customerRoleRepository)
   }

   createJwt = async (req: Request, res: Response) => {
      const idParser = z.number().positive()
      const customerId = idParser.safeParse(Number(req.params.customerId))

      if (!customerId.success) {
         res.status(400).send('Invalid id')
         return
      }

      this.#jwtService.createJwt(customerId.data)
         .then((token) => res.send(token))
         .catch(() => res.sendStatus(404))
   }

   verifyJwt = async (req: Request, res: Response) => {
      const { token } = req.params

      this.#jwtService.verifyJwt(token)
         .then((result) => res.status(200).json({
            id: result.protectedHeader.id,
            role: result.protectedHeader.role
         }))
         .catch(() => res.sendStatus(401))
   }
}
