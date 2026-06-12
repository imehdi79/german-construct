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

export type JobType = 'Vollzeit' | 'Teilzeit' | 'Ausbildung' | 'Praktikum'
export type JobLevel = 'Junior' | 'Senior' | 'Meister' | 'Alle Level'

export interface Job {
  id: string
  title: string
  type: JobType
  level: JobLevel
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
