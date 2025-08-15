import type { CommandContext } from 'discord-hono'
import { expect, test, vi } from 'vitest'

import {
  createMockChatInputData,
  createMockContext,
} from '../../test-utils/command-helpers'
import { helloHandler } from './hello'

test('helloHandler should return Hello, World! when no name is provided', () => {
  const data = createMockChatInputData('hello', [])
  const mockContext = createMockContext(data)

  helloHandler(mockContext)

  expect(mockContext.res).toHaveBeenCalledWith('Hello, World!')
})

test('helloHandler should return Hello with provided name', () => {
  const data = createMockChatInputData('hello', [
    {
      name: 'name',
      value: 'Alice',
      type: 3,
    },
  ])
  const mockContext = createMockContext(data)

  helloHandler(mockContext)

  expect(mockContext.res).toHaveBeenCalledWith('Hello, Alice!')
})

test('helloHandler should return error message for invalid command type', () => {
  const mockContext = {
    res: vi.fn(),
    interaction: {
      data: {
        id: 'test',
        type: 2, // Context menu type (not chat input)
        name: 'hello-context',
      },
    },
  } as unknown as CommandContext

  helloHandler(mockContext)

  expect(mockContext.res).toHaveBeenCalledWith('Invalid command type')
})
