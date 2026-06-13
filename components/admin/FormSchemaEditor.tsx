'use client'

import { useState } from 'react'
import { ChevronUp, ChevronDown, Trash2, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FormSchemasContent } from '@/lib/content'
import type { Field, FieldType, Step } from '@/components/Form-Builder/types'

const FIELD_TYPES: FieldType[] = [
  'text',
  'textarea',
  'select',
  'autocomplete',
  'radio',
  'checkbox',
  'dropzone',
  'date',
  'label',
]

const TYPE_LABELS: Record<FieldType, string> = {
  text: 'Textfeld',
  textarea: 'Mehrzeilig',
  select: 'Auswahlliste',
  autocomplete: 'Auswahlliste mit Suche',
  radio: 'Einfachauswahl',
  checkbox: 'Mehrfachauswahl',
  dropzone: 'Datei-Upload',
  date: 'Datum',
  label: 'Beschriftung',
}

const OPTION_TYPES: FieldType[] = ['select', 'autocomplete', 'radio', 'checkbox']

const uid = () =>
  `fb-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`

function move<T>(arr: T[], from: number, to: number) {
  if (to < 0 || to >= arr.length) return
  const [item] = arr.splice(from, 1)
  arr.splice(to, 0, item)
}

function newField(): Field {
  return { id: uid(), type: 'text', label: 'Neues Feld', required: false }
}

function newStep(): Step {
  return { id: uid(), title: 'Neuer Schritt', fields: [newField()] }
}

// ─── Small styled inputs (admin gray aesthetic) ──────────────────────────────

const inputClass =
  'w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-aman-gold/40 focus:border-aman-gold transition-all'

function TextInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-gray-600 mb-1">{label}</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </label>
  )
}

function TextAreaInput({
  label,
  value,
  onChange,
  rows = 2,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  rows?: number
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

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="inline-flex items-center gap-2 text-xs font-medium text-gray-600 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 accent-aman-gold"
      />
      {label}
    </label>
  )
}

function IconBtn({
  onClick,
  label,
  children,
  danger,
}: {
  onClick: () => void
  label: string
  children: React.ReactNode
  danger?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        'p-1.5 rounded-lg transition-colors text-gray-400',
        danger
          ? 'hover:text-red-500 hover:bg-red-50'
          : 'hover:text-aman-gold hover:bg-aman-gold/10',
      )}
    >
      {children}
    </button>
  )
}

// ─── Options editor ───────────────────────────────────────────────────────────

