import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { validateEnvironment } from './config'

const originalEnv: NodeJS.ProcessEnv = { ...process.env }
const consoleErrorSpy: ReturnType<typeof vi.spyOn> = vi
  .spyOn(console, 'error')
  .mockImplementation(() => {
    // Intentionally empty - suppress console.error output in tests
  })

beforeEach(() => {
  process.env = { ...originalEnv }
  consoleErrorSpy.mockClear()
})

afterEach(() => {
  process.env = originalEnv
})

test('validateEnvironment returns config when all required environment variables are present', () => {
  process.env.DISCORD_PUBLIC_KEY = 'test-public-key'
  process.env.DISCORD_TOKEN = 'test-token'
  process.env.DISCORD_APPLICATION_ID = 'test-app-id'
  process.env.PORT = '8080'

  const config = validateEnvironment()

  expect(config).toEqual({
    publicKey: 'test-public-key',
    token: 'test-token',
    applicationId: 'test-app-id',
    port: '8080',
  })
  expect(consoleErrorSpy).not.toHaveBeenCalled()
})

test('validateEnvironment uses default port 3000 when PORT is not set', () => {
  process.env.DISCORD_PUBLIC_KEY = 'test-public-key'
  process.env.DISCORD_TOKEN = 'test-token'
  process.env.DISCORD_APPLICATION_ID = 'test-app-id'
  process.env.PORT = undefined

  const config = validateEnvironment()

  expect(config).toEqual({
    publicKey: 'test-public-key',
    token: 'test-token',
    applicationId: 'test-app-id',
    port: 3000,
  })
  expect(consoleErrorSpy).not.toHaveBeenCalled()
})

test('validateEnvironment returns null and logs error when DISCORD_PUBLIC_KEY is missing', () => {
  process.env.DISCORD_PUBLIC_KEY = undefined
  process.env.DISCORD_TOKEN = 'test-token'
  process.env.DISCORD_APPLICATION_ID = 'test-app-id'

  const config = validateEnvironment()

  expect(config).toBeNull()
  expect(consoleErrorSpy).toHaveBeenCalledWith('DISCORD_PUBLIC_KEY is required')
})

test('validateEnvironment returns null and logs error when DISCORD_TOKEN is missing', () => {
  process.env.DISCORD_PUBLIC_KEY = 'test-public-key'
  process.env.DISCORD_TOKEN = undefined
  process.env.DISCORD_APPLICATION_ID = 'test-app-id'

  const config = validateEnvironment()

  expect(config).toBeNull()
  expect(consoleErrorSpy).toHaveBeenCalledWith('DISCORD_TOKEN is required')
})

test('validateEnvironment returns null and logs error when DISCORD_APPLICATION_ID is missing', () => {
  process.env.DISCORD_PUBLIC_KEY = 'test-public-key'
  process.env.DISCORD_TOKEN = 'test-token'
  process.env.DISCORD_APPLICATION_ID = undefined

  const config = validateEnvironment()

  expect(config).toBeNull()
  expect(consoleErrorSpy).toHaveBeenCalledWith(
    'DISCORD_APPLICATION_ID is required',
  )
})
