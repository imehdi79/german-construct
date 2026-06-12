import { z } from 'zod'

export const jobApplicationSchema = z.object({
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
  position: z
    .string()
    .min(1, 'Bitte wählen Sie eine Stelle aus'),
  anschreiben: z
    .string()
    .min(50, 'Ihr Anschreiben muss mindestens 50 Zeichen haben')
    .max(3000, 'Anschreiben darf maximal 3000 Zeichen haben'),
  datenschutz: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Sie müssen der Datenschutzerklärung zustimmen',
    }),
})

export type JobApplicationSchema = z.infer<typeof jobApplicationSchema>
