import type { Metadata } from 'next'
import { getLegal, getSiteContent } from '@/lib/content'
import { createMetadata } from '@/lib/metadata'
import { LegalPageView } from '@/components/legal/LegalPageView'

export async function generateMetadata(): Promise<Metadata> {
  const { impressum } = await getLegal()
  return createMetadata({
    title: impressum.metaTitle,
    description: impressum.metaDescription,
    path: '/impressum',
    noIndex: true,
  })
}

export default async function ImpressumPage() {
  const [legal, site] = await Promise.all([getLegal(), getSiteContent()])
  const links = site.footer.legalLinks.filter((l) => l.href !== '/impressum')
  return <LegalPageView page={legal.impressum} links={links} />
}
