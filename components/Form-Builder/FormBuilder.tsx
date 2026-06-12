'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, X, Upload, Check, FileText } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { Field, Step, FieldValue, FormValues } from './types'

export interface FormBuilderResult {
  success: boolean
  message: string
}

interface FormBuilderProps {
  /** The multi-step schema to render. */
  schema: Step[]
  /** Heading shown in the panel header (e.g. the selected project type). */
  title?: string
  /** Receives the collected values once the user submits the final step. */
  onSubmit: (values: FormValues) => Promise<FormBuilderResult>
  /** Called when the user closes the form via the header ✕. */
  onClose?: () => void
}

// ─── Value helpers ────────────────────────────────────────────────────────────

const isEmpty = (v: FieldValue | undefined): boolean =>
  v == null || (Array.isArray(v) ? v.length === 0 : v.trim() === '')

const emptyFor = (field: Field): FieldValue =>
  field.type === 'checkbox' || field.type === 'dropzone' ? [] : ''

function buildInitialValues(schema: Step[]): FormValues {
  const values: FormValues = {}
  for (const step of schema) {
    for (const field of step.fields) {
      if (field.type === 'label') continue
      values[field.id] = emptyFor(field)
    }
  }
  return values
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validateField(field: Field, value: FieldValue | undefined): string | undefined {
  if (field.required && isEmpty(value)) {
    switch (field.type) {
      case 'checkbox':
        return 'Bitte wählen Sie mindestens eine Option.'
      case 'radio':
      case 'select':
        return 'Bitte treffen Sie eine Auswahl.'
      case 'date':
        return 'Bitte wählen Sie ein Datum.'
      default:
        return 'Dieses Feld ist erforderlich.'
    }
  }

  const rules = field.validation
  if (!rules || isEmpty(value)) return undefined

  if ((field.type === 'text' || field.type === 'textarea') && typeof value === 'string') {
    if (rules.min != null && value.trim().length < rules.min)
      return `Bitte mindestens ${rules.min} Zeichen eingeben.`
    if (rules.max != null && value.length > rules.max)
      return `Bitte höchstens ${rules.max} Zeichen eingeben.`
    if (rules.pattern) {
      try {
        if (!new RegExp(rules.pattern).test(value))
          return rules.patternMessage ?? 'Ungültige Eingabe.'
      } catch {
        /* invalid regex in schema — skip rather than crash */
      }
    }
  }

  if (field.type === 'checkbox' && Array.isArray(value)) {
    if (rules.min != null && value.length < rules.min)
      return `Bitte wählen Sie mindestens ${rules.min} Optionen.`
    if (rules.max != null && value.length > rules.max)
      return `Bitte wählen Sie höchstens ${rules.max} Optionen.`
  }

  return undefined
}

function validateStep(step: Step, values: FormValues): Record<string, string> {
  const errors: Record<string, string> = {}
  const inputs = step.fields.filter((f) => f.type !== 'label')

  // mutex: the user fills exactly one of the fields (e.g. timeframe OR a date).
  if (step.mutex) {
    const anyRequired = inputs.some((f) => f.required)
    const anyFilled = inputs.some((f) => !isEmpty(values[f.id]))
    if (anyRequired && !anyFilled && inputs[0]) {
      errors[inputs[0].id] = 'Bitte treffen Sie eine Auswahl oder wählen Sie ein Datum.'
    }
    for (const f of inputs) {
      if (!isEmpty(values[f.id])) {
        const error = validateField({ ...f, required: false }, values[f.id])
        if (error) errors[f.id] = error
      }
    }
    return errors
  }

  for (const f of inputs) {
    const error = validateField(f, values[f.id])
    if (error) errors[f.id] = error
  }
  return errors
}

// ─── Field controls ─────────────────────────────────────────────────────────

const optionCardClass = (selected: boolean) =>
  cn(
    'flex items-center gap-3 rounded-lg border px-4 py-3 text-sm cursor-pointer transition-all duration-200',
    selected
      ? 'border-aman-gold bg-aman-gold/5 text-aman-charcoal'
      : 'border-aman-border bg-white text-aman-text hover:border-aman-stone-200',
  )

const indicatorClass = (selected: boolean, round: boolean) =>
  cn(
    'flex h-5 w-5 shrink-0 items-center justify-center border transition-colors',
    round ? 'rounded-full' : 'rounded',
    selected ? 'border-aman-gold bg-aman-gold text-white' : 'border-aman-stone-200 bg-white',
  )

const controlClass = (error?: boolean) =>
  cn(
    'w-full rounded-lg border bg-white px-4 py-3 text-sm text-aman-text',
    'placeholder-aman-text-light transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-aman-gold focus:border-aman-gold',
    'hover:border-aman-stone-200',
    error ? 'border-red-400 focus:ring-red-400' : 'border-aman-border',
  )

interface ControlProps {
  field: Field
  value: FieldValue
  note: string
  error?: string
  onChange: (value: FieldValue) => void
  onNoteChange: (note: string) => void
}

function FieldControl({ field, value, note, error, onChange, onNoteChange }: ControlProps) {
  const noteActive =
    field.options?.some(
      (o) =>
        o.hasNote &&
        (Array.isArray(value) ? value.includes(o.value) : value === o.value),
    ) ?? false

  const noteInput = noteActive ? (
    <input
      type="text"
      value={note}
      onChange={(e) => onNoteChange(e.target.value)}
      placeholder="Bitte näher beschreiben…"
      className={cn(controlClass(), 'mt-2')}
      aria-label="Zusätzliche Angabe"
    />
  ) : null

  switch (field.type) {
    case 'radio':
      return (
        <div className="flex flex-col gap-2">
          {field.options?.map((opt) => {
            const selected = value === opt.value
            return (
              <label key={opt.value} className={optionCardClass(selected)}>
                <input
                  type="radio"
                  name={field.id}
                  value={opt.value}
                  checked={selected}
                  onChange={() => onChange(opt.value)}
                  className="sr-only"
                />
                <span className={indicatorClass(selected, true)} aria-hidden="true">
                  {selected && <span className="h-2 w-2 rounded-full bg-white" />}
                </span>
                <span>{opt.label}</span>
              </label>
            )
          })}
          {noteInput}
        </div>
      )

    case 'checkbox': {
      const arr = Array.isArray(value) ? value : []
      return (
        <div className="flex flex-col gap-2">
          {field.options?.map((opt) => {
            const selected = arr.includes(opt.value)
            return (
              <label key={opt.value} className={optionCardClass(selected)}>
                <input
                  type="checkbox"
                  value={opt.value}
                  checked={selected}
                  onChange={() =>
                    onChange(
                      selected
                        ? arr.filter((v) => v !== opt.value)
                        : [...arr, opt.value],
                    )
                  }
                  className="sr-only"
                />
                <span className={indicatorClass(selected, false)} aria-hidden="true">
                  {selected && <Check size={13} strokeWidth={3} />}
                </span>
                <span>{opt.label}</span>
              </label>
            )
          })}
          {noteInput}
        </div>
      )
    }

    case 'select':
      return (
        <select
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(e.target.value)}
          className={cn(controlClass(!!error), 'appearance-none')}
          aria-invalid={!!error}
        >
          <option value="" disabled>
            Bitte wählen…
          </option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )

    case 'textarea':
      return (
        <textarea
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          placeholder={field.description}
          className={cn(controlClass(!!error), 'min-h-[120px] resize-y')}
          aria-invalid={!!error}
        />
      )

    case 'date':
      return (
        <input
          type="date"
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(e.target.value)}
          className={controlClass(!!error)}
          aria-invalid={!!error}
        />
      )

    case 'dropzone': {
      const files = Array.isArray(value) ? value : []
      const addFiles = (list: FileList | null) => {
        if (!list) return
        const names = Array.from(list).map((f) => f.name)
        onChange([...files, ...names.filter((n) => !files.includes(n))])
      }
      return (
        <div className="flex flex-col gap-3">
          <label
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              addFiles(e.dataTransfer.files)
            }}
            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-aman-border bg-aman-cream/40 px-4 py-8 text-center transition-colors hover:border-aman-gold"
          >
            <Upload size={22} className="text-aman-stone-400" />
            <span className="text-sm text-aman-text-muted">
              Dateien auswählen oder hierher ziehen
            </span>
            <input
              type="file"
              multiple
              accept={field.accept}
              onChange={(e) => addFiles(e.target.files)}
              className="sr-only"
            />
          </label>
          {files.length > 0 && (
            <ul className="flex flex-col gap-1.5">
              {files.map((name) => (
                <li
                  key={name}
                  className="flex items-center justify-between gap-2 rounded-md border border-aman-border bg-white px-3 py-2 text-xs text-aman-text"
                >
                  <span className="flex items-center gap-2 truncate">
                    <FileText size={14} className="shrink-0 text-aman-stone-400" />
                    <span className="truncate">{name}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => onChange(files.filter((f) => f !== name))}
                    className="shrink-0 text-aman-text-muted hover:text-red-500"
                    aria-label={`${name} entfernen`}
                  >
                    <X size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )
    }

    case 'text':
    default:
      return (
        <input
          type="text"
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.description}
          className={controlClass(!!error)}
          aria-invalid={!!error}
        />
      )
  }
}

