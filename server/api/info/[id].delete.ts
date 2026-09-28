export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const db = useDb()
  await db.execute({ sql: 'DELETE FROM info_kelas WHERE id=?', args: [id] })
  return { ok: true }
})
