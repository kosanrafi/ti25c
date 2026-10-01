/**
 * Sitemap dinamis: /sitemap.xml
 * Mengambil daftar mahasiswa & gallery langsung dari Turso supaya semua
 * halaman detail ikut terdaftar untuk Google, tanpa perlu di-generate manual.
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = config.public.siteUrl.replace(/\/$/, '')

  type Row = { id: number; updated: string | null }
  let mahasiswa: Row[] = []
  let gallery: Row[] = []

  try {
    const db = useDb()
    const [m, g] = await Promise.all([
      db.execute('SELECT id, created_at AS updated FROM mahasiswa ORDER BY id ASC'),
      db.execute('SELECT id, created_at AS updated FROM gallery ORDER BY id ASC')
    ])
    mahasiswa = m.rows as unknown as Row[]
    gallery = g.rows as unknown as Row[]
  } catch {
    // kalau DB belum siap, tetap kembalikan sitemap dasar (halaman statis saja)
  }

  const today = new Date().toISOString().slice(0, 10)
  const toDate = (v: string | null) => (v ? String(v).slice(0, 10) : today)

  const urls: { loc: string; lastmod: string; priority: string; changefreq: string }[] = [
    { loc: `${siteUrl}/`, lastmod: today, priority: '1.0', changefreq: 'weekly' },
    { loc: `${siteUrl}/mahasiswa`, lastmod: today, priority: '0.8', changefreq: 'weekly' },
    { loc: `${siteUrl}/gallery`, lastmod: today, priority: '0.8', changefreq: 'weekly' },
    { loc: `${siteUrl}/agenda`, lastmod: today, priority: '0.8', changefreq: 'weekly' },
    { loc: `${siteUrl}/kontak`, lastmod: today, priority: '0.7', changefreq: 'monthly' },
    ...mahasiswa.map(m => ({
      loc: `${siteUrl}/mahasiswa/${m.id}`,
      lastmod: toDate(m.updated),
      priority: '0.6',
      changefreq: 'monthly'
    })),
    ...gallery.map(g => ({
      loc: `${siteUrl}/gallery/${g.id}`,
      lastmod: toDate(g.updated),
      priority: '0.6',
      changefreq: 'monthly'
    }))
  ]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return body
})
