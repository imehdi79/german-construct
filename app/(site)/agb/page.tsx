import type { Metadata } from 'next'
import { getLegal, getSiteContent } from '@/lib/content'
import { createMetadata } from '@/lib/metadata'
import { LegalPageView } from '@/components/legal/LegalPageView'

export async function generateMetadata(): Promise<Metadata> {
  const { agb } = await getLegal()
  return createMetadata({
    title: agb.metaTitle,
    description: agb.metaDescription,
    path: '/agb',
    noIndex: true,
  })
}

export default async function AgbPage() {
  const [legal, site] = await Promise.all([getLegal(), getSiteContent()])
  const links = site.footer.legalLinks.filter((l) => l.href !== '/agb')
  return <LegalPageView page={legal.agb} links={links} showStand />
}
