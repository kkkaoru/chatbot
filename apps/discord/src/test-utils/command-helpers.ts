import type {
  APIApplicationCommandInteractionDataStringOption,
  APIChatInputApplicationCommandInteractionData,
} from 'discord-api-types/v10'
import { ApplicationCommandType } from 'discord-api-types/v10'
import type { CommandContext } from 'discord-hono'
import { vi } from 'vitest'

export function createMockChatInputData(
  name: string,
  options: APIApplicationCommandInteractionDataStringOption[] = [],
): APIChatInputApplicationCommandInteractionData {
  return {
    id: 'test',
    type: ApplicationCommandType.ChatInput,
    name,
    options,
  }
}

export function createMockContext(
  data: APIChatInputApplicationCommandInteractionData,
): CommandContext {
  return {
    res: vi.fn(),
    interaction: {
      data,
    },
  } as unknown as CommandContext
}
