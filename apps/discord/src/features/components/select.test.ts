import type { ComponentContext } from 'discord-hono'
import { expect, test, vi } from 'vitest'
import { selectHandler } from './select'

test('selectHandler should handle select menu with values', () => {
  const mockContext = {
    res: vi.fn(),
    update: vi.fn(),
    interaction: {
      data: {
        values: ['option1', 'option2'],
      },
    },
  } as unknown as ComponentContext

  selectHandler(mockContext)

  expect(mockContext.update).toHaveBeenCalledWith(true)
  expect(mockContext.res).toHaveBeenCalledWith({
    content: 'You selected: option1, option2',
  })
})

test('selectHandler should handle select menu without values', () => {
  const mockContext = {
    res: vi.fn(),
    update: vi.fn(),
    interaction: {
      data: {},
    },
  } as unknown as ComponentContext

  selectHandler(mockContext)

  expect(mockContext.update).toHaveBeenCalledWith(true)
  expect(mockContext.res).toHaveBeenCalledWith({
    content: 'You selected: ',
  })
})
