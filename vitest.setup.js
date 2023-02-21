import matchers from '@testing-library/jest-dom/matchers'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, expect } from 'vitest'
import authRequest from './src/msw/auth.msw'
import productRequests from './src/msw/product.msw'
import userRequests from './src/msw/user.msw'

expect.extend(matchers)

const server = setupServer(...authRequest, ...productRequests, ...userRequests)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
