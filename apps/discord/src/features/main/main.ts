import type { DiscordHono } from 'discord-hono'
import { validateEnvironment } from '../config/config'
import { startServer } from '../server/server'

export function main(app: DiscordHono): void {
  const config = validateEnvironment()

  if (!config) {
    process.exit(1)
  }

  startServer(app, config)
}
