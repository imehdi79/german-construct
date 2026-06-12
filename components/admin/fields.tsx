'use client'

import { Plus, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { contentIcons, contentIconNames, type ContentIconName } from '@/lib/icons'

export const inputClass =
  'w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-aman-gold/40 focus:border-aman-gold transition-all'

export function Field({ label, value, onChange, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; type?: string
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-gray-600 mb-1">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </label>
  )
}

export function TextArea({ label, value, onChange, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-gray-600 mb-1">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(inputClass, 'resize-y')}
      />
    </label>
  )
}

export function ListField({ label, value, onChange }: {
  label: string; value: string[]; onChange: (v: string[]) => void
}) {
  return (
    <TextArea
      label={`${label} (eine Zeile pro Eintrag)`}
      rows={Math.max(3, value.length)}
      value={value.join('\n')}
      onChange={(v) => onChange(v.split('\n').map((s) => s.trim()).filter(Boolean))}
    />
  )
}

export function Card({ children, onRemove }: { children: React.ReactNode; onRemove?: () => void }) {
  return (
    <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          aria-label="Eintrag entfernen"
        >
          <Trash2 size={15} />
        </button>
      )}
      {children}
    </div>
  )
}

export function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
      <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
      {children}
    </section>
  )
}

export function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-gray-200 text-sm text-gray-500 hover:border-aman-gold hover:text-aman-gold transition-colors"
    >
      <Plus size={16} /> {label}
    </button>
  )
}

/** Editor for an editable label/href link list (nav, footer columns). */
export function LinkListEditor({
  label,
  links,
  onChange,
}: {
  label: string
  links: { label: string; href: string }[]
  onChange: (mutator: (links: { label: string; href: string }[]) => void) => void
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-gray-600">{label}</p>
      {links.map((link, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            type="text"
            value={link.label}
            placeholder="Beschriftung"
            onChange={(e) => onChange((l) => (l[i].label = e.target.value))}
            className={cn(inputClass, 'flex-1')}
          />
          <input
            type="text"
            value={link.href}
            placeholder="/pfad"
            onChange={(e) => onChange((l) => (l[i].href = e.target.value))}
            className={cn(inputClass, 'flex-1')}
          />
          <button
            onClick={() => onChange((l) => l.splice(i, 1))}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Link entfernen"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange((l) => l.push({ label: 'Neuer Link', href: '/' }))}
        className="flex items-center gap-1.5 text-xs text-aman-gold hover:underline"
      >
        <Plus size={13} /> Link hinzufügen
      </button>
    </div>
  )
}

/** Editor for a value/label option list (gallery categories, betreff options). */
export function OptionListEditor({
  label,
  options,
  onChange,
}: {
  label: string
  options: { value: string; label: string }[]
  onChange: (mutator: (options: { value: string; label: string }[]) => void) => void
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-gray-600">{label}</p>
      {options.map((opt, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            type="text"
            value={opt.label}
            placeholder="Anzeigetext"
            onChange={(e) => onChange((o) => (o[i].label = e.target.value))}
            className={cn(inputClass, 'flex-1')}
          />
          <input
            type="text"
            value={opt.value}
            placeholder="Wert"
            onChange={(e) => onChange((o) => (o[i].value = e.target.value))}
            className={cn(inputClass, 'flex-1')}
          />
          <button
            onClick={() => onChange((o) => o.splice(i, 1))}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Option entfernen"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange((o) => o.push({ value: 'wert', label: 'Neue Option' }))}
        className="flex items-center gap-1.5 text-xs text-aman-gold hover:underline"
      >
        <Plus size={13} /> Option hinzufügen
      </button>
    </div>
  )
}

/** Icon picker over the shared content-icon registry. */
export function ContentIconPicker({
  value,
  onChange,
}: {
  value: string
  onChange: (name: ContentIconName) => void
}) {
  return (
    <div>
      <span className="block text-xs font-medium text-gray-600 mb-1">Symbol</span>
      <div className="flex flex-wrap gap-1.5">
        {contentIconNames.map((name) => {
          const Icon = contentIcons[name]
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
