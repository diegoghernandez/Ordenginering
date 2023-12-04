/// <reference types='vitest' />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
   test: {
      globals: true,
      environment: 'happy-dom',
      setupFiles: './src/test/setup-vitest.ts'
   },
});