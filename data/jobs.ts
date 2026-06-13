import type { Job } from '@/types'

export const jobs: Job[] = [
  {
    id: 'fliesenleger-geselle',
    title: 'Fliesenleger / Fliesenlegerin (m/w/d)',
    type: 'Vollzeit',
    level: 'Senior',
    location: 'Neu-Ulm',
    salary: '20 – 26 € / Stunde (je nach Qualifikation)',
    description:
      'Wir suchen einen erfahrenen Fliesenleger zur Verstärkung unseres wachsenden Teams. Sie arbeiten selbstständig auf unseren Baustellen in Neu-Ulm, Ulm und Umgebung und vertreten dabei die hohen Qualitätsstandards von AMAN.',
    requirements: [
      'Abgeschlossene Berufsausbildung als Fliesenleger oder vergleichbare Qualifikation',
      'Mehrjährige Berufserfahrung im Fliesenlegerhandwerk',
      'Erfahrung mit Naturstein und Großformatfliesen von Vorteil',
      'Selbstständige, präzise und sorgfältige Arbeitsweise',
      'Führerschein Klasse B',
      'Teamfähigkeit und Kundenorientierung',
    ],
    benefits: [
      'Überdurchschnittliche Bezahlung nach Qualifikation',
      'Firmenwagen mit Privatnutzung',
      'Hochwertige Werkzeugausstattung',
      'Weiterbildungs- und Schulungsangebote',
      'Betriebliche Altersvorsorge',
      'Weihnachts- und Urlaubsgeld',
      'Modernes, kollegiales Arbeitsumfeld',
    ],
    posted: '2024-12-01',
  },
  {
    id: 'estrichleger-geselle',
    title: 'Estrichleger / Estrichlegerin (m/w/d)',
    type: 'Vollzeit',
    level: 'Senior',
    location: 'Neu-Ulm, Ulm und Umgebung',
    salary: '18 – 24 € / Stunde',
    description:
      'Zur Erweiterung unseres Teams suchen wir einen qualifizierten Estrichleger. Sie sind für die fachgerechte Verlegung verschiedener Estrichsysteme verantwortlich und arbeiten eng mit unserem Fliesenlegeteam zusammen.',
    requirements: [
      'Abgeschlossene Ausbildung als Estrichleger oder Bodenleger',
      'Erfahrung mit Zement-, Anhydrit- und Fließestrich',
      'Kenntnis aktueller VOB/DIN-Vorschriften',
      'Körperliche Belastbarkeit und handwerkliches Geschick',
      'Führerschein Klasse B',
    ],
    benefits: [
      'Attraktives Gehalt entsprechend Ihrer Qualifikation',
      'Geregelte Arbeitszeiten',
      'Moderne Arbeitsmittel und Fahrzeuge',
      'Urlaubsgeld und Weihnachtsgeld',
      'Sicherer Arbeitsplatz in einem wachsenden Unternehmen',
    ],
    posted: '2024-11-15',
  },
  {
    id: 'ausbildung-fliesenleger',
    title: 'Ausbildung Fliesen-, Platten- und Mosaikleger (m/w/d)',
    type: 'Ausbildung',
    level: 'Junior',
    location: 'Neu-Ulm',
    salary: 'Ausbildungsvergütung nach Tarif',
    description:
      'Starten Sie Ihre Karriere im Bauhandwerk mit einer fundierten Ausbildung bei AMAN. Wir bieten Ihnen eine praxisorientierte Ausbildung mit persönlicher Betreuung durch unsere erfahrenen Meister.',
    requirements: [
      'Hauptschulabschluss oder höher',
      'Handwerkliches Geschick und Freude an praktischer Arbeit',
      'Sorgfalt und Genauigkeit',
      'Teamfähigkeit und Zuverlässigkeit',
      'Interesse an modernem Design und Materialien',
    ],
    benefits: [
      'Überbetriebliche Ausbildungsvergütung',
      'Persönliche Betreuung durch erfahrene Meister',
      'Prüfungsvorbereitung',
      'Möglichkeit zur Übernahme nach der Ausbildung',
      'Junges, motiviertes Team',
      'Kostenlose Schutzausrüstung',
    ],
    posted: '2024-10-01',
  },
]

export const projectTypes = [
  { value: 'fliesenleger', label: 'Fliesenleger / Fliesenlegerin' },
  { value: 'estrichleger', label: 'Estrichleger / Estrichlegerin' },
  { value: 'ausbildung', label: 'Ausbildungsplatz' },
  { value: 'praktikum', label: 'Praktikum' },
  { value: 'sonstiges', label: 'Sonstige Position' },
]
