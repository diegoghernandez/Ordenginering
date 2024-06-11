import { defineConfig } from 'vitest/config'

export default defineConfig({
   test: {
      globalSetup: [
         './src/test/globalSetup/mysqlContainer.ts',
         './src/test/globalSetup/rabbitmqContainer.ts'
      ]
      /* testTimeout: 1000 * 20,
      teardownTimeout: 1000 * 20 */
   }
})
