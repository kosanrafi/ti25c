import { promises as fs } from 'node:fs'
import { join, extname } from 'node:path'

const ALLOWED_EXT = ['.png', '.jpg', '.jpeg', '.webp', '.gif']
const MAX_SIZE_BYTES = 8 * 1024 * 1024 // 8MB

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event)
  if (!form || !form.length) {
    throw createError({ statusCode: 400, statusMessage: 'Tidak ada file yang dikirim.' })
  }

  const file = form.find(f => f.name === 'file')
  if (!file || !file.filename) {
    throw createError({ statusCode: 400, statusMessage: 'Field "file" tidak ditemukan.' })
  }

  const ext = extname(file.filename).toLowerCase()
  if (!ALLOWED_EXT.includes(ext)) {
    throw createError({ statusCode: 400, statusMessage: 'Format harus png, jpg, jpeg, webp, atau gif.' })
  }
  if (file.data.length > MAX_SIZE_BYTES) {
    throw createError({ statusCode: 400, statusMessage: 'Ukuran file maksimal 8MB.' })
  }

  const uploadsDir = join(process.cwd(), 'public', 'uploads')
  await fs.mkdir(uploadsDir, { recursive: true })

  const safeName = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`
  await fs.writeFile(join(uploadsDir, safeName), file.data)

  return { url: `/uploads/${safeName}` }
})
