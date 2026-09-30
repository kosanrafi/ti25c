import { put } from '@vercel/blob'
import { extname } from 'node:path'

const ALLOWED_EXT = ['.png', '.jpg', '.jpeg', '.webp', '.gif']
const MAX_SIZE_BYTES = 4 * 1024 * 1024 // batas body Vercel ±4.5MB

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
    throw createError({ statusCode: 400, statusMessage: 'Ukuran file maksimal 4MB.' })
  }

  const blob = await put(`uploads/${Date.now()}${ext}`, file.data, {
    access: 'public',
    addRandomSuffix: true,
    contentType: file.type
  })

  return { url: blob.url }
})import { put } from '@vercel/blob'
import { extname } from 'node:path'

const ALLOWED_EXT = ['.png', '.jpg', '.jpeg', '.webp', '.gif']
const MAX_SIZE_BYTES = 4 * 1024 * 1024 // batas body Vercel ±4.5MB

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
    throw createError({ statusCode: 400, statusMessage: 'Ukuran file maksimal 4MB.' })
  }

  const blob = await put(`uploads/${Date.now()}${ext}`, file.data, {
    access: 'public',
    addRandomSuffix: true,
    contentType: file.type
  })

  return { url: blob.url }
})