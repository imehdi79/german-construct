'use client'

import { Upload, X, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Controlled multi-file picker (drag & drop or click). Holds real `File`
 * objects in the parent's state so they can be appended to a FormData submit
 * and attached to the notification email.
 */
export function FileUpload({
  label,
  hint,
  accept = 'image/*,application/pdf',
  files,
  onChange,
}: {
  label?: string
  hint?: string
  accept?: string
  files: File[]
  onChange: (files: File[]) => void
}) {
  const addFiles = (list: FileList | null) => {
    if (!list) return
    const merged = [...files]
    for (const f of Array.from(list)) {
      if (!merged.some((m) => m.name === f.name && m.size === f.size)) merged.push(f)
    }
    onChange(merged)
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-aman-charcoal">{label}</label>
      )}
      <label
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          addFiles(e.dataTransfer.files)
        }}
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-aman-border bg-aman-cream/40 px-4 py-6 text-center transition-colors hover:border-aman-gold"
      >
        <Upload size={20} className="text-aman-stone-400" />
        <span className="text-sm text-aman-text-muted">
          Dateien auswählen oder hierher ziehen
        </span>
        {hint && <span className="text-xs text-aman-text-light">{hint}</span>}
        <input
          type="file"
          multiple
          accept={accept}
          onChange={(e) => addFiles(e.target.files)}
          className="sr-only"
        />
      </label>

      {files.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {files.map((file, idx) => (
            <li
              key={`${file.name}-${idx}`}
              className={cn(
                'flex items-center justify-between gap-2 rounded-md border border-aman-border',
                'bg-white px-3 py-2 text-xs text-aman-text',
              )}
            >
              <span className="flex min-w-0 items-center gap-2">
                <FileText size={14} className="shrink-0 text-aman-stone-400" />
                <span className="truncate">{file.name}</span>
              </span>
              <button
                type="button"
                onClick={() => onChange(files.filter((_, i) => i !== idx))}
                className="shrink-0 text-aman-text-muted hover:text-red-500"
                aria-label={`${file.name} entfernen`}
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
