import type {
  Service,
  Job,
  GalleryItem,
  PlannerCard,
  Testimonial,
  LegalContent,
  SiteContent,
  FormSchemasContent,
} from '@/types'
import { TEST_MODE, PLACEHOLDER_CONTACT, redactDeep } from '@/lib/test-mode'

import { siteContent } from '@/data/site'
import { services } from '@/data/services'
import { jobs } from '@/data/jobs'
import { galleryItems } from '@/data/gallery'
import { formSchemas } from '@/data/formSchemas'
import { plannerCards } from '@/data/plannerCards'
import { testimonials } from '@/data/testimonials'
import { legalContent } from '@/data/legal'

/**
 * Hardcoded site content.
 *
 * All user-visible copy lives in typed modules under `data/` and is compiled
 * into the build. There is no admin and no runtime content store — these
 * getters just return the in-repo data.
 */

export type { SiteContent, FormSchemasContent } from '@/types'

export const getSiteContent = async (): Promise<SiteContent> => {
  // TEMP (test): while SITE_TEST_MODE is on, anonymise the whole site — scrub the
  // brand name and every identifying token (redactDeep), and force the contact
  // block to obvious placeholders. Single chokepoint for header, footer, top bar,
  // contact page and CTA, which all read from here.
  if (!TEST_MODE) return siteContent
  const r = redactDeep(siteContent)
  return { ...r, contact: { ...r.contact, ...PLACEHOLDER_CONTACT } }
}

export const getServices = async (): Promise<Service[]> =>
  TEST_MODE ? redactDeep(services) : services
export const getJobs = async (): Promise<Job[]> => (TEST_MODE ? redactDeep(jobs) : jobs)
export const getGallery = async (): Promise<GalleryItem[]> =>
  TEST_MODE ? redactDeep(galleryItems) : galleryItems
export const getFormSchemas = async (): Promise<FormSchemasContent> =>
  TEST_MODE ? redactDeep(formSchemas) : formSchemas
export const getPlannerCards = async (): Promise<PlannerCard[]> =>
  TEST_MODE ? redactDeep(plannerCards) : plannerCards
export const getTestimonials = async (): Promise<Testimonial[]> =>
  TEST_MODE ? redactDeep(testimonials) : testimonials
export const getLegal = async (): Promise<LegalContent> =>
  TEST_MODE ? redactDeep(legalContent) : legalContent
