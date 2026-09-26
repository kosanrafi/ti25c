export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body?.title?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Judul gallery wajib diisi.' })
  }

  const photos: string[] = Array.isArray(body.photos) ? body.photos.slice(0, 7) : []

  const db = useDb()
  const result = await db.execute({
    sql: `INSERT INTO gallery (title, cover_image, photos, sort_order) VALUES (?, ?, ?, ?)`,
    args: [
      body.title.trim(),
      body.cover_image || '',
      JSON.stringify(photos),
      Number(body.sort_order) || 0
    ]
  })

  return { id: Number(result.lastInsertRowid) }
})
