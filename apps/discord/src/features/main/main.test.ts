import type { DiscordHono } from 'discord-hono'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { main } from './main'

// Mock the dependencies
vi.mock('../config/config', () => ({
  validateEnvironment: vi.fn(),
}))

vi.mock('../server/server', () => ({
  startServer: vi.fn(),
}))

describe('main', () => {
  const mockApp = { fetch: vi.fn() } as unknown as DiscordHono
  const mockExit = vi.fn()
  const originalExit = process.exit

  beforeEach(() => {
    vi.clearAllMocks()
    process.exit = mockExit as unknown as typeof process.exit
  })

  afterEach(() => {
    process.exit = originalExit
  })

  test('starts server when config is valid', async () => {
    const { validateEnvironment } = await import('../config/config')
    const { startServer } = await import('../server/server')

    const mockConfig = {
      publicKey: 'test-key',
      token: 'test-token',
      applicationId: 'test-app-id',
      port: 3000,
    }

    vi.mocked(validateEnvironment).mockReturnValue(mockConfig)

    main(mockApp)

    expect(validateEnvironment).toHaveBeenCalledOnce()
    expect(startServer).toHaveBeenCalledWith(mockApp, mockConfig)
    expect(mockExit).not.toHaveBeenCalled()
  })

  test('exits with code 1 when config is invalid', async () => {
    const { validateEnvironment } = await import('../config/config')
    const { startServer } = await import('../server/server')

    vi.mocked(validateEnvironment).mockReturnValue(null)

    // Mock process.exit to throw an error so we can catch it
    mockExit.mockImplementation(() => {
      throw new Error('process.exit called')
    })

    expect(() => main(mockApp)).toThrow('process.exit called')

    expect(validateEnvironment).toHaveBeenCalledOnce()
    expect(startServer).not.toHaveBeenCalled()
    expect(mockExit).toHaveBeenCalledWith(1)
  })
})
