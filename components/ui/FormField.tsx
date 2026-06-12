'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

// ─── Input ────────────────────────────────────────────────────────────────────

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
}

export const FormInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, required, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-aman-text"
        >
          {label}
          {required && (
            <span className="text-aman-gold ml-1" aria-hidden="true">*</span>
          )}
        </label>

        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={cn(
            'w-full px-4 py-3 rounded-lg text-sm',
            'border border-aman-border bg-white',
            'text-aman-text placeholder-aman-text-light',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-aman-gold focus:border-aman-gold',
            'hover:border-aman-stone-200',
            error && 'border-red-400 focus:ring-red-400',
            className
          )}
          {...props}
        />

        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-aman-text-light">
            {hint}
          </p>
        )}

        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-500 flex items-center gap-1" role="alert">
            <span aria-hidden="true">⚠</span> {error}
          </p>
        )}
      </div>
    )
  }
)
FormInput.displayName = 'FormInput'

// ─── Textarea ─────────────────────────────────────────────────────────────────

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  hint?: string
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, required, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-aman-text"
        >
          {label}
          {required && (
            <span className="text-aman-gold ml-1" aria-hidden="true">*</span>
          )}
        </label>

        <textarea
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={cn(
            'w-full px-4 py-3 rounded-lg text-sm min-h-[140px] resize-y',
            'border border-aman-border bg-white',
            'text-aman-text placeholder-aman-text-light',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-aman-gold focus:border-aman-gold',
            'hover:border-aman-stone-200',
            error && 'border-red-400 focus:ring-red-400',
            className
          )}
          {...props}
        />

        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-aman-text-light">{hint}</p>
        )}

        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-500 flex items-center gap-1" role="alert">
            <span aria-hidden="true">⚠</span> {error}
          </p>
        )}
      </div>
    )
  }
)
FormTextarea.displayName = 'FormTextarea'

// ─── Select ───────────────────────────────────────────────────────────────────

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

export const FormSelect = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, id, required, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-aman-text"
        >
          {label}
          {required && (
            <span className="text-aman-gold ml-1" aria-hidden="true">*</span>
          )}
        </label>

        <select
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={!!error}
          className={cn(
            'w-full px-4 py-3 rounded-lg text-sm',
            'border border-aman-border bg-white',
            'text-aman-text',
            'transition-all duration-200 appearance-none',
            'focus:outline-none focus:ring-2 focus:ring-aman-gold focus:border-aman-gold',
            error && 'border-red-400',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {error && (
          <p className="text-xs text-red-500 flex items-center gap-1" role="alert">
            <span aria-hidden="true">⚠</span> {error}
          </p>
        )}
      </div>
    )
  }
)
FormSelect.displayName = 'FormSelect'

// ─── Checkbox ─────────────────────────────────────────────────────────────────

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode
  error?: string
}

export const FormCheckbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? `checkbox-${Math.random().toString(36).slice(2)}`

    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-start gap-3">
          <input
            ref={ref}
            type="checkbox"
            id={inputId}
            aria-invalid={!!error}
            className={cn(
              'mt-0.5 h-4 w-4 shrink-0 rounded border-aman-border',
              'text-aman-gold accent-aman-gold',
              'focus:ring-2 focus:ring-aman-gold focus:ring-offset-1',
              error && 'border-red-400',
              className
            )}
            {...props}
          />
          <label
            htmlFor={inputId}
            className="text-sm text-aman-text-muted leading-relaxed cursor-pointer"
          >
            {label}
          </label>
        </div>

        {error && (
          <p className="text-xs text-red-500 flex items-center gap-1 ml-7" role="alert">
            <span aria-hidden="true">⚠</span> {error}
          </p>
        )}
      </div>
    )
  }
)
FormCheckbox.displayName = 'FormCheckbox'
