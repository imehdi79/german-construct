'use server'

import { contactSchema, projectInquirySchema } from '@/schemas/contact'
import type { ContactSchema, ProjectInquirySchema } from '@/schemas/contact'
import type { FormValues } from '@/components/Form-Builder/types'

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

  // In production: send email via nodemailer/resend/sendgrid
  // await sendEmail({
  //   to: 'info@fliesen-naturstein-aman.de',
  //   subject: `Kontaktanfrage: ${parsed.data.betreff}`,
  //   text: `
  //     Name: ${parsed.data.vorname} ${parsed.data.nachname}
  //     E-Mail: ${parsed.data.email}
  //     Telefon: ${parsed.data.telefon ?? 'Nicht angegeben'}
  //     Nachricht: ${parsed.data.nachricht}
  //   `,
  // })

  console.log('Contact form submission:', parsed.data)

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

  // In production: send email
  console.log('Project inquiry submission:', parsed.data)

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

  // In production: send email / persist the inquiry.
  console.log('Planner inquiry submission:', { projektTyp, values })

  return {
    success: true,
    message:
      'Vielen Dank! Wir melden uns innerhalb von 24 Stunden mit Ihrem unverbindlichen Angebot.',
  }
}
