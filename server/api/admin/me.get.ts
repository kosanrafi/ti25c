export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const token = getCookie(event, SESSION_COOKIE)

  if (!verifySessionToken(token, config.sessionSecret)) {
    throw createError({ statusCode: 401, statusMessage: 'Belum login.' })
  }

  return { ok: true }
})
