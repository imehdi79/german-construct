import { Step } from "@/components/Form-Builder/types";
import { generateId } from "@/lib/generateId";
import { makeContactStep } from "./contactStep";
import { locationOptions } from "./locationOptions";

export const fugenarbeitenSchema: Step[] = [
  {
    id: generateId(),
    title: "Welches Fugenmaterial wird verwendet?",
    fields: [
      {
        id: "Welches Fugenmaterial wird verwendet?",
        label: "",
        type: "radio",
        required: true,
        options: [
          { label: "Silikon", value: "Silikon" },
          { label: "Zement", value: "Zement" },
          { label: "Epoxidharz", value: "Epoxidharz" },
          { label: "Sonstiges", value: "Sonstiges", hasNote: true },
        ],
      },
    ],
  },
  {
    id: generateId(),
    title: "Müssen alte Fugen entfernt werden?",
    fields: [
      {
        id: "Müssen alte Fugen entfernt werden?",
        label: "",
        type: "radio",
        required: true,
        options: [
          { label: "Ja", value: "Ja" },
          { label: "Nein", value: "Nein" },
        ],
      },
    ],
  },
  {
    id: generateId(),
    title: "In welchem Bereich befinden sich die Fugen?",
    fields: [
      {
        id: "In welchem Bereich befinden sich die Fugen?",
        label: "",
        type: "checkbox",
        required: true,
        options: [
          { label: "Bad", value: "Bad" },
          { label: "Küche", value: "Küche" },
          { label: "Boden", value: "Boden" },
          { label: "Außenbereich", value: "Außenbereich" },
          { label: "Sonstiges", value: "Sonstiges", hasNote: true },
        ],
      },
    ],
  },
  {
    id: generateId(),
    title: "Welche Fläche soll bearbeitet werden?",
    fields: [
      {
        id: "Welche Fläche soll bearbeitet werden?",
        label: "",
        type: "radio",
        required: true,
        options: [
          { label: "Unter 5 m²", value: "Unter 5 m²" },
          { label: "5–20 m²", value: "5–20 m²" },
          { label: "Über 20 m²", value: "Über 20 m²" },
          { label: "Ungefähr (bitte angeben)", value: "Ungefähr (bitte angeben)", hasNote: true },
        ],
      },
    ],
  },
  {
    id: generateId(),
    title: "Bitte beschreiben Sie Ihren Auftrag:",
    description:
      "Je mehr Details Sie angeben, desto besser können wir ein passendes Angebot für Sie erstellen.",
    fields: [
      {
        id: "Bitte beschreiben Sie Ihren Auftrag:",
        label: "",
        type: "textarea",
        description:
          "Was soll erledigt werden? Welches Budget haben Sie eingeplant? Geben Sie gerne Informationen zu Vorarbeiten, Geräteherstellern oder Förderungen an.",
      },
    ],
  },
  {
    id: generateId(),
    title: "In welchem Budgetrahmen bewegt sich Ihr Projekt?",
    fields: [
      {
        id: "In welchem Budgetrahmen bewegt sich Ihr Projekt?",
        label: "",
        type: "checkbox",
        required: true,
        options: [
          { label: "Unter 1.000 €", value: "Unter 1.000 €" },
          { label: "1.000 – 5.000 €", value: "1.000 - 5.000 €" },
          { label: "5.000 – 10.000 €", value: "5.000 - 10.000 €" },
          { label: "10.000 – 25.000 €", value: "10.000 - 25.000 €" },
          { label: "25.000 – 50.000 €", value: "25.000 - 50.000 €" },
          { label: "Über 50.000 €", value: "Über 50.000 €" },
          { label: "Noch kein Budget festgelegt", value: "Noch kein Budget festgelegt" },
          { label: "Möchte erst beraten werden", value: "Möchte erst einmal beraten werden" },
        ],
      },
    ],
  },
  {
    id: generateId(),
    title: "Anhänge (optional)",
    fields: [
      {
        id: "Anhänge (optional)",
        label:
          "Ihre Anfrage erhält eine genauere Einschätzung, wenn Sie relevante Bilder oder Pläne anfügen.",
        type: "dropzone",
        accept: "image/*,application/pdf",
      },
    ],
  },
  {
    id: generateId(),
    title: "Wann soll die Arbeit durchgeführt werden?",
    mutex: true,
    fields: [
      {
        id: "Wann soll die Arbeit durchgeführt werden?",
        label: "Zeitraum wählen",
        type: "radio",
        required: true,
        options: [
          { label: "So schnell wie möglich", value: "So schnell wie möglich" },
          { label: "Im nächsten Monat", value: "Im nächsten Monat" },
          { label: "In den nächsten 3 Monaten", value: "In den nächsten 3 Monaten" },
          { label: "Ich weiß es noch nicht", value: "Ich weiß es noch nicht" },
        ],
      },
      {
        id: "Wunschtermin",
        label: "Konkretes Datum",
        type: "date",
        required: true,
      },
    ],
  },
  {
    id: generateId(),
    title: "Wo befindet sich der Auftragsort?",
    description: "Für die Suche nach Fachbetrieben in Ihrer Nähe.",
    fields: [
      {
        id: "Wo befindet sich der Auftragsort?",
        label: "",
        type: "select",
        required: true,
        options: locationOptions,
      },
    ],
  },
  makeContactStep(generateId),
];
