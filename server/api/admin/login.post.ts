export default defineEventHandler(async (event) => {
  const body = await readBody<{ password?: string }>(event)
  const config = useRuntimeConfig(event)

  if (!body?.password || body.password !== config.adminPassword) {
    throw createError({ statusCode: 401, statusMessage: 'Password salah.' })
  }

  const token = createSessionToken(config.sessionSecret)
  setCookie(event, SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS
  })

  return { ok: true }
})
