import { DiscordHono } from 'discord-hono'
import { echoHandler } from '../commands/echo'
import { helloHandler } from '../commands/hello'
import { pingHandler } from '../commands/ping'
import { buttonHandler } from '../components/button'
import { selectHandler } from '../components/select'
import { feedbackHandler } from '../modals/feedback'

export const createApp = (): DiscordHono => {
  const app = new DiscordHono()

  app.command('ping', pingHandler)
  app.command('hello', helloHandler)
  app.command('echo', echoHandler)
  app.component('button', buttonHandler)
  app.component('select', selectHandler)
  app.modal('feedback', feedbackHandler)

  return app
}
