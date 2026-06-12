import type { Metadata } from 'next'
import { getLegal, getSiteContent } from '@/lib/content'
import { createMetadata } from '@/lib/metadata'
import { LegalPageView } from '@/components/legal/LegalPageView'

export async function generateMetadata(): Promise<Metadata> {
  const { nutzungsbedingungen } = await getLegal()
  return createMetadata({
    title: nutzungsbedingungen.metaTitle,
    description: nutzungsbedingungen.metaDescription,
    path: '/nutzungsbedingungen',
    noIndex: true,
  })
}

export default async function NutzungsbedingungenPage() {
  const [legal, site] = await Promise.all([getLegal(), getSiteContent()])
  const links = site.footer.legalLinks.filter((l) => l.href !== '/nutzungsbedingungen')
  return <LegalPageView page={legal.nutzungsbedingungen} links={links} showStand />
}
