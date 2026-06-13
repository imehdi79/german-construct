'use server'

import { jobApplicationSchema } from '@/schemas/jobs'
import type { JobApplicationSchema } from '@/schemas/jobs'
import { sendMail, escapeHtml, renderRows, collectAttachments, NOTIFY_TO } from '@/lib/email'

export interface ActionResult {
  success: boolean
  message: string
}

export async function submitJobApplication(formData: FormData): Promise<ActionResult> {
  const str = (k: string) => String(formData.get(k) ?? '')
  const parsed = jobApplicationSchema.safeParse({
    vorname: str('vorname'),
    nachname: str('nachname'),
    email: str('email'),
    telefon: str('telefon') || undefined,
    position: str('position'),
    anschreiben: str('anschreiben'),
    datenschutz: formData.get('datenschutz') === 'true',
  } satisfies JobApplicationSchema)

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
    ['Stelle', d.position],
    ['Anschreiben', d.anschreiben],
  ])

  // Collect uploaded files (CV, certificates, …) as attachments.
  const { attachments, skipped } = await collectAttachments(formData)
  const note = skipped.length
    ? `\n\nHinweis: Folgende Anhänge wurden wegen der Größenbeschränkung nicht angehängt: ${skipped.join(', ')}.`
    : ''

  try {
    await sendMail({
      to: NOTIFY_TO,
      subject: `Bewerbung: ${d.position} – ${fullName}`,
      text: `Neue Bewerbung über die Website:\n\n${text}${note}`,
      html: `<p>Neue Bewerbung über die Website:</p>${html}${
        note ? `<p>${escapeHtml(note.trim())}</p>` : ''
      }`,
      replyTo: d.email,
      attachments,
    })
  } catch (error) {
    console.error('Job application email failed:', error)
    return {
      success: false,
      message:
        'Ihre Bewerbung konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.',
    }
  }

  return {
    success: true,
    message:
      'Vielen Dank für Ihre Bewerbung! Wir prüfen Ihre Unterlagen und melden uns schnellstmöglich bei Ihnen.',
  }
}
