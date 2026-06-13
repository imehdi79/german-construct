import { promises as fs } from 'fs'
import path from 'path'
import { services as seedServices } from '@/data/services'
import { jobs as seedJobs } from '@/data/jobs'
import { galleryItems as seedGallery } from '@/data/gallery'
import { testimonials as seedTestimonials } from '@/data/testimonials'
import { formSchemas as seedFormSchemas } from '@/components/Form-Builder/schemas'
import { plannerCards as seedPlannerCards } from '@/data/plannerCards'
import { legalContent as seedLegal } from '@/data/legal'
import {
  defaultBrand,
  defaultHero,
  defaultNav,
  defaultSections,
  defaultFooter,
  defaultPages,
  defaultSeo,
} from '@/data/sections'
import { siteConfig } from '@/config/site'
import type {
  Service,
  Job,
  GalleryItem,
  PlannerCard,
  Testimonial,
  BrandContent,
  HeroCopy,
  NavContent,
  SectionsContent,
  FooterContent,
  PagesContent,
  SeoContent,
  LegalContent,
} from '@/types'
import type { Step } from '@/components/Form-Builder/types'

/**
 * File-based content store ("the database").
 *
 * Editable content is persisted as JSON under `/content`. Public pages read it
 * server-side (statically cached → SEO friendly). The admin writes it via server
 * actions and then calls `revalidatePath` to republish — WordPress-style.
 *
 * Note: requires a writable filesystem at runtime (local dev or a self-hosted
 * Node server via `next start`). Not compatible with read-only serverless FS.
 */

const CONTENT_DIR = path.join(process.cwd(), 'content')

// ─── Editable site settings (the "new company" content) ──────────────────────

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

export const defaultSiteContent: SiteContent = {
  brand: defaultBrand,
  descriptionShort:
    'Ihr Meisterbetrieb für Fliesen-, Platten- und Natursteinarbeiten in Neu-Ulm, Ulm und Umgebung. Präzision, Qualität und persönliche Betreuung – vom ersten Gespräch bis zur letzten Fuge.',
  contact: {
    phone: siteConfig.contact.phone,
    mobile: siteConfig.contact.mobile,
    email: siteConfig.contact.email,
    address: {
      street: siteConfig.contact.address.street,
      zip: siteConfig.contact.address.zip,
      city: siteConfig.contact.address.city,
      region: siteConfig.contact.address.region,
      country: siteConfig.contact.address.country,
    },
  },
  openingHours: { ...siteConfig.openingHours },
  social: { ...siteConfig.social },
  hero: defaultHero,
  stats: [
    { value: 100, suffix: '%', label: 'Festpreisgarantie', description: 'Verbindliche Angebote ohne versteckte Kosten' },
    { value: 5, suffix: ' Jahre', label: 'Gewährleistung', description: 'Auf unsere Verlege- und Verfugungsarbeiten' },
    { value: 24, suffix: 'h', label: 'Schnelle Rückmeldung', description: 'Antwort auf Ihre Anfrage werktags' },
    { value: 100, suffix: '%', label: 'Meisterqualität', description: 'Jedes Projekt vom Meister abgenommen' },
  ],
  nav: defaultNav,
  sections: defaultSections,
  footer: defaultFooter,
  pages: defaultPages,
  seo: defaultSeo,
}

// ─── Editable project-planner form schemas ──────────────────────────────────
// The multi-step forms behind the project planner. Keyed by project type
// (the planner card id). Seeded from the in-repo schemas, then editable via
// the admin. These are the only schemas — no add/remove of schema types.

export type FormSchemasContent = Record<string, Step[]>

export const defaultFormSchemas: FormSchemasContent = seedFormSchemas

// ─── Editable project-planner cards ──────────────────────────────────────────
// The selectable cards shown in the planner. Each card's `id` is the key of its
// matching form schema, so cards and schemas are kept in sync by the admin.

export const defaultPlannerCards: PlannerCard[] = seedPlannerCards

// ─── Editable testimonials & legal pages ─────────────────────────────────────

export const defaultTestimonials: Testimonial[] = seedTestimonials
export const defaultLegal: LegalContent = seedLegal

// ─── Low-level JSON helpers ──────────────────────────────────────────────────

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(path.join(CONTENT_DIR, file), 'utf-8')
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

/**
 * Deep-merge stored content over the defaults so that JSON saved before a schema
 * change (missing newly-added keys) still resolves to complete content. Arrays
 * and primitives from the stored value replace the default wholesale; nested
 * objects merge key-by-key.
 */
