export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body?.title?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Judul poster wajib diisi.' })
  }

  const db = useDb()
  const result = await db.execute({
    sql: `INSERT INTO posters (title, description, image, glow_color, sort_order) VALUES (?, ?, ?, ?, ?)`,
    args: [
      body.title.trim(),
      body.description || '',
      body.image || '',
      body.glow_color || '#EF4B36',
      Number(body.sort_order) || 0
    ]
  })

  return { id: Number(result.lastInsertRowid) }
})
