import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		environment: 'happy-dom',
		setupFiles: ['./src/test/setup/envSetup.ts'],
		globalSetup: ['./src/test/globalSetup/rabbitmqContainer.ts'],
	},
})
