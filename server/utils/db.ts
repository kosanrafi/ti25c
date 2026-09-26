import { createClient, type Client } from '@libsql/client'

let client: Client | null = null

/** Ambil koneksi Turso (dibuat sekali, dipakai ulang di setiap request). */
export function useDb(): Client {
  if (!client) {
    const config = useRuntimeConfig()
    if (!config.tursoDbUrl) {
      throw createError({
        statusCode: 500,
        statusMessage: 'TURSO_DATABASE_URL belum diatur. Cek file .env kamu.'
      })
    }
    client = createClient({
      url: config.tursoDbUrl,
      authToken: config.tursoAuthToken
    })
  }
  return client
}
