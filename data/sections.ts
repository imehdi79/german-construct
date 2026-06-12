import { siteConfig } from '@/config/site'
import { navigation, footerLinks } from '@/config/navigation'
import { galleryCategories } from '@/data/gallery'
import type {
  BrandContent,
  HeroCopy,
  NavContent,
  SectionsContent,
  FooterContent,
  PagesContent,
  SeoContent,
} from '@/types'

// Default brand identity (seeded from config/site.ts).
export const defaultBrand: BrandContent = {
  name: siteConfig.name,
  shortName: siteConfig.shortName,
  tagline: siteConfig.tagline,
  description: siteConfig.description,
}

// Hero section copy.
export const defaultHero: HeroCopy = {
  eyebrow: 'Neu gegründeter Meisterbetrieb',
  titleLine1: 'Handwerkskunst,',
  titleAccent: 'die bleibt.',
  subtitle:
    'Ihr Fachbetrieb für Fliesen-, Platten- und Natursteinarbeiten in Frankfurt und Umgebung. Frische Ideen, meisterliche Ausführung, faire Festpreise.',
  ctaPrimary: 'Kostenloses Angebot',
  ctaSecondary: 'Unsere Projekte',
  scrollLabel: 'Scrollen',
  trustIndicators: [
    'Geführt vom Meister',
    'Verbindliche Festpreise',
    'Persönliche Betreuung',
  ],
}

// Header / footer navigation labels (hrefs stay route-bound).
export const defaultNav: NavContent = {
  items: navigation.map((n) => ({ label: n.label, href: n.href })),
  callLabel: 'Jetzt anrufen',
  skipToContent: 'Zum Hauptinhalt springen',
}

// Homepage section copy.
export const defaultSections: SectionsContent = {
  warumAman: {
    eyebrow: 'Warum AMAN',
    title: 'Ihr verlässlicher Partner im Handwerk',
    subtitle:
      'Wir verbinden traditionelles Handwerk mit modernen Techniken – für Ergebnisse, die dauerhaft begeistern.',
    imageAlt: 'AMAN Handwerker bei der Arbeit – Präzision und Qualität',
    reasons: [
      {
        icon: 'award',
        title: 'Zertifizierter Fachbetrieb',
        description:
          'Als Mitglied der Handwerkskammer Frankfurt arbeiten wir nach höchsten Qualitätsstandards und halten unsere Zertifizierungen stets aktuell.',
      },
      {
        icon: 'clock',
        title: 'Geführt vom Meister',
        description:
          'Jedes Projekt wird vom Handwerksmeister geplant, begleitet und abgenommen – fundiertes Können statt anonymer Massenabwicklung.',
      },
      {
        icon: 'shield',
        title: 'Qualitätsgarantie',
        description:
          'Wir stehen hinter unserer Arbeit. Unsere Leistungen sind mit fünf Jahren Gewährleistung abgesichert und werden nur mit zertifizierten Materialien ausgeführt.',
      },
      {
        icon: 'thumbs-up',
        title: 'Faire Festpreise',
        description:
          'Verbindliche Angebote ohne versteckte Kosten. Sie wissen vor Projektbeginn genau, woran Sie sind – transparent und nachvollziehbar.',
      },
    ],
  },
  leistungenIntro: {
    eyebrow: 'Unser Leistungsportfolio',
    title: 'Alles aus einer Hand',
    subtitle:
      'Von der Planung bis zur Fertigstellung – wir decken das gesamte Spektrum des Fliesen- und Natursteinhandwerks ab.',
    ctaLabel: 'Alle Leistungen',
  },
  galerieIntro: {
    eyebrow: 'Unsere Projekte',
    title: 'Handwerkskunst in Bildern',
    subtitle:
      'Eine Auswahl unserer abgeschlossenen Projekte – Qualität, die man sehen kann.',
    ctaLabel: 'Alle Projekte',
  },
  galleryCategories: galleryCategories.map((c) => ({ value: c.value, label: c.label })),
  statistik: {
    eyebrow: 'Worauf Sie zählen können',
    title: 'Unser Versprechen an Sie',
  },
  testimonials: {
    eyebrow: 'Kundenstimmen',
    title: 'Was unsere Kunden sagen',
    subtitle:
      'Vertrauen entsteht durch Leistung – das spiegeln unsere Bewertungen wider.',
    summary: {
      ratingValue: '5,0',
      ratingLabel: 'Gesamtbewertung',
      recommendValue: '99%',
      recommendLabel: 'Weiterempfehlung',
      countValue: '6',
      countLabel: 'Aktuelle Bewertungen',
    },
  },
  projektplaner: {
    eyebrow: 'Ihr Projekt beginnt hier',
    title: 'Was dürfen wir für Sie planen?',
    subtitle:
      'Wählen Sie Ihr Projektvorhaben und erhalten Sie innerhalb von 24 Stunden ein unverbindliches Angebot von uns.',
    emptyTitle: 'Wählen Sie Ihr Projektvorhaben',
    emptySubtitle:
      'Tippen Sie auf eine Karte und erhalten Sie Schritt für Schritt Ihr unverbindliches Angebot.',
    benefits: [
      'Antwort innerhalb von 24 Stunden',
      '100 % kostenlos & unverbindlich',
      'Jedes Angebot wird geprüft',
    ],
  },
  kontaktCta: {
    eyebrow: 'Bereit für Ihr Projekt?',
    titleLine1: 'Lassen Sie uns gemeinsam',
    titleAccent: 'etwas Schönes erschaffen.',
    subtitle:
      'Kontaktieren Sie uns für ein kostenfreies und unverbindliches Beratungsgespräch. Wir freuen uns auf Ihr Projekt.',
    ctaLabel: 'Anfrage stellen',
  },
}

