import { NextResponse } from 'next/server'

/**
 * TEMP (test): single env-gated switch for staging/test behaviour, controlled by
 * the `SITE_TEST_MODE` variable in `.env.local`. Set it to `"true"` to:
 *   - disable the public form/API routes (contact, job application) → 503
 *   - anonymise the whole site: the brand name "Fliesen(-Naturstein) Aman", the
 *     owner, and all contact data (phone, email, domain, address, location, VAT)
 *     are replaced with obvious placeholders everywhere they appear (see
 *     `redactDeep`, applied at every content getter in `lib/content.ts`).
 *
 * Leave it unset (or `"false"`) in production. Server-only — do NOT expose via
 * `NEXT_PUBLIC_`, so the flag can never leak into the client bundle.
 */
export const TEST_MODE = process.env.SITE_TEST_MODE === 'true'

/** Obvious dummy contact details shown in place of the real ones while on. */
export const PLACEHOLDER_CONTACT = {
  phone: '+49 000 0000000',
  mobile: '+49 000 0000000',
  email: 'test@example.com',
} as const

/**
 * Ordered [pattern, replacement] pairs that scrub every real identifying token
 * from site copy while TEST_MODE is on. Order matters: the most specific brand
 * and contact tokens run before the generic standalone "Aman"/"Ulm" fallbacks.
 */
const TEST_REDACTIONS: [RegExp, string][] = [
  // Brand name (handles "Fliesen-Naturstein Aman", "Fliesen - Naturstein  Aman", etc.)
  [/Fliesen\s*-?\s*Naturstein\s+Aman/gi, 'Musterbetrieb'],
  [/Fliesen\s+Aman/gi, 'Musterbetrieb'],
  // Owner
  [/Aman\s+Rezayi/gi, 'Max Mustermann'],
  // Email + domain (before the generic "Aman" rule; lowercase, case-insensitive)
  [/info@fliesen-aman\.de/gi, 'test@example.com'],
  [/fliesen-aman\.de/gi, 'example.com'],
  // Remaining standalone brand short name ("Aman", "Warum Aman?")
  [/\bAman\b/g, 'Muster'],
  // Address
  [/Turmstraße\s*45\/3/gi, 'Musterstraße 1'],
  [/\b89231\b/g, '00000'],
  [/Neu-Ulm/g, 'Musterstadt'],
  [/\bUlm\b/g, 'Musterstadt'],
  // Phone (real mobile, with or without country code / leading zero)
  [/\+?49[\s-]?17634569351\b/g, '+49 000 0000000'],
  [/\b0?17634569351\b/g, '000 0000000'],
  // VAT id (USt-IdNr.)
  [/\bDE\s?\d{9}\b/g, 'DE000000000'],
]

/** Apply every redaction to a single string. */
function redactString(s: string): string {
  return TEST_REDACTIONS.reduce((acc, [re, to]) => acc.replace(re, to), s)
}

/**
 * Deep-clone `value`, scrubbing every string it contains. Object keys are left
 * untouched (only values are redacted), so structure/lookup keys are preserved.
 */
export function redactDeep<T>(value: T): T {
  if (typeof value === 'string') return redactString(value) as unknown as T
  if (Array.isArray(value)) return value.map((v) => redactDeep(v)) as unknown as T
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value)) out[k] = redactDeep(v)
    return out as T
  }
  return value
}

/** 503 used to short-circuit API routes while TEST_MODE is on. */
export function testModeDisabledResponse() {
  return NextResponse.json(
    { success: false, message: 'Dieser Dienst ist im Testbetrieb deaktiviert.' },
    { status: 503 },
  )
}
