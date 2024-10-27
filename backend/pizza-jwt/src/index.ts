import { Server } from 'node:http'
import { AddressInfo } from 'node:net'
import { app } from './app.js'
import { GENERAL_SECRETS } from './env/generalSecrets.js'
import { initializeRabbitSetup } from './rabbitSetup.js'

const PORT = GENERAL_SECRETS.PORT ?? 0

await initializeRabbitSetup()

app.listen(PORT, function (this: Server | null) {
	if (this instanceof Server) {
		const { port } = this.address() as AddressInfo
		console.log(`Server running on port ${port}`)
	}
})
