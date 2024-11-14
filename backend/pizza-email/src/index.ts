import http from 'node:http'
import { initializeMessagesQueue } from './initializers/Message.js'

await initializeMessagesQueue()

http.createServer().listen(3003)
