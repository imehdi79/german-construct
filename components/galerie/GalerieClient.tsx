'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn, ArrowRight } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import { galleryCategories as defaultCategories } from '@/data/gallery'
import { defaultPages } from '@/data/sections'
import type { GalleryCategory, GalleryItem, GaleriePageCopy, SelectOption } from '@/types'
import { cn } from '@/lib/utils'

export function GalerieClient({
  items,
  categories = defaultCategories.map((c) => ({ value: c.value, label: c.label })),
  copy = defaultPages.galerie,
}: {
  items: GalleryItem[]
  categories?: SelectOption[]
  copy?: GaleriePageCopy
}) {
  const galleryCategories = categories
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('alle')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered =
    activeCategory === 'alle'
      ? items
      : items.filter((item) => item.category === activeCategory)

  return (
    <>
      {/* Page Header */}
      <div className="bg-aman-cream pt-28 md:pt-36 pb-14 border-b border-aman-border">
        <div className="container-aman">
          <nav aria-label="Brotkrümel" className="flex items-center gap-2 text-sm text-aman-text-muted mb-5">
            <Link href="/" className="hover:text-aman-gold transition-colors">Startseite</Link>
            <span>/</span>
            <span className="text-aman-charcoal">{copy.breadcrumb}</span>
          </nav>
          <SectionTitle
            eyebrow={copy.eyebrow}
            title={copy.title}
            subtitle={copy.subtitle}
          />
        </div>
      </div>

      {/* Gallery */}
      <section className="section-padding bg-white" aria-label="Projektgalerie">
        <div className="container-aman">
          {/* Filter */}
          <div
            className="flex flex-wrap gap-2 mb-10"
            role="tablist"
            aria-label="Galerie-Kategorien filtern"
          >
            {galleryCategories.map((cat) => (
              <button
                key={cat.value}
                role="tab"
                aria-selected={activeCategory === cat.value}
                onClick={() => setActiveCategory(cat.value as GalleryCategory)}
                className={cn(
                  'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200',
                  activeCategory === cat.value
                    ? 'bg-aman-charcoal text-white'
                    : 'bg-aman-cream text-aman-text-muted hover:bg-aman-sand'
                )}
              >
                {cat.label}
                <span className="ml-1.5 text-xs opacity-60">
                  ({cat.value === 'alle' ? items.length : items.filter((i) => i.category === cat.value).length})
                </span>
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
            role="tabpanel"
            aria-label={`Projekte: ${galleryCategories.find((c) => c.value === activeCategory)?.label}`}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="break-inside-avoid mb-4"
                >
                  <button
                    onClick={() => setLightboxIndex(index)}
                    className="gallery-item group relative w-full rounded-xl overflow-hidden bg-aman-sand block"
                    aria-label={`Bild vergrößern: ${item.title}`}
                    style={{ aspectRatio: `${item.width} / ${item.height}` }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-aman-charcoal/0 group-hover:bg-aman-charcoal/50 transition-all duration-500 flex items-center justify-center">
                      <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-aman-charcoal/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                      <p className="text-white text-xs font-medium">{item.title}</p>
                    </div>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-aman-text-muted">
              <p>{copy.emptyText}</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding-sm bg-aman-cream border-t border-aman-border">
        <div className="container-aman text-center">
          <p className="text-aman-text-muted mb-5 text-lg">
            {copy.ctaText}
          </p>
          <Button href="/projektplaner" variant="gold" size="lg" icon={<ArrowRight size={16} />}>
            {copy.ctaLabel}
          </Button>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] lightbox-backdrop flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Bild: ${filtered[lightboxIndex]?.title}`}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-xl overflow-hidden bg-aman-charcoal" style={{ maxHeight: '80vh' }}>
                <Image
                  src={filtered[lightboxIndex].image}
                  alt={filtered[lightboxIndex].title}
                  width={filtered[lightboxIndex].width}
                  height={filtered[lightboxIndex].height}
                  className="object-contain max-h-[80vh] w-full"
                />
              </div>
              <div className="mt-3 text-center">
                <p className="text-white font-medium">{filtered[lightboxIndex].title}</p>
                {filtered[lightboxIndex].description && (
                  <p className="text-white/60 text-sm mt-1">{filtered[lightboxIndex].description}</p>
                )}
              </div>
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute -top-4 -right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 transition-colors"
                aria-label="Schließen"
              >
                <X size={20} />
              </button>
              <button
                onClick={() => setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null))}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
                aria-label="Vorheriges Bild"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={() => setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null))}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
                aria-label="Nächstes Bild"
              >
                <ChevronRight size={22} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
