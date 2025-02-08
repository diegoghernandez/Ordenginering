import node from '@astrojs/node'
import react from '@astrojs/react'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
	output: 'hybrid',
	base: 'client',
	devToolbar: {
		enabled: false,
	},
	integrations: [react()],
	adapter: node({
		mode: 'middleware',
	}),
	i18n: {
		defaultLocale: 'en',
		locales: ['es', 'en'],
		routing: 'manual',
	},
})
