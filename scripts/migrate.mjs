import 'dotenv/config'
import { createClient } from '@libsql/client'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const url = process.env.TURSO_DATABASE_URL
const authToken = process.env.TURSO_AUTH_TOKEN

if (!url) {
  console.error('❌  TURSO_DATABASE_URL belum diisi di file .env')
  process.exit(1)
}

const client = createClient({ url, authToken })
const schemaPath = join(__dirname, '..', 'server', 'db', 'schema.sql')
const schema = readFileSync(schemaPath, 'utf8')

const statements = schema
  .split(';')
  .map(s => s.trim())
  .filter(Boolean)

console.log(`🚀  Menjalankan ${statements.length} perintah schema ke Turso...`)

for (const stmt of statements) {
  await client.execute(stmt)
}

console.log('✅  Database siap. Tabel: posters, mahasiswa, gallery')
process.exit(0)
