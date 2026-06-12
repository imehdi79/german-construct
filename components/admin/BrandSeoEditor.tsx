'use client'

import type { SiteContent } from '@/lib/content'
import { Field, TextArea, ListField, Group } from './fields'

const PAGE_LABELS: Record<string, string> = {
  home: 'Startseite',
  projektplaner: 'Projektplaner',
  leistungen: 'Leistungen',
  galerie: 'Galerie',
  kontakt: 'Kontakt',
  stellenangebote: 'Stellenangebote',
}

export function BrandSeoEditor({
  site,
  onChange,
}: {
  site: SiteContent
  onChange: (mutator: (site: SiteContent) => void) => void
}) {
  return (
    <div className="max-w-3xl space-y-6">
      <Group title="Marke">
        <Field label="Firmenname" value={site.brand.name}
          onChange={(v) => onChange((s) => (s.brand.name = v))} />
        <Field label="Kurzname" value={site.brand.shortName}
          onChange={(v) => onChange((s) => (s.brand.shortName = v))} />
        <Field label="Slogan (Tagline)" value={site.brand.tagline}
          onChange={(v) => onChange((s) => (s.brand.tagline = v))} />
        <TextArea label="Beschreibung (SEO-Standard)" value={site.brand.description}
          onChange={(v) => onChange((s) => (s.brand.description = v))} />
      </Group>

      <Group title="SEO – Schlüsselwörter">
        <ListField label="Keywords" value={site.seo.keywords}
          onChange={(v) => onChange((s) => (s.seo.keywords = v))} />
      </Group>

      <Group title="SEO – Seitentitel & Beschreibungen">
        {Object.keys(site.seo.perPage).map((key) => (
          <div key={key} className="pb-3 border-b border-gray-100 last:border-0 space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              {PAGE_LABELS[key] ?? key}
            </p>
            <Field
              label="Meta-Titel (leer = Standard)"
              value={site.seo.perPage[key].title}
              onChange={(v) => onChange((s) => (s.seo.perPage[key].title = v))}
            />
            <TextArea
              label="Meta-Beschreibung"
              rows={2}
              value={site.seo.perPage[key].description}
              onChange={(v) => onChange((s) => (s.seo.perPage[key].description = v))}
            />
          </div>
        ))}
      </Group>
    </div>
  )
}
