'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Layers,
  Hammer,
  Grid3X3,
  PencilRuler,
  Flame,
  Gem,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { FormBuilder } from '@/components/Form-Builder/FormBuilder'
import { formSchemas } from '@/components/Form-Builder/schemas'
import type { Step } from '@/components/Form-Builder/types'
import { submitPlannerInquiry } from '@/actions/contact'
import { cn } from '@/lib/utils'

type ProjektTyp = keyof typeof formSchemas

interface PlannerCard {
  id: ProjektTyp
  title: string
  description: string
  icon: LucideIcon
}

// Cards mirror the six form-builder schemas 1:1 (id === schema key).
const cards: PlannerCard[] = [
  {
    id: 'Bodenarbeiten',
    title: 'Bodenarbeiten',
    description: 'Neuer Bodenbelag – Fliesen, Vinyl, Laminat & mehr, fachgerecht verlegt.',
    icon: Layers,
  },
  {
    id: 'Estricharbeiten',
    title: 'Estricharbeiten',
    description: 'Ebene, tragfähige Estriche als perfekte Basis für Ihren Bodenbelag.',
    icon: Hammer,
  },
  {
    id: 'Fliesenarbeiten',
    title: 'Fliesenarbeiten',
    description: 'Hochwertige Fliesen für Bad, Küche, Wohnraum und Außenbereiche.',
    icon: Grid3X3,
  },
  {
    id: 'Fugenarbeiten',
    title: 'Fugenarbeiten',
    description: 'Präzise Verfugung für wasserdichte und ästhetische Fugenbilder.',
    icon: PencilRuler,
  },
  {
    id: 'Fußbodenheizung',
    title: 'Fußbodenheizung',
    description: 'Elektrische oder wasserführende Fußbodenheizung – effizient eingebaut.',
    icon: Flame,
  },
  {
    id: 'Natursteinarbeiten',
    title: 'Natursteinarbeiten',
    description: 'Edle Natursteine – Marmor, Granit, Travertin – fachgerecht verarbeitet.',
    icon: Gem,
  },
]

export function ProjektplanerSection({
  schemas,
}: {
  /** Editable schemas from the content store; falls back to the in-repo defaults. */
  schemas?: Record<string, Step[]>
}) {
  const [selectedCard, setSelectedCard] = useState<ProjektTyp | null>(null)

  const schemaFor = (id: ProjektTyp): Step[] => schemas?.[id] ?? formSchemas[id]
  const selected = cards.find((c) => c.id === selectedCard)

  return (
    <section
      id="projektplaner"
      className="section-padding bg-aman-cream"
      aria-labelledby="projektplaner-title"
    >
      <div className="container-aman">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Header + cards */}
          <div>
            <SectionTitle
              eyebrow="Ihr Projekt beginnt hier"
              title="Was dürfen wir für Sie planen?"
              subtitle="Wählen Sie Ihr Projektvorhaben und erhalten Sie innerhalb von 24 Stunden ein unverbindliches Angebot von uns."
              id="projektplaner-title"
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-10">
              {cards.map((card, index) => {
                const Icon = card.icon
                const active = selectedCard === card.id
                return (
                  <motion.button
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                      delay: index * 0.07,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedCard(card.id)}
                    className={cn(
                      'group relative flex flex-col items-start gap-3 p-4 rounded-xl text-left',
                      'border transition-all duration-300 cursor-pointer',
                      active
                        ? 'bg-aman-charcoal text-white border-aman-charcoal shadow-card'
                        : 'bg-white border-aman-border hover:border-aman-gold hover:shadow-card',
                    )}
                    aria-pressed={active}
                    aria-label={`Projekttyp ${card.title} auswählen`}
                  >
                    <div
                      className={cn(
                        'p-2 rounded-lg transition-colors',
                        active
                          ? 'bg-aman-gold/20 text-aman-gold'
                          : 'bg-aman-cream text-aman-stone-400 group-hover:bg-aman-gold/10 group-hover:text-aman-gold',
                      )}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <p
                        className={cn(
                          'text-sm font-medium leading-tight mb-1',
                          active ? 'text-white' : 'text-aman-charcoal',
                        )}
                      >
                        {card.title}
                      </p>
                      <p
                        className={cn(
                          'text-xs leading-relaxed',
                          active ? 'text-white/60' : 'text-aman-text-muted',
                        )}
                      >
                        {card.description}
                      </p>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Form panel */}
          <div className="lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              {!selected ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center p-12 rounded-2xl border-2 border-dashed border-aman-border min-h-[400px]"
                >
                  <div className="w-16 h-16 rounded-full bg-aman-sand flex items-center justify-center mb-4">
                    <ArrowRight size={24} className="text-aman-stone-400 -rotate-45" />
                  </div>
                  <p className="text-aman-text-muted font-medium">
                    Wählen Sie links Ihren Projekttyp aus
                  </p>
                  <p className="text-sm text-aman-text-light mt-2">
                    und erhalten Sie Ihr unverbindliches Angebot
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <FormBuilder
                    title={selected.title}
                    schema={schemaFor(selected.id)}
                    onClose={() => setSelectedCard(null)}
                    onSubmit={(values) =>
                      submitPlannerInquiry({ projektTyp: selected.id, values })
                    }
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
