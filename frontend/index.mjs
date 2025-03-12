import express from 'express'
import { handler as ssrHandler } from './dist/server/entry.mjs'

const app = express()

/* app.use((req, _, next) => {
   const colorTime = styleText('gray', new Date().toISOString())
   const colorPath = styleText('white', req.path)
   console.log(colorTime, colorPath)
   next()
}) */

app.use((_, res, next) => {
	res.setHeader(
		'Content-Security-Policy',
		"script-src 'self' 'unsafe-inline'; object-src 'none'"
	)
	next()
})

app.use(express.static('dist/client/'))
app.use(ssrHandler)
app.use('/en/*', (_, res) =>
	res.sendFile(new URL('./dist/en/404/', import.meta.url).pathname)
)
app.use('/es/*', (_, res) =>
	res.sendFile(new URL('./dist/es/404/', import.meta.url).pathname)
)

app.use('/health', (_, res) => {
	res.status(200).send({
		uptime: globalThis.process.uptime(),
		message: 'OK',
		timestamp: Date.now(),
	})
})

const PORT = globalThis.process.env.PORT ?? 4321

app.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.info(`Server running on port ${PORT}`)
})
