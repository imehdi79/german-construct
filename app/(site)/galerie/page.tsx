import type { Metadata } from 'next'
import { getGallery, getSiteContent } from '@/lib/content'
import { createMetadata } from '@/lib/metadata'
import { GalerieClient } from '@/components/galerie/GalerieClient'

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({ pageKey: 'galerie', path: '/galerie' })
}

export default async function GaleriePage() {
  const [items, site] = await Promise.all([getGallery(), getSiteContent()])
  return (
    <GalerieClient
      items={items}
      categories={site.sections.galleryCategories}
      copy={site.pages.galerie}
    />
  )
}
