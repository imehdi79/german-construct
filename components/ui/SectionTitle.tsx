'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionTitleProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  className?: string
  titleClassName?: string
  light?: boolean
  id?: string
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className,
  titleClassName,
  light = false,
  id,
}: SectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' })

  const alignClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  }

  return (
    <div
      ref={ref}
      id={id}
      className={cn('flex flex-col gap-4', alignClasses[align], className)}
    >
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3"
        >
          <span className="gold-line" aria-hidden="true" />
          <span
            className={cn(
              'text-xs font-medium uppercase tracking-[0.2em]',
              light ? 'text-aman-gold' : 'text-aman-gold'
            )}
          >
            {eyebrow}
          </span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.6, delay: eyebrow ? 0.1 : 0, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'font-serif text-balance',
          light ? 'text-white' : 'text-aman-charcoal',
          titleClassName
        )}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            'text-lg leading-relaxed max-w-2xl',
            light ? 'text-white/70' : 'text-aman-text-muted'
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
