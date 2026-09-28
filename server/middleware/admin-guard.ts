/**
 * Melindungi endpoint yang mengubah data (POST/PUT/DELETE) untuk
 * posters, mahasiswa, gallery, info, dan upload file — hanya admin yang login
 * (cookie sesi valid) yang boleh mengaksesnya. Endpoint GET tetap publik
 * supaya halaman utama bisa menampilkan data tanpa login.
 */
export default defineEventHandler((event) => {
  const path = event.path || event.node.req.url || ''
  const method = event.node.req.method || 'GET'

  const isDataRoute = /^\/api\/(posters|mahasiswa|gallery|info)(\/|$)/.test(path)
  const isUploadRoute = path.startsWith('/api/upload')
  const needsAuth = (isDataRoute && method !== 'GET') || isUploadRoute

  if (!needsAuth) return

  const config = useRuntimeConfig(event)
  const token = getCookie(event, SESSION_COOKIE)

  if (!verifySessionToken(token, config.sessionSecret)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized — silakan login sebagai admin.' })
  }
})
