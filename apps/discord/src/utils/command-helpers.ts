import type {
  APIApplicationCommandInteractionDataOption,
  APIChatInputApplicationCommandInteractionData,
} from 'discord-api-types/v10'
import { ApplicationCommandType } from 'discord-api-types/v10'

export function isChatInputCommand(
  data: unknown,
): data is APIChatInputApplicationCommandInteractionData {
  return (
    typeof data === 'object' &&
    data !== null &&
    'type' in data &&
    (data as { type: number }).type === ApplicationCommandType.ChatInput
  )
}

export function findOptionValue(
  options: APIApplicationCommandInteractionDataOption[] | undefined,
  name: string,
): string | number | boolean | undefined {
  const option = options?.find((opt) => opt.name === name)
  return option && 'value' in option ? option.value : undefined
}
