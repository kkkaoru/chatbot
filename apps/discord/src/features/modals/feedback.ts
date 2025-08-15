import type { ModalContext } from 'discord-hono'

export const feedbackHandler = (
  c: ModalContext,
): Response | Promise<Response> => {
  const components = c.interaction.data.components || []
  const feedbackComponent = components[0]?.components?.[0]
  const feedback = feedbackComponent?.value || ''
  return c.res(`Thank you for your feedback: "${feedback}"`)
}
