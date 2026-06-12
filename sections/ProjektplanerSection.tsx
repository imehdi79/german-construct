'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ClipboardList, CheckCircle2, ArrowLeft, ArrowUp } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { FormBuilder } from '@/components/Form-Builder/FormBuilder'
import { formSchemas } from '@/components/Form-Builder/schemas'
import type { Step } from '@/components/Form-Builder/types'
import { submitPlannerInquiry } from '@/actions/contact'
import { plannerCards as defaultCards } from '@/data/plannerCards'
import { defaultSections } from '@/data/sections'
import { resolvePlannerIcon } from '@/lib/plannerIcons'
import type { PlannerCard, ProjektplanerCopy } from '@/types'
import { cn } from '@/lib/utils'

export function ProjektplanerSection({
  schemas,
  cards = defaultCards,
  copy = defaultSections.projektplaner,
}: {
  /** Editable schemas from the content store; falls back to the in-repo defaults. */
  schemas?: Record<string, Step[]>
  /** Editable planner cards from the content store; falls back to the defaults. */
  cards?: PlannerCard[]
  /** Editable planner section copy. */
  copy?: ProjektplanerCopy
}) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null)

  const schemaFor = (id: string): Step[] => schemas?.[id] ?? formSchemas[id as keyof typeof formSchemas] ?? []
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
              eyebrow={copy.eyebrow}
              title={copy.title}
              subtitle={copy.subtitle}
              id="projektplaner-title"
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-10">
              {cards.map((card, index) => {
                const Icon = resolvePlannerIcon(card.icon)
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
          <div className="lg:sticky lg:top-32">
            <AnimatePresence mode="wait">
              {!selected ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative overflow-hidden flex flex-col items-center justify-center text-center px-8 py-14 rounded-2xl border border-aman-border bg-gradient-to-br from-white to-aman-sand/40 shadow-card min-h-[400px]"
                >
                  {/* Soft decorative glow – gives the panel depth instead of an empty frame */}
                  <div
                    className="pointer-events-none absolute -top-20 -right-16 w-56 h-56 rounded-full bg-aman-gold/10 blur-3xl"
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute -bottom-24 -left-16 w-60 h-60 rounded-full bg-aman-gold/[0.06] blur-3xl"
                    aria-hidden="true"
                  />

                  {/* Icon badge with a gentle directional hint toward the cards */}
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative mb-6"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-aman-charcoal flex items-center justify-center shadow-card">
                      <ClipboardList size={32} className="text-aman-gold" />
                    </div>
                    <motion.span
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-aman-gold flex items-center justify-center shadow-md ring-4 ring-white"
                    >
                      <ArrowUp size={15} className="text-white lg:hidden" />
                      <ArrowLeft size={15} className="text-white hidden lg:block" />
                    </motion.span>
                  </motion.div>

                  <h3 className="relative font-serif text-xl text-aman-charcoal mb-2">
                    {copy.emptyTitle}
                  </h3>
                  <p className="relative text-sm text-aman-text-muted max-w-xs leading-relaxed">
                    {copy.emptySubtitle}
                  </p>

                  <ul className="relative mt-8 space-y-3 text-left">
                    {copy.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-center gap-2.5 text-sm text-aman-charcoal/80"
                      >
                        <CheckCircle2 size={16} className="text-aman-gold shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
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
                      submitPlannerInquiry({ projektTyp: selected.title, values })
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
