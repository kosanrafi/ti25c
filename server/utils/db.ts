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

let socialReady: Promise<void> | null = null

/**
 * Pastikan kolom instagram & tiktok ada di tabel mahasiswa (database lama belum punya).
 * Dijalankan otomatis sekali per instance server sebelum simpan data, jadi tidak perlu
 * menjalankan migrasi manual.
 */
export function ensureMahasiswaSocial(): Promise<void> {
  if (!socialReady) {
    socialReady = (async () => {
      const db = useDb()
      const cols = (await db.execute('PRAGMA table_info(mahasiswa)')).rows.map(r => String(r.name))
      for (const c of ['instagram', 'tiktok']) {
        if (!cols.includes(c)) await db.execute(`ALTER TABLE mahasiswa ADD COLUMN ${c} TEXT DEFAULT ''`)
      }
    })().catch((e) => {
      socialReady = null // coba lagi di request berikutnya
      throw e
    })
  }
  return socialReady
}
