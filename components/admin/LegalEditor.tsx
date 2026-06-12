'use client'

import { useState } from 'react'
import { ChevronUp, ChevronDown, Trash2, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LegalContent, LegalKey } from '@/types'
import { Field, TextArea } from './fields'

const LEGAL_LABELS: Record<LegalKey, string> = {
  impressum: 'Impressum',
  datenschutz: 'Datenschutz',
  agb: 'AGB',
  nutzungsbedingungen: 'Nutzungsbedingungen',
}

const KEYS = Object.keys(LEGAL_LABELS) as LegalKey[]

function move<T>(arr: T[], from: number, to: number) {
  if (to < 0 || to >= arr.length) return
  const [item] = arr.splice(from, 1)
  arr.splice(to, 0, item)
}

export function LegalEditor({
  legal,
  onChange,
}: {
  legal: LegalContent
  onChange: (mutator: (legal: LegalContent) => void) => void
}) {
  const [active, setActive] = useState<LegalKey>('impressum')
  const page = legal[active]

  return (
    <div className="max-w-3xl space-y-5">
      {/* Page selector */}
      <div className="flex flex-wrap gap-2">
        {KEYS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setActive(key)}
            className={cn(
              'px-3.5 py-2 rounded-xl text-sm font-medium transition-all border',
              active === key
                ? 'bg-aman-charcoal text-white border-aman-charcoal'
                : 'bg-white text-gray-600 border-gray-200 hover:border-aman-gold',
            )}
          >
            {LEGAL_LABELS[key]}
            <span className="ml-2 text-xs opacity-60">{legal[key].sections.length}</span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
        <Field label="Seitentitel (H1)" value={page.title}
          onChange={(v) => onChange((g) => (g[active].title = v))} />
        <Field label="Brotkrümel" value={page.breadcrumb}
          onChange={(v) => onChange((g) => (g[active].breadcrumb = v))} />
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Meta-Titel" value={page.metaTitle}
            onChange={(v) => onChange((g) => (g[active].metaTitle = v))} />
          <Field label="Meta-Beschreibung" value={page.metaDescription}
            onChange={(v) => onChange((g) => (g[active].metaDescription = v))} />
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {page.sections.map((section, si) => (
          <div key={si} className="rounded-2xl border border-gray-200 bg-gray-50/60 p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wide text-aman-gold">
                Abschnitt {si + 1}
              </span>
              <div className="flex items-center gap-0.5">
                <button type="button" aria-label="Nach oben"
                  onClick={() => onChange((g) => move(g[active].sections, si, si - 1))}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-aman-gold hover:bg-aman-gold/10">
                  <ChevronUp size={15} className={si === 0 ? 'opacity-30' : ''} />
                </button>
                <button type="button" aria-label="Nach unten"
                  onClick={() => onChange((g) => move(g[active].sections, si, si + 1))}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-aman-gold hover:bg-aman-gold/10">
                  <ChevronDown size={15} className={si === page.sections.length - 1 ? 'opacity-30' : ''} />
                </button>
                <button type="button" aria-label="Abschnitt entfernen"
                  onClick={() => onChange((g) => g[active].sections.splice(si, 1))}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
            <Field label="Überschrift" value={section.heading}
              onChange={(v) => onChange((g) => (g[active].sections[si].heading = v))} />
            <TextArea label="Text (Leerzeile = neuer Absatz)" rows={6} value={section.body}
              onChange={(v) => onChange((g) => (g[active].sections[si].body = v))} />
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange((g) => g[active].sections.push({ heading: 'Neuer Abschnitt', body: '' }))}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-gray-200 text-sm text-gray-500 hover:border-aman-gold hover:text-aman-gold transition-colors"
        >
          <Plus size={16} /> Abschnitt hinzufügen
        </button>
      </div>
    </div>
  )
}
