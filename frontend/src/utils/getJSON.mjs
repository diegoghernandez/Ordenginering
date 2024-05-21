import { createRequire } from 'node:module'

export const getJSON = createRequire(import.meta.url)
