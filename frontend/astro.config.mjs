import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

import node from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  base: 'client',
  integrations: [react()],
  prefetch: true,
  adapter: node({
    mode: 'standalone'
  })
})