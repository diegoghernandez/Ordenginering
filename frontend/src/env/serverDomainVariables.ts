const { CUSTOMER_SERVICE_DOMAIN, ORDER_SERVICE_DOMAIN, JWT_SERVICE_DOMAIN } = globalThis.process.env

function buildUrl(domain: string | undefined) {
   return domain ? 'http://' + domain : null
}

export const SERVER_DOMAIN_VARIABLES = Object.freeze({
   CUSTOMER_DOMAIN:  buildUrl(CUSTOMER_SERVICE_DOMAIN),
   ORDER_DOMAIN: buildUrl(ORDER_SERVICE_DOMAIN),
   JWT_DOMAIN: buildUrl(JWT_SERVICE_DOMAIN)
})