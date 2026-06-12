'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/config/site'

const defaultTrustIndicators = [
  'Geführt vom Meister',
  'Verbindliche Festpreise',
  'Persönliche Betreuung',
]

export interface HeroContent {
  eyebrow: string
  titleLine1: string
  titleAccent: string
  subtitle: string
}

const defaultHero: HeroContent = {
  eyebrow: 'Neu gegründeter Meisterbetrieb',
  titleLine1: 'Handwerkskunst,',
  titleAccent: 'die bleibt.',
  subtitle:
    'Ihr Fachbetrieb für Fliesen-, Platten- und Natursteinarbeiten in Frankfurt und Umgebung. Frische Ideen, meisterliche Ausführung, faire Festpreise.',
}

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
}

export function HeroSection({
  hero = defaultHero,
  trustIndicators = defaultTrustIndicators,
}: {
  hero?: HeroContent
  trustIndicators?: string[]
}) {
  const heroRef = useRef<HTMLElement>(null)

  // Parallax effect for the background on scroll
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const bg = hero.querySelector<HTMLElement>('[data-parallax]')
      if (bg) {
        bg.style.transform = `translateY(${scrollY * 0.3}px)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-svh flex flex-col justify-end overflow-hidden bg-aman-charcoal"
      aria-label="Hero Bereich"
    >
      {/* Background Image */}
      <div
        data-parallax
        className="absolute inset-0 will-change-transform"
        aria-hidden="true"
      >
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          priority
          quality={90}
          className="object-cover object-center scale-90"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-aman-charcoal/60 via-aman-charcoal/50 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-aman-charcoal/60 via-transparent to-transparent" />
      </div>

      {/* Decorative grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 container-aman pb-20 md:pb-28 pt-32 md:pt-40">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Eyebrow */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 mb-6"
          >
            <span className="gold-line" aria-hidden="true" />
            <span className="text-aman-gold text-xs font-medium uppercase tracking-[0.2em]">
              {hero.eyebrow}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-white font-serif mb-6 leading-[1.1]"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
          >
            {hero.titleLine1}
            <br />
            <em className="not-italic text-aman-gold">{hero.titleAccent}</em>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-white/75 text-xl leading-relaxed mb-10 max-w-xl"
          >
            {hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-14"
          >
            <Button
              href="/projektplaner"
              variant="gold"
              size="lg"
              icon={<ArrowRight size={16} />}
            >
              Kostenloses Angebot
            </Button>
            <Button
              href="/galerie"
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white hover:text-aman-charcoal"
            >
              Unsere Projekte
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6"
          >
            {trustIndicators.map((indicator) => (
              <div key={indicator} className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-aman-gold shrink-0" />
                <span className="text-white/80 text-sm">{indicator}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Logo watermark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12 opacity-20 pointer-events-none"
        aria-hidden="true"
      >
        <Image
          src="/logo-no-background.png"
          alt=""
          width={120}
          height={120}
          className="object-contain brightness-0 invert"
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 no-print"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-widest">Scrollen</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
