export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body?.name?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Nama mahasiswa wajib diisi.' })
  }

  const db = useDb()
  const result = await db.execute({
    sql: `INSERT INTO mahasiswa (name, role, description, hobi, skills, sertifikat, photo, sort_order)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      body.name.trim(),
      (body.role?.trim() || 'Mahasiswa'),
      body.description || '',
      body.hobi || '',
      body.skills || '',
      body.sertifikat || '',
      body.photo || '',
      Number(body.sort_order) || 0
    ]
  })

  return { id: Number(result.lastInsertRowid) }
})
