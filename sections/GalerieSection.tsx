'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn, ArrowRight } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import { galleryItems as defaultItems, galleryCategories as defaultCategories } from '@/data/gallery'
import { defaultSections } from '@/data/sections'
import type { GalleryCategory, GalleryItem, IntroCopy, SelectOption } from '@/types'
import { cn } from '@/lib/utils'

export function GalerieSection({
  items = defaultItems,
  categories = defaultCategories.map((c) => ({ value: c.value, label: c.label })),
  copy = defaultSections.galerieIntro,
}: {
  items?: GalleryItem[]
  categories?: SelectOption[]
  copy?: IntroCopy
}) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('alle')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const galleryCategories = categories
  const filtered =
    activeCategory === 'alle'
      ? items.slice(0, 8)
      : items.filter((item) => item.category === activeCategory).slice(0, 8)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null))
  const nextImage = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null))

  return (
    <section
      id="galerie"
      className="section-padding bg-white"
      aria-labelledby="galerie-title"
    >
      <div className="container-aman">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <SectionTitle
            eyebrow={copy.eyebrow}
            title={copy.title}
            subtitle={copy.subtitle}
            id="galerie-title"
          />
          <Button href="/galerie" variant="outline" size="sm" icon={<ArrowRight size={14} />} className="shrink-0">
            {copy.ctaLabel}
          </Button>
        </div>

        {/* Category Filter */}
        <div
          className="flex flex-wrap gap-2 mb-8"
          role="tablist"
          aria-label="Galerie-Kategorien"
        >
          {galleryCategories.map((cat) => (
            <button
              key={cat.value}
              role="tab"
              aria-selected={activeCategory === cat.value}
              onClick={() => setActiveCategory(cat.value as GalleryCategory)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                activeCategory === cat.value
                  ? 'bg-aman-charcoal text-white'
                  : 'bg-aman-cream text-aman-text-muted hover:bg-aman-sand'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
          role="tabpanel"
          aria-label={`Projekte: ${galleryCategories.find((c) => c.value === activeCategory)?.label}`}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openLightbox(index)}
                className={cn(
                  'gallery-item group relative rounded-xl overflow-hidden bg-aman-sand cursor-pointer',
                  index % 5 === 0 || index % 5 === 3
                    ? 'row-span-2 aspect-[3/4]'
                    : 'aspect-square'
                )}
                aria-label={`Bild öffnen: ${item.title}`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwkHBgoJCAkLCwoMDxkQDw4ODx4WFxIZJCAmJSMgIyIoLTkwKCo2KyIjMkQyNjs9QEBAJjBGS0U+Sjk/QD3/2wBDAQsLCw8NDx0QEB09KSMpPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT3/wAARCAAKAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQYH/8QAIBAAAQQCAgMAAAAAAAAAAAAAAQIDBAURIRIxQf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCqWq0oWvjSXvAYkZWStxkdwOoKxTrAJvLHPUYe7ZCDYmhvW+JcYFuYFYfE01iJQAVT/9k="
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-aman-charcoal/0 group-hover:bg-aman-charcoal/50 transition-all duration-500 flex items-center justify-center">
                  <ZoomIn
                    size={28}
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                  />
                </div>

                {/* Title on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-aman-charcoal/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                  <p className="text-white text-xs font-medium leading-tight">{item.title}</p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] lightbox-backdrop flex items-center justify-center p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`Bild: ${filtered[lightboxIndex]?.title}`}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-4xl w-full max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-aman-charcoal">
                <Image
                  src={filtered[lightboxIndex].image}
                  alt={filtered[lightboxIndex].title}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>

              <div className="mt-3 text-center">
                <p className="text-white font-medium">{filtered[lightboxIndex].title}</p>
                {filtered[lightboxIndex].description && (
                  <p className="text-white/60 text-sm mt-1">
                    {filtered[lightboxIndex].description}
                  </p>
                )}
              </div>

              {/* Controls */}
              <button
                onClick={closeLightbox}
                className="absolute -top-4 -right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 transition-colors"
                aria-label="Bild schließen"
              >
                <X size={20} />
              </button>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
                aria-label="Vorheriges Bild"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
                aria-label="Nächstes Bild"
              >
                <ChevronRight size={22} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
