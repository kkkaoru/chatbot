import type { DiscordHono } from 'discord-hono'
import { createApp } from './features/app/app'
import { main } from './features/main/main'

const app: DiscordHono = createApp()

/* v8 ignore start */
if (import.meta.main) {
  main(app)
}
/* v8 ignore stop */

export { app, main }
export default app
