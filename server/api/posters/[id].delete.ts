export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const db = useDb()
  await db.execute({ sql: 'DELETE FROM posters WHERE id=?', args: [id] })
  return { ok: true }
})
