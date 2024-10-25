import express from 'express'
import { CustomerMessageImpl } from './message/CustomerMessages.js'
import { CustomerRoleRepositoryImpl } from './repository/CustomerRoleRepositoryImpl.js'
import { createHealthRoute } from './web/routes/HealthRoutes.js'
import { createJwtRouter } from './web/routes/JwtRoutes.js'
import { GENERAL_SECRETS } from './env/generalSecrets.js'
import { Server } from 'node:http'
import { AddressInfo } from 'node:net'

const app = express()
const PORT = GENERAL_SECRETS.PORT ?? 0
app.use(express.json())

app.use('/jwt', createJwtRouter(new CustomerRoleRepositoryImpl()))
app.use(
	'/jwt/health',
	createHealthRoute(
		new CustomerRoleRepositoryImpl(),
		new CustomerMessageImpl()
	)
)

const customerMessage = new CustomerMessageImpl()
await customerMessage.onSaveCustomerRole()

const listen = app.listen(PORT, function (this: Server | null) {
	if (this instanceof Server) {
		const { port } = this.address() as AddressInfo
		console.log(`Server running on port ${port}`)
	}
})

export { app, listen }
