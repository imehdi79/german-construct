export const navigation = [
  { label: 'Startseite', href: '/' },
  { label: 'Projektplaner', href: '/projektplaner' },
  { label: 'Leistungen', href: '/leistungen' },
  { label: 'Galerie', href: '/galerie' },
  { label: 'Kontakt', href: '/kontakt' },
  { label: 'Stellenangebote', href: '/stellenangebote' },
] as const

export const footerLinks = {
  services: [
    { label: 'Fliesenarbeiten', href: '/leistungen#fliesenarbeiten' },
    { label: 'Natursteinarbeiten', href: '/leistungen#natursteinarbeiten' },
    { label: 'Verfugungen', href: '/leistungen#verfugungen' },
    { label: 'Fliesensanierung', href: '/leistungen#sanierungen' },
  ],
  company: [
    { label: 'Startseite', href: '/' },
    { label: 'Projektplaner', href: '/projektplaner' },
    { label: 'Galerie', href: '/galerie' },
    { label: 'Stellenangebote', href: '/stellenangebote' },
    { label: 'Kontakt', href: '/kontakt' },
  ],
  legal: [
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
    { label: 'Nutzungsbedingungen', href: '/nutzungsbedingungen' },
  ],
} as const

export type NavItem = (typeof navigation)[number]
