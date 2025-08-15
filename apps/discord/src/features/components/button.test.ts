import type { ComponentContext } from 'discord-hono'
import { expect, test, vi } from 'vitest'
import { buttonHandler } from './button'

test('buttonHandler should handle button click with customId', () => {
  const mockContext = {
    res: vi.fn(),
    update: vi.fn(),
    interaction: {
      customId: 'test-button',
    },
  } as unknown as ComponentContext

  buttonHandler(mockContext)

  expect(mockContext.update).toHaveBeenCalledWith(true)
  expect(mockContext.res).toHaveBeenCalledWith({
    content: 'You clicked: test-button',
  })
})

test('buttonHandler should handle button click without customId', () => {
  const mockContext = {
    res: vi.fn(),
    update: vi.fn(),
    interaction: {},
  } as unknown as ComponentContext

  buttonHandler(mockContext)

  expect(mockContext.update).toHaveBeenCalledWith(true)
  expect(mockContext.res).toHaveBeenCalledWith({
    content: 'You clicked: ',
  })
})
