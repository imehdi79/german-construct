import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import { getSiteContent } from '@/lib/content'

interface PageMetadataOptions {
  /** Look up title/description from the editable `seo.perPage[pageKey]`. */
  pageKey?: string
  title?: string
  description?: string
  path?: string
  noIndex?: boolean
  image?: string
  keywords?: string[]
}

/**
 * Build page metadata from the editable content store (brand + SEO). Reads
 * `site.json` so titles, descriptions and keywords are admin-editable. URL and
 * locale stay in `config/site.ts` (not part of the editable content scope).
 */
export async function createMetadata({
  pageKey,
  title,
  description,
  path = '',
  noIndex = false,
  image,
  keywords,
}: PageMetadataOptions = {}): Promise<Metadata> {
  const site = await getSiteContent()
  const { brand, seo } = site
  const perPage = pageKey ? seo.perPage[pageKey] : undefined

  const resolvedTitle = title ?? (perPage?.title || undefined)
  const fullTitle = resolvedTitle
    ? `${resolvedTitle} | ${brand.name}`
    : `${brand.name} – ${brand.tagline}`

  const metaDescription =
    description ?? perPage?.description ?? brand.description
  const url = `${siteConfig.url}${path}`
  // When no explicit image is given, omit it so the generated
  // app/opengraph-image.tsx (and twitter-image.tsx) convention is used.
  const ogImages = image
    ? [{ url: image, width: 1200, height: 630, alt: fullTitle }]
    : undefined

  return {
    // `absolute` prevents the root layout's `%s | brand` template from
    // wrapping a title that already includes the brand name.
    title: { absolute: fullTitle },
    description: metaDescription,
    keywords: (keywords ?? seo.keywords).join(', '),
    authors: [{ name: brand.name }],
    creator: brand.name,
    publisher: brand.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      url,
      title: fullTitle,
      description: metaDescription,
      siteName: brand.name,
      ...(ogImages && { images: ogImages }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: metaDescription,
      ...(image && { images: [image] }),
    },
  }
}
