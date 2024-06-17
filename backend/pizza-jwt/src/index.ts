import express from 'express'
import { CustomerMessageImpl } from './message/CustomerMessages.js'
import { CustomerRoleRepositoryImpl } from './repository/CustomerRoleRepositoryImpl.js'
import { createHealthRoute } from './web/routes/HealthRoutes.js'
import { createJwtRouter } from './web/routes/JwtRoutes.js'

const app = express()
app.use(express.json())

app.use('/jwt', createJwtRouter(new CustomerRoleRepositoryImpl()))
app.use('/health', createHealthRoute(new CustomerRoleRepositoryImpl(), new CustomerMessageImpl()))

const PORT = 3000

const customerMessage = new CustomerMessageImpl()
customerMessage.onSaveCustomerRole()

const listen = app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})

export { app, listen }
