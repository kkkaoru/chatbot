import type {
  APIApplicationCommandInteractionDataIntegerOption,
  APIApplicationCommandInteractionDataStringOption,
  APIChatInputApplicationCommandInteractionData,
} from 'discord-api-types/v10'
import { ApplicationCommandType } from 'discord-api-types/v10'
import { expect, test } from 'vitest'

import { findOptionValue, isChatInputCommand } from './command-helpers'

test('isChatInputCommand should return true for chat input command data', () => {
  const data: APIChatInputApplicationCommandInteractionData = {
    id: 'test',
    type: ApplicationCommandType.ChatInput,
    name: 'test-command',
    options: [],
  }

  expect(isChatInputCommand(data)).toBe(true)
})

test('isChatInputCommand should return false for non-chat input command data', () => {
  const data = {
    id: 'test',
    type: 2, // User context menu
    name: 'test-context-menu',
  }

  expect(isChatInputCommand(data)).toBe(false)
})

test('isChatInputCommand should return false for null data', () => {
  expect(isChatInputCommand(null)).toBe(false)
})

test('isChatInputCommand should return false for undefined data', () => {
  expect(isChatInputCommand(undefined)).toBe(false)
})

test('isChatInputCommand should return false for non-object data', () => {
  expect(isChatInputCommand('string')).toBe(false)
  expect(isChatInputCommand(123)).toBe(false)
  expect(isChatInputCommand(true)).toBe(false)
})

test('isChatInputCommand should return false for object without type property', () => {
  const data = {
    id: 'test',
    name: 'test-command',
  }

  expect(isChatInputCommand(data)).toBe(false)
})

test('findOptionValue should return option value when option exists', () => {
  const options: (
    | APIApplicationCommandInteractionDataStringOption
    | APIApplicationCommandInteractionDataIntegerOption
  )[] = [
    {
      name: 'message',
      type: 3,
      value: 'Hello World',
    },
    {
      name: 'count',
      type: 4,
      value: 42,
    },
  ]

  expect(findOptionValue(options, 'message')).toBe('Hello World')
  expect(findOptionValue(options, 'count')).toBe(42)
})

test('findOptionValue should return undefined when option does not exist', () => {
  const options: APIApplicationCommandInteractionDataStringOption[] = [
    {
      name: 'message',
      type: 3,
      value: 'Hello World',
    },
  ]

  expect(findOptionValue(options, 'nonexistent')).toBeUndefined()
})

test('findOptionValue should return undefined when options array is undefined', () => {
  expect(findOptionValue(undefined, 'message')).toBeUndefined()
})

test('findOptionValue should return undefined when options array is empty', () => {
  expect(findOptionValue([], 'message')).toBeUndefined()
})

test('findOptionValue should return undefined for option without value property', () => {
  const options = [
    {
      name: 'subcommand',
      type: 1, // Subcommand type
      // No value property for subcommands
    },
  ]

  expect(findOptionValue(options as never[], 'subcommand')).toBeUndefined()
})
