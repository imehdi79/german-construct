import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { createMetadata } from '@/lib/metadata'

export const metadata: Metadata = createMetadata({
  title: 'Nutzungsbedingungen',
  description: `Nutzungsbedingungen der Website ${siteConfig.name}.`,
  path: '/nutzungsbedingungen',
  noIndex: true,
})

export default function NutzungsbedingungenPage() {
  return (
    <div className="pt-28 md:pt-36 pb-20 bg-white">
      <div className="container-aman max-w-3xl">
        <nav aria-label="Brotkrümel" className="flex items-center gap-2 text-sm text-aman-text-muted mb-8">
          <Link href="/" className="hover:text-aman-gold transition-colors">Startseite</Link>
          <span>/</span>
          <span className="text-aman-charcoal">Nutzungsbedingungen</span>
        </nav>

        <h1 className="font-serif text-aman-charcoal mb-10" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          Nutzungsbedingungen
        </h1>

        <div className="space-y-8 text-aman-text-muted text-[0.9375rem] leading-relaxed">
          <section aria-labelledby="nb-geltung">
            <h2 id="nb-geltung" className="font-serif text-xl text-aman-charcoal mb-4">
              1. Geltungsbereich
            </h2>
            <p>
              Diese Nutzungsbedingungen regeln die Nutzung der Website{' '}
              <strong className="text-aman-charcoal">{siteConfig.url}</strong> (nachfolgend
              „Website") der {siteConfig.name}. Mit dem Besuch und der Nutzung dieser Website
              erklären Sie sich mit diesen Nutzungsbedingungen einverstanden.
            </p>
          </section>

          <section aria-labelledby="nb-angebote">
            <h2 id="nb-angebote" className="font-serif text-xl text-aman-charcoal mb-4">
              2. Inhalte und Angebote
            </h2>
            <p>
              Die auf dieser Website bereitgestellten Informationen dienen ausschließlich
              Informationszwecken. Sie stellen keine rechtlich bindende Offerte dar, sofern nicht
              ausdrücklich anders angegeben. Der Betreiber behält sich das Recht vor, die Inhalte
              dieser Website jederzeit ohne Vorankündigung zu ändern, zu ergänzen oder zu löschen.
            </p>
          </section>

          <section aria-labelledby="nb-urheberrecht">
            <h2 id="nb-urheberrecht" className="font-serif text-xl text-aman-charcoal mb-4">
              3. Urheberrecht und Nutzungsrechte
            </h2>
            <p>
              Alle auf dieser Website veröffentlichten Inhalte (Texte, Bilder, Grafiken, Design,
              Logos) unterliegen dem Urheberrecht der {siteConfig.name} oder der jeweiligen
              Rechteinhaber. Eine Verwendung, Vervielfältigung oder Verbreitung ist ohne vorherige
              schriftliche Genehmigung nicht gestattet.
            </p>
            <p className="mt-3">
              Die Vervielfältigung von Informationen oder Daten, insbesondere die Verwendung von
              Texten, Textteilen oder Bildmaterial bedarf der vorherigen Zustimmung des Betreibers.
            </p>
          </section>

          <section aria-labelledby="nb-links">
            <h2 id="nb-links" className="font-serif text-xl text-aman-charcoal mb-4">
              4. Links zu Drittseiten
            </h2>
            <p>
              Diese Website kann Links zu externen Websites Dritter enthalten. Für die Inhalte
              dieser verlinkten Seiten ist ausschließlich der jeweilige Anbieter oder Betreiber
              der Seiten verantwortlich. Der Betreiber hat zum Zeitpunkt der Verlinkung keine
              rechtswidrigen Inhalte auf den verlinkten Seiten festgestellt.
            </p>
          </section>

          <section aria-labelledby="nb-haftung">
            <h2 id="nb-haftung" className="font-serif text-xl text-aman-charcoal mb-4">
              5. Haftungsausschluss
            </h2>
            <p>
              Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
              Vollständigkeit und Aktualität der Inhalte kann der Betreiber jedoch keine Gewähr
              übernehmen. Als Diensteanbieter ist der Betreiber gemäß § 7 Abs. 1 TMG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
            </p>
          </section>

          <section aria-labelledby="nb-formulare">
            <h2 id="nb-formulare" className="font-serif text-xl text-aman-charcoal mb-4">
              6. Formulare und Kontaktanfragen
            </h2>
            <p>
              Durch das Absenden von Formularen auf dieser Website erklären Sie sich damit
              einverstanden, dass Ihre eingegebenen Daten gemäß unserer{' '}
              <Link href="/datenschutz" className="text-aman-gold hover:underline">
                Datenschutzerklärung
              </Link>{' '}
              verarbeitet werden. Eine Weitergabe an Dritte erfolgt nicht ohne Ihre ausdrückliche
              Einwilligung.
            </p>
          </section>

          <section aria-labelledby="nb-aenderungen">
            <h2 id="nb-aenderungen" className="font-serif text-xl text-aman-charcoal mb-4">
              7. Änderungen der Nutzungsbedingungen
            </h2>
            <p>
              Der Betreiber behält sich vor, diese Nutzungsbedingungen jederzeit zu ändern. Die
              aktuelle Version ist stets auf dieser Website abrufbar. Die fortgesetzte Nutzung der
              Website nach Änderungen gilt als Zustimmung zu den geänderten Nutzungsbedingungen.
            </p>
          </section>

          <section aria-labelledby="nb-recht">
            <h2 id="nb-recht" className="font-serif text-xl text-aman-charcoal mb-4">
              8. Anwendbares Recht
            </h2>
            <p>
              Für die Nutzung dieser Website gilt das Recht der Bundesrepublik Deutschland.
              Gerichtsstand ist Frankfurt am Main.
            </p>
          </section>

          <p className="text-xs text-aman-text-light pt-4 border-t border-aman-border">
            Stand: {new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-aman-border flex flex-wrap gap-4 text-sm text-aman-text-light">
          <Link href="/impressum" className="hover:text-aman-gold transition-colors">Impressum</Link>
          <Link href="/datenschutz" className="hover:text-aman-gold transition-colors">Datenschutz</Link>
          <Link href="/agb" className="hover:text-aman-gold transition-colors">AGB</Link>
        </div>
      </div>
    </div>
  )
}
