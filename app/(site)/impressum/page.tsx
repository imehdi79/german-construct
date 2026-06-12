import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { createMetadata } from '@/lib/metadata'

export const metadata: Metadata = createMetadata({
  title: 'Impressum',
  description: `Impressum der ${siteConfig.name} – Pflichtangaben gemäß § 5 TMG.`,
  path: '/impressum',
  noIndex: true,
})

export default function ImpressumPage() {
  return (
    <div className="pt-28 md:pt-36 pb-20 bg-white">
      <div className="container-aman max-w-3xl">
        <nav aria-label="Brotkrümel" className="flex items-center gap-2 text-sm text-aman-text-muted mb-8">
          <Link href="/" className="hover:text-aman-gold transition-colors">Startseite</Link>
          <span>/</span>
          <span className="text-aman-charcoal">Impressum</span>
        </nav>

        <h1 className="font-serif text-aman-charcoal mb-10" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          Impressum
        </h1>

        <div className="prose prose-lg max-w-none space-y-8 text-aman-text-muted">
          <section aria-labelledby="angaben">
            <h2 id="angaben" className="font-serif text-xl text-aman-charcoal mb-4">
              Angaben gemäß § 5 TMG
            </h2>
            <address className="not-italic space-y-1 text-aman-text">
              <p className="font-semibold text-aman-charcoal">{siteConfig.name}</p>
              <p>{siteConfig.contact.address.street}</p>
              <p>{siteConfig.contact.address.zip} {siteConfig.contact.address.city}</p>
              <p>{siteConfig.contact.address.country}</p>
            </address>
          </section>

          <section aria-labelledby="kontakt-impressum">
            <h2 id="kontakt-impressum" className="font-serif text-xl text-aman-charcoal mb-4">
              Kontakt
            </h2>
            <p>Telefon: <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="text-aman-gold hover:underline">{siteConfig.contact.phone}</a></p>
            <p>Mobil: <a href={`tel:${siteConfig.contact.mobile.replace(/\s/g, '')}`} className="text-aman-gold hover:underline">{siteConfig.contact.mobile}</a></p>
            <p>E-Mail: <a href={`mailto:${siteConfig.contact.email}`} className="text-aman-gold hover:underline">{siteConfig.contact.email}</a></p>
          </section>

          <section aria-labelledby="handwerkskammer">
            <h2 id="handwerkskammer" className="font-serif text-xl text-aman-charcoal mb-4">
              Berufsrechtliche Angaben
            </h2>
            <p>Zuständige Handwerkskammer: Handwerkskammer Frankfurt-Rhein-Main</p>
            <p>Handwerksrolle: Fliesen-, Platten- und Mosaikleger</p>
            <p>Meisterbetrieb</p>
          </section>

          <section aria-labelledby="verantwortlich">
            <h2 id="verantwortlich" className="font-serif text-xl text-aman-charcoal mb-4">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p>[Name des Inhabers]</p>
            <p>{siteConfig.contact.address.street}</p>
            <p>{siteConfig.contact.address.zip} {siteConfig.contact.address.city}</p>
          </section>

          <section aria-labelledby="haftung-inhalte">
            <h2 id="haftung-inhalte" className="font-serif text-xl text-aman-charcoal mb-4">
              Haftung für Inhalte
            </h2>
            <p className="leading-relaxed">
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen
              Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir
              als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
              rechtswidrige Tätigkeit hinweisen.
            </p>
            <p className="leading-relaxed mt-3">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
              allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist
              jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
              Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte
              umgehend entfernen.
            </p>
          </section>

          <section aria-labelledby="haftung-links">
            <h2 id="haftung-links" className="font-serif text-xl text-aman-charcoal mb-4">
              Haftung für Links
            </h2>
            <p className="leading-relaxed">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir
              keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
              Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
              Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
          </section>

          <section aria-labelledby="urheberrecht">
            <h2 id="urheberrecht" className="font-serif text-xl text-aman-charcoal mb-4">
              Urheberrecht
            </h2>
            <p className="leading-relaxed">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
              unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
              Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
              bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>

          <section aria-labelledby="streitschlichtung">
            <h2 id="streitschlichtung" className="font-serif text-xl text-aman-charcoal mb-4">
              Streitschlichtung
            </h2>
            <p className="leading-relaxed">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
              bereit:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-aman-gold hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
            <p className="leading-relaxed mt-3">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-aman-border flex flex-wrap gap-4 text-sm text-aman-text-light">
          <Link href="/datenschutz" className="hover:text-aman-gold transition-colors">Datenschutz</Link>
          <Link href="/agb" className="hover:text-aman-gold transition-colors">AGB</Link>
          <Link href="/nutzungsbedingungen" className="hover:text-aman-gold transition-colors">Nutzungsbedingungen</Link>
        </div>
      </div>
    </div>
  )
}
