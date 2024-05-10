import { handlers } from '@/mocks/handlers'
import { test as base, expect } from '@playwright/test'
import { createWorkerFixture, type MockServiceWorker } from 'playwright-msw'

const test = base.extend<{
   worker: MockServiceWorker
}>({
   worker: createWorkerFixture(handlers)
})

export { expect, test }
