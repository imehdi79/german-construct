import { siteContent } from '@/data/site'

/**
 * Per-area slices of the single site-content source. Sections and layout
 * components use these as their default `copy` props so they render
 * standalone, while pages pass the same content fetched via lib/content.
 */
export const defaultBrand = siteContent.brand
export const defaultHero = siteContent.hero
export const defaultNav = siteContent.nav
export const defaultSections = siteContent.sections
export const defaultFooter = siteContent.footer
export const defaultPages = siteContent.pages
export const defaultSeo = siteContent.seo
