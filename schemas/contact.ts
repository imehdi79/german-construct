import { z } from 'zod'

export const contactSchema = z.object({
  vorname: z
    .string()
    .min(2, 'Vorname muss mindestens 2 Zeichen haben')
    .max(50, 'Vorname darf maximal 50 Zeichen haben'),
  nachname: z
    .string()
    .min(2, 'Nachname muss mindestens 2 Zeichen haben')
    .max(50, 'Nachname darf maximal 50 Zeichen haben'),
  email: z
    .string()
    .email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
  telefon: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[+]?[\d\s\-().]{6,20}$/.test(val),
      'Bitte geben Sie eine gültige Telefonnummer ein'
    ),
  betreff: z
    .string()
    .min(3, 'Betreff muss mindestens 3 Zeichen haben')
    .max(100, 'Betreff darf maximal 100 Zeichen haben'),
  nachricht: z
    .string()
    .min(20, 'Nachricht muss mindestens 20 Zeichen haben')
    .max(2000, 'Nachricht darf maximal 2000 Zeichen haben'),
  datenschutz: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Sie müssen der Datenschutzerklärung zustimmen',
    }),
})

export type ContactSchema = z.infer<typeof contactSchema>

export const projectInquirySchema = z.object({
  vorname: z
    .string()
    .min(2, 'Vorname muss mindestens 2 Zeichen haben'),
  nachname: z
    .string()
    .min(2, 'Nachname muss mindestens 2 Zeichen haben'),
  email: z
    .string()
    .email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
  telefon: z
    .string()
    .optional(),
  projektTyp: z
    .string()
    .min(1, 'Bitte wählen Sie einen Projekttyp aus'),
  flaeche: z
    .string()
    .optional(),
  zeitraum: z
    .string()
    .optional(),
  nachricht: z
    .string()
    .min(10, 'Beschreiben Sie Ihr Projekt kurz (mindestens 10 Zeichen)')
    .max(2000, 'Nachricht darf maximal 2000 Zeichen haben'),
  datenschutz: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Sie müssen der Datenschutzerklärung zustimmen',
    }),
})

export type ProjectInquirySchema = z.infer<typeof projectInquirySchema>
