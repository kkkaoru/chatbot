import type { ModalContext } from 'discord-hono'
import { expect, test, vi } from 'vitest'
import { feedbackHandler } from './feedback'

test('feedbackHandler should handle feedback submission', () => {
  const mockContext = {
    res: vi.fn(),
    interaction: {
      data: {
        components: [
          {
            components: [
              {
                value: 'Great service!',
              },
            ],
          },
        ],
      },
    },
  } as unknown as ModalContext

  feedbackHandler(mockContext)

  expect(mockContext.res).toHaveBeenCalledWith(
    'Thank you for your feedback: "Great service!"',
  )
})

test('feedbackHandler should handle feedback submission with empty value', () => {
  const mockContext = {
    res: vi.fn(),
    interaction: {
      data: {
        components: [
          {
            components: [
              {
                value: '',
              },
            ],
          },
        ],
      },
    },
  } as unknown as ModalContext

  feedbackHandler(mockContext)

  expect(mockContext.res).toHaveBeenCalledWith(
    'Thank you for your feedback: ""',
  )
})

test('feedbackHandler should handle feedback submission without components', () => {
  const mockContext = {
    res: vi.fn(),
    interaction: {
      data: {},
    },
  } as unknown as ModalContext

  feedbackHandler(mockContext)

  expect(mockContext.res).toHaveBeenCalledWith(
    'Thank you for your feedback: ""',
  )
})
