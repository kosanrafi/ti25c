export default defineEventHandler(async () => {
  const db = useDb()
  // Urut: KM, Wakil KM, Sekretaris, Bendahara dulu, lalu mahasiswa lain sesuai sort_order
  const res = await db.execute(`
    SELECT m.*, COALESCE(r.name, 'Mahasiswa') AS role
    FROM mahasiswa m
    LEFT JOIN roles r ON r.id = m.role_id
    ORDER BY COALESCE(r.sort_order, 99) ASC, m.sort_order ASC, m.id ASC
  `)
  return res.rows
})
