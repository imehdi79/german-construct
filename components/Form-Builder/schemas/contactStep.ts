/**
 * contactStep.ts
 *
 * Single merged contact step — used by every form schema.
 *
 * Previously each schema had two identical steps both titled
 * "An wen sollen die Angebote geschickt werden?" which split
 * salutation/name from contact details. They are merged here
 * into one cohesive step.
 *
 * Wording updated: instructions now reference sending information
 * directly to us, not to a third party.
 */

import { Step } from "@/components/Form-Builder/types";

/**
 * Returns the shared, merged contact step.
 * Call once per schema — do not inline; keeps the definition DRY.
 *
 * @param generateId  Pass your schema's generateId function so Step/Field
 *                    IDs are generated with the same utility as the rest
 *                    of the schema. Field IDs that carry semantic meaning
 *                    (Vorname, E-Mail Adresse, …) are kept stable as
 *                    string literals so submitted values are consistent
 *                    across all schemas.
 */
export function makeContactStep(generateId: () => string): Step {
  return {
    id: generateId(),
    title: "Ihre Kontaktdaten",
    description:
      "Damit wir Ihre Anfrage bearbeiten und ein passendes Angebot erstellen können, benötigen wir Ihre Kontaktinformationen. Pflichtfelder sind mit einem Sternchen (*) gekennzeichnet.",
    fields: [
      // ── Salutation ────────────────────────────────────────────────────
      {
        id: "Anrede",
        label: "Anrede *",
        type: "radio",
        required: true,
        options: [
          { label: "Herr", value: "Herr" },
          { label: "Frau", value: "Frau" },
          { label: "Divers / keine Anrede", value: "Divers/keine Anrede" },
        ],
      },
      // ── Name ─────────────────────────────────────────────────────────
      {
        id: "Vorname",
        label: "Vorname *",
        type: "text",
        description: "Ihr Vorname",
        required: true,
      },
      {
        id: "Nachname",
        label: "Nachname *",
        type: "text",
        description: "Ihr Nachname",
        required: true,
      },
      // ── Contact details ───────────────────────────────────────────────
      {
        id: "E-Mail Adresse",
        label: "E-Mail-Adresse *",
        type: "text",
        description: "z. B. ihre@email.de",
        required: true,
        validation: {
          pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          patternMessage: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
        },
      },
      {
        id: "Telefonnummer",
        label: "Telefonnummer *",
        type: "text",
        description: "z. B. +49 30 123456",
        required: true,
      },
      {
        id: "Handynummer",
        label: "Mobilnummer",
        type: "text",
        description: "z. B. +49 170 123456",
      },
      // ── Preferred contact method ──────────────────────────────────────
      {
        id: generateId(),
        label: "Bevorzugter Kontaktweg *",
        type: "label",
      },
      {
        id: generateId(),
        label:
          "Wir werden Sie vorrangig über diesen Weg kontaktieren. Im Bedarfsfall können wir auch alternative Kanäle nutzen, um eine schnelle Bearbeitung Ihrer Anfrage sicherzustellen.",
        type: "label",
        variant: "subtitle",
      },
      {
        id: "Bevorzugte Kontaktmethode",
        label: "Bevorzugter Kontaktweg *",
        type: "checkbox",
        required: true,
        options: [
          { label: "E-Mail", value: "E-Mail" },
          { label: "Telefon", value: "Telefon" },
          { label: "WhatsApp (Nachricht)", value: "WhatsApp (Nachricht)" },
        ],
      },
      // ── Preferred contact time ────────────────────────────────────────
      {
        id: generateId(),
        label: "Wann möchten Sie kontaktiert werden? *",
        type: "label",
      },
      {
        id: "Wann möchten Sie kontaktiert werden?",
        label: "Erreichbarkeit *",
        type: "checkbox",
        required: true,
        options: [
          { label: "Vormittags (09:00 – 12:00 Uhr)", value: "Vormittags (09:00 - 12:00 Uhr)" },
          { label: "Nachmittags (12:00 – 16:00 Uhr)", value: "Nachmittags (12:00 - 16:00 Uhr)" },
          { label: "Abends (16:00 – 19:00 Uhr)", value: "Abends (16:00 - 19:00 Uhr)" },
        ],
      },
    ],
  };
}
