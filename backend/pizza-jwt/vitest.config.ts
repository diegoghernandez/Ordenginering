import { defineConfig } from 'vitest/config'

export default defineConfig({
   test: {
      globalSetup: ['./src/test/__setup__.ts']
      /* testTimeout: 1000 * 20,
      teardownTimeout: 1000 * 20 */
   }
})
