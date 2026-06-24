import { NextResponse } from 'next/server'

/**
 * TEMP (test): single env-gated switch for staging/test behaviour, controlled by
 * the `SITE_TEST_MODE` variable in `.env.local`. Set it to `"true"` to:
 *   - disable the public form/API routes (contact, job application, upload) → 503
 *   - replace the public phone numbers and email with obvious placeholders
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

/** 503 used to short-circuit API routes while TEST_MODE is on. */
export function testModeDisabledResponse() {
  return NextResponse.json(
    { success: false, message: 'Dieser Dienst ist im Testbetrieb deaktiviert.' },
    { status: 503 },
  )
}
