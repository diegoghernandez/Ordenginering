import express from 'express'
import { createJwtRouter } from './web/routes/JwtRoutes.js'
import { CustomerRoleRepositoryImpl } from './repository/CustomerRoleRepositoryImpl.js'

const app = express()
app.use(express.json())

app.use('/jwt', createJwtRouter(new CustomerRoleRepositoryImpl()))

const PORT = 3000

const listen = app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})

export { app, listen }
