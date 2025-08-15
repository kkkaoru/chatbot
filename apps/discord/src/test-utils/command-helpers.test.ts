import type {
  APIApplicationCommandInteractionDataStringOption,
  APIChatInputApplicationCommandInteractionData,
} from 'discord-api-types/v10'
import { ApplicationCommandType } from 'discord-api-types/v10'
import { expect, test, vi } from 'vitest'

import { createMockChatInputData, createMockContext } from './command-helpers'

test('createMockChatInputData should create valid chat input data with default options', () => {
  const data = createMockChatInputData('test-command')

  expect(data).toEqual({
    id: 'test',
    type: ApplicationCommandType.ChatInput,
    name: 'test-command',
    options: [],
  })
})

test('createMockChatInputData should create valid chat input data with provided options', () => {
  const options: APIApplicationCommandInteractionDataStringOption[] = [
    {
      name: 'message',
      type: 3,
      value: 'Hello World',
    },
    {
      name: 'count',
      type: 3,
      value: '12345',
    },
  ]

  const data = createMockChatInputData('test-command', options)

  expect(data).toEqual({
    id: 'test',
    type: ApplicationCommandType.ChatInput,
    name: 'test-command',
    options,
  })
})

test('createMockChatInputData should handle empty command name', () => {
  const data = createMockChatInputData('')

  expect(data.name).toBe('')
  expect(data.type).toBe(ApplicationCommandType.ChatInput)
})

test('createMockContext should create valid mock context with vi.fn for res', () => {
  const mockData: APIChatInputApplicationCommandInteractionData = {
    id: 'test',
    type: ApplicationCommandType.ChatInput,
    name: 'test-command',
    options: [],
  }

  const context = createMockContext(mockData)

  expect(context.interaction.data).toBe(mockData)
  expect(vi.isMockFunction(context.res)).toBe(true)
})

test('createMockContext res function should be callable', () => {
  const mockData: APIChatInputApplicationCommandInteractionData = {
    id: 'test',
    type: ApplicationCommandType.ChatInput,
    name: 'test-command',
    options: [],
  }

  const context = createMockContext(mockData)

  // Call the mock function
  context.res('Test response')

  expect(context.res).toHaveBeenCalledWith('Test response')
  expect(context.res).toHaveBeenCalledTimes(1)
})

test('createMockContext should create different mock functions for different calls', () => {
  const mockData1: APIChatInputApplicationCommandInteractionData = {
    id: 'test1',
    type: ApplicationCommandType.ChatInput,
    name: 'command1',
    options: [],
  }

  const mockData2: APIChatInputApplicationCommandInteractionData = {
    id: 'test2',
    type: ApplicationCommandType.ChatInput,
    name: 'command2',
    options: [],
  }

  const context1 = createMockContext(mockData1)
  const context2 = createMockContext(mockData2)

  // They should have different mock functions
  expect(context1.res).not.toBe(context2.res)

  context1.res('Response 1')
  context2.res('Response 2')

  expect(context1.res).toHaveBeenCalledWith('Response 1')
  expect(context2.res).toHaveBeenCalledWith('Response 2')
  expect(context1.res).toHaveBeenCalledTimes(1)
  expect(context2.res).toHaveBeenCalledTimes(1)
})
