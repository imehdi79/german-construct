import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { createMetadata } from '@/lib/metadata'

export const metadata: Metadata = createMetadata({
  title: 'Datenschutzerklärung',
  description: `Datenschutzerklärung der ${siteConfig.name} gemäß DSGVO/GDPR.`,
  path: '/datenschutz',
  noIndex: true,
})

export default function DatenschutzPage() {
  return (
    <div className="pt-28 md:pt-36 pb-20 bg-white">
      <div className="container-aman max-w-3xl">
        <nav aria-label="Brotkrümel" className="flex items-center gap-2 text-sm text-aman-text-muted mb-8">
          <Link href="/" className="hover:text-aman-gold transition-colors">Startseite</Link>
          <span>/</span>
          <span className="text-aman-charcoal">Datenschutz</span>
        </nav>

        <h1 className="font-serif text-aman-charcoal mb-10" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          Datenschutzerklärung
        </h1>

        <div className="space-y-8 text-aman-text-muted text-[0.9375rem] leading-relaxed">
          <section aria-labelledby="ds-ueberblick">
            <h2 id="ds-ueberblick" className="font-serif text-xl text-aman-charcoal mb-4">
              1. Datenschutz auf einen Blick
            </h2>
            <h3 className="font-medium text-aman-text mb-2">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
              Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert
              werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie
              unserer unter diesem Text aufgeführten Datenschutzerklärung.
            </p>

            <h3 className="font-medium text-aman-text mt-5 mb-2">Datenerfassung auf dieser Website</h3>
            <p>
              <strong className="text-aman-charcoal">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
              <br />
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
              Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle" in dieser
              Datenschutzerklärung entnehmen.
            </p>

            <p className="mt-4">
              <strong className="text-aman-charcoal">Wie erfassen wir Ihre Daten?</strong>
              <br />
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei
              kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere
              Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch
              unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser,
              Betriebssystem oder Uhrzeit des Seitenaufrufs).
            </p>

            <p className="mt-4">
              <strong className="text-aman-charcoal">Wofür nutzen wir Ihre Daten?</strong>
              <br />
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu
              gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
            </p>
          </section>

          <section aria-labelledby="ds-verantwortlich">
            <h2 id="ds-verantwortlich" className="font-serif text-xl text-aman-charcoal mb-4">
              2. Verantwortliche Stelle
            </h2>
            <address className="not-italic">
              <p className="font-medium text-aman-charcoal">{siteConfig.name}</p>
              <p>{siteConfig.contact.address.street}</p>
              <p>{siteConfig.contact.address.zip} {siteConfig.contact.address.city}</p>
              <p>Telefon: {siteConfig.contact.phone}</p>
              <p>E-Mail: {siteConfig.contact.email}</p>
            </address>
            <p className="mt-4">
              Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder
              gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von
              personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
            </p>
          </section>

          <section aria-labelledby="ds-rechte">
            <h2 id="ds-rechte" className="font-serif text-xl text-aman-charcoal mb-4">
              3. Ihre Rechte
            </h2>
            <p>Sie haben jederzeit das Recht:</p>
            <ul className="list-disc list-inside mt-3 space-y-1.5 pl-2">
              <li>unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten (Art. 15 DSGVO)</li>
              <li>die Berichtigung unrichtiger personenbezogener Daten zu verlangen (Art. 16 DSGVO)</li>
              <li>die Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen (Art. 17 DSGVO)</li>
              <li>die Einschränkung der Datenverarbeitung zu verlangen (Art. 18 DSGVO)</li>
              <li>der Verarbeitung Ihrer personenbezogenen Daten zu widersprechen (Art. 21 DSGVO)</li>
              <li>Datenübertragbarkeit zu verlangen (Art. 20 DSGVO)</li>
            </ul>
            <p className="mt-4">
              Sie haben außerdem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die
              Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren.
            </p>
          </section>

          <section aria-labelledby="ds-hosting">
            <h2 id="ds-hosting" className="font-serif text-xl text-aman-charcoal mb-4">
              4. Hosting und technischer Betrieb
            </h2>
            <p>
              Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser
              Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann
              es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten,
              Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über
              eine Website generiert werden, handeln.
            </p>
          </section>

          <section aria-labelledby="ds-kontaktformular">
            <h2 id="ds-kontaktformular" className="font-serif text-xl text-aman-charcoal mb-4">
              5. Kontaktformular
            </h2>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus
              dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks
              Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
              Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p className="mt-3">
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO,
              sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur
              Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen
              beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven
              Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf
              Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.
            </p>
            <p className="mt-3">
              Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns
              zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck
              für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer
              Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen –
              bleiben unberührt.
            </p>
          </section>

          <section aria-labelledby="ds-cookies">
            <h2 id="ds-cookies" className="font-serif text-xl text-aman-charcoal mb-4">
              6. Cookies
            </h2>
            <p>
              Unsere Website verwendet sogenannte „Cookies". Cookies sind kleine Textdateien und
              richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für
              die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf
              Ihrem Endgerät gespeichert.
            </p>
            <p className="mt-3">
              Wir setzen ausschließlich technisch notwendige Cookies ein. Die Verarbeitung erfolgt
              auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse
              an der Speicherung von Cookies zur technisch fehlerfreien und optimierten
              Bereitstellung unserer Dienste.
            </p>
          </section>

          <section aria-labelledby="ds-bewerbungen">
            <h2 id="ds-bewerbungen" className="font-serif text-xl text-aman-charcoal mb-4">
              7. Bewerbungsdaten
            </h2>
            <p>
              Wenn Sie sich bei uns bewerben, verarbeiten wir Ihre Bewerbungsdaten (Name,
              E-Mail-Adresse, Telefonnummer, Lebenslauf, Anschreiben) ausschließlich zum Zweck
              der Durchführung des Bewerbungsverfahrens. Rechtsgrundlage ist § 26 BDSG n.F. bzw.
              Art. 6 Abs. 1 lit. b DSGVO.
            </p>
            <p className="mt-3">
              Werden Sie nicht eingestellt, löschen wir Ihre Bewerbungsdaten nach 6 Monaten,
              sofern kein berechtigtes Interesse an einer längeren Aufbewahrung besteht. Sollten
              Sie einer längeren Aufbewahrung zustimmen, speichern wir Ihre Daten im Talentpool
              für bis zu 12 Monate.
            </p>
          </section>

          <p className="text-xs text-aman-text-light pt-4 border-t border-aman-border">
            Stand: {new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-aman-border flex flex-wrap gap-4 text-sm text-aman-text-light">
          <Link href="/impressum" className="hover:text-aman-gold transition-colors">Impressum</Link>
          <Link href="/agb" className="hover:text-aman-gold transition-colors">AGB</Link>
          <Link href="/nutzungsbedingungen" className="hover:text-aman-gold transition-colors">Nutzungsbedingungen</Link>
        </div>
      </div>
    </div>
  )
}
