// ─── Service Types ───────────────────────────────────────────────────────────

export interface Service {
  id: string
  title: string
  description: string
  shortDescription: string
  icon: string
  features: string[]
  href: string
}

// ─── Gallery Types ────────────────────────────────────────────────────────────

export type GalleryCategory =
  | 'alle'
  | 'fliesen'
  | 'naturstein'
  | 'bad'
  | 'terrasse'
  | 'boden'

export interface GalleryItem {
  id: string
  title: string
  category: GalleryCategory
  image: string
  width: number
  height: number
  description?: string
}

// ─── Testimonial Types ────────────────────────────────────────────────────────

export interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  text: string
  project: string
  date: string
}

// ─── Job Types ────────────────────────────────────────────────────────────────

export interface Job {
  id: string
  title: string
  /** Free-text employment type, e.g. "Vollzeit" or "Vollzeit / Teilzeit". */
  type: string
  /** Free-text seniority level; may be empty. */
  level: string
  location: string
  description: string
  requirements: string[]
  benefits: string[]
  salary?: string
  posted: string
}

// ─── Stats Types ──────────────────────────────────────────────────────────────

export interface Stat {
  value: number
  suffix: string
  label: string
  description: string
}

// ─── Project Planner Types ────────────────────────────────────────────────────

export interface ProjectCard {
  id: string
  title: string
  description: string
  icon: string
  color: string
}

/**
 * A selectable card in the project planner. Its `id` doubles as the key of the
 * matching multi-step form schema (see `FormSchemasContent`), so cards and form
 * schemas are added/removed together. `icon` is a Lucide icon name resolved via
 * `lib/plannerIcons`.
 */
export interface PlannerCard {
  id: string
  title: string
  description: string
  icon: string
}

// ─── Form Types ───────────────────────────────────────────────────────────────

export interface ContactFormData {
  vorname: string
  nachname: string
  email: string
  telefon?: string
  betreff: string
  nachricht: string
  datenschutz: boolean
}

export interface JobApplicationFormData {
  vorname: string
  nachname: string
  email: string
  telefon?: string
  position: string
  anschreiben: string
  lebenslauf?: FileList
  datenschutz: boolean
}

export interface ProjectInquiryFormData {
  vorname: string
  nachname: string
  email: string
  telefon?: string
  projektTyp: string
  flaeche?: string
  zeitraum?: string
  nachricht: string
  datenschutz: boolean
}

// ─── Admin Types ──────────────────────────────────────────────────────────────

export interface AdminSection {
  id: string
  label: string
  href: string
  icon: string
  description: string
}

// ─── Editable site-wide content (CMS) ─────────────────────────────────────────
// Shared building blocks reused across the content tree. All text below is
// editable from the admin; `icon` fields hold a Lucide name (see lib/icons).

export interface LinkItem {
  label: string
  href: string
}

export interface SelectOption {
  value: string
  label: string
}

export interface IconCard {
  icon: string
  title: string
  description: string
}

export interface BrandContent {
  name: string
  shortName: string
  tagline: string
  description: string
}

export interface NavContent {
  items: LinkItem[]
  callLabel: string
  skipToContent: string
}

export interface HeroCopy {
  eyebrow: string
  titleLine1: string
  titleAccent: string
  subtitle: string
  ctaPrimary: string
  ctaSecondary: string
  scrollLabel: string
  trustIndicators: string[]
  /** Background image path (editable/uploadable via the admin). */
  image: string
}

export interface IntroCopy {
  eyebrow: string
  title: string
  subtitle: string
  ctaLabel: string
}

export interface WarumAmanCopy {
  eyebrow: string
  title: string
  subtitle: string
  imageAlt: string
  /** Craftsman image path (editable/uploadable via the admin). */
  image: string
  reasons: IconCard[]
}

export interface StatistikCopy {
  eyebrow: string
  title: string
}

export interface TestimonialsCopy {
  eyebrow: string
  title: string
  subtitle: string
  summary: {
    ratingValue: string
    ratingLabel: string
    recommendValue: string
    recommendLabel: string
    countValue: string
    countLabel: string
  }
}

export interface ProjektplanerCopy {
  eyebrow: string
  title: string
  subtitle: string
  emptyTitle: string
  emptySubtitle: string
  benefits: string[]
}