// Footer copy + link labels.
export const defaultFooter: FooterContent = {
  description:
    'Ihr Fachbetrieb für Fliesen-, Platten- und Natursteinarbeiten in Frankfurt und Umgebung. Frisch gegründeter Meisterbetrieb mit Qualität und Handwerkskunst zu fairen Festpreisen.',
  servicesTitle: 'Leistungen',
  companyTitle: 'Unternehmen',
  contactTitle: 'Kontakt',
  copyrightSuffix: 'Alle Rechte vorbehalten.',
  serviceLinks: footerLinks.services.map((l) => ({ label: l.label, href: l.href })),
  companyLinks: footerLinks.company.map((l) => ({ label: l.label, href: l.href })),
  legalLinks: footerLinks.legal.map((l) => ({ label: l.label, href: l.href })),
}

// Per-page header/breadcrumb/intro copy.
export const defaultPages: PagesContent = {
  leistungen: {
    breadcrumb: 'Leistungen',
    eyebrow: 'Unsere Expertise',
    title: 'Alles aus einer Hand',
    subtitle:
      'Von der Untergrundvorbereitung bis zur finalen Verfugung – wir bieten das gesamte Spektrum des Fliesen- und Natursteinhandwerks.',
    itemLabelPrefix: 'Leistung',
    serviceCtaLabel: 'Jetzt anfragen',
    bottomTitle: 'Ihr Projekt ist nicht dabei?',
    bottomSubtitle:
      'Sprechen Sie uns an – wir finden gemeinsam die passende Lösung für Ihr individuelles Vorhaben.',
    bottomCtaLabel: 'Individuelle Anfrage stellen',
  },
  galerie: {
    breadcrumb: 'Galerie',
    eyebrow: 'Unsere Projekte',
    title: 'Handwerkskunst in Bildern',
    subtitle:
      'Eine Auswahl unserer abgeschlossenen Projekte – jede Arbeit ein Zeugnis unserer Präzision und Leidenschaft für das Handwerk.',
    emptyText: 'Keine Projekte in dieser Kategorie.',
    ctaText: 'Bereit für Ihr eigenes Projekt?',
    ctaLabel: 'Kostenlos anfragen',
  },
  kontakt: {
    breadcrumb: 'Kontakt',
    eyebrow: 'Sprechen Sie uns an',
    title: 'Kontaktieren Sie uns',
    subtitle:
      'Wir freuen uns auf Ihre Anfrage und melden uns innerhalb von 24 Stunden bei Ihnen.',
    formHeading: 'Schreiben Sie uns',
    sidebarHeading: 'Kontaktdaten',
    betreffPlaceholder: 'Bitte wählen Sie einen Betreff',
    betreffOptions: [
      { value: 'fliesenarbeiten', label: 'Fliesenarbeiten' },
      { value: 'natursteinarbeiten', label: 'Natursteinarbeiten' },
      { value: 'estricharbeiten', label: 'Estricharbeiten' },
      { value: 'verfugungen', label: 'Verfugungsarbeiten' },
      { value: 'sanierung', label: 'Sanierungsarbeiten' },
      { value: 'terrasse', label: 'Terrassen & Außenbereiche' },
      { value: 'kostenvoranschlag', label: 'Kostenvoranschlag anfragen' },
      { value: 'sonstiges', label: 'Sonstiges' },
    ],
    submitLabel: 'Nachricht senden',
    submittingLabel: 'Wird gesendet…',
    successTitle: 'Nachricht gesendet!',
    successText:
      'Vielen Dank für Ihre Nachricht! Wir melden uns innerhalb von 24 Stunden bei Ihnen zurück.',
    successButton: 'Neue Nachricht senden',
    consent: {
      prefix: 'Ich habe die ',
      linkText: 'Datenschutzerklärung',
      suffix:
        ' gelesen und stimme der Verarbeitung meiner personenbezogenen Daten zur Bearbeitung meiner Anfrage zu.',
    },
    requiredNote: {
      prefix: 'Mit * gekennzeichnete Felder sind Pflichtfelder. Ihre Daten werden gemäß unserer ',
      linkText: 'Datenschutzerklärung',
      suffix: ' verarbeitet.',
    },
    contactLabels: {
      phone: 'Telefon',
      mobile: 'Mobil',
      email: 'E-Mail',
      address: 'Adresse',
      hours: 'Öffnungszeiten',
    },
    mapLinkLabel: 'In Google Maps öffnen',
  },
  stellenangebote: {
    breadcrumb: 'Stellenangebote',
    eyebrow: 'Karriere bei AMAN',
    title: 'Wachsen Sie mit uns',
    subtitle:
      'Werden Sie Teil unseres jungen Teams und arbeiten Sie an spannenden Projekten in Frankfurt und Umgebung. Wir suchen leidenschaftliche Handwerker, die mit uns Großes erschaffen möchten.',
    applyLabel: 'Bewerben',
    applyLabelLong: 'Jetzt bewerben',
    detailsShow: 'Details anzeigen',
    detailsHide: 'Weniger anzeigen',
    requirementsTitle: 'Anforderungen',
    benefitsTitle: 'Was wir bieten',
    spontaneousTitle: 'Keine passende Stelle gefunden?',
    spontaneousText:
      'Wir freuen uns auch über Initiativbewerbungen. Zeigen Sie uns, was Sie können!',
    spontaneousCtaLabel: 'Initiativbewerbung',
    formEyebrow: 'Jetzt bewerben',
    formTitleFallback: 'Ihre Bewerbung',
    positionLabel: 'Bewerbung für',
    positionPlaceholder: 'Bitte wählen Sie eine Stelle',
    coverLetterLabel: 'Anschreiben',
    coverLetterPlaceholder:
      'Erzählen Sie uns von sich, Ihrer Erfahrung und warum Sie zu AMAN passen...',
    coverLetterHint: 'Mindestens 50 Zeichen',
    submitLabel: 'Bewerbung absenden',
    submittingLabel: 'Wird gesendet…',
    cancelLabel: 'Abbrechen',
    successTitle: 'Bewerbung eingegangen!',
    successText:
      'Vielen Dank für Ihre Bewerbung! Wir prüfen Ihre Unterlagen sorgfältig und melden uns so schnell wie möglich bei Ihnen.',
    consent: {
      prefix: 'Ich habe die ',
      linkText: 'Datenschutzerklärung',
      suffix:
        ' gelesen und stimme der Verarbeitung meiner personenbezogenen Daten im Rahmen des Bewerbungsprozesses zu.',
    },
  },
  projektplaner: {
    breadcrumb: 'Projektplaner',
    eyebrow: 'Ihr Projekt, unser Handwerk',
    title: 'Kostenloses Angebot anfragen',
    subtitle:
      'Wählen Sie Ihr Projektvorhaben und schildern Sie uns kurz Ihre Anforderungen. Wir melden uns innerhalb von 24 Stunden mit einem unverbindlichen Angebot.',
    infoStrip: [
      { value: '24h', label: 'Antwortzeit', description: 'Wir melden uns innerhalb eines Werktages' },
      { value: '100%', label: 'Kostenlos', description: 'Unverbindliches Angebot ohne versteckte Kosten' },
      { value: 'Meister', label: 'Geführt vom Fachmann', description: 'Jedes Projekt wird vom Handwerksmeister begleitet' },
    ],
  },
}

