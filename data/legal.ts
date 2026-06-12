import type { LegalContent } from '@/types'

/**
 * Default legal-page content. Each page is a title plus an ordered list of
 * `{ heading, body }` blocks. `body` is plain text — single newlines become line
 * breaks, blank lines separate paragraphs (rendered with `whitespace-pre-line`).
 * Seeded from the original in-repo legal pages; fully editable via the admin.
 */
export const legalContent: LegalContent = {
  impressum: {
    metaTitle: 'Impressum',
    metaDescription: 'Impressum der Fliesen-Naturstein AMAN – Pflichtangaben gemäß § 5 TMG.',
    title: 'Impressum',
    breadcrumb: 'Impressum',
    sections: [
      {
        heading: 'Angaben gemäß § 5 TMG',
        body: 'Fliesen-Naturstein AMAN\nMusterstraße 42\n60311 Frankfurt am Main\nDeutschland',
      },
      {
        heading: 'Kontakt',
        body: 'Telefon: +49 69 123 456 789\nMobil: +49 151 234 567 89\nE-Mail: info@fliesen-naturstein-aman.de',
      },
      {
        heading: 'Berufsrechtliche Angaben',
        body: 'Zuständige Handwerkskammer: Handwerkskammer Frankfurt-Rhein-Main\nHandwerksrolle: Fliesen-, Platten- und Mosaikleger\nMeisterbetrieb',
      },
      {
        heading: 'Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV',
        body: '[Name des Inhabers]\nMusterstraße 42\n60311 Frankfurt am Main',
      },
      {
        heading: 'Haftung für Inhalte',
        body: 'Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.\n\nVerpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
      },
      {
        heading: 'Haftung für Links',
        body: 'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.',
      },
      {
        heading: 'Urheberrecht',
        body: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.',
      },
      {
        heading: 'Streitschlichtung',
        body: 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Unsere E-Mail-Adresse finden Sie oben im Impressum.\n\nWir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
      },
    ],
  },
  datenschutz: {
    metaTitle: 'Datenschutzerklärung',
    metaDescription: 'Datenschutzerklärung der Fliesen-Naturstein AMAN gemäß DSGVO/GDPR.',
    title: 'Datenschutzerklärung',
    breadcrumb: 'Datenschutz',
    sections: [
      {
        heading: '1. Datenschutz auf einen Blick',
        body: 'Allgemeine Hinweise\n\nDie folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.\n\nWer ist verantwortlich für die Datenerfassung auf dieser Website?\nDie Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Verantwortliche Stelle" in dieser Datenschutzerklärung entnehmen.\n\nWie erfassen wir Ihre Daten?\nIhre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).',
      },
      {
        heading: '2. Verantwortliche Stelle',
        body: 'Fliesen-Naturstein AMAN\nMusterstraße 42\n60311 Frankfurt am Main\nTelefon: +49 69 123 456 789\nE-Mail: info@fliesen-naturstein-aman.de\n\nVerantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.',
      },
      {
        heading: '3. Ihre Rechte',
        body: 'Sie haben jederzeit das Recht:\n\n- unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten (Art. 15 DSGVO)\n- die Berichtigung unrichtiger personenbezogener Daten zu verlangen (Art. 16 DSGVO)\n- die Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen (Art. 17 DSGVO)\n- die Einschränkung der Datenverarbeitung zu verlangen (Art. 18 DSGVO)\n- der Verarbeitung Ihrer personenbezogenen Daten zu widersprechen (Art. 21 DSGVO)\n- Datenübertragbarkeit zu verlangen (Art. 20 DSGVO)\n\nSie haben außerdem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren.',
      },
      {
        heading: '4. Hosting und technischer Betrieb',
        body: 'Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.',
      },
      {
        heading: '5. Kontaktformular',
        body: 'Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.\n\nDie Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), sofern diese abgefragt wurde.\n\nDie von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt. Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.',
      },
      {
        heading: '6. Cookies',
        body: 'Unsere Website verwendet sogenannte „Cookies". Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.\n\nWir setzen ausschließlich technisch notwendige Cookies ein. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an der Speicherung von Cookies zur technisch fehlerfreien und optimierten Bereitstellung unserer Dienste.',
      },
      {
        heading: '7. Bewerbungsdaten',
        body: 'Wenn Sie sich bei uns bewerben, verarbeiten wir Ihre Bewerbungsdaten (Name, E-Mail-Adresse, Telefonnummer, Lebenslauf, Anschreiben) ausschließlich zum Zweck der Durchführung des Bewerbungsverfahrens. Rechtsgrundlage ist § 26 BDSG n.F. bzw. Art. 6 Abs. 1 lit. b DSGVO.\n\nWerden Sie nicht eingestellt, löschen wir Ihre Bewerbungsdaten nach 6 Monaten, sofern kein berechtigtes Interesse an einer längeren Aufbewahrung besteht. Sollten Sie einer längeren Aufbewahrung zustimmen, speichern wir Ihre Daten im Talentpool für bis zu 12 Monate.',
      },
    ],
  },
  agb: {
    metaTitle: 'Allgemeine Geschäftsbedingungen',
    metaDescription: 'AGB der Fliesen-Naturstein AMAN für Fliesen-, Platten- und Natursteinarbeiten.',
    title: 'Allgemeine Geschäftsbedingungen',
    breadcrumb: 'AGB',
    sections: [
      {
        heading: '§ 1 Geltungsbereich',
        body: 'Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge, die zwischen der Fliesen-Naturstein AMAN, Musterstraße 42, 60311 Frankfurt am Main (nachfolgend „Auftragnehmer") und dem Auftraggeber über Fliesen-, Platten-, Mosaik- und Natursteinarbeiten sowie damit verbundene Leistungen abgeschlossen werden.\n\nAbweichende Bedingungen des Auftraggebers werden nicht anerkannt, es sei denn, der Auftragnehmer hat ihrer Geltung ausdrücklich schriftlich zugestimmt.',
      },
      {
        heading: '§ 2 Angebot und Vertragsschluss',
        body: 'Angebote des Auftragnehmers sind freibleibend und unverbindlich, sofern sie nicht ausdrücklich als bindend bezeichnet wurden. Der Vertrag kommt durch schriftliche Auftragsbestätigung des Auftragnehmers oder durch Aufnahme der Ausführung der Leistungen zustande.\n\nKostenvoranschläge werden nach bestem Wissen und Gewissen erstellt. Wesentliche Abweichungen, die sich erst bei der Ausführung ergeben (z. B. durch unvorhergesehene Bausubstanz), werden dem Auftraggeber unverzüglich mitgeteilt.',
      },
      {
        heading: '§ 3 Leistungserbringung',
        body: 'Der Auftragnehmer führt die vereinbarten Leistungen nach den anerkannten Regeln der Technik, insbesondere gemäß den einschlägigen DIN-Normen und der VOB/C (Allgemeine Technische Vertragsbedingungen für Bauleistungen), aus.\n\nVereinbarte Ausführungstermine sind unter dem Vorbehalt gesetzt, dass der Auftraggeber seine Mitwirkungspflichten rechtzeitig erfüllt (insbesondere Bereitstellung des Baumaterials, Zugang zu den Räumlichkeiten, Abnahme von Teilleistungen).',
      },
      {
        heading: '§ 4 Preise und Zahlung',
        body: 'Alle Preise verstehen sich zuzüglich der gesetzlichen Umsatzsteuer, sofern nicht ausdrücklich anders angegeben. Rechnungen sind innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug zahlbar, sofern keine andere Fälligkeit vereinbart wurde.\n\nBei Aufträgen mit einem Nettoauftragswert von mehr als 5.000 Euro ist der Auftragnehmer berechtigt, eine Abschlagszahlung von bis zu 30% bei Auftragserteilung sowie Zwischenrechnungen entsprechend dem Leistungsfortschritt zu stellen.',
      },
      {
        heading: '§ 5 Material und Untergrundvorbereitung',
        body: 'Der Auftragnehmer verwendet qualitativ hochwertige Materialien von zertifizierten Herstellern. Soweit der Auftraggeber eigene Materialien bereitstellt, übernimmt der Auftragnehmer keine Haftung für Mängel, die auf diese Materialien zurückzuführen sind.\n\nDer Untergrund muss vor Beginn der Arbeiten trocken, tragfähig, eben und frei von trennenden Substanzen sein. Der Auftragnehmer prüft den Untergrund und teilt festgestellte Mängel dem Auftraggeber schriftlich mit.',
      },
      {
        heading: '§ 6 Gewährleistung',
        body: 'Die Gewährleistungsfrist für erbrachte Leistungen beträgt 5 Jahre ab förmlicher Abnahme der Leistungen, soweit gesetzlich nichts anderes vorgeschrieben ist. Der Auftragnehmer ist berechtigt, Mängel zunächst durch Nachbesserung zu beheben.\n\nMängel sind unverzüglich schriftlich anzuzeigen. Mängelanzeigen werden innerhalb von 5 Werktagen bearbeitet; bei dringenden Fällen schnellstmöglich.',
      },
      {
        heading: '§ 7 Haftungsbeschränkung',
        body: 'Die Haftung des Auftragnehmers ist auf Vorsatz und grobe Fahrlässigkeit beschränkt, soweit nicht Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit oder wesentlicher Vertragspflichten betroffen sind. Die Haftung für mittelbare Schäden und Folgeschäden ist ausgeschlossen.',
      },
      {
        heading: '§ 8 Datenschutz',
        body: 'Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer Datenschutzerklärung (siehe /datenschutz).',
      },
      {
        heading: '§ 9 Gerichtsstand und anwendbares Recht',
        body: 'Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Gerichtsstand für alle Streitigkeiten aus und im Zusammenhang mit diesem Vertrag ist Frankfurt am Main, sofern der Auftraggeber Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist.',
      },
    ],
  },
  nutzungsbedingungen: {
    metaTitle: 'Nutzungsbedingungen',
    metaDescription: 'Nutzungsbedingungen der Website Fliesen-Naturstein AMAN.',
    title: 'Nutzungsbedingungen',
    breadcrumb: 'Nutzungsbedingungen',
    sections: [
      {
        heading: '1. Geltungsbereich',
        body: 'Diese Nutzungsbedingungen regeln die Nutzung der Website https://fliesen-naturstein-aman.de (nachfolgend „Website") der Fliesen-Naturstein AMAN. Mit dem Besuch und der Nutzung dieser Website erklären Sie sich mit diesen Nutzungsbedingungen einverstanden.',
      },
      {
        heading: '2. Inhalte und Angebote',
        body: 'Die auf dieser Website bereitgestellten Informationen dienen ausschließlich Informationszwecken. Sie stellen keine rechtlich bindende Offerte dar, sofern nicht ausdrücklich anders angegeben. Der Betreiber behält sich das Recht vor, die Inhalte dieser Website jederzeit ohne Vorankündigung zu ändern, zu ergänzen oder zu löschen.',
      },
      {
        heading: '3. Urheberrecht und Nutzungsrechte',
        body: 'Alle auf dieser Website veröffentlichten Inhalte (Texte, Bilder, Grafiken, Design, Logos) unterliegen dem Urheberrecht der Fliesen-Naturstein AMAN oder der jeweiligen Rechteinhaber. Eine Verwendung, Vervielfältigung oder Verbreitung ist ohne vorherige schriftliche Genehmigung nicht gestattet.\n\nDie Vervielfältigung von Informationen oder Daten, insbesondere die Verwendung von Texten, Textteilen oder Bildmaterial bedarf der vorherigen Zustimmung des Betreibers.',
      },
      {
        heading: '4. Links zu Drittseiten',
        body: 'Diese Website kann Links zu externen Websites Dritter enthalten. Für die Inhalte dieser verlinkten Seiten ist ausschließlich der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Der Betreiber hat zum Zeitpunkt der Verlinkung keine rechtswidrigen Inhalte auf den verlinkten Seiten festgestellt.',
      },
      {
        heading: '5. Haftungsausschluss',
        body: 'Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann der Betreiber jedoch keine Gewähr übernehmen. Als Diensteanbieter ist der Betreiber gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.',
      },
      {
        heading: '6. Formulare und Kontaktanfragen',
        body: 'Durch das Absenden von Formularen auf dieser Website erklären Sie sich damit einverstanden, dass Ihre eingegebenen Daten gemäß unserer Datenschutzerklärung (siehe /datenschutz) verarbeitet werden. Eine Weitergabe an Dritte erfolgt nicht ohne Ihre ausdrückliche Einwilligung.',
      },
      {
        heading: '7. Änderungen der Nutzungsbedingungen',
        body: 'Der Betreiber behält sich vor, diese Nutzungsbedingungen jederzeit zu ändern. Die aktuelle Version ist stets auf dieser Website abrufbar. Die fortgesetzte Nutzung der Website nach Änderungen gilt als Zustimmung zu den geänderten Nutzungsbedingungen.',
      },
      {
        heading: '8. Anwendbares Recht',
        body: 'Für die Nutzung dieser Website gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist Frankfurt am Main.',
      },
    ],
  },
}
