'use server'

import { contactSchema, projectInquirySchema } from '@/schemas/contact'
import type { ContactSchema, ProjectInquirySchema } from '@/schemas/contact'
import type { FormValues } from '@/components/Form-Builder/types'
import { sendMail, escapeHtml, renderRows, NOTIFY_TO } from '@/lib/email'

export interface ActionResult {
  success: boolean
  message: string
}

export async function submitContact(data: ContactSchema): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(data)

  if (!parsed.success) {
    return {
      success: false,
      message: 'Bitte überprüfen Sie Ihre Eingaben.',
    }
  }

  const d = parsed.data
  const fullName = `${d.vorname} ${d.nachname}`

  const { text, html } = renderRows([
    ['Name', fullName],
    ['E-Mail', d.email],
    ['Telefon', d.telefon || 'Nicht angegeben'],
    ['Betreff', d.betreff],
    ['Nachricht', d.nachricht],
  ])

  // Notify the company. This is the critical send — if it fails we ask the
  // visitor to try again.
  try {
    await sendMail({
      to: NOTIFY_TO,
      subject: `Kontaktanfrage: ${d.betreff}`,
      text: `Neue Kontaktanfrage über die Website:\n\n${text}`,
      html: `<p>Neue Kontaktanfrage über die Website:</p>${html}`,
      replyTo: d.email,
    })
  } catch (error) {
    console.error('Contact notification email failed:', error)
    return {
      success: false,
      message:
        'Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns telefonisch.',
    }
  }

  // Send the visitor a confirmation copy. Best-effort: the company already has
  // the request, so a failure here shouldn't make the visitor resubmit.
  try {
    await sendMail({
      to: d.email,
      subject: 'Wir haben Ihre Nachricht erhalten',
      text:
        `Hallo ${fullName},\n\n` +
        'vielen Dank für Ihre Nachricht. Wir haben Ihre Anfrage erhalten und melden uns ' +
        'innerhalb von 24 Stunden bei Ihnen.\n\n' +
        'Ihre Angaben zur Übersicht:\n\n' +
        `${text}\n\n` +
        'Mit freundlichen Grüßen\nIhr Team von Fliesen & Naturstein Aman',
      html:
        `<p>Hallo ${escapeHtml(fullName)},</p>` +
        '<p>vielen Dank für Ihre Nachricht. Wir haben Ihre Anfrage erhalten und melden uns ' +
        'innerhalb von 24 Stunden bei Ihnen.</p>' +
        '<p><strong>Ihre Angaben zur Übersicht:</strong></p>' +
        `${html}` +
        '<p>Mit freundlichen Grüßen<br/>Ihr Team von Fliesen &amp; Naturstein Aman</p>',
    })
  } catch (error) {
    console.error('Contact confirmation email failed (non-fatal):', error)
  }

  return {
    success: true,
    message:
      'Vielen Dank für Ihre Nachricht! Wir melden uns innerhalb von 24 Stunden bei Ihnen.',
  }
}

export async function submitProjectInquiry(
  data: ProjectInquirySchema
): Promise<ActionResult> {
  const parsed = projectInquirySchema.safeParse(data)

  if (!parsed.success) {
    return {
      success: false,
      message: 'Bitte überprüfen Sie Ihre Eingaben.',
    }
  }

  const d = parsed.data
  const fullName = `${d.vorname} ${d.nachname}`

  const { text, html } = renderRows([
    ['Name', fullName],
    ['E-Mail', d.email],
    ['Telefon', d.telefon || 'Nicht angegeben'],
    ['Projekttyp', d.projektTyp],
    ['Fläche', d.flaeche || 'Nicht angegeben'],
    ['Zeitraum', d.zeitraum || 'Nicht angegeben'],
    ['Nachricht', d.nachricht],
  ])

  try {
    await sendMail({
      to: NOTIFY_TO,
      subject: `Projektanfrage: ${d.projektTyp}`,
      text: `Neue Projektanfrage über die Website:\n\n${text}`,
      html: `<p>Neue Projektanfrage über die Website:</p>${html}`,
      replyTo: d.email,
    })
  } catch (error) {
    console.error('Project inquiry email failed:', error)
    return {
      success: false,
      message:
        'Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.',
    }
  }

  return {
    success: true,
    message:
      'Ihre Projektanfrage wurde erfolgreich übermittelt. Wir erstellen Ihnen zeitnah ein unverbindliches Angebot.',
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Receives the dynamic, schema-driven project planner submission.
 *
 * Values arrive as a flat `Record<string, string | string[]>` keyed by the
 * field labels defined in the form-builder schema, so we validate the few
 * fields we depend on (contact essentials) rather than a fixed Zod shape.
 */
export async function submitPlannerInquiry(payload: {
  projektTyp: string
  values: FormValues
}): Promise<ActionResult> {
  const { projektTyp, values } = payload

  const asText = (v: FormValues[string] | undefined): string =>
    Array.isArray(v) ? v.join(', ') : (v ?? '')

  const vorname = asText(values['Vorname']).trim()
  const nachname = asText(values['Nachname']).trim()
  const email = asText(values['E-Mail Adresse']).trim()

  if (!projektTyp || !vorname || !nachname || !EMAIL_RE.test(email)) {
    return {
      success: false,
      message: 'Bitte überprüfen Sie Ihre Kontaktdaten und versuchen Sie es erneut.',
    }
  }

  // Flatten every submitted field (label → value) into the email body so the
  // company sees the full, schema-driven planner answers.
  const rows: Array<[string, string]> = [
    ['Projekttyp', projektTyp],
    ...Object.entries(values)
      .map(([label, value]): [string, string] => [label, asText(value)])
      .filter(([, value]) => value.length > 0),
  ]
  const { text, html } = renderRows(rows)

  try {
    await sendMail({
      to: NOTIFY_TO,
      subject: `Projektplaner-Anfrage: ${projektTyp}`,
      text: `Neue Projektplaner-Anfrage über die Website:\n\n${text}`,
      html: `<p>Neue Projektplaner-Anfrage über die Website:</p>${html}`,
      replyTo: email,
    })
  } catch (error) {
    console.error('Planner inquiry email failed:', error)
    return {
      success: false,
      message:
        'Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.',
    }
  }

  return {
    success: true,
    message:
      'Vielen Dank! Wir melden uns innerhalb von 24 Stunden mit Ihrem unverbindlichen Angebot.',
  }
}
