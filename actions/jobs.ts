'use server'

import { jobApplicationSchema } from '@/schemas/jobs'
import type { JobApplicationSchema } from '@/schemas/jobs'
import { sendMail, renderRows, NOTIFY_TO } from '@/lib/email'

export interface ActionResult {
  success: boolean
  message: string
}

export async function submitJobApplication(
  data: JobApplicationSchema
): Promise<ActionResult> {
  const parsed = jobApplicationSchema.safeParse(data)

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

  try {
    await sendMail({
      to: NOTIFY_TO,
      subject: `Bewerbung: ${d.position} – ${fullName}`,
      text: `Neue Bewerbung über die Website:\n\n${text}`,
      html: `<p>Neue Bewerbung über die Website:</p>${html}`,
      replyTo: d.email,
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
