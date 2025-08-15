import type { CommandContext } from 'discord-hono'

export const pingHandler = (
  c: CommandContext,
): Response | Promise<Response> => {
  return c.res('Pong!')
}
