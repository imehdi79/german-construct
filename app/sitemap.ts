import type { MetadataRoute } from 'next'
// import { siteConfig } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  // TEMP (test): expose no sitemap while indexing is disabled — must not run on
  // production either. Restore the routes below when re-enabling SEO.
  return []

  // ---- Original sitemap (restore when re-enabling SEO) ----
  // const base = siteConfig.url
  //
  // const staticRoutes: MetadataRoute.Sitemap = [
  //   { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
  //   { url: `${base}/leistungen`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  //   { url: `${base}/galerie`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  //   { url: `${base}/projektplaner`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  //   { url: `${base}/kontakt`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  //   { url: `${base}/stellenangebote`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
  //   { url: `${base}/impressum`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
  //   { url: `${base}/datenschutz`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
  //   { url: `${base}/nutzungsbedingungen`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
  // ]
  //
  // return staticRoutes
}
