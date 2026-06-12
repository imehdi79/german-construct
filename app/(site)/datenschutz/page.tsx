import type { Metadata } from 'next'
import { getLegal, getSiteContent } from '@/lib/content'
import { createMetadata } from '@/lib/metadata'
import { LegalPageView } from '@/components/legal/LegalPageView'

export async function generateMetadata(): Promise<Metadata> {
  const { datenschutz } = await getLegal()
  return createMetadata({
    title: datenschutz.metaTitle,
    description: datenschutz.metaDescription,
    path: '/datenschutz',
    noIndex: true,
  })
}

export default async function DatenschutzPage() {
  const [legal, site] = await Promise.all([getLegal(), getSiteContent()])
  const links = site.footer.legalLinks.filter((l) => l.href !== '/datenschutz')
  return <LegalPageView page={legal.datenschutz} links={links} showStand />
}
