import { authHandler } from '@/mocks/domains/authHandler'
import { createServer } from '@mswjs/http-middleware'

export default function globalSetup() {
	createServer(undefined, ...authHandler).listen(8765)
}
