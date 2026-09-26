export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!body?.title?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Judul gallery wajib diisi.' })
  }

  const photos: string[] = Array.isArray(body.photos) ? body.photos.slice(0, 7) : []

  const db = useDb()
  await db.execute({
    sql: `UPDATE gallery SET title=?, cover_image=?, photos=?, sort_order=? WHERE id=?`,
    args: [
      body.title.trim(),
      body.cover_image || '',
      JSON.stringify(photos),
      Number(body.sort_order) || 0,
      id
    ]
  })

  return { ok: true }
})
