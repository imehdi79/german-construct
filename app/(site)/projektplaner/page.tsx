import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ProjektplanerSection } from '@/sections/ProjektplanerSection'
import { createMetadata } from '@/lib/metadata'
import { getFormSchemas } from '@/lib/content'

export const metadata: Metadata = createMetadata({
  title: 'Projektplaner',
  description:
    'Planen Sie Ihr Fliesen- oder Natursteinprojekt online und erhalten Sie innerhalb von 24 Stunden ein kostenloses, unverbindliches Angebot.',
  path: '/projektplaner',
})

export default async function ProjektplanerPage() {
  const formSchemas = await getFormSchemas()

  return (
    <>
      {/* Page Header */}
      <div className="bg-aman-cream pt-28 md:pt-36 pb-14 border-b border-aman-border">
        <div className="container-aman">
          <nav aria-label="Brotkrümel" className="flex items-center gap-2 text-sm text-aman-text-muted mb-5">
            <Link href="/" className="hover:text-aman-gold transition-colors">Startseite</Link>
            <span>/</span>
            <span className="text-aman-charcoal">Projektplaner</span>
          </nav>
          <SectionTitle
            eyebrow="Ihr Projekt, unser Handwerk"
            title="Kostenloses Angebot anfragen"
            subtitle="Wählen Sie Ihr Projektvorhaben und schildern Sie uns kurz Ihre Anforderungen. Wir melden uns innerhalb von 24 Stunden mit einem unverbindlichen Angebot."
          />
        </div>
      </div>

      {/* Reuse the home section – it works standalone too */}
      <div className="bg-aman-cream">
        <ProjektplanerSection schemas={formSchemas} />
      </div>

      {/* Info Strip */}
      <section className="bg-white border-t border-aman-border py-12">
        <div className="container-aman">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { number: '24h', label: 'Antwortzeit', desc: 'Wir melden uns innerhalb eines Werktages' },
              { number: '100%', label: 'Kostenlos', desc: 'Unverbindliches Angebot ohne versteckte Kosten' },
              { number: 'Meister', label: 'Geführt vom Fachmann', desc: 'Jedes Projekt wird vom Handwerksmeister begleitet' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <span className="font-serif text-4xl text-aman-gold">{item.number}</span>
                <p className="font-medium text-aman-charcoal">{item.label}</p>
                <p className="text-sm text-aman-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
