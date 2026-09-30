export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const db = useDb()

  const res = await db.execute({
    sql: `
      SELECT m.*, COALESCE(r.name, 'Mahasiswa') AS role
      FROM mahasiswa m
      LEFT JOIN roles r ON r.id = m.role_id
      WHERE m.id = ?
    `,
    args: [id]
  })

  if (!res.rows.length) {
    throw createError({ statusCode: 404, statusMessage: 'Mahasiswa tidak ditemukan.' })
  }

  return res.rows[0]
})
