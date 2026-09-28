export default defineEventHandler(async () => {
  const db = useDb()
  const res = await db.execute('SELECT id, name, sort_order FROM roles ORDER BY sort_order ASC, id ASC')
  return res.rows
})
