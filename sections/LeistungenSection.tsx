'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  Grid3X3,
  Gem,
  Layers,
  PencilRuler,
  Construction,
  Sun,
  ArrowRight,
} from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { services as defaultServices } from '@/data/services'
import { defaultSections } from '@/data/sections'
import type { Service, IntroCopy } from '@/types'
import { cn } from '@/lib/utils'

const iconMap = {
  'grid-3x3': Grid3X3,
  gem: Gem,
  layers: Layers,
  'pencil-ruler': PencilRuler,
  construction: Construction,
  sun: Sun,
}

export function LeistungenSection({
  services = defaultServices,
  copy = defaultSections.leistungenIntro,
}: {
  services?: Service[]
  copy?: IntroCopy
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="leistungen"
      className="section-padding bg-white"
      aria-labelledby="leistungen-title"
    >
      <div className="container-aman">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <SectionTitle
            eyebrow={copy.eyebrow}
            title={copy.title}
            subtitle={copy.subtitle}
            id="leistungen-title"
          />
          <Link
            href="/leistungen"
            className="group flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-aman-gold hover:text-aman-gold-dark transition-colors shrink-0"
          >
            {copy.ctaLabel}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] ?? Grid3X3

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  'group relative flex flex-col',
                  'bg-white border border-aman-border rounded-2xl p-7',
                  'hover:border-aman-gold hover:shadow-card transition-all duration-300'
                )}
                aria-label={`Leistung: ${service.title}`}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-aman-cream flex items-center justify-center mb-5 group-hover:bg-aman-gold/10 transition-colors">
                  <Icon
                    size={22}
                    className="text-aman-stone-400 group-hover:text-aman-gold transition-colors"
                  />
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl text-aman-charcoal mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-aman-text-muted leading-relaxed flex-1 mb-5">
                  {service.shortDescription}
                </p>

                {/* Features */}
                <ul className="space-y-1.5 mb-6">
                  {service.features.slice(0, 3).map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-xs text-aman-text-muted"
                    >
                      <span
                        className="w-1 h-1 rounded-full bg-aman-gold shrink-0"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={service.href}
                  className="group/link inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-aman-gold hover:text-aman-gold-dark transition-colors"
                  aria-label={`Mehr über ${service.title} erfahren`}
                >
                  Mehr erfahren
                  <ArrowRight
                    size={12}
                    className="group-hover/link:translate-x-1 transition-transform"
                  />
                </Link>

                {/* Hover accent line */}
                <div
                  className="absolute bottom-0 left-7 right-7 h-px bg-aman-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  aria-hidden="true"
                />
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