export interface KontaktCtaCopy {
  eyebrow: string
  titleLine1: string
  titleAccent: string
  subtitle: string
  ctaLabel: string
}

export interface SectionsContent {
  warumAman: WarumAmanCopy
  leistungenIntro: IntroCopy
  galerieIntro: IntroCopy
  galleryCategories: SelectOption[]
  statistik: StatistikCopy
  testimonials: TestimonialsCopy
  projektplaner: ProjektplanerCopy
  kontaktCta: KontaktCtaCopy
}

export interface FooterContent {
  description: string
  servicesTitle: string
  companyTitle: string
  contactTitle: string
  copyrightSuffix: string
  serviceLinks: LinkItem[]
  companyLinks: LinkItem[]
  legalLinks: LinkItem[]
}

// Inline consent text with a single embedded link (to the privacy page).
export interface ConsentText {
  prefix: string
  linkText: string
  suffix: string
}

export interface PageHeader {
  breadcrumb: string
  eyebrow: string
  title: string
  subtitle: string
}

export interface LeistungenPageCopy extends PageHeader {
  itemLabelPrefix: string
  serviceCtaLabel: string
  bottomTitle: string
  bottomSubtitle: string
  bottomCtaLabel: string
}

export interface GaleriePageCopy extends PageHeader {
  emptyText: string
  ctaText: string
  ctaLabel: string
}

export interface KontaktPageCopy extends PageHeader {
  formHeading: string
  sidebarHeading: string
  betreffPlaceholder: string
  betreffOptions: SelectOption[]
  submitLabel: string
  submittingLabel: string
  successTitle: string
  successText: string
  successButton: string
  consent: ConsentText
  requiredNote: ConsentText
  contactLabels: {
    phone: string
    mobile: string
    email: string
    address: string
    hours: string
  }
  mapLinkLabel: string
}

export interface StellenangebotePageCopy extends PageHeader {
  applyLabel: string
  applyLabelLong: string
  detailsShow: string
  detailsHide: string
  requirementsTitle: string
  benefitsTitle: string
  spontaneousTitle: string
  spontaneousText: string
  spontaneousCtaLabel: string
  formEyebrow: string
  formTitleFallback: string
  positionLabel: string
  positionPlaceholder: string
  coverLetterLabel: string
  coverLetterPlaceholder: string
  coverLetterHint: string
  submitLabel: string
  submittingLabel: string
  cancelLabel: string
  successTitle: string
  successText: string
  consent: ConsentText
}

export interface ProjektplanerPageCopy extends PageHeader {
  infoStrip: { value: string; label: string; description: string }[]
}

export interface PagesContent {
  leistungen: LeistungenPageCopy
  galerie: GaleriePageCopy
  kontakt: KontaktPageCopy
  stellenangebote: StellenangebotePageCopy
  projektplaner: ProjektplanerPageCopy
}

export interface SeoContent {
  keywords: string[]
  perPage: Record<string, { title: string; description: string }>
}

// ─── Legal pages (Impressum, Datenschutz, Nutzungsbedingungen) ────────────────

export type LegalKey =
  | 'impressum'
  | 'datenschutz'
  | 'nutzungsbedingungen'

export interface LegalBlock {
  heading: string
  /** Multi-paragraph plain text; blank lines separate paragraphs. */
  body: string
}

export interface LegalPage {
  metaTitle: string
  metaDescription: string
  title: string
  breadcrumb: string
  sections: LegalBlock[]
}

export type LegalContent = Record<LegalKey, LegalPage>

// ─── Aggregate site content ──────────────────────────────────────────────────

import type { Step } from '@/components/Form-Builder/types'

export interface SiteContent {
  brand: BrandContent
  descriptionShort: string
  contact: {
    phone: string
    mobile: string
    email: string
    address: { street: string; zip: string; city: string; region: string; country: string }
  }
  openingHours: { weekdays: string; saturday: string; sunday: string }
  social: { instagram: string; facebook: string }
  hero: HeroCopy
  stats: { value: number; suffix: string; label: string; description: string }[]
  nav: NavContent
  sections: SectionsContent
  footer: FooterContent
  pages: PagesContent
  seo: SeoContent
}

/** Project-planner form schemas, keyed by planner-card id. */
export type FormSchemasContent = Record<string, Step[]>
