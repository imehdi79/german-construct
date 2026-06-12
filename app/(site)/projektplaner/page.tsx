import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ProjektplanerSection } from '@/sections/ProjektplanerSection'
import { createMetadata } from '@/lib/metadata'
import { getFormSchemas, getPlannerCards, getSiteContent } from '@/lib/content'

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({ pageKey: 'projektplaner', path: '/projektplaner' })
}

export default async function ProjektplanerPage() {
  const [formSchemas, plannerCards, site] = await Promise.all([
    getFormSchemas(),
    getPlannerCards(),
    getSiteContent(),
  ])
  const copy = site.pages.projektplaner

  return (
    <>
      {/* Page Header */}
      <div className="bg-aman-cream pt-28 md:pt-36 pb-14 border-b border-aman-border">
        <div className="container-aman">
          <nav aria-label="Brotkrümel" className="flex items-center gap-2 text-sm text-aman-text-muted mb-5">
            <Link href="/" className="hover:text-aman-gold transition-colors">Startseite</Link>
            <span>/</span>
            <span className="text-aman-charcoal">{copy.breadcrumb}</span>
          </nav>
          <SectionTitle
            eyebrow={copy.eyebrow}
            title={copy.title}
            subtitle={copy.subtitle}
          />
        </div>
      </div>

      {/* Reuse the home section – it works standalone too */}
      <div className="bg-aman-cream">
        <ProjektplanerSection
          schemas={formSchemas}
          cards={plannerCards}
          copy={site.sections.projektplaner}
        />
      </div>

      {/* Info Strip */}
      <section className="bg-white border-t border-aman-border py-12">
        <div className="container-aman">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {copy.infoStrip.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <span className="font-serif text-4xl text-aman-gold">{item.value}</span>
                <p className="font-medium text-aman-charcoal">{item.label}</p>
                <p className="text-sm text-aman-text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
