'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { testimonials } from '@/data/testimonials'
import { cn } from '@/lib/utils'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Bewertung: ${rating} von 5 Sternen`} role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'fill-aman-gold text-aman-gold' : 'text-aman-stone-100'}
        />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, next])

  const handleInteraction = (fn: () => void) => {
    setIsAutoPlaying(false)
    fn()
  }

  return (
    <section
      className="section-padding bg-aman-cream overflow-hidden"
      aria-labelledby="testimonials-title"
    >
      <div className="container-aman">
        <SectionTitle
          eyebrow="Kundenstimmen"
          title="Was unsere Kunden sagen"
          subtitle="Vertrauen entsteht durch Leistung – das spiegeln unsere Bewertungen wider."
          align="center"
          className="max-w-2xl mx-auto mb-14"
          id="testimonials-title"
        />

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div
            className="relative bg-white rounded-3xl p-8 md:p-12 shadow-card mb-8"
            aria-live="polite"
            aria-atomic="true"
          >
            <Quote
              size={48}
              className="text-aman-gold/20 absolute top-8 left-8"
              aria-hidden="true"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Avatar */}
                  <div className="shrink-0">
                    <div
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-aman-stone-200 to-aman-stone-400 flex items-center justify-center text-white text-xl font-serif"
                      aria-hidden="true"
                    >
                      {testimonials[current].name.charAt(0)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <StarRating rating={testimonials[current].rating} />

                    <blockquote className="mt-4 mb-5">
                      <p className="text-aman-charcoal text-lg leading-relaxed font-serif italic">
                        „{testimonials[current].text}"
                      </p>
                    </blockquote>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <p className="font-medium text-aman-charcoal">
                          {testimonials[current].name}
                        </p>
                        <p className="text-sm text-aman-text-muted">
                          {testimonials[current].location}
                        </p>
                      </div>
                      <div className="shrink-0">
                        <span className="inline-block px-3 py-1 bg-aman-cream rounded-full text-xs text-aman-text-muted">
                          {testimonials[current].project}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            {/* Dots */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Bewertungen">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  role="tab"
                  aria-selected={index === current}
                  aria-label={`Bewertung ${index + 1} anzeigen`}
                  onClick={() => handleInteraction(() => setCurrent(index))}
                  className={cn(
                    'rounded-full transition-all duration-300',
                    index === current
                      ? 'w-6 h-2 bg-aman-gold'
                      : 'w-2 h-2 bg-aman-stone-200 hover:bg-aman-stone-300'
                  )}
                />
              ))}
            </div>

            {/* Arrow Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleInteraction(prev)}
                className="w-10 h-10 rounded-full border border-aman-border flex items-center justify-center text-aman-text-muted hover:border-aman-gold hover:text-aman-gold transition-colors"
                aria-label="Vorherige Bewertung"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => handleInteraction(next)}
                className="w-10 h-10 rounded-full border border-aman-border flex items-center justify-center text-aman-text-muted hover:border-aman-gold hover:text-aman-gold transition-colors"
                aria-label="Nächste Bewertung"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Rating Summary */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-8 py-8 border-t border-aman-border"
          >
            <div className="text-center">
              <p className="text-4xl font-serif text-aman-charcoal">5,0</p>
              <StarRating rating={5} />
              <p className="text-xs text-aman-text-light mt-1">Gesamtbewertung</p>
            </div>
            <div className="h-12 w-px bg-aman-border hidden sm:block" aria-hidden="true" />
            <div className="text-center">
              <p className="text-4xl font-serif text-aman-charcoal">99%</p>
              <p className="text-sm text-aman-text-muted mt-1">Weiterempfehlung</p>
            </div>
            <div className="h-12 w-px bg-aman-border hidden sm:block" aria-hidden="true" />
            <div className="text-center">
              <p className="text-4xl font-serif text-aman-charcoal">6</p>
              <p className="text-sm text-aman-text-muted mt-1">Aktuelle Bewertungen</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
