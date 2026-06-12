import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import { getServices } from '@/lib/content'
import { services as seedServices } from '@/data/services'
import { createMetadata } from '@/lib/metadata'

export const metadata: Metadata = createMetadata({
  title: 'Leistungen',
  description:
    'Unsere Leistungen: Fliesenarbeiten, Natursteinarbeiten, Estricharbeiten, Verfugungen, Sanierungen und Terrassengestaltung in Frankfurt und Umgebung.',
  path: '/leistungen',
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Leistungen Fliesen-Naturstein AMAN',
  itemListElement: seedServices.map((service, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Service',
      name: service.title,
      description: service.description,
      provider: {
        '@type': 'LocalBusiness',
        name: 'Fliesen-Naturstein AMAN',
      },
    },
  })),
}

export default async function LeistungenPage() {
  const services = await getServices()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Page Header */}
      <div className="bg-aman-cream pt-28 md:pt-36 pb-14 border-b border-aman-border">
        <div className="container-aman">
          <nav aria-label="Brotkrümel" className="flex items-center gap-2 text-sm text-aman-text-muted mb-5">
            <Link href="/" className="hover:text-aman-gold transition-colors">Startseite</Link>
            <span>/</span>
            <span className="text-aman-charcoal">Leistungen</span>
          </nav>
          <SectionTitle
            eyebrow="Unsere Expertise"
            title="Alles aus einer Hand"
            subtitle="Von der Untergrundvorbereitung bis zur finalen Verfugung – wir bieten das gesamte Spektrum des Fliesen- und Natursteinhandwerks."
          />
        </div>
      </div>

      {/* Services Detail */}
      <section className="section-padding bg-white">
        <div className="container-aman space-y-20 md:space-y-28">
          {services.map((service, index) => (
            <article
              key={service.id}
              id={service.id}
              className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center scroll-mt-24 ${
                index % 2 === 1 ? 'lg:[&>*:first-child]:order-last' : ''
              }`}
              aria-labelledby={`service-${service.id}`}
            >
              {/* Image Placeholder */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-aman-cream shadow-card">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-aman-stone-100 flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl text-aman-stone-300">{index + 1}</span>
                    </div>
                    <p className="text-aman-stone-200 text-sm font-medium">{service.title}</p>
                  </div>
                </div>
                {/* Placeholder pattern */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `repeating-linear-gradient(
                      45deg,
                      #C4B5A0,
                      #C4B5A0 1px,
                      transparent 1px,
                      transparent 20px
                    )`,
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* Content */}
              <div>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-aman-gold flex items-center gap-2 mb-4">
                  <span className="gold-line" aria-hidden="true" />
                  Leistung 0{index + 1}
                </span>

                <h2
                  id={`service-${service.id}`}
                  className="font-serif text-aman-charcoal mb-5"
                  style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
                >
                  {service.title}
                </h2>

                <p className="text-aman-text-muted leading-relaxed mb-7">
                  {service.description}
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8" role="list">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle
                        size={16}
                        className="text-aman-gold shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span className="text-aman-text">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  href="/kontakt"
                  variant="gold"
                  size="md"
                  icon={<ArrowRight size={15} />}
                >
                  Jetzt anfragen
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding-sm bg-aman-cream border-t border-aman-border">
        <div className="container-aman text-center">
          <h2 className="font-serif text-aman-charcoal mb-4" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}>
            Ihr Projekt ist nicht dabei?
          </h2>
          <p className="text-aman-text-muted mb-7 max-w-xl mx-auto">
            Sprechen Sie uns an – wir finden gemeinsam die passende Lösung für Ihr individuelles Vorhaben.
          </p>
          <Button href="/kontakt" variant="primary" size="lg" icon={<ArrowRight size={16} />}>
            Individuelle Anfrage stellen
          </Button>
        </div>
      </section>
    </>
  )
}
