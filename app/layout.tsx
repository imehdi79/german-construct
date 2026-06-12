import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/config/site'
import { getSiteContent } from '@/lib/content'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

export async function generateMetadata(): Promise<Metadata> {
  const { brand, seo } = await getSiteContent()
  const titleDefault = `${brand.name} – ${brand.tagline}`
  return {
    title: {
      default: titleDefault,
      template: `%s | ${brand.name}`,
    },
    description: brand.description,
    keywords: seo.keywords,
    authors: [{ name: brand.name }],
    creator: brand.name,
    publisher: brand.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: siteConfig.url,
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      url: siteConfig.url,
      title: titleDefault,
      description: brand.description,
      siteName: brand.name,
      // og:image is provided by app/opengraph-image.tsx (generated at build time)
    },
    twitter: {
      card: 'summary_large_image',
      title: titleDefault,
      description: brand.description,
      // twitter:image is provided by app/twitter-image.tsx
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${playfair.variable} h-full`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  )
}
