import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TopBar } from '@/components/layout/TopBar'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { CookieBanner } from '@/components/providers/CookieBanner'
import { ScrollProgress } from '@/components/ui/ScrollProgress'

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SmoothScrollProvider>
      {/* Skip to main content - accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:text-aman-charcoal focus:text-sm"
      >
        Zum Hauptinhalt springen
      </a>

      <ScrollProgress />
      <TopBar />
      <Header />

      <main id="main-content" className="flex-1 flex flex-col">
        {children}
      </main>

      <Footer />
      <CookieBanner />
    </SmoothScrollProvider>
  )
}
