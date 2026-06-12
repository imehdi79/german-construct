import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { createMetadata } from '@/lib/metadata'

export const metadata: Metadata = createMetadata({
  title: 'Allgemeine Geschäftsbedingungen',
  description: `AGB der ${siteConfig.name} für Fliesen-, Platten- und Natursteinarbeiten.`,
  path: '/agb',
  noIndex: true,
})

export default function AgbPage() {
  return (
    <div className="pt-28 md:pt-36 pb-20 bg-white">
      <div className="container-aman max-w-3xl">
        <nav aria-label="Brotkrümel" className="flex items-center gap-2 text-sm text-aman-text-muted mb-8">
          <Link href="/" className="hover:text-aman-gold transition-colors">Startseite</Link>
          <span>/</span>
          <span className="text-aman-charcoal">AGB</span>
        </nav>

        <h1 className="font-serif text-aman-charcoal mb-10" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          Allgemeine Geschäftsbedingungen
        </h1>

        <div className="space-y-8 text-aman-text-muted text-[0.9375rem] leading-relaxed">
          <section aria-labelledby="agb-geltungsbereich">
            <h2 id="agb-geltungsbereich" className="font-serif text-xl text-aman-charcoal mb-4">
              § 1 Geltungsbereich
            </h2>
            <p>
              Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge, die zwischen
              der {siteConfig.name}, {siteConfig.contact.address.street},{' '}
              {siteConfig.contact.address.zip} {siteConfig.contact.address.city} (nachfolgend
              „Auftragnehmer") und dem Auftraggeber über Fliesen-, Platten-, Mosaik- und
              Natursteinarbeiten sowie damit verbundene Leistungen abgeschlossen werden.
            </p>
            <p className="mt-3">
              Abweichende Bedingungen des Auftraggebers werden nicht anerkannt, es sei denn, der
              Auftragnehmer hat ihrer Geltung ausdrücklich schriftlich zugestimmt.
            </p>
          </section>

          <section aria-labelledby="agb-angebot">
            <h2 id="agb-angebot" className="font-serif text-xl text-aman-charcoal mb-4">
              § 2 Angebot und Vertragsschluss
            </h2>
            <p>
              Angebote des Auftragnehmers sind freibleibend und unverbindlich, sofern sie nicht
              ausdrücklich als bindend bezeichnet wurden. Der Vertrag kommt durch schriftliche
              Auftragsbestätigung des Auftragnehmers oder durch Aufnahme der Ausführung der
              Leistungen zustande.
            </p>
            <p className="mt-3">
              Kostenvoranschläge werden nach bestem Wissen und Gewissen erstellt. Wesentliche
              Abweichungen, die sich erst bei der Ausführung ergeben (z. B. durch unvorhergesehene
              Bausubstanz), werden dem Auftraggeber unverzüglich mitgeteilt.
            </p>
          </section>

          <section aria-labelledby="agb-leistung">
            <h2 id="agb-leistung" className="font-serif text-xl text-aman-charcoal mb-4">
              § 3 Leistungserbringung
            </h2>
            <p>
              Der Auftragnehmer führt die vereinbarten Leistungen nach den anerkannten Regeln der
              Technik, insbesondere gemäß den einschlägigen DIN-Normen und der VOB/C (Allgemeine
              Technische Vertragsbedingungen für Bauleistungen), aus.
            </p>
            <p className="mt-3">
              Vereinbarte Ausführungstermine sind unter dem Vorbehalt gesetzt, dass der Auftraggeber
              seine Mitwirkungspflichten rechtzeitig erfüllt (insbesondere Bereitstellung des
              Baumaterials, Zugang zu den Räumlichkeiten, Abnahme von Teilleistungen).
            </p>
          </section>

          <section aria-labelledby="agb-preise">
            <h2 id="agb-preise" className="font-serif text-xl text-aman-charcoal mb-4">
              § 4 Preise und Zahlung
            </h2>
            <p>
              Alle Preise verstehen sich zuzüglich der gesetzlichen Umsatzsteuer, sofern nicht
              ausdrücklich anders angegeben. Rechnungen sind innerhalb von 14 Tagen nach
              Rechnungsstellung ohne Abzug zahlbar, sofern keine andere Fälligkeit vereinbart wurde.
            </p>
            <p className="mt-3">
              Bei Aufträgen mit einem Nettoauftragswert von mehr als 5.000 Euro ist der
              Auftragnehmer berechtigt, eine Abschlagszahlung von bis zu 30% bei Auftragserteilung
              sowie Zwischenrechnungen entsprechend dem Leistungsfortschritt zu stellen.
            </p>
          </section>

          <section aria-labelledby="agb-material">
            <h2 id="agb-material" className="font-serif text-xl text-aman-charcoal mb-4">
              § 5 Material und Untergrundvorbereitung
            </h2>
            <p>
              Der Auftragnehmer verwendet qualitativ hochwertige Materialien von zertifizierten
              Herstellern. Soweit der Auftraggeber eigene Materialien bereitstellt, übernimmt der
              Auftragnehmer keine Haftung für Mängel, die auf diese Materialien zurückzuführen sind.
            </p>
            <p className="mt-3">
              Der Untergrund muss vor Beginn der Arbeiten trocken, tragfähig, eben und frei von
              trennenden Substanzen sein. Der Auftragnehmer prüft den Untergrund und teilt
              festgestellte Mängel dem Auftraggeber schriftlich mit.
            </p>
          </section>

          <section aria-labelledby="agb-maengel">
            <h2 id="agb-maengel" className="font-serif text-xl text-aman-charcoal mb-4">
              § 6 Gewährleistung
            </h2>
            <p>
              Die Gewährleistungsfrist für erbrachte Leistungen beträgt 5 Jahre ab förmlicher
              Abnahme der Leistungen, soweit gesetzlich nichts anderes vorgeschrieben ist. Der
              Auftragnehmer ist berechtigt, Mängel zunächst durch Nachbesserung zu beheben.
            </p>
            <p className="mt-3">
              Mängel sind unverzüglich schriftlich anzuzeigen. Mängelanzeigen werden innerhalb von
              5 Werktagen bearbeitet; bei dringenden Fällen schnellstmöglich.
            </p>
          </section>

          <section aria-labelledby="agb-haftung">
            <h2 id="agb-haftung" className="font-serif text-xl text-aman-charcoal mb-4">
              § 7 Haftungsbeschränkung
            </h2>
            <p>
              Die Haftung des Auftragnehmers ist auf Vorsatz und grobe Fahrlässigkeit beschränkt,
              soweit nicht Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit
              oder wesentlicher Vertragspflichten betroffen sind. Die Haftung für mittelbare Schäden
              und Folgeschäden ist ausgeschlossen.
            </p>
          </section>

          <section aria-labelledby="agb-datenschutz">
            <h2 id="agb-datenschutz" className="font-serif text-xl text-aman-charcoal mb-4">
              § 8 Datenschutz
            </h2>
            <p>
              Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer{' '}
              <Link href="/datenschutz" className="text-aman-gold hover:underline">
                Datenschutzerklärung
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="agb-gerichtsstand">
            <h2 id="agb-gerichtsstand" className="font-serif text-xl text-aman-charcoal mb-4">
              § 9 Gerichtsstand und anwendbares Recht
            </h2>
            <p>
              Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des
              UN-Kaufrechts. Gerichtsstand für alle Streitigkeiten aus und im Zusammenhang mit
              diesem Vertrag ist Frankfurt am Main, sofern der Auftraggeber Kaufmann, juristische
              Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist.
            </p>
          </section>

          <p className="text-xs text-aman-text-light pt-4 border-t border-aman-border">
            Stand: {new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-aman-border flex flex-wrap gap-4 text-sm text-aman-text-light">
          <Link href="/impressum" className="hover:text-aman-gold transition-colors">Impressum</Link>
          <Link href="/datenschutz" className="hover:text-aman-gold transition-colors">Datenschutz</Link>
          <Link href="/nutzungsbedingungen" className="hover:text-aman-gold transition-colors">Nutzungsbedingungen</Link>
        </div>
      </div>
    </div>
  )
}
