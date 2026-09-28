const THEMES = ['sky', 'light', 'indigo', 'flame', 'emerald']

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!body?.title?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Judul info wajib diisi.' })
  }

  const db = useDb()
  await db.execute({
    sql: `UPDATE info_kelas SET tag=?, title=?, description=?, link_url=?, image=?, theme=?, sort_order=? WHERE id=?`,
    args: [
      body.tag || '',
      body.title.trim(),
      body.description || '',
      body.link_url || '',
      body.image || '',
      THEMES.includes(body.theme) ? body.theme : 'sky',
      Number(body.sort_order) || 0,
      id
    ]
  })

  return { ok: true }
})
