import { createHmac, timingSafeEqual } from 'node:crypto'

const SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7 // 7 hari
export const SESSION_COOKIE = 'admin_session'

function sign(payload: string, secret: string) {
  return createHmac('sha256', secret).update(payload).digest('hex')
}

/** Buat token sesi sederhana (stateless, tanpa perlu tabel session di DB). */
export function createSessionToken(secret: string): string {
  const exp = Date.now() + SESSION_MAX_AGE_MS
  const payload = `admin.${exp}`
  return `${payload}.${sign(payload, secret)}`
}

/** Cek validitas token sesi (format, tanda tangan, dan masa berlaku). */
export function verifySessionToken(token: string | undefined | null, secret: string): boolean {
  if (!token) return false
  const parts = token.split('.')
  if (parts.length !== 3) return false
  const [role, exp, sig] = parts
  if (role !== 'admin') return false
  if (!exp || Date.now() > Number(exp)) return false

  const expected = sign(`${role}.${exp}`, secret)
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export const SESSION_MAX_AGE_SECONDS = SESSION_MAX_AGE_MS / 1000
