import { authHandler } from '@/mocks/domains/authHandler'
import { changeCustomerHandler } from '@/mocks/domains/changeCustomerHandler'
import { customerHandler } from '@/mocks/domains/customerHandler'
import { ingredientHandler } from '@/mocks/domains/ingredientHandler'
import { jwtHandler } from '@/mocks/domains/jwtHandler'
import { orderHandler } from '@/mocks/domains/orderHandler'
import { createServer } from '@mswjs/http-middleware'
import type { Server } from 'node:http'

let httpCustomerServer: Server
let httpIngredientServer: Server
let httpJwtServer: Server
let httpOrderServer: Server

export function initializeMSWServers() {
	httpCustomerServer = createServer(
		...customerHandler,
		...authHandler,
		...changeCustomerHandler
	).listen(8765)
	httpIngredientServer = createServer(...ingredientHandler).listen(2222)
	httpJwtServer = createServer(...jwtHandler).listen(3000)
	httpOrderServer = createServer(...orderHandler).listen(4436)
}

export function closeMSWServers() {
	httpCustomerServer.close()
	httpIngredientServer.close()
	httpJwtServer.close()
	httpOrderServer.close()
}
