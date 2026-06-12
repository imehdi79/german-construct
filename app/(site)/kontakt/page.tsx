import type { Metadata } from 'next'
import { getSiteContent } from '@/lib/content'
import { createMetadata } from '@/lib/metadata'
import { KontaktClient } from '@/components/kontakt/KontaktClient'

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({ pageKey: 'kontakt', path: '/kontakt' })
}

export default async function KontaktPage() {
  const site = await getSiteContent()
  return (
    <KontaktClient
      copy={site.pages.kontakt}
      contact={site.contact}
      openingHours={site.openingHours}
    />
  )
}
