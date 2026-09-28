import 'dotenv/config'
import { createClient } from '@libsql/client'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dbDir = join(__dirname, '..', 'server', 'db')

// npm run db:push   -> buat tabel (jika belum ada)
// npm run db:seed   -> buat tabel + isi data awal (aman diulang)
// npm run db:reset  -> HAPUS semua tabel, buat ulang, lalu isi data awal
const args = new Set(process.argv.slice(2))
const reset = args.has('--reset')
const seed = args.has('--seed') || reset

const url = process.env.TURSO_DATABASE_URL
const authToken = process.env.TURSO_AUTH_TOKEN

if (!url) {
  console.error('❌  TURSO_DATABASE_URL belum diisi di file .env')
  process.exit(1)
}

const client = createClient({ url, authToken })

function parseSql(text) {
  return text
    .split('\n')
    .filter(line => !line.trim().startsWith('--'))
    .join('\n')
    .split(/;\s*(?:\n|$)/)
    .map(s => s.trim())
    .filter(Boolean)
}

async function run(label, statements) {
  console.log(`🚀  ${label} (${statements.length} perintah)...`)
  await client.batch(statements, 'write')
}

if (reset) {
  await run('Menghapus tabel lama', [
    'DROP TABLE IF EXISTS mahasiswa',
    'DROP TABLE IF EXISTS roles',
    'DROP TABLE IF EXISTS posters',
    'DROP TABLE IF EXISTS gallery',
    'DROP TABLE IF EXISTS info_kelas'
  ])
}

await run('Membuat tabel', parseSql(readFileSync(join(dbDir, 'schema.sql'), 'utf8')))

if (seed) {
  await run('Mengisi data awal', parseSql(readFileSync(join(dbDir, 'seed.sql'), 'utf8')))
}

console.log('✅  Selesai. Tabel: roles, posters, mahasiswa, gallery, info_kelas')
process.exit(0)
