export default defineEventHandler(async () => {
  const db = useDb()
  const res = await db.execute('SELECT * FROM info_kelas ORDER BY sort_order ASC, id ASC')
  return res.rows
})
