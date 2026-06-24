import type { MetadataRoute } from 'next'
// import { siteConfig } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
  // TEMP (test): block ALL crawlers from the entire site so it can never be
  // indexed while in test — this must not run on production either. Restore the
  // rules below when going live.
  return {
    rules: [
      {
        userAgent: '*',
        disallow: '/',
      },
    ],
  }

  // ---- Original production rules (restore when re-enabling SEO) ----
  // return {
  //   rules: [
  //     {
  //       userAgent: '*',
  //       allow: '/',
  //       disallow: ['/admin/', '/api/'],
  //     },
  //   ],
  //   sitemap: `${siteConfig.url}/sitemap.xml`,
  // }
}
