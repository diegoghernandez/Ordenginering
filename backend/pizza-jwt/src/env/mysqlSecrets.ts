const [MYSQL_DOMAIN, MYSQL_PORT] = globalThis.process.env.MYSQL_DOMAIN?.split(':') ?? [null, null]

export const MYSQL_SECRETS = Object.freeze({
   MYSQL_DOMAIN,
   MYSQL_PORT,
   MYSQL_USERNAME: globalThis.process.env.MYSQL_USERNAME,
   MYSQL_PASSWORD: globalThis.process.env.MYSQL_PASSWORD
})