// ─── Wizard shell ─────────────────────────────────────────────────────────────

export function FormBuilder({ schema, title, onSubmit, onClose }: FormBuilderProps) {
  const steps = useMemo(() => schema.filter((s) => !s.disabled), [schema])

  const [values, setValues] = useState<FormValues>(() => buildInitialValues(schema))
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [stepIndex, setStepIndex] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [consent, setConsent] = useState(false)
  const [consentError, setConsentError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [result, setResult] = useState<FormBuilderResult | null>(null)

  const step = steps[stepIndex]
  const isLast = stepIndex === steps.length - 1
  const progress = steps.length > 0 ? ((stepIndex + 1) / steps.length) * 100 : 0

  const setFieldValue = (fieldId: string, value: FieldValue) => {
    setValues((prev) => {
      const next = { ...prev, [fieldId]: value }
      // mutex: filling one field clears its siblings within the step.
      if (step?.mutex) {
        for (const f of step.fields) {
          if (f.id !== fieldId && f.type !== 'label') next[f.id] = emptyFor(f)
        }
      }
      return next
    })
    setErrors((prev) => {
      if (!prev[fieldId]) return prev
      const { [fieldId]: _removed, ...rest } = prev
      return rest
    })
  }

  const goNext = () => {
    if (!step) return
    const stepErrors = validateStep(step, values)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }
    setErrors({})
    setStepIndex((i) => Math.min(i + 1, steps.length - 1))
  }

  const goBack = () => {
    setErrors({})
    setSubmitError('')
    setStepIndex((i) => Math.max(i - 1, 0))
  }

  const handleSubmit = async () => {
    if (!step) return
    const stepErrors = validateStep(step, values)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }
    if (!consent) {
      setConsentError(true)
      return
    }

    setSubmitting(true)
    setSubmitError('')

    // Merge free-text notes into the payload under a readable key.
    const payload: FormValues = { ...values }
    for (const [fieldId, note] of Object.entries(notes)) {
      if (note.trim()) payload[`${fieldId} (Anmerkung)`] = note.trim()
    }

    try {
      const res = await onSubmit(payload)
      if (res.success) setResult(res)
      else setSubmitError(res.message)
    } catch {
      setSubmitError('Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Success ────────────────────────────────────────────────────────────────
  if (result) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-green-200 bg-green-50 p-12 text-center"
      >
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Check size={32} className="text-green-600" />
        </div>
        <h3 className="mb-3 font-serif text-xl text-aman-charcoal">Anfrage gesendet!</h3>
        <p className="mb-6 text-aman-text-muted">{result.message}</p>
        {onClose && (
          <Button variant="secondary" size="sm" onClick={onClose}>
            Schließen
          </Button>
        )}
      </motion.div>
    )
  }

  if (!step) return null

  return (
    <div className="rounded-2xl border border-aman-border bg-white p-6 shadow-card md:p-8">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          {title && (
            <p className="text-xs font-medium uppercase tracking-wider text-aman-gold">
              {title}
            </p>
          )}
          <h3 className="mt-1 font-serif text-lg text-aman-charcoal">{step.title}</h3>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 p-1 text-aman-text-muted transition-colors hover:text-aman-charcoal"
            aria-label="Formular schließen"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="mb-1.5 flex items-center justify-between text-xs text-aman-text-muted">
          <span>
            Schritt {stepIndex + 1} von {steps.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-aman-cream">
          <motion.div
            className="h-full rounded-full bg-aman-gold"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      {/* Step body */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-5"
        >
          {step.description && (
            <p className="text-sm text-aman-text-muted">{step.description}</p>
          )}

          {step.fields.map((field) => {
            if (field.type === 'label') {
              return field.variant === 'subtitle' ? (
                <p key={field.id} className="-mt-2 text-xs leading-relaxed text-aman-text-muted">
                  {field.label}
                </p>
              ) : (
                <p key={field.id} className="text-sm font-medium text-aman-charcoal">
                  {field.label}
                </p>
              )
            }

            const error = errors[field.id]
            return (
              <div key={field.id} className="flex flex-col gap-2">
                {field.label && (
                  <label className="text-sm font-medium text-aman-text">
                    {field.label}
                    {field.required && (
                      <span className="ml-1 text-aman-gold" aria-hidden="true">
                        *
                      </span>
                    )}
                  </label>
                )}
                {field.description && field.type !== 'textarea' && field.type !== 'text' && (
                  <p className="-mt-1 text-xs text-aman-text-light">{field.description}</p>
                )}
                <FieldControl
                  field={field}
                  value={values[field.id] ?? emptyFor(field)}
                  note={notes[field.id] ?? ''}
                  error={error}
                  onChange={(v) => setFieldValue(field.id, v)}
                  onNoteChange={(n) => setNotes((prev) => ({ ...prev, [field.id]: n }))}
                />
                {error && (
                  <p className="flex items-center gap-1 text-xs text-red-500" role="alert">
                    <span aria-hidden="true">⚠</span> {error}
                  </p>
                )}
              </div>
            )
          })}
        </motion.div>
      </AnimatePresence>

      {/* Consent (final step only) */}
      {isLast && (
        <div className="mt-6 border-t border-aman-border pt-5">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked)
                if (e.target.checked) setConsentError(false)
              }}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-aman-border accent-aman-gold"
            />
            <span className="text-sm leading-relaxed text-aman-text-muted">
              Ich habe die{' '}
              <Link href="/datenschutz" target="_blank" className="text-aman-gold underline">
                Datenschutzerklärung
              </Link>{' '}
              gelesen und bin mit der Verarbeitung meiner Daten einverstanden.{' '}
              <span className="text-aman-gold">*</span>
            </span>
          </label>
          {consentError && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500" role="alert">
              <span aria-hidden="true">⚠</span> Bitte stimmen Sie der Datenschutzerklärung zu.
            </p>
          )}
        </div>
      )}

      {submitError && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-500" role="alert">
          {submitError}
        </p>
      )}

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between gap-4">
        {stepIndex > 0 ? (
          <Button
            variant="outline"
            size="md"
            onClick={goBack}
            icon={<ArrowLeft size={16} />}
            disabled={submitting}
          >
            Zurück
          </Button>
        ) : (
          <span />
        )}

        {isLast ? (
          <Button
            variant="gold"
            size="md"
            onClick={handleSubmit}
            loading={submitting}
            icon={<ArrowRight size={16} />}
          >
            {submitting ? 'Wird gesendet…' : 'Kostenlos anfragen'}
          </Button>
        ) : (
          <Button variant="gold" size="md" onClick={goNext} icon={<ArrowRight size={16} />}>
            Weiter
          </Button>
        )}
      </div>
    </div>
  )
}
