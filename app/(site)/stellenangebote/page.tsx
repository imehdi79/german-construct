import type { Metadata } from 'next'
import { getJobs, getSiteContent } from '@/lib/content'
import { createMetadata } from '@/lib/metadata'
import { StellenangeboteClient } from '@/components/stellenangebote/StellenangeboteClient'

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({ pageKey: 'stellenangebote', path: '/stellenangebote' })
}

export default async function StellenangebotePage() {
  const [jobs, site] = await Promise.all([getJobs(), getSiteContent()])
  return <StellenangeboteClient jobs={jobs} copy={site.pages.stellenangebote} />
}
