import type { Metadata } from 'next'
import { HeroSection } from '@/sections/HeroSection'
import { ProjektplanerSection } from '@/sections/ProjektplanerSection'
import { LeistungenSection } from '@/sections/LeistungenSection'
import { WarumAmanSection } from '@/sections/WarumAmanSection'
// import { StatistikSection } from '@/sections/StatistikSection'
import { GalerieSection } from '@/sections/GalerieSection'
// import { TestimonialsSection } from '@/sections/TestimonialsSection'
import { KontaktCtaSection } from '@/sections/KontaktCtaSection'
import { siteConfig } from '@/config/site'
import { createMetadata } from '@/lib/metadata'
import {
  getSiteContent,
  getServices,
  getGallery,
  getFormSchemas,
  getPlannerCards,
} from '@/lib/content'

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({ pageKey: 'home', path: '' })
}

export default async function HomePage() {
  const [site, services, gallery, formSchemas, plannerCards] =
    await Promise.all([
      getSiteContent(),
      getServices(),
      getGallery(),
      getFormSchemas(),
      getPlannerCards(),
    ])

  const { brand, contact, social, sections } = site

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${siteConfig.url}/#business`,
        name: brand.name,
        description: brand.description,
        url: siteConfig.url,
        telephone: contact.phone,
        email: contact.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: contact.address.street,
          addressLocality: contact.address.city,
          postalCode: contact.address.zip,
          addressCountry: siteConfig.contact.address.countryCode,
          addressRegion: contact.address.region,
        },
        geo: { '@type': 'GeoCoordinates', latitude: 50.1109, longitude: 8.6821 },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '07:30',
            closes: '18:00',
          },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:00', closes: '13:00' },
        ],
        priceRange: '€€',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Fliesen- und Natursteinarbeiten',
          itemListElement: services.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.title },
          })),
        },
        sameAs: [social.instagram, social.facebook],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: brand.name,
        description: brand.description,
        inLanguage: 'de-DE',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection hero={site.hero} trustIndicators={site.hero.trustIndicators} />
      <ProjektplanerSection
        schemas={formSchemas}
        cards={plannerCards}
        copy={sections.projektplaner}
      />
      <LeistungenSection services={services} copy={sections.leistungenIntro} />
      <WarumAmanSection copy={sections.warumAman} />
      {/* <StatistikSection stats={site.stats} copy={sections.statistik} /> */}
      <GalerieSection
        items={gallery}
        categories={sections.galleryCategories}
        copy={sections.galerieIntro}
      />
      {/* <TestimonialsSection items={testimonials} copy={sections.testimonials} /> */}
      <KontaktCtaSection
        copy={sections.kontaktCta}
        contact={contact}
        openingHours={site.openingHours}
      />
    </>
  )
}
