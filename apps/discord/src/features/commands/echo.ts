import type { CommandContext } from 'discord-hono'

import {
  findOptionValue,
  isChatInputCommand,
} from '../../utils/command-helpers'

export const echoHandler = (
  c: CommandContext,
): Response | Promise<Response> => {
  const { data } = c.interaction

  if (!isChatInputCommand(data)) {
    return c.res('Invalid command type')
  }

  const message = findOptionValue(data.options, 'message')

  if (!message) {
    return c.res('Please provide a message to echo!')
  }

  return c.res(String(message))
}
