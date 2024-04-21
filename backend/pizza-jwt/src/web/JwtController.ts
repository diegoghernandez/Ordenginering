import { Router } from 'express'
import { createJwt, verifyJwt } from '../domain/JwtService'

const router = Router()

router.post('/create/:email', (req, res) => {
   const { email } = req.params
   createJwt(email)
      .then((token) => res.send(token))
      .catch(() => res.sendStatus(400))
})

router.get('/verify', (req, res) => {
   const token = req.headers.authorization ?? ''

   if (!token) {
      res.status(403).send('No token provided')
      return
   }

   verifyJwt(token)
      .then((result) => res.status(200).json({
         subject: result.payload.sub,
         role: result.protectedHeader.role
      }))
      .catch(() => res.sendStatus(401))
})

export default router
