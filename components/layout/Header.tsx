'use client'

import { useState, useEffect, startTransition } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { navigation } from '@/config/navigation'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { Logo } from './Logo'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    startTransition(() => setMenuOpen(false))
  }, [pathname])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isHomePage = pathname === '/'
  const isTransparent = isHomePage && !isScrolled && !menuOpen

  return (
    <>
      <header
        className={cn(
          'fixed top-0 md:top-9 left-0 right-0 z-50 transition-all duration-300',
          isTransparent
            ? 'bg-transparent'
            : 'bg-white/97 backdrop-blur-md border-b border-aman-border shadow-[0_1px_20px_rgba(26,25,23,0.05)]'
        )}
      >
        <div className="container-aman">
          <div className="flex items-center justify-between h-16 md:h-20 overflow-hidden">
            {/* Logo */}
            <Logo variant={isTransparent ? 'light' : 'dark'} priority />

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Hauptnavigation">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'nav-link transition-colors duration-300',
                    isTransparent ? 'text-white/90 hover:text-white' : 'text-aman-text',
                    pathname === item.href && 'active text-aman-gold'
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile Menu Toggle */}
            <div className="flex items-center gap-3">
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                className={cn(
                  'hidden md:flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all duration-300',
                  isTransparent
                    ? 'bg-white/15 text-white border border-white/30 hover:bg-white/25'
                    : 'bg-aman-gold text-white hover:bg-aman-gold-dark'
                )}
                aria-label={`Jetzt anrufen: ${siteConfig.contact.phone}`}
              >
                <Phone size={14} />
                <span className="hidden xl:inline">Jetzt anrufen</span>
              </a>

              <button
                className={cn(
                  'lg:hidden p-2 rounded-md transition-colors',
                  isTransparent ? 'text-white' : 'text-aman-charcoal'
                )}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col pt-20 md:pt-29 pb-8 px-6 lg:hidden"
            aria-label="Mobiles Menü"
          >
            <nav className="flex flex-col gap-1 mt-6">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'block py-4 text-2xl font-serif border-b border-aman-border transition-colors',
                      pathname === item.href
                        ? 'text-aman-gold'
                        : 'text-aman-charcoal hover:text-aman-gold'
                    )}
                    aria-current={pathname === item.href ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto space-y-3 pt-8">
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                className="flex items-center justify-center gap-2 w-full bg-aman-gold text-white font-medium py-3.5 rounded-full text-sm hover:bg-aman-gold-dark transition-colors"
              >
                <Phone size={16} />
                {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center justify-center w-full border border-aman-border text-aman-text font-medium py-3.5 rounded-full text-sm hover:border-aman-gold hover:text-aman-gold transition-colors"
              >
                {siteConfig.contact.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