function OptionsEditor({
  field,
  mutate,
}: {
  field: Field
  mutate: (fn: (f: Field) => void) => void
}) {
  const options = field.options ?? []
  return (
    <div className="space-y-2 rounded-lg bg-gray-50 p-3">
      <p className="text-xs font-medium text-gray-600">Optionen</p>
      {options.map((opt, oi) => (
        <div key={oi} className="flex items-center gap-2">
          <input
            type="text"
            value={opt.label}
            placeholder="Anzeigetext"
            onChange={(e) =>
              mutate((f) => {
                const o = f.options![oi]
                o.label = e.target.value
                // keep value in sync when it mirrored the label
                if (!o.value || o.value === opt.label) o.value = e.target.value
              })
            }
            className={cn(inputClass, 'flex-1')}
          />
          <input
            type="text"
            value={opt.value}
            placeholder="Wert"
            onChange={(e) => mutate((f) => (f.options![oi].value = e.target.value))}
            className={cn(inputClass, 'flex-1')}
          />
          <Toggle
            label="Notizfeld"
            checked={!!opt.hasNote}
            onChange={(v) => mutate((f) => (f.options![oi].hasNote = v || undefined))}
          />
          <IconBtn
            label="Option entfernen"
            danger
            onClick={() => mutate((f) => f.options!.splice(oi, 1))}
          >
            <Trash2 size={14} />
          </IconBtn>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          mutate((f) => {
            f.options = f.options ?? []
            f.options.push({ label: 'Neue Option', value: 'Neue Option' })
          })
        }
        className="flex items-center gap-1.5 text-xs text-aman-gold hover:underline"
      >
        <Plus size={13} /> Option hinzufügen
      </button>
    </div>
  )
}

// ─── Field editor ─────────────────────────────────────────────────────────────

function FieldEditor({
  field,
  index,
  total,
  mutate,
  onMove,
  onRemove,
}: {
  field: Field
  index: number
  total: number
  mutate: (fn: (f: Field) => void) => void
  onMove: (dir: -1 | 1) => void
  onRemove: () => void
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-gray-400">Feld {index + 1}</span>
        <div className="flex items-center gap-0.5">
          <IconBtn label="Nach oben" onClick={() => onMove(-1)}>
            <ChevronUp size={14} className={index === 0 ? 'opacity-30' : ''} />
          </IconBtn>
          <IconBtn label="Nach unten" onClick={() => onMove(1)}>
            <ChevronDown size={14} className={index === total - 1 ? 'opacity-30' : ''} />
          </IconBtn>
          <IconBtn label="Feld entfernen" danger onClick={onRemove}>
            <Trash2 size={14} />
          </IconBtn>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <TextInput
          label="Beschriftung / Frage"
          value={field.label}
          onChange={(v) => mutate((f) => (f.label = v))}
        />
        <label className="block">
          <span className="block text-xs font-medium text-gray-600 mb-1">Feldtyp</span>
          <select
            value={field.type}
            onChange={(e) =>
              mutate((f) => {
                const next = e.target.value as FieldType
                f.type = next
                if (!OPTION_TYPES.includes(next)) delete f.options
                else f.options = f.options ?? [{ label: 'Option 1', value: 'Option 1' }]
              })
            }
            className={cn(inputClass, 'appearance-none')}
          >
            {FIELD_TYPES.map((t) => (
              <option key={t} value={t}>
                {TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <TextInput
        label="Hilfetext (optional)"
        value={field.description ?? ''}
        onChange={(v) => mutate((f) => (f.description = v || undefined))}
      />

      <div className="flex flex-wrap items-center gap-4">
        {field.type !== 'label' && (
          <Toggle
            label="Pflichtfeld"
            checked={!!field.required}
            onChange={(v) => mutate((f) => (f.required = v || undefined))}
          />
        )}
        {field.type === 'label' && (
          <label className="inline-flex items-center gap-2 text-xs font-medium text-gray-600">
            Stil
            <select
              value={field.variant ?? 'normal'}
              onChange={(e) =>
                mutate((f) => (f.variant = e.target.value as 'normal' | 'subtitle'))
              }
              className={cn(inputClass, 'py-1 w-auto')}
            >
              <option value="normal">Normal</option>
              <option value="subtitle">Untertitel</option>
            </select>
          </label>
        )}
      </div>

      {OPTION_TYPES.includes(field.type) && (
        <OptionsEditor field={field} mutate={mutate} />
      )}

      {field.type === 'dropzone' && (
        <TextInput
          label="Erlaubte Dateitypen (accept)"
          value={field.accept ?? ''}
          placeholder="image/*,application/pdf"
          onChange={(v) => mutate((f) => (f.accept = v || undefined))}
        />
      )}

      {(field.type === 'text' || field.type === 'textarea') && (
        <div className="grid sm:grid-cols-2 gap-3 rounded-lg bg-gray-50 p-3">
          <TextInput
            label="Min. Zeichen"
            value={field.validation?.min != null ? String(field.validation.min) : ''}
            onChange={(v) =>
              mutate((f) => {
                f.validation = f.validation ?? {}
                f.validation.min = v ? Number(v) : undefined
              })
            }
          />
          <TextInput
            label="Max. Zeichen"
            value={field.validation?.max != null ? String(field.validation.max) : ''}
            onChange={(v) =>
              mutate((f) => {
                f.validation = f.validation ?? {}
                f.validation.max = v ? Number(v) : undefined
              })
            }
          />
          <TextInput
            label="Muster (RegEx, optional)"
            value={field.validation?.pattern ?? ''}
            onChange={(v) =>
              mutate((f) => {
                f.validation = f.validation ?? {}
                f.validation.pattern = v || undefined
              })
            }
          />
          <TextInput
            label="Fehlermeldung zum Muster"
            value={field.validation?.patternMessage ?? ''}
            onChange={(v) =>
              mutate((f) => {
                f.validation = f.validation ?? {}
                f.validation.patternMessage = v || undefined
              })
            }
          />
        </div>
      )}

      {field.type === 'checkbox' && (
        <div className="grid sm:grid-cols-2 gap-3 rounded-lg bg-gray-50 p-3">
          <TextInput
            label="Min. Auswahl"
            value={field.validation?.min != null ? String(field.validation.min) : ''}
            onChange={(v) =>
              mutate((f) => {
                f.validation = f.validation ?? {}
                f.validation.min = v ? Number(v) : undefined
              })
            }
          />
          <TextInput
            label="Max. Auswahl"
            value={field.validation?.max != null ? String(field.validation.max) : ''}
            onChange={(v) =>
              mutate((f) => {
                f.validation = f.validation ?? {}
                f.validation.max = v ? Number(v) : undefined
              })
            }
          />
        </div>
      )}
    </div>
  )
}

// ─── Step editor ──────────────────────────────────────────────────────────────

function StepEditor({
  step,
  index,
  total,
  mutate,
  onMove,
  onRemove,
}: {
  step: Step
  index: number
  total: number
  mutate: (fn: (s: Step) => void) => void
  onMove: (dir: -1 | 1) => void
  onRemove: () => void
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-wide text-aman-gold">
          Schritt {index + 1} / {total}
        </span>
        <div className="flex items-center gap-0.5">
          <IconBtn label="Schritt nach oben" onClick={() => onMove(-1)}>
            <ChevronUp size={15} className={index === 0 ? 'opacity-30' : ''} />
          </IconBtn>
          <IconBtn label="Schritt nach unten" onClick={() => onMove(1)}>
            <ChevronDown size={15} className={index === total - 1 ? 'opacity-30' : ''} />
          </IconBtn>
          <IconBtn label="Schritt entfernen" danger onClick={onRemove}>
            <Trash2 size={15} />
          </IconBtn>
        </div>
      </div>

      <TextInput
        label="Titel des Schritts"
        value={step.title}
        onChange={(v) => mutate((s) => (s.title = v))}
      />
      <TextAreaInput
        label="Beschreibung (optional)"
        value={step.description ?? ''}
        onChange={(v) => mutate((s) => (s.description = v || undefined))}
      />
      <Toggle
        label="Nur ein Feld ausfüllbar (mutex)"
        checked={!!step.mutex}
        onChange={(v) => mutate((s) => (s.mutex = v || undefined))}
      />

      <div className="space-y-3 pt-1">
        {step.fields.map((field, fi) => (
          <FieldEditor
            key={field.id}
            field={field}
            index={fi}
            total={step.fields.length}
            mutate={(fn) => mutate((s) => fn(s.fields[fi]))}
            onMove={(dir) => mutate((s) => move(s.fields, fi, fi + dir))}
            onRemove={() => mutate((s) => s.fields.splice(fi, 1))}
          />
        ))}
        <button
          type="button"
          onClick={() => mutate((s) => s.fields.push(newField()))}
          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border border-dashed border-gray-300 text-xs text-gray-500 hover:border-aman-gold hover:text-aman-gold transition-colors"
        >
          <Plus size={13} /> Feld hinzufügen
        </button>
      </div>
    </div>
  )
}

// ─── Top-level editor ─────────────────────────────────────────────────────────

export function FormSchemaEditor({
  schemas,
  labels,
  onChange,
}: {
  schemas: FormSchemasContent
  /** Optional display names per schema key (e.g. the planner card titles). */
  labels?: Record<string, string>
  onChange: (mutator: (draft: FormSchemasContent) => void) => void
}) {
  const keys = Object.keys(schemas)
  const [active, setActive] = useState(keys[0] ?? '')
  // Fall back to the first schema if the active key was removed (card deleted).
  const activeKey = keys.includes(active) ? active : keys[0] ?? ''
  const steps = schemas[activeKey] ?? []
  const labelFor = (key: string) => labels?.[key] ?? key

  // Scope a mutation to the active schema array.
  const mutateSteps = (fn: (steps: Step[]) => void) =>
    onChange((draft) => fn(draft[activeKey]))

  return (
    <div className="max-w-3xl space-y-5">
      {/* Schema selector */}
      <div className="flex flex-wrap gap-2">
        {keys.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setActive(key)}
            className={cn(
              'px-3.5 py-2 rounded-xl text-sm font-medium transition-all border',
              activeKey === key
                ? 'bg-aman-charcoal text-white border-aman-charcoal'
                : 'bg-white text-gray-600 border-gray-200 hover:border-aman-gold',
            )}
          >
            {labelFor(key)}
            <span className="ml-2 text-xs opacity-60">{schemas[key]?.length ?? 0}</span>
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-500 leading-relaxed">
        Bearbeiten Sie die Schritte und Felder des Formulars „{labelFor(activeKey)}“. Änderungen
        werden erst mit „Speichern&nbsp;&amp;&nbsp;Veröffentlichen“ übernommen.
      </p>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, si) => (
          <StepEditor
            key={step.id}
            step={step}
            index={si}
            total={steps.length}
            mutate={(fn) => mutateSteps((arr) => fn(arr[si]))}
            onMove={(dir) => mutateSteps((arr) => move(arr, si, si + dir))}
            onRemove={() => mutateSteps((arr) => arr.splice(si, 1))}
          />
        ))}
        <button
          type="button"
          onClick={() => mutateSteps((arr) => arr.push(newStep()))}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-gray-200 text-sm text-gray-500 hover:border-aman-gold hover:text-aman-gold transition-colors"
        >
          <Plus size={16} /> Schritt hinzufügen
        </button>
      </div>
    </div>
  )
}
