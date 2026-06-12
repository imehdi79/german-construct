'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCountUp } from '@/hooks/useCountUp'
import { stats as defaultStats } from '@/data/stats'
import { defaultSections } from '@/data/sections'
import { cn } from '@/lib/utils'
import type { Stat, StatistikCopy } from '@/types'

function StatCounter({
  value,
  suffix,
  label,
  description,
  enabled,
  index,
}: {
  value: number
  suffix: string
  label: string
  description: string
  enabled: boolean
  index: number
}) {
  const count = useCountUp({ end: value, duration: 2200, enabled })

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={enabled ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'flex flex-col items-center text-center px-6 py-10',
        'border-b border-white/10 last:border-b-0',
        'md:border-b-0 md:border-r md:last:border-r-0'
      )}
    >
      <div className="flex items-baseline gap-0.5 mb-3">
        <span
          className="font-serif text-5xl md:text-6xl text-white leading-none"
          aria-live="polite"
          aria-label={`${count}${suffix} ${label}`}
        >
          {count}
        </span>
        <span className="font-serif text-3xl text-aman-gold">{suffix}</span>
      </div>
      <p className="text-white font-medium text-lg mb-1">{label}</p>
      <p className="text-white/50 text-sm leading-relaxed max-w-[180px]">{description}</p>
    </motion.div>
  )
}

export function StatistikSection({
  stats = defaultStats,
  copy = defaultSections.statistik,
}: {
  stats?: Stat[]
  copy?: StatistikCopy
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      className="bg-aman-charcoal overflow-hidden"
      aria-labelledby="statistik-title"
    >
      {/* Top wave decoration */}
      <div className="h-px bg-gradient-to-r from-transparent via-aman-gold/30 to-transparent" aria-hidden="true" />

      <div className="container-aman py-16 md:py-20">
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-medium uppercase tracking-[0.2em] text-aman-gold"
          >
            {copy.eyebrow}
          </motion.span>
          <motion.h2
            id="statistik-title"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-white mt-3"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)' }}
          >
            {copy.title}
          </motion.h2>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10 border border-white/10 rounded-2xl overflow-hidden"
          role="list"
          aria-label="Unternehmensstatistiken"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} role="listitem">
              <StatCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                description={stat.description}
                enabled={isInView}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-aman-gold/30 to-transparent" aria-hidden="true" />
    </section>
  )
}
