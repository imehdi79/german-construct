'use client'

import { useScrollProgress } from '@/hooks/useScrollProgress'

export function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div
      className="fixed top-0 left-0 right-0 h-0.5 z-[100] bg-aman-border/30"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-aman-gold to-aman-gold-dark origin-left"
        style={{ transform: `scaleX(${progress})`, transformOrigin: 'left' }}
      />
    </div>
  )
}
