import express from 'express'
import { CustomerRoleRepositoryImpl } from './repository/CustomerRoleRepositoryImpl.js'
import { createHealthRoute } from './web/routes/HealthRoutes.js'
import { createJwtRouter } from './web/routes/JwtRoutes.js'

const app = express()
app.use(express.json())

const customerRepository = new CustomerRoleRepositoryImpl()

app.use('/jwt', createJwtRouter(customerRepository))
app.use('/jwt/health', createHealthRoute(customerRepository))

export { app }
