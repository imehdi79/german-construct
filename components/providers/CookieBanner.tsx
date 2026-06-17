'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function CookieBanner() {
  const [visible, setVisible] = useState(true)

  // TODO : uncomment some time
  // useEffect(() => {
  //   const consent = localStorage.getItem('cookie-consent')
  //   if (!consent) {
  //     const timer = setTimeout(() => setVisible(true), 1500)
  //     return () => clearTimeout(timer)
  //   }
  // }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-[9999]',
        'bg-aman-charcoal text-white',
        'animate-in slide-in-from-bottom-2 duration-500'
      )}
      role="dialog"
      aria-label="Cookie-Einstellungen"
      aria-live="polite"
    >
      <div className="container-aman py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 pr-4">
            <p className="mb-2 flex items-center gap-2 text-sm font-medium text-aman-gold">
              <AlertTriangle size={14} className="shrink-0" />
              Experimentelle Version – diese Website befindet sich noch in der Entwicklung.
            </p>
            <p className="text-sm leading-relaxed text-white/80">
              Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu
              bieten. Durch die weitere Nutzung stimmen Sie unserer{' '}
              <Link
                href="/datenschutz"
                className="text-aman-gold underline underline-offset-2 hover:text-aman-gold/80 transition-colors"
              >
                Datenschutzerklärung
              </Link>{' '}
              zu.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={decline}
              className="text-sm text-white/60 hover:text-white transition-colors px-3 py-1.5 rounded"
              aria-label="Nur notwendige Cookies"
            >
              Ablehnen
            </button>
            <button
              onClick={accept}
              className="text-sm bg-aman-gold text-aman-charcoal font-medium px-5 py-2 rounded hover:bg-aman-gold-dark transition-colors"
              aria-label="Alle Cookies akzeptieren"
            >
              Akzeptieren
            </button>
            <button
              onClick={decline}
              className="text-white/60 hover:text-white transition-colors p-1"
              aria-label="Schließen"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
