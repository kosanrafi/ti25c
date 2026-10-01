export type SocialKind = 'instagram' | 'tiktok'

/**
 * Ubah isian admin (username "@nama", "nama", atau link lengkap) menjadi URL https yang aman.
 * Hasil selalu http(s) — skema lain seperti "javascript:" tidak pernah lolos.
 */
export function socialUrl(kind: SocialKind, raw?: string | null): string {
  const v = (raw || '').trim()
  if (!v) return ''
  if (/^https?:\/\//i.test(v)) return v
  if (/^(www\.)?(instagram|tiktok)\.com\//i.test(v)) return `https://${v}`
  const handle = v.replace(/^@+/, '').replace(/\s+/g, '')
  if (!handle) return ''
  return kind === 'instagram'
    ? `https://www.instagram.com/${encodeURIComponent(handle)}`
    : `https://www.tiktok.com/@${encodeURIComponent(handle)}`
}

/** Tampilkan "@username" dari username atau link. */
export function socialHandle(raw?: string | null): string {
  const v = (raw || '').trim()
  if (!v) return ''
  if (/^(https?:\/\/|(www\.)?(instagram|tiktok)\.com\/)/i.test(v)) {
    const last = v.split(/[?#]/)[0].replace(/\/+$/, '').split('/').pop() || ''
    return '@' + last.replace(/^@+/, '')
  }
  return '@' + v.replace(/^@+/, '').replace(/\s+/g, '')
}
