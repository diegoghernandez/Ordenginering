import express from 'express'
import { JwtServiceImpl } from './domain/JwtServiceImpl.js'
import { createJwtRouter } from './web/routes/JwtRoutes.js'

const app = express()
app.use(express.json())

app.use('/jwt', createJwtRouter(new JwtServiceImpl()))

export { app }

const PORT = 3001

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})
