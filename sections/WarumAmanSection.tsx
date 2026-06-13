'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { resolveIcon } from '@/lib/icons'
import { defaultSections } from '@/data/sections'
import type { WarumAmanCopy } from '@/types'

export function WarumAmanSection({
  copy = defaultSections.warumAman,
}: {
  copy?: WarumAmanCopy
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reasons = copy.reasons

  return (
    <section
      className="section-padding bg-aman-cream overflow-hidden"
      aria-labelledby="warum-aman-title"
    >
      <div className="container-aman">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-4/5 rounded-2xl overflow-hidden shadow-hover">
              <Image
                src={copy.image}
                alt={copy.imageAlt}
                fill
                quality={90}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Decorative element */}
            <div
              className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-aman-gold/10 -z-10"
              aria-hidden="true"
            />
          </motion.div>

          {/* Content Side */}
          <div ref={ref}>
            <SectionTitle
              eyebrow={copy.eyebrow}
              title={copy.title}
              subtitle={copy.subtitle}
              id="warum-aman-title"
            />

            <div className="grid gap-6 mt-10">
              {reasons.map((reason, index) => {
                const Icon = resolveIcon(reason.icon)
                return (
                  <motion.div
                    key={reason.title}
                    initial={{ opacity: 0, x: 24 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex gap-4"
                  >
                    <div className="w-11 h-11 rounded-xl bg-aman-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={20} className="text-aman-gold" />
                    </div>
                    <div>
                      <h3 className="font-medium text-aman-charcoal mb-1.5 text-base">
                        {reason.title}
                      </h3>
                      <p className="text-sm text-aman-text-muted leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
