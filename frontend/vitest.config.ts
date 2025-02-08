/// <reference types='vitest' />
import { getViteConfig } from 'astro/config'
import { configDefaults } from 'vitest/config'

export default getViteConfig({
	test: {
		environment: 'happy-dom',
		setupFiles: './src/test/setup-vitest.ts',
		exclude: [
			...configDefaults.exclude,
			'./src/test/e2e/**',
			'./node_modules/**',
		],
	},
})
