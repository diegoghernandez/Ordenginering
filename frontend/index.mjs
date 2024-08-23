import express from 'express'
import { handler as ssrHandler } from './dist/server/entry.mjs'
import { styleText } from 'node:util'

const app = express()

app.use((req, _, next) => {
   const colorTime = styleText('blue', new Date().toISOString() + ':')
   const colorPath = styleText('redBright', req.path)
   console.log(colorTime, colorPath);
   next()
})

app.use((_, res, next) => {
   res.setHeader('Content-Security-Policy', "script-src 'self' 'unsafe-inline'; object-src 'none'")
   next()
})

const base = '/client'

app.use(base, express.static('dist/client/'))
app.use(ssrHandler)
app.use(base + '/en/*', (_, res) => res.sendFile(new URL('./dist/client/en/404/', import.meta.url).pathname))
app.use(base + '/es/*', (_, res) => res.sendFile(new URL('./dist/client/es/404/', import.meta.url).pathname))

app.use(base + '/health', (_, res) => {
   res.status(200).send({
      uptime: globalThis.process.uptime(),
      message: 'OK',
      timestamp: Date.now()
   })
})

const PORT = globalThis.process.env.PORT ?? 4321

app.listen(PORT, () => {
   // eslint-disable-next-line no-console
   console.info(`Server running on port ${PORT}`)
})