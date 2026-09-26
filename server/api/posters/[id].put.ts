export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!body?.title?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Judul poster wajib diisi.' })
  }

  const db = useDb()
  await db.execute({
    sql: `UPDATE posters SET title=?, description=?, image=?, glow_color=?, sort_order=? WHERE id=?`,
    args: [
      body.title.trim(),
      body.description || '',
      body.image || '',
      body.glow_color || '#EF4B36',
      Number(body.sort_order) || 0,
      id
    ]
  })

  return { ok: true }
})
