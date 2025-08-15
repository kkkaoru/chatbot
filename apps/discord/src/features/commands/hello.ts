import type { CommandContext } from 'discord-hono'

import {
  findOptionValue,
  isChatInputCommand,
} from '../../utils/command-helpers'

export const helloHandler = (
  c: CommandContext,
): Response | Promise<Response> => {
  const { data } = c.interaction

  if (!isChatInputCommand(data)) {
    return c.res('Invalid command type')
  }

  const nameValue = findOptionValue(data.options, 'name')
  const name = nameValue || 'World'

  return c.res(`Hello, ${name}!`)
}
