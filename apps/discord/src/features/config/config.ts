export interface DiscordConfig {
  publicKey: string
  token: string
  applicationId: string
  port: number | string
}

export function validateEnvironment(): DiscordConfig | null {
  const publicKey = process.env.DISCORD_PUBLIC_KEY
  const token = process.env.DISCORD_TOKEN
  const applicationId = process.env.DISCORD_APPLICATION_ID
  const port = process.env.PORT || 3000

  if (!publicKey) {
    console.error('DISCORD_PUBLIC_KEY is required')
    return null
  }

  if (!token) {
    console.error('DISCORD_TOKEN is required')
    return null
  }

  if (!applicationId) {
    console.error('DISCORD_APPLICATION_ID is required')
    return null
  }

  return {
    publicKey,
    token,
    applicationId,
    port,
  }
}
