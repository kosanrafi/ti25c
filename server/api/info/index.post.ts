const THEMES = ['sky', 'light', 'indigo', 'flame', 'emerald']

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body?.title?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Judul info wajib diisi.' })
  }

  const db = useDb()
  const result = await db.execute({
    sql: `INSERT INTO info_kelas (tag, title, description, link_url, image, theme, sort_order)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
    args: [
      body.tag || '',
      body.title.trim(),
      body.description || '',
      body.link_url || '',
      body.image || '',
      THEMES.includes(body.theme) ? body.theme : 'sky',
      Number(body.sort_order) || 0
    ]
  })

  return { id: Number(result.lastInsertRowid) }
})
