import type { CommandContext } from 'discord-hono'
import { expect, test, vi } from 'vitest'

import {
  createMockChatInputData,
  createMockContext,
} from '../../test-utils/command-helpers'
import { echoHandler } from './echo'

test('echoHandler should return error message when no message is provided', () => {
  const data = createMockChatInputData('echo', [])
  const mockContext = createMockContext(data)

  echoHandler(mockContext)

  expect(mockContext.res).toHaveBeenCalledWith(
    'Please provide a message to echo!',
  )
})

test('echoHandler should echo the provided message', () => {
  const data = createMockChatInputData('echo', [
    {
      name: 'message',
      value: 'Test message',
      type: 3,
    },
  ])
  const mockContext = createMockContext(data)

  echoHandler(mockContext)

  expect(mockContext.res).toHaveBeenCalledWith('Test message')
})

test('echoHandler should return error message for invalid command type', () => {
  const mockContext = {
    res: vi.fn(),
    interaction: {
      data: {
        id: 'test',
        type: 2, // Context menu type (not chat input)
        name: 'echo-context',
      },
    },
  } as unknown as CommandContext

  echoHandler(mockContext)

  expect(mockContext.res).toHaveBeenCalledWith('Invalid command type')
})
