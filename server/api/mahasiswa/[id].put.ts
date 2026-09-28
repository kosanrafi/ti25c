export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!body?.name?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Nama mahasiswa wajib diisi.' })
  }

  const db = useDb()
  await db.execute({
    sql: `UPDATE mahasiswa SET name=?, role_id=?, description=?, hobi=?, skills=?, sertifikat=?, photo=?, sort_order=?
          WHERE id=?`,
    args: [
      body.name.trim(),
      Number(body.role_id) || 5,
      body.description || '',
      body.hobi || '',
      body.skills || '',
      body.sertifikat || '',
      body.photo || '',
      Number(body.sort_order) || 0,
      id
    ]
  })

  return { ok: true }
})
