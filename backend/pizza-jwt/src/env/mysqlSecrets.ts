export const MYSQL_SECRETS = Object.freeze({
   MYSQL_DOMAIN: globalThis.process.env.MYSQL_DOMAIN,
   MYSQL_PORT: globalThis.process.env.MYSQL_DOMAIN?.split(':')[1],
   MYSQL_USERNAME: globalThis.process.env.MYSQL_USERNAME,
   MYSQL_PASSWORD: globalThis.process.env.MYSQL_PASSWORD
})
