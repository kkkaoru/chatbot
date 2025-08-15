import type { APIMessageComponentSelectMenuInteraction } from 'discord-api-types/v10'
import type { ComponentContext } from 'discord-hono'

export const selectHandler = (
  c: ComponentContext,
): Response | Promise<Response> => {
  const interaction = c.interaction as APIMessageComponentSelectMenuInteraction
  const values = interaction.data.values || []
  c.update(true)
  return c.res({
    content: `You selected: ${values.join(', ')}`,
  })
}
