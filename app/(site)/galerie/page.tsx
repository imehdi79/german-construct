import type { Metadata } from 'next'
import { getGallery } from '@/lib/content'
import { createMetadata } from '@/lib/metadata'
import { GalerieClient } from '@/components/galerie/GalerieClient'

export const metadata: Metadata = createMetadata({
  title: 'Galerie',
  description:
    'Projektgalerie von Fliesen-Naturstein AMAN – abgeschlossene Fliesen-, Naturstein- und Terrassenprojekte in Frankfurt und Umgebung.',
  path: '/galerie',
})

export default async function GaleriePage() {
  const items = await getGallery()
  return <GalerieClient items={items} />
}
