import type { ComponentContext } from 'discord-hono'

export const buttonHandler = (
  c: ComponentContext,
): Response | Promise<Response> => {
  const customId = 'customId' in c.interaction ? c.interaction.customId : ''
  c.update(true)
  return c.res({
    content: `You clicked: ${customId}`,
  })
}
