import express from 'express'
import { handler as ssrHandler } from './dist/server/entry.mjs'

const app = express()

const base = '/client'
app.use(base, express.static('dist/client/'))
app.use(ssrHandler)
app.use(base + '/*', (_, res) => res.sendFile(new URL('./dist/client/404.html', import.meta.url).pathname))

app.use(base + '/health', (_, res) => {
   res.status(200).send({
      uptime: globalThis.process.uptime(),
      message: 'OK',
      timestamp: Date.now()
   })
})

const PORT = globalThis.process.env.PORT ?? 4321

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})