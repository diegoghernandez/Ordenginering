import { closeMSWServers } from './mswServer'

export default function teardown() {
	closeMSWServers()
}
