'use server'

import { jobApplicationSchema } from '@/schemas/jobs'
import type { JobApplicationSchema } from '@/schemas/jobs'

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

  // In production: send email with attachment
  // await sendEmail({
  //   to: 'bewerbung@fliesen-naturstein-aman.de',
  //   subject: `Bewerbung: ${parsed.data.position}`,
  //   text: `
  //     Name: ${parsed.data.vorname} ${parsed.data.nachname}
  //     E-Mail: ${parsed.data.email}
  //     Telefon: ${parsed.data.telefon ?? 'Nicht angegeben'}
  //     Stelle: ${parsed.data.position}
  //     Anschreiben: ${parsed.data.anschreiben}
  //   `,
  // })

  console.log('Job application submission:', parsed.data)

  return {
    success: true,
    message:
      'Vielen Dank für Ihre Bewerbung! Wir prüfen Ihre Unterlagen und melden uns schnellstmöglich bei Ihnen.',
  }
}