// SEO: keywords + per-page meta title/description.
export const defaultSeo: SeoContent = {
  keywords: [...siteConfig.seo.keywords],
  perPage: {
    home: {
      title: '',
      description: siteConfig.description,
    },
    projektplaner: {
      title: 'Projektplaner',
      description:
        'Planen Sie Ihr Fliesen- oder Natursteinprojekt online und erhalten Sie innerhalb von 24 Stunden ein kostenloses, unverbindliches Angebot.',
    },
    leistungen: {
      title: 'Leistungen',
      description:
        'Unsere Leistungen: Fliesenarbeiten, Natursteinarbeiten, Estricharbeiten, Verfugungen, Sanierungen und Terrassengestaltung in Frankfurt und Umgebung.',
    },
    galerie: {
      title: 'Galerie',
      description:
        'Projektgalerie von Fliesen-Naturstein AMAN – abgeschlossene Fliesen-, Naturstein- und Terrassenprojekte in Frankfurt und Umgebung.',
    },
    kontakt: {
      title: 'Kontakt',
      description:
        'Kontaktieren Sie Fliesen-Naturstein AMAN in Frankfurt – kostenlose Beratung und unverbindliche Angebote für Ihr Fliesen- oder Natursteinprojekt.',
    },
    stellenangebote: {
      title: 'Stellenangebote',
      description:
        'Karriere bei Fliesen-Naturstein AMAN – aktuelle Stellenangebote für Fliesenleger, Estrichleger und Auszubildende in Frankfurt und Umgebung.',
    },
  },
}
