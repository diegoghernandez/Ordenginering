export const RABBIT_CONFIG = Object.freeze({
	hostname: globalThis.process.env.RABBIT_HOST ?? 'localhost',
	username: globalThis.process.env.RABBIT_USERNAME ?? 'guest',
	password: globalThis.process.env.RABBIT_PASSWORD ?? 'guest',
	protocol: globalThis.process.env.RABBIT_PROTOCOL ?? 'amqp',
	port: Number(globalThis.process.env.RABBIT_PORT ?? 5672),
})
