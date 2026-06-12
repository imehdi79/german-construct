import { cookies } from 'next/headers'
import crypto from 'crypto'

/**
 * Minimal server-side session for the admin area.
 *
 * The session is an HMAC-signed, httpOnly cookie — it cannot be read or forged
 * from the browser. Credentials and the signing secret come from env vars with
 * dev fallbacks. For a hardened production setup, swap in NextAuth.js / Lucia
 * and a real user store; the call sites here stay the same.
 */

const COOKIE_NAME = 'aman_admin_session'
const SESSION_TTL = 60 * 60 * 8 // 8 hours

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin@fliesen-naturstein-aman.de'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'admin123'
const SECRET = process.env.ADMIN_SESSION_SECRET ?? 'dev-only-insecure-secret-change-me'

function sign(payload: string): string {
  const sig = crypto.createHmac('sha256', SECRET).update(payload).digest('hex')
  return `${payload}.${sig}`
}

function verify(token: string): boolean {
  const idx = token.lastIndexOf('.')
  if (idx === -1) return false
  const payload = token.slice(0, idx)
  const sig = token.slice(idx + 1)
  const expected = crypto.createHmac('sha256', SECRET).update(payload).digest('hex')
  if (sig.length !== expected.length) return false
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false
  const [, expiresAt] = payload.split('|')
  return Number(expiresAt) > Date.now()
}

export function checkCredentials(email: string, password: string): boolean {
  const emailOk =
    email.length === ADMIN_EMAIL.length &&
    crypto.timingSafeEqual(Buffer.from(email), Buffer.from(ADMIN_EMAIL))
  const pwOk =
    password.length === ADMIN_PASSWORD.length &&
    crypto.timingSafeEqual(Buffer.from(password), Buffer.from(ADMIN_PASSWORD))
  return emailOk && pwOk
}

export async function createSession(): Promise<void> {
  const expiresAt = Date.now() + SESSION_TTL * 1000
  const token = sign(`admin|${expiresAt}`)
  const store = await cookies()
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL,
  })
}

export async function destroySession(): Promise<void> {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies()
  const token = store.get(COOKIE_NAME)?.value
  return token ? verify(token) : false
}
