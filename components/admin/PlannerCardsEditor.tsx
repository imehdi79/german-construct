'use client'

import { Trash2, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { plannerIconNames, plannerIcons } from '@/lib/plannerIcons'
import type { PlannerCard } from '@/types'

const inputClass =
  'w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-aman-gold/40 focus:border-aman-gold transition-all'

function IconPicker({
  value,
  onChange,
}: {
  value: string
  onChange: (name: string) => void
}) {
  return (
    <div>
      <span className="block text-xs font-medium text-gray-600 mb-1">Symbol</span>
      <div className="flex flex-wrap gap-1.5">
        {plannerIconNames.map((name) => {
          const Icon = plannerIcons[name]
          const active = value === name
          return (
            <button
              key={name}
              type="button"
              onClick={() => onChange(name)}
              aria-label={`Symbol ${name}`}
              aria-pressed={active}
              title={name}
              className={cn(
                'p-2 rounded-lg border transition-colors',
                active
                  ? 'bg-aman-charcoal text-aman-gold border-aman-charcoal'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-aman-gold hover:text-aman-gold',
              )}
            >
              <Icon size={18} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function PlannerCardsEditor({
  cards,
  onChange,
  onAdd,
  onRemove,
}: {
  cards: PlannerCard[]
  /** Mutate the card list in place (field edits). */
  onChange: (mutator: (cards: PlannerCard[]) => void) => void
  /** Add a new card (parent also creates its empty form schema). */
  onAdd: () => void
  /** Remove the card at `index` (parent also removes its form schema). */
  onRemove: (index: number) => void
}) {
  return (
    <div className="max-w-3xl space-y-4">
      <p className="text-xs text-gray-500 leading-relaxed">
        Diese Karten erscheinen im Projektplaner. Jede Karte besitzt ein eigenes
        mehrstufiges Formular, das Sie unter „Projektplaner-Formulare“ bearbeiten.
        Beim Hinzufügen oder Entfernen einer Karte wird das zugehörige Formular
        automatisch mit angelegt bzw. gelöscht. Änderungen werden erst mit
        „Speichern&nbsp;&amp;&nbsp;Veröffentlichen“ übernommen.
      </p>

      {cards.map((card, i) => (
        <div
          key={card.id}
          className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3"
        >
          <button
            onClick={() => onRemove(i)}
            className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Karte entfernen"
          >
            <Trash2 size={15} />
          </button>

          <label className="block">
            <span className="block text-xs font-medium text-gray-600 mb-1">Titel</span>
            <input
              type="text"
              value={card.title}
              onChange={(e) => onChange((c) => (c[i].title = e.target.value))}
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className="block text-xs font-medium text-gray-600 mb-1">
              Beschreibung
            </span>
            <textarea
              rows={2}
              value={card.description}
              onChange={(e) => onChange((c) => (c[i].description = e.target.value))}
              className={cn(inputClass, 'resize-y')}
            />
          </label>

          <IconPicker
            value={card.icon}
            onChange={(name) => onChange((c) => (c[i].icon = name))}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={onAdd}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-gray-200 text-sm text-gray-500 hover:border-aman-gold hover:text-aman-gold transition-colors"
      >
        <Plus size={16} /> Karte hinzufügen
      </button>
    </div>
  )
}
