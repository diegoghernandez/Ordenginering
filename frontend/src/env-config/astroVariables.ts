const { ASTRO_SITE, ASTRO_PORT} = globalThis.process.env

export const ASTRO_VARIABLES = Object.freeze({
   PORT: ASTRO_PORT,
   SITE: ASTRO_SITE
})