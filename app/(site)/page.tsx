import type { Metadata } from 'next'
import { HeroSection } from '@/sections/HeroSection'
import { ProjektplanerSection } from '@/sections/ProjektplanerSection'
import { LeistungenSection } from '@/sections/LeistungenSection'
import { WarumAmanSection } from '@/sections/WarumAmanSection'
import { StatistikSection } from '@/sections/StatistikSection'
import { GalerieSection } from '@/sections/GalerieSection'
import { TestimonialsSection } from '@/sections/TestimonialsSection'
import { KontaktCtaSection } from '@/sections/KontaktCtaSection'
import { siteConfig } from '@/config/site'
import { getSiteContent, getFormSchemas } from '@/lib/content'

export const metadata: Metadata = {
  title: `${siteConfig.name} – ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${siteConfig.url}/#business`,
      name: siteConfig.name,
      description: siteConfig.description,
      url: siteConfig.url,
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.contact.address.street,
        addressLocality: siteConfig.contact.address.city,
        postalCode: siteConfig.contact.address.zip,
        addressCountry: siteConfig.contact.address.countryCode,
        addressRegion: siteConfig.contact.address.region,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 50.1109,
        longitude: 8.6821,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '07:30',
          closes: '18:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '08:00',
          closes: '13:00',
        },
      ],
      priceRange: '€€',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Fliesen- und Natursteinarbeiten',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fliesenarbeiten' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Natursteinarbeiten' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Estricharbeiten' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Verfugungsarbeiten' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sanierungen' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Terrassen & Außenbereiche' } },
        ],
      },
      sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: 'de-DE',
    },
  ],
}

export default async function HomePage() {
  const [site, formSchemas] = await Promise.all([getSiteContent(), getFormSchemas()])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection hero={site.hero} />
      <ProjektplanerSection schemas={formSchemas} />
      <LeistungenSection />
      <WarumAmanSection />
      <StatistikSection stats={site.stats} />
      <GalerieSection />
      <TestimonialsSection />
      <KontaktCtaSection />
    </>
  )
}
