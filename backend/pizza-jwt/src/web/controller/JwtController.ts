import { Request, Response } from 'express'
import { z } from 'zod'
import { JwtService } from '../../domain/service/JwtService.js'

export class JwtController {
   readonly jwtService: JwtService

   constructor(jwtService: JwtService) {
      this.jwtService = jwtService
   }

   createJwt = async (req: Request, res: Response): Promise<void> => {
      const emailParser = z.string().email()
      const email = emailParser.safeParse(req.params.email)

      if (!email.success) {
         res.status(400).send('Email not valid')
         return
      }

      this.jwtService.createJwt(email.data)
         .then((token) => res.send(token))
         .catch(() => res.sendStatus(400))
   }

   verifyJwt = async (req: Request, res: Response): Promise<void> => {
      const { token } = req.params

      this.jwtService.verifyJwt(token)
         .then((result) => res.status(200).json({
            subject: result.payload.sub,
            role: result.protectedHeader.role
         }))
         .catch(() => res.sendStatus(401))
   }
}
