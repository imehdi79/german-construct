export const siteConfig = {
  name: 'Fliesen-Naturstein AMAN',
  shortName: 'AMAN',
  tagline: 'Ihr Fachbetrieb für Fliesen-, Platten- und Natursteinarbeiten',
  description:
    'Fliesen-Naturstein AMAN – Ihr Meisterbetrieb für hochwertige Fliesen-, Platten- und Natursteinarbeiten in Neu-Ulm, Ulm und Umgebung. Präzision, Qualität und persönliche Betreuung zu fairen Festpreisen.',
  url: 'https://fliesen-aman.de',
  locale: 'de_DE',

  contact: {
    phone: '-',
    mobile: '+49 176 34569351',
    email: 'info@fliesen-aman.de',
    address: {
      street: 'Turmstraße 45/3',
      city: 'Neu-Ulm',
      zip: '89231',
      country: 'Deutschland',
      countryCode: 'DE',
      region: 'Bayern',
    },
  },

  openingHours: {
    weekdays: 'Mo – Fr: 07:30 – 18:00 Uhr',
    saturday: 'Sa: 08:00 – 13:00 Uhr',
    sunday: 'So: Geschlossen',
  },

  social: {
    instagram: 'https://instagram.com/fliesen-naturstein-aman',
    facebook: 'https://facebook.com/fliesennatursteinaman',
  },

  stats: {
    warranty: 5,
    fixedPrice: 100,
    quality: 100,
  },

  seo: {
    keywords: [
      'Fliesenleger Neu-Ulm',
      'Fliesenarbeiten Neu-Ulm',
      'Naturstein Ulm',
      'Fliesenleger Ulm',
      'Natursteinarbeiten',
      'Estricharbeiten Neu-Ulm',
      'Badezimmer Fliesen Ulm',
      'Terrassenplatten Neu-Ulm',
      'Verfugungsarbeiten',
      'Sanierung Neu-Ulm',
      'Fachbetrieb Fliesen Bayern',
    ],
  },
} as const

export type SiteConfig = typeof siteConfig
