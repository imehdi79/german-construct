'use client'

import { motion } from 'framer-motion'
import { Phone, ArrowRight, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/config/site'

export function KontaktCtaSection() {
  return (
    <section
      className="section-padding bg-aman-charcoal relative overflow-hidden"
      aria-labelledby="cta-title"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #C9A96E,
            #C9A96E 1px,
            transparent 1px,
            transparent 60px
          )`,
        }}
        aria-hidden="true"
      />

      {/* Gold accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-aman-gold/40 to-transparent"
        aria-hidden="true"
      />

      <div className="container-aman relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-medium uppercase tracking-[0.2em] text-aman-gold"
          >
            Bereit für Ihr Projekt?
          </motion.span>

          <motion.h2
            id="cta-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-white mt-4 mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
          >
            Lassen Sie uns gemeinsam
            <br />
            <span className="text-aman-gold">etwas Schönes erschaffen.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white/60 text-lg mb-10 leading-relaxed"
          >
            Kontaktieren Sie uns für ein kostenfreies und unverbindliches Beratungsgespräch.
            Wir freuen uns auf Ihr Projekt.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              href="/kontakt"
              variant="gold"
              size="lg"
              icon={<ArrowRight size={16} />}
            >
              Anfrage stellen
            </Button>
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-white/20 text-white text-sm font-medium uppercase tracking-wider hover:border-white/40 hover:bg-white/5 transition-all duration-200"
              aria-label={`Anrufen: ${siteConfig.contact.phone}`}
            >
              <Phone size={15} />
              {siteConfig.contact.phone}
            </a>
          </motion.div>

          {/* Address info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-10 flex items-center justify-center gap-2 text-white/40 text-sm"
          >
            <MapPin size={14} className="text-aman-gold" />
            <span>
              {siteConfig.contact.address.street}, {siteConfig.contact.address.zip}{' '}
              {siteConfig.contact.address.city}
            </span>
          </motion.div>

          {/* Opening hours */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-3 text-white/30 text-xs"
          >
            {siteConfig.openingHours.weekdays} · {siteConfig.openingHours.saturday}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
