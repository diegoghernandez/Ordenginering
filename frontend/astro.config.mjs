import node from '@astrojs/node'
import react from '@astrojs/react'
import { defineConfig } from 'astro/config'
import { ASTRO_VARIABLES } from './src/env-config/astroVariables'

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  base: 'client',
  devToolbar: {
    enabled: false
  },
  site: ASTRO_VARIABLES.SITE ?? 'http://localhost',
  server: { 
    port: ASTRO_VARIABLES.PORT ? Number(ASTRO_VARIABLES.PORT) : 4321
  },
  integrations: [react()],
  prefetch: true,
  adapter: node({
    mode: 'standalone'
  })
})