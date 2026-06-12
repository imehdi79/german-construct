'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    })

    let rafId = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    })

    // Lenis caches the scrollable height at init and only re-measures on window
    // resize. When the document height changes for other reasons — a multi-step
    // form expanding/collapsing, accordions, lazy images — the cached limits go
    // stale and scrolling "breaks" (can't reach new content, or jumps). Observe
    // the body and tell Lenis to re-measure whenever its height changes.
    const observed = document.body
    let lastHeight = observed.scrollHeight
    const resizeObserver = new ResizeObserver(() => {
      if (observed.scrollHeight !== lastHeight) {
        lastHeight = observed.scrollHeight
        lenis.resize()
      }
    })
    resizeObserver.observe(observed)

    return () => {
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
