import type { Job } from '@/types'

export const jobs: Job[] = [
  {
    "id": "fliesenleger-geselle",
    "title": "Fliesenleger / Fliesenlegerin (m/w/d)",
    "type": "Vollzeit / Teilzeit",
    "level": "",
    "location": "Neu-Ulm",
    "salary": "",
    "description": "Wir suchen einen erfahrenen Fliesenleger zur Verstärkung unseres wachsenden Teams. Sie arbeiten selbstständig auf unseren Baustellen in Neu-Ulm, Ulm und Umgebung und vertreten dabei die hohen Qualitätsstandards von Fliesen - Naturstein Aman.",
    "requirements": [
      "Abgeschlossene Berufsausbildung als Fliesenleger oder vergleichbare Qualifikation",
      "Mehrjährige Berufserfahrung im Fliesenlegerhandwerk",
      "Erfahrung mit Naturstein und Großformatfliesen von Vorteil",
      "Selbstständige, präzise und sorgfältige Arbeitsweise",
      "Führerschein Klasse B",
      "Teamfähigkeit und Kundenorientierung"
    ],
    "benefits": [
      "Überdurchschnittliche Bezahlung nach Qualifikation",
      "Firmenwagen",
      "Hochwertige Werkzeugausstattung",
      "Modernes, kollegiales Arbeitsumfeld"
    ],
    "posted": "2024-12-01"
  }
]

export const projectTypes = [
  { value: 'fliesenleger', label: 'Fliesenleger / Fliesenlegerin' },
  { value: 'estrichleger', label: 'Estrichleger / Estrichlegerin' },
  { value: 'ausbildung', label: 'Ausbildungsplatz' },
  { value: 'praktikum', label: 'Praktikum' },
  { value: 'sonstiges', label: 'Sonstige Position' },
]
