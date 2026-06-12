export const siteConfig = {
  name: 'Fliesen-Naturstein AMAN',
  shortName: 'AMAN',
  tagline: 'Ihr Fachbetrieb für Fliesen-, Platten- und Natursteinarbeiten',
  description:
    'Fliesen-Naturstein AMAN – Ihr neuer Meisterbetrieb für hochwertige Fliesen-, Platten- und Natursteinarbeiten in Frankfurt und Umgebung. Präzision, Qualität und persönliche Betreuung zu fairen Festpreisen.',
  url: 'https://fliesen-naturstein-aman.de',
  locale: 'de_DE',

  contact: {
    phone: '+49 69 123 456 789',
    mobile: '+49 151 234 567 89',
    email: 'info@fliesen-naturstein-aman.de',
    address: {
      street: 'Musterstraße 42',
      city: 'Frankfurt am Main',
      zip: '60311',
      country: 'Deutschland',
      countryCode: 'DE',
      region: 'Hessen',
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
    responseTime: 24,
    quality: 100,
  },

  seo: {
    keywords: [
      'Fliesenleger Frankfurt',
      'Fliesenarbeiten Frankfurt',
      'Naturstein Frankfurt',
      'Fliesenleger',
      'Natursteinarbeiten',
      'Estricharbeiten Frankfurt',
      'Badezimmer Fliesen Frankfurt',
      'Terrassenplatten Frankfurt',
      'Verfugungsarbeiten',
      'Sanierung Frankfurt',
      'Fachbetrieb Fliesen Hessen',
    ],
  },
} as const

export type SiteConfig = typeof siteConfig
