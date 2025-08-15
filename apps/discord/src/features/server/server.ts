import type { Server } from 'bun'
import type { DiscordHono } from 'discord-hono'
import type { DiscordConfig } from '../config/config'

export function startServer(app: DiscordHono, config: DiscordConfig): Server {
  return Bun.serve({
    port: config.port,
    fetch: app.fetch,
  })
}
