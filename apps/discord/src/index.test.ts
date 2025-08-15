import { expect, test, vi } from 'vitest'
import { app, main } from './index'

test('should export app instance', () => {
  expect(app).toBeDefined()
  expect(app.fetch).toBeDefined()
})

test('should export default app', async () => {
  const module = await import('./index')
  expect(module.default).toBeDefined()
  expect(module.default).toBe(app)
})

test('exports main function', () => {
  expect(main).toBeDefined()
  expect(typeof main).toBe('function')
})

test('exports app constant', () => {
  expect(app).toBeDefined()
  expect(typeof app).toBe('object')
})

test('main function can be called with app', () => {
  // Mock validateEnvironment and startServer
  vi.mock('./features/config/config', () => ({
    validateEnvironment: vi.fn(() => ({
      publicKey: 'test',
      token: 'test',
      applicationId: 'test',
      port: 3000,
    })),
  }))

  vi.mock('./features/server/server', () => ({
    startServer: vi.fn(),
  }))

  // Call main function directly
  expect(() => main(app)).not.toThrow()
})
