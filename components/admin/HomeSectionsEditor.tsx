'use client'

import { Trash2, Plus } from 'lucide-react'
import type { SiteContent } from '@/lib/content'
import { DEFAULT_CONTENT_ICON } from '@/lib/icons'
import {
  Field,
  TextArea,
  ListField,
  Group,
  ContentIconPicker,
  OptionListEditor,
} from './fields'
import { ImageUpload } from './ImageUpload'

export function HomeSectionsEditor({
  site,
  onChange,
}: {
  site: SiteContent
  onChange: (mutator: (site: SiteContent) => void) => void
}) {
  const sec = site.sections

  return (
    <div className="max-w-3xl space-y-6">
      <Group title="Hero – Bild, Buttons & Hinweise">
        <ImageUpload label="Hintergrundbild" value={site.hero.image}
          onChange={(v) => onChange((s) => (s.hero.image = v))} />
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Button 1 (primär)" value={site.hero.ctaPrimary}
            onChange={(v) => onChange((s) => (s.hero.ctaPrimary = v))} />
          <Field label="Button 2 (sekundär)" value={site.hero.ctaSecondary}
            onChange={(v) => onChange((s) => (s.hero.ctaSecondary = v))} />
        </div>
        <Field label="Scroll-Hinweis" value={site.hero.scrollLabel}
          onChange={(v) => onChange((s) => (s.hero.scrollLabel = v))} />
        <ListField label="Vertrauens-Hinweise" value={site.hero.trustIndicators}
          onChange={(v) => onChange((s) => (s.hero.trustIndicators = v))} />
      </Group>

      <Group title="Abschnitt „Warum AMAN“">
        <Field label="Eyebrow" value={sec.warumAman.eyebrow}
          onChange={(v) => onChange((s) => (s.sections.warumAman.eyebrow = v))} />
        <Field label="Titel" value={sec.warumAman.title}
          onChange={(v) => onChange((s) => (s.sections.warumAman.title = v))} />
        <TextArea label="Untertitel" value={sec.warumAman.subtitle}
          onChange={(v) => onChange((s) => (s.sections.warumAman.subtitle = v))} />
        <ImageUpload label="Bild (Handwerker)" value={sec.warumAman.image}
          onChange={(v) => onChange((s) => (s.sections.warumAman.image = v))} />
        <Field label="Bild-Alternativtext" value={sec.warumAman.imageAlt}
          onChange={(v) => onChange((s) => (s.sections.warumAman.imageAlt = v))} />

        <p className="text-xs font-medium text-gray-600 pt-2">Gründe</p>
        {sec.warumAman.reasons.map((reason, i) => (
          <div key={i} className="relative rounded-xl border border-gray-200 p-4 space-y-2">
            <button
              onClick={() => onChange((s) => s.sections.warumAman.reasons.splice(i, 1))}
              className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Grund entfernen"
            >
              <Trash2 size={14} />
            </button>
            <Field label="Titel" value={reason.title}
              onChange={(v) => onChange((s) => (s.sections.warumAman.reasons[i].title = v))} />
            <TextArea label="Beschreibung" rows={2} value={reason.description}
              onChange={(v) => onChange((s) => (s.sections.warumAman.reasons[i].description = v))} />
            <ContentIconPicker value={reason.icon}
              onChange={(name) => onChange((s) => (s.sections.warumAman.reasons[i].icon = name))} />
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange((s) => s.sections.warumAman.reasons.push({
            icon: DEFAULT_CONTENT_ICON, title: 'Neuer Grund', description: '',
          }))}
          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border border-dashed border-gray-300 text-xs text-gray-500 hover:border-aman-gold hover:text-aman-gold transition-colors"
        >
          <Plus size={13} /> Grund hinzufügen
        </button>
      </Group>

      <Group title="Abschnitt „Leistungen“ (Startseite)">
        <Field label="Eyebrow" value={sec.leistungenIntro.eyebrow}
          onChange={(v) => onChange((s) => (s.sections.leistungenIntro.eyebrow = v))} />
        <Field label="Titel" value={sec.leistungenIntro.title}
          onChange={(v) => onChange((s) => (s.sections.leistungenIntro.title = v))} />
        <TextArea label="Untertitel" value={sec.leistungenIntro.subtitle}
          onChange={(v) => onChange((s) => (s.sections.leistungenIntro.subtitle = v))} />
        <Field label="Button" value={sec.leistungenIntro.ctaLabel}
          onChange={(v) => onChange((s) => (s.sections.leistungenIntro.ctaLabel = v))} />
      </Group>

      <Group title="Abschnitt „Galerie“ (Startseite)">
        <Field label="Eyebrow" value={sec.galerieIntro.eyebrow}
          onChange={(v) => onChange((s) => (s.sections.galerieIntro.eyebrow = v))} />
        <Field label="Titel" value={sec.galerieIntro.title}
          onChange={(v) => onChange((s) => (s.sections.galerieIntro.title = v))} />
        <TextArea label="Untertitel" value={sec.galerieIntro.subtitle}
          onChange={(v) => onChange((s) => (s.sections.galerieIntro.subtitle = v))} />
        <Field label="Button" value={sec.galerieIntro.ctaLabel}
          onChange={(v) => onChange((s) => (s.sections.galerieIntro.ctaLabel = v))} />
        <OptionListEditor label="Galerie-Kategorien (Filter)" options={sec.galleryCategories}
          onChange={(m) => onChange((s) => m(s.sections.galleryCategories))} />
      </Group>

      <Group title="Abschnitt „Statistik“">
        <Field label="Eyebrow" value={sec.statistik.eyebrow}
          onChange={(v) => onChange((s) => (s.sections.statistik.eyebrow = v))} />
        <Field label="Titel" value={sec.statistik.title}
          onChange={(v) => onChange((s) => (s.sections.statistik.title = v))} />
      </Group>

      <Group title="Abschnitt „Kundenstimmen“ – Überschriften & Kennzahlen">
        <Field label="Eyebrow" value={sec.testimonials.eyebrow}
          onChange={(v) => onChange((s) => (s.sections.testimonials.eyebrow = v))} />
        <Field label="Titel" value={sec.testimonials.title}
          onChange={(v) => onChange((s) => (s.sections.testimonials.title = v))} />
        <TextArea label="Untertitel" value={sec.testimonials.subtitle}
          onChange={(v) => onChange((s) => (s.sections.testimonials.subtitle = v))} />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Field label="Wert 1" value={sec.testimonials.summary.ratingValue}
            onChange={(v) => onChange((s) => (s.sections.testimonials.summary.ratingValue = v))} />
          <Field label="Label 1" value={sec.testimonials.summary.ratingLabel}
            onChange={(v) => onChange((s) => (s.sections.testimonials.summary.ratingLabel = v))} />
          <Field label="Wert 2" value={sec.testimonials.summary.recommendValue}
            onChange={(v) => onChange((s) => (s.sections.testimonials.summary.recommendValue = v))} />
          <Field label="Label 2" value={sec.testimonials.summary.recommendLabel}
            onChange={(v) => onChange((s) => (s.sections.testimonials.summary.recommendLabel = v))} />
          <Field label="Wert 3" value={sec.testimonials.summary.countValue}
            onChange={(v) => onChange((s) => (s.sections.testimonials.summary.countValue = v))} />
          <Field label="Label 3" value={sec.testimonials.summary.countLabel}
            onChange={(v) => onChange((s) => (s.sections.testimonials.summary.countLabel = v))} />
        </div>
      </Group>

      <Group title="Abschnitt „Projektplaner“ – Texte">
        <Field label="Eyebrow" value={sec.projektplaner.eyebrow}
          onChange={(v) => onChange((s) => (s.sections.projektplaner.eyebrow = v))} />
        <Field label="Titel" value={sec.projektplaner.title}
          onChange={(v) => onChange((s) => (s.sections.projektplaner.title = v))} />
        <TextArea label="Untertitel" value={sec.projektplaner.subtitle}
          onChange={(v) => onChange((s) => (s.sections.projektplaner.subtitle = v))} />
        <Field label="Platzhalter-Titel" value={sec.projektplaner.emptyTitle}
          onChange={(v) => onChange((s) => (s.sections.projektplaner.emptyTitle = v))} />
        <TextArea label="Platzhalter-Text" rows={2} value={sec.projektplaner.emptySubtitle}
          onChange={(v) => onChange((s) => (s.sections.projektplaner.emptySubtitle = v))} />
        <ListField label="Vorteile (Platzhalter)" value={sec.projektplaner.benefits}
          onChange={(v) => onChange((s) => (s.sections.projektplaner.benefits = v))} />
      </Group>

      <Group title="Abschnitt „Kontakt-Aufruf“ (CTA)">
        <Field label="Eyebrow" value={sec.kontaktCta.eyebrow}
          onChange={(v) => onChange((s) => (s.sections.kontaktCta.eyebrow = v))} />
        <Field label="Titel (Zeile 1)" value={sec.kontaktCta.titleLine1}
          onChange={(v) => onChange((s) => (s.sections.kontaktCta.titleLine1 = v))} />
        <Field label="Titel (Akzent)" value={sec.kontaktCta.titleAccent}
          onChange={(v) => onChange((s) => (s.sections.kontaktCta.titleAccent = v))} />
        <TextArea label="Untertitel" value={sec.kontaktCta.subtitle}
          onChange={(v) => onChange((s) => (s.sections.kontaktCta.subtitle = v))} />
        <Field label="Button" value={sec.kontaktCta.ctaLabel}
          onChange={(v) => onChange((s) => (s.sections.kontaktCta.ctaLabel = v))} />
      </Group>
    </div>
  )
}
