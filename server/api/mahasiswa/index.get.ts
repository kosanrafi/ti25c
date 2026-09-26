export default defineEventHandler(async () => {
  const db = useDb()
  const res = await db.execute('SELECT * FROM mahasiswa ORDER BY sort_order ASC, id ASC')
  return res.rows
})
