import http from 'node:http'
import { initializeMessagesQueue } from './initializers/Message.js'

await initializeMessagesQueue()

http.createServer().listen(3003)

console.log('Server initialized in port 3003')
