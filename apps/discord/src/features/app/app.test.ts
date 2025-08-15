import { expect, test } from 'vitest'
import { createApp } from './app'

test('App should create a Discord app instance', () => {
  const app = createApp()
  expect(app).toBeDefined()
  expect(app.fetch).toBeDefined()
})
