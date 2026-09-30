import { put } from '@vercel/blob'
import { extname } from 'node:path'

const ALLOWED_EXT = ['.png', '.jpg', '.jpeg', '.webp', '.gif']
const MAX_SIZE_BYTES = 4 * 1024 * 1024 // batas body request Vercel ±4.5MB

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

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw createError({
      statusCode: 500,
      statusMessage: 'BLOB_READ_WRITE_TOKEN belum diatur. Hubungkan Vercel Blob ke project lalu redeploy.'
    })
  }

  try {
    const blob = await put(`uploads/${Date.now()}${ext}`, file.data, {
      access: 'public',
      addRandomSuffix: true,
      contentType: file.type
    })
    return { url: blob.url }
  } catch (e: any) {
    console.error('Upload gagal:', e)
    throw createError({ statusCode: 500, statusMessage: 'Gagal menyimpan gambar ke Blob.' })
  }
})
