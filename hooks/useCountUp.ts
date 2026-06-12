'use client'

import { useEffect, useRef, useState } from 'react'

interface UseCountUpOptions {
  end: number
  duration?: number
  start?: number
  decimals?: number
  enabled?: boolean
}

export function useCountUp({
  end,
  duration = 2000,
  start = 0,
  decimals = 0,
  enabled = true,
}: UseCountUpOptions) {
  const [value, setValue] = useState(start)
  const frameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (!enabled) return

    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutExpo(progress)
      const current = start + (end - start) * easedProgress

      setValue(parseFloat(current.toFixed(decimals)))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setValue(end)
      }
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      startTimeRef.current = null
    }
  }, [end, duration, start, decimals, enabled])

  return value
}
