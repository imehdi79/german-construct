'use client'

import type { Testimonial } from '@/types'
import { Field, TextArea, Card, AddButton } from './fields'

function newTestimonial(): Testimonial {
  return {
    id: `bewertung-${Date.now()}`,
    name: 'Neuer Kunde',
    location: '',
    rating: 5,
    text: '',
    project: '',
    date: new Date().toISOString().slice(0, 7),
  }
}

export function TestimonialsEditor({
  testimonials,
  onChange,
}: {
  testimonials: Testimonial[]
  onChange: (mutator: (list: Testimonial[]) => void) => void
}) {
  return (
    <div className="max-w-3xl space-y-4">
      {testimonials.map((t, i) => (
        <Card key={t.id} onRemove={() => onChange((l) => l.splice(i, 1))}>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Name" value={t.name}
              onChange={(v) => onChange((l) => (l[i].name = v))} />
            <Field label="Ort" value={t.location}
              onChange={(v) => onChange((l) => (l[i].location = v))} />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Bewertung (1–5)" type="number" value={String(t.rating)}
              onChange={(v) => onChange((l) => (l[i].rating = Math.max(1, Math.min(5, Number(v) || 5))))} />
            <Field label="Projekt" value={t.project}
              onChange={(v) => onChange((l) => (l[i].project = v))} />
          </div>
          <Field label="Datum (JJJJ-MM)" value={t.date}
            onChange={(v) => onChange((l) => (l[i].date = v))} />
          <TextArea label="Bewertungstext" rows={4} value={t.text}
            onChange={(v) => onChange((l) => (l[i].text = v))} />
        </Card>
      ))}
      <AddButton label="Bewertung hinzufügen" onClick={() => onChange((l) => l.push(newTestimonial()))} />
    </div>
  )
}
