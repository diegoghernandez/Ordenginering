import { defineConfig } from 'cypress'
import vitePreprocessor from 'cypress-vite'

export default defineConfig({
   e2e: {
      baseUrl: 'http://localhost:4321/client',
      setupNodeEvents(on) {
         on('file:preprocessor', vitePreprocessor())
      },
   }
})