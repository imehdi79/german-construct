import type { Metadata } from 'next'
import { getJobs } from '@/lib/content'
import { createMetadata } from '@/lib/metadata'
import { StellenangeboteClient } from '@/components/stellenangebote/StellenangeboteClient'

export const metadata: Metadata = createMetadata({
  title: 'Stellenangebote',
  description:
    'Karriere bei Fliesen-Naturstein AMAN – aktuelle Stellenangebote für Fliesenleger, Estrichleger und Auszubildende in Frankfurt und Umgebung.',
  path: '/stellenangebote',
})

export default async function StellenangebotePage() {
  const jobs = await getJobs()
  return <StellenangeboteClient jobs={jobs} />
}
