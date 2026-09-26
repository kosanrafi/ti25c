export default defineEventHandler(async () => {
  const db = useDb()
  const res = await db.execute('SELECT * FROM gallery ORDER BY sort_order ASC, id ASC')

  return res.rows.map(row => ({
    ...row,
    photos: safeParsePhotos(row.photos as string)
  }))
})

function safeParsePhotos(raw: string): string[] {
  try {
    const arr = JSON.parse(raw || '[]')
    return Array.isArray(arr) ? arr.slice(0, 7) : []
  } catch {
    return []
  }
}
