'use client'

import { Trash2, Plus } from 'lucide-react'
import type { SiteContent } from '@/lib/content'
import { Field, TextArea, Group, OptionListEditor } from './fields'

export function PageTextsEditor({
  site,
  onChange,
}: {
  site: SiteContent
  onChange: (mutator: (site: SiteContent) => void) => void
}) {
  const p = site.pages

  return (
    <div className="max-w-3xl space-y-6">
      <Group title="Seite „Leistungen“">
        <Header
          breadcrumb={p.leistungen.breadcrumb} eyebrow={p.leistungen.eyebrow}
          title={p.leistungen.title} subtitle={p.leistungen.subtitle}
          set={(field, v) => onChange((s) => ((s.pages.leistungen as unknown as Record<string, string>)[field] = v))}
        />
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Präfix Listenpunkt" value={p.leistungen.itemLabelPrefix}
            onChange={(v) => onChange((s) => (s.pages.leistungen.itemLabelPrefix = v))} />
          <Field label="Button pro Leistung" value={p.leistungen.serviceCtaLabel}
            onChange={(v) => onChange((s) => (s.pages.leistungen.serviceCtaLabel = v))} />
        </div>
        <Field label="Abschluss-Titel" value={p.leistungen.bottomTitle}
          onChange={(v) => onChange((s) => (s.pages.leistungen.bottomTitle = v))} />
        <TextArea label="Abschluss-Text" rows={2} value={p.leistungen.bottomSubtitle}
          onChange={(v) => onChange((s) => (s.pages.leistungen.bottomSubtitle = v))} />
        <Field label="Abschluss-Button" value={p.leistungen.bottomCtaLabel}
          onChange={(v) => onChange((s) => (s.pages.leistungen.bottomCtaLabel = v))} />
      </Group>

      <Group title="Seite „Galerie“">
        <Header
          breadcrumb={p.galerie.breadcrumb} eyebrow={p.galerie.eyebrow}
          title={p.galerie.title} subtitle={p.galerie.subtitle}
          set={(field, v) => onChange((s) => ((s.pages.galerie as unknown as Record<string, string>)[field] = v))}
        />
        <Field label="Text bei leerer Kategorie" value={p.galerie.emptyText}
          onChange={(v) => onChange((s) => (s.pages.galerie.emptyText = v))} />
        <Field label="Abschluss-Text" value={p.galerie.ctaText}
          onChange={(v) => onChange((s) => (s.pages.galerie.ctaText = v))} />
        <Field label="Abschluss-Button" value={p.galerie.ctaLabel}
          onChange={(v) => onChange((s) => (s.pages.galerie.ctaLabel = v))} />
      </Group>

      <Group title="Seite „Kontakt“">
        <Header
          breadcrumb={p.kontakt.breadcrumb} eyebrow={p.kontakt.eyebrow}
          title={p.kontakt.title} subtitle={p.kontakt.subtitle}
          set={(field, v) => onChange((s) => ((s.pages.kontakt as unknown as Record<string, string>)[field] = v))}
        />
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Überschrift Formular" value={p.kontakt.formHeading}
            onChange={(v) => onChange((s) => (s.pages.kontakt.formHeading = v))} />
          <Field label="Überschrift Sidebar" value={p.kontakt.sidebarHeading}
            onChange={(v) => onChange((s) => (s.pages.kontakt.sidebarHeading = v))} />
          <Field label="Button absenden" value={p.kontakt.submitLabel}
            onChange={(v) => onChange((s) => (s.pages.kontakt.submitLabel = v))} />
          <Field label="Button (sendet…)" value={p.kontakt.submittingLabel}
            onChange={(v) => onChange((s) => (s.pages.kontakt.submittingLabel = v))} />
          <Field label="Erfolg – Titel" value={p.kontakt.successTitle}
            onChange={(v) => onChange((s) => (s.pages.kontakt.successTitle = v))} />
          <Field label="Erfolg – Button" value={p.kontakt.successButton}
            onChange={(v) => onChange((s) => (s.pages.kontakt.successButton = v))} />
        </div>
        <TextArea label="Erfolg – Text" rows={2} value={p.kontakt.successText}
          onChange={(v) => onChange((s) => (s.pages.kontakt.successText = v))} />
        <Field label="Betreff – Platzhalter" value={p.kontakt.betreffPlaceholder}
          onChange={(v) => onChange((s) => (s.pages.kontakt.betreffPlaceholder = v))} />
        <OptionListEditor label="Betreff – Optionen" options={p.kontakt.betreffOptions}
          onChange={(m) => onChange((s) => m(s.pages.kontakt.betreffOptions))} />
        <Field label="Karten-Link-Beschriftung" value={p.kontakt.mapLinkLabel}
          onChange={(v) => onChange((s) => (s.pages.kontakt.mapLinkLabel = v))} />
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          <Field label="Label Telefon" value={p.kontakt.contactLabels.phone}
            onChange={(v) => onChange((s) => (s.pages.kontakt.contactLabels.phone = v))} />
          <Field label="Label Mobil" value={p.kontakt.contactLabels.mobile}
            onChange={(v) => onChange((s) => (s.pages.kontakt.contactLabels.mobile = v))} />
          <Field label="Label E-Mail" value={p.kontakt.contactLabels.email}
            onChange={(v) => onChange((s) => (s.pages.kontakt.contactLabels.email = v))} />
          <Field label="Label Adresse" value={p.kontakt.contactLabels.address}
            onChange={(v) => onChange((s) => (s.pages.kontakt.contactLabels.address = v))} />
          <Field label="Label Zeiten" value={p.kontakt.contactLabels.hours}
            onChange={(v) => onChange((s) => (s.pages.kontakt.contactLabels.hours = v))} />
        </div>
      </Group>

      <Group title="Seite „Stellenangebote“">
        <Header
          breadcrumb={p.stellenangebote.breadcrumb} eyebrow={p.stellenangebote.eyebrow}
          title={p.stellenangebote.title} subtitle={p.stellenangebote.subtitle}
          set={(field, v) => onChange((s) => ((s.pages.stellenangebote as unknown as Record<string, string>)[field] = v))}
        />
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Button „Bewerben“" value={p.stellenangebote.applyLabel}
            onChange={(v) => onChange((s) => (s.pages.stellenangebote.applyLabel = v))} />
          <Field label="Button „Jetzt bewerben“" value={p.stellenangebote.applyLabelLong}
            onChange={(v) => onChange((s) => (s.pages.stellenangebote.applyLabelLong = v))} />
          <Field label="„Details anzeigen“" value={p.stellenangebote.detailsShow}
            onChange={(v) => onChange((s) => (s.pages.stellenangebote.detailsShow = v))} />
          <Field label="„Weniger anzeigen“" value={p.stellenangebote.detailsHide}
            onChange={(v) => onChange((s) => (s.pages.stellenangebote.detailsHide = v))} />
          <Field label="Titel Anforderungen" value={p.stellenangebote.requirementsTitle}
            onChange={(v) => onChange((s) => (s.pages.stellenangebote.requirementsTitle = v))} />
          <Field label="Titel Wir bieten" value={p.stellenangebote.benefitsTitle}
            onChange={(v) => onChange((s) => (s.pages.stellenangebote.benefitsTitle = v))} />
        </div>
        <Field label="Initiativ – Titel" value={p.stellenangebote.spontaneousTitle}
          onChange={(v) => onChange((s) => (s.pages.stellenangebote.spontaneousTitle = v))} />
        <TextArea label="Initiativ – Text" rows={2} value={p.stellenangebote.spontaneousText}
          onChange={(v) => onChange((s) => (s.pages.stellenangebote.spontaneousText = v))} />
        <Field label="Initiativ – Button" value={p.stellenangebote.spontaneousCtaLabel}
          onChange={(v) => onChange((s) => (s.pages.stellenangebote.spontaneousCtaLabel = v))} />
        <TextArea label="Anschreiben – Platzhalter" rows={2} value={p.stellenangebote.coverLetterPlaceholder}
          onChange={(v) => onChange((s) => (s.pages.stellenangebote.coverLetterPlaceholder = v))} />
        <Field label="Erfolg – Titel" value={p.stellenangebote.successTitle}
          onChange={(v) => onChange((s) => (s.pages.stellenangebote.successTitle = v))} />
        <TextArea label="Erfolg – Text" rows={2} value={p.stellenangebote.successText}
          onChange={(v) => onChange((s) => (s.pages.stellenangebote.successText = v))} />
      </Group>

      <Group title="Seite „Projektplaner“">
        <Header
          breadcrumb={p.projektplaner.breadcrumb} eyebrow={p.projektplaner.eyebrow}
          title={p.projektplaner.title} subtitle={p.projektplaner.subtitle}
          set={(field, v) => onChange((s) => ((s.pages.projektplaner as unknown as Record<string, string>)[field] = v))}
        />
        <p className="text-xs font-medium text-gray-600 pt-1">Info-Leiste</p>
        {p.projektplaner.infoStrip.map((item, i) => (
          <div key={i} className="relative grid grid-cols-1 sm:grid-cols-3 gap-2 rounded-xl border border-gray-200 p-3">
            <button
              onClick={() => onChange((s) => s.pages.projektplaner.infoStrip.splice(i, 1))}
              className="absolute -top-2 -right-2 p-1 bg-white text-gray-400 hover:text-red-500 border border-gray-200 rounded-lg"
              aria-label="Eintrag entfernen"
            >
              <Trash2 size={13} />
            </button>
            <Field label="Wert" value={item.value}
              onChange={(v) => onChange((s) => (s.pages.projektplaner.infoStrip[i].value = v))} />
            <Field label="Label" value={item.label}
              onChange={(v) => onChange((s) => (s.pages.projektplaner.infoStrip[i].label = v))} />
            <Field label="Beschreibung" value={item.description}
              onChange={(v) => onChange((s) => (s.pages.projektplaner.infoStrip[i].description = v))} />
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange((s) => s.pages.projektplaner.infoStrip.push({ value: '', label: '', description: '' }))}
          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border border-dashed border-gray-300 text-xs text-gray-500 hover:border-aman-gold hover:text-aman-gold transition-colors"
        >
          <Plus size={13} /> Eintrag hinzufügen
        </button>
      </Group>
    </div>
  )
}

// Shared header block (breadcrumb / eyebrow / title / subtitle).
function Header({
  breadcrumb,
  eyebrow,
  title,
  subtitle,
  set,
}: {
  breadcrumb: string
  eyebrow: string
  title: string
  subtitle: string
  set: (field: string, value: string) => void
}) {
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Brotkrümel" value={breadcrumb} onChange={(v) => set('breadcrumb', v)} />
        <Field label="Eyebrow" value={eyebrow} onChange={(v) => set('eyebrow', v)} />
      </div>
      <Field label="Titel" value={title} onChange={(v) => set('title', v)} />
      <TextArea label="Untertitel" rows={2} value={subtitle} onChange={(v) => set('subtitle', v)} />
    </>
  )
}
