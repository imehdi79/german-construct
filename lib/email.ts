import nodemailer, { type Transporter } from 'nodemailer'

/**
 * Central SMTP mailer for all site forms (contact, job applications, project
 * planner). Credentials come from the environment — see `.env.local`:
 *
 *   SMTP_EMAIL     the mailbox we authenticate and send as (required)
 *   SMTP_PASSWORD  its password (required)
 *   SMTP_HOST      SMTP server hostname (optional — defaults to the SMTP_EMAIL domain)
 *   SMTP_PORT      SMTP port (optional — defaults to 465)
 *   SMTP_SECURE    "true"/"false" to force TLS-on-connect (optional — defaults to port === 465)
 *   MAIL_TO        where form notifications are delivered (optional — defaults to SMTP_EMAIL)
 *   MAIL_FROM_NAME display name on the From header (optional)
 */

const SMTP_EMAIL = process.env.SMTP_EMAIL
const SMTP_PASSWORD = process.env.SMTP_PASSWORD

/** Domain of the SMTP mailbox, used as a sensible default for the SMTP host. */
const emailDomain = SMTP_EMAIL?.split('@')[1] ?? ''

const SMTP_HOST = process.env.SMTP_HOST || emailDomain
const SMTP_PORT = Number(process.env.SMTP_PORT) || 465
const SMTP_SECURE = process.env.SMTP_SECURE
  ? process.env.SMTP_SECURE === 'true'
  : SMTP_PORT === 465

/** Inbox that receives the form submissions (the company). */
export const NOTIFY_TO = process.env.MAIL_TO || SMTP_EMAIL || ''

const FROM_NAME = process.env.MAIL_FROM_NAME || 'Fliesen & Naturstein Aman'

/** True only when the credentials needed to actually send are present. */
export const mailConfigured = Boolean(SMTP_EMAIL && SMTP_PASSWORD && SMTP_HOST)

let cachedTransporter: Transporter | null = null

function getTransporter(): Transporter {
  if (cachedTransporter) return cachedTransporter
  cachedTransporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: { user: SMTP_EMAIL, pass: SMTP_PASSWORD },
  })
  return cachedTransporter
}

export interface SendMailOptions {
  to: string
  subject: string
  text: string
  html?: string
  /** Address to set as Reply-To (e.g. the visitor who submitted the form). */
  replyTo?: string
}

/**
 * Sends a single email. Throws if SMTP is not configured or the send fails —
 * callers decide how to surface that to the user.
 */
export async function sendMail({ to, subject, text, html, replyTo }: SendMailOptions): Promise<void> {
  if (!mailConfigured) {
    throw new Error(
      'SMTP is not configured. Set SMTP_EMAIL and SMTP_PASSWORD (and optionally SMTP_HOST/SMTP_PORT) in the environment.'
    )
  }

  await getTransporter().sendMail({
    from: `"${FROM_NAME}" <${SMTP_EMAIL}>`,
    to,
    subject,
    text,
    html,
    replyTo,
  })
}

/** Minimal HTML-escape so user-supplied values can't break the markup. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Renders label/value pairs as matching plain-text and HTML email bodies. */
export function renderRows(
  rows: Array<[label: string, value: string]>
): { text: string; html: string } {
  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n')
  const html = `<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;color:#1a1a1a">
${rows
  .map(
    ([label, value]) =>
      `<tr><td style="padding:6px 16px 6px 0;font-weight:bold;vertical-align:top;white-space:nowrap">${escapeHtml(
        label
      )}</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
  )
  .join('\n')}
</table>`
  return { text, html }
}
