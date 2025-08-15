import type { DiscordHono } from 'discord-hono'
import { afterEach, describe, expect, test, vi } from 'vitest'
import type { DiscordConfig } from '../config/config'
import { startServer } from './server'

// Helper to mock Bun.serve
function mockBunServe(): {
  mockServe: ReturnType<typeof vi.fn>
  mockServer: { stop: ReturnType<typeof vi.fn>; port: number }
} {
  const mockServer = { stop: vi.fn(), port: 0 }
  const mockServe = vi.fn().mockReturnValue(mockServer)

  Object.defineProperty(globalThis, 'Bun', {
    value: { serve: mockServe },
    writable: true,
    configurable: true,
  })

  return { mockServe, mockServer }
}

// Helper to restore original Bun
function restoreGlobalBun(originalBun: unknown): void {
  Object.defineProperty(globalThis, 'Bun', {
    value: originalBun,
    writable: true,
    configurable: true,
  })
}

describe('server', () => {
  describe('startServer', () => {
    const originalBun = globalThis.Bun

    afterEach(() => {
      restoreGlobalBun(originalBun)
    })

    test('should start server with correct config', () => {
      const mockApp = {
        fetch: vi.fn(),
      } as unknown as DiscordHono

      const config: DiscordConfig = {
        publicKey: 'test-public-key',
        token: 'test-token',
        applicationId: 'test-app-id',
        port: 8080,
      }

      const { mockServe } = mockBunServe()

      const server = startServer(mockApp, config)

      expect(mockServe).toHaveBeenCalledWith({
        port: 8080,
        fetch: mockApp.fetch,
      })
      expect(server).toBeDefined()
    })

    test('should handle string port', () => {
      const mockApp = {
        fetch: vi.fn(),
      } as unknown as DiscordHono

      const config: DiscordConfig = {
        publicKey: 'test-public-key',
        token: 'test-token',
        applicationId: 'test-app-id',
        port: '3000',
      }

      const { mockServe } = mockBunServe()

      const server = startServer(mockApp, config)

      expect(mockServe).toHaveBeenCalledWith({
        port: '3000',
        fetch: mockApp.fetch,
      })
      expect(server).toBeDefined()
    })
  })
})
