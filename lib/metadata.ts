import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

interface PageMetadataOptions {
  title?: string
  description?: string
  path?: string
  noIndex?: boolean
  image?: string
}

export function createMetadata({
  title,
  description,
  path = '',
  noIndex = false,
  image,
}: PageMetadataOptions = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} – ${siteConfig.tagline}`

  const metaDescription = description ?? siteConfig.description
  const url = `${siteConfig.url}${path}`
  // When no explicit image is given, omit it so the generated
  // app/opengraph-image.tsx (and twitter-image.tsx) convention is used.
  const ogImages = image
    ? [{ url: image, width: 1200, height: 630, alt: fullTitle }]
    : undefined

  return {
    title: fullTitle,
    description: metaDescription,
    keywords: siteConfig.seo.keywords.join(', '),
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
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
      siteName: siteConfig.name,
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
