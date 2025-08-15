import type { CommandContext } from 'discord-hono'
import { expect, test, vi } from 'vitest'
import { pingHandler } from './ping'

test('pingHandler should return Pong!', () => {
  const mockContext = {
    res: vi.fn(),
  } as unknown as CommandContext

  pingHandler(mockContext)

  expect(mockContext.res).toHaveBeenCalledWith('Pong!')
})