function deepMerge<T>(base: T, override: unknown): T {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return (override === undefined ? base : (override as T))
  }
  const out: Record<string, unknown> = { ...base }
  for (const key of Object.keys(override)) {
    const baseVal = (base as Record<string, unknown>)[key]
    const overrideVal = override[key]
    out[key] =
      isPlainObject(baseVal) && isPlainObject(overrideVal)
        ? deepMerge(baseVal, overrideVal)
        : overrideVal
  }
  return out as T
}

/** Read a JSON object file and deep-merge it over `defaults` (schema-safe). */
async function readMerged<T>(file: string, defaults: T): Promise<T> {
  const stored = await readJson<unknown>(file, undefined)
  return stored === undefined ? defaults : deepMerge(defaults, stored)
}

async function writeJson<T>(file: string, data: T): Promise<void> {
  await fs.mkdir(CONTENT_DIR, { recursive: true })
  await fs.writeFile(
    path.join(CONTENT_DIR, file),
    JSON.stringify(data, null, 2),
    'utf-8'
  )
}

// ─── Public getters (used by pages/sections) ─────────────────────────────────

export const getSiteContent = () => readMerged<SiteContent>('site.json', defaultSiteContent)
export const getServices = () => readJson<Service[]>('services.json', seedServices)
export const getJobs = () => readJson<Job[]>('jobs.json', seedJobs)
export const getGallery = () => readJson<GalleryItem[]>('gallery.json', seedGallery)
export const getFormSchemas = () =>
  readJson<FormSchemasContent>('form-schemas.json', defaultFormSchemas)
export const getPlannerCards = () =>
  readJson<PlannerCard[]>('planner-cards.json', defaultPlannerCards)
export const getTestimonials = () =>
  readJson<Testimonial[]>('testimonials.json', defaultTestimonials)
export const getLegal = () => readMerged<LegalContent>('legal.json', defaultLegal)

// ─── Writers (used by admin server actions) ──────────────────────────────────

export const saveSiteContent = (data: SiteContent) => writeJson('site.json', data)
export const saveServices = (data: Service[]) => writeJson('services.json', data)
export const saveJobs = (data: Job[]) => writeJson('jobs.json', data)
export const saveGallery = (data: GalleryItem[]) => writeJson('gallery.json', data)
export const saveFormSchemas = (data: FormSchemasContent) =>
  writeJson('form-schemas.json', data)
export const savePlannerCards = (data: PlannerCard[]) =>
  writeJson('planner-cards.json', data)
export const saveTestimonials = (data: Testimonial[]) =>
  writeJson('testimonials.json', data)
export const saveLegal = (data: LegalContent) => writeJson('legal.json', data)

// ─── Aggregate read for the admin editor ─────────────────────────────────────

export interface FullContent {
  site: SiteContent
  services: Service[]
  jobs: Job[]
  gallery: GalleryItem[]
  formSchemas: FormSchemasContent
  plannerCards: PlannerCard[]
  testimonials: Testimonial[]
  legal: LegalContent
}

export async function getAllContent(): Promise<FullContent> {
  const [site, services, jobs, gallery, formSchemas, plannerCards, testimonials, legal] =
    await Promise.all([
      getSiteContent(),
      getServices(),
      getJobs(),
      getGallery(),
      getFormSchemas(),
      getPlannerCards(),
      getTestimonials(),
      getLegal(),
    ])
  return { site, services, jobs, gallery, formSchemas, plannerCards, testimonials, legal }
}

// ─── Hard reset to the in-repo defaults ──────────────────────────────────────

/** The pristine default content shipped with the repo (ignores saved JSON). */
export function getDefaultContent(): FullContent {
  return {
    site: defaultSiteContent,
    services: seedServices,
    jobs: seedJobs,
    gallery: seedGallery,
    formSchemas: defaultFormSchemas,
    plannerCards: defaultPlannerCards,
    testimonials: defaultTestimonials,
    legal: defaultLegal,
  }
}

/** Overwrite every content file with the defaults and return them. */
export async function resetContent(): Promise<FullContent> {
  const defaults = getDefaultContent()
  await Promise.all([
    saveSiteContent(defaults.site),
    saveServices(defaults.services),
    saveJobs(defaults.jobs),
    saveGallery(defaults.gallery),
    saveFormSchemas(defaults.formSchemas),
    savePlannerCards(defaults.plannerCards),
    saveTestimonials(defaults.testimonials),
    saveLegal(defaults.legal),
  ])
  return defaults
}
