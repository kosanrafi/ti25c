export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const db = useDb()

  const res = await db.execute({ sql: 'SELECT * FROM gallery WHERE id = ?', args: [id] })

  if (!res.rows.length) {
    throw createError({ statusCode: 404, statusMessage: 'Album gallery tidak ditemukan.' })
  }

  const row = res.rows[0]
  let photos: string[] = []
  try {
    const arr = JSON.parse((row.photos as string) || '[]')
    photos = Array.isArray(arr) ? arr.slice(0, 7) : []
  } catch { /* noop */ }

  return { ...row, photos }
})
