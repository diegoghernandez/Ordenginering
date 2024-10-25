export const RABBIT_CONFIG = Object.freeze({
	hostname: process.env.RABBIT_HOST ?? 'localhost',
	username: process.env.RABBIT_USERNAME ?? 'guest',
	password: process.env.RABBIT_PASSWORD ?? 'guest',
	protocol: process.env.RABBIT_PROTOCOL ?? 'amqp',
	port: Number(process.env.RABBIT_PORT ?? 5672),
})
