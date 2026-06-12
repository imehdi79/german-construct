'use client'

import type { SiteContent } from '@/lib/content'
import { Field, TextArea, Group, LinkListEditor } from './fields'

export function NavFooterEditor({
  site,
  onChange,
}: {
  site: SiteContent
  onChange: (mutator: (site: SiteContent) => void) => void
}) {
  return (
    <div className="max-w-3xl space-y-6">
      <Group title="Navigation (Kopfzeile)">
        <LinkListEditor
          label="Menüpunkte"
          links={site.nav.items}
          onChange={(m) => onChange((s) => m(s.nav.items))}
        />
        <Field label="Anruf-Button" value={site.nav.callLabel}
          onChange={(v) => onChange((s) => (s.nav.callLabel = v))} />
        <Field label="„Zum Hauptinhalt springen“ (Barrierefreiheit)" value={site.nav.skipToContent}
          onChange={(v) => onChange((s) => (s.nav.skipToContent = v))} />
      </Group>

      <Group title="Fußzeile">
        <TextArea label="Beschreibung (Marken-Spalte)" value={site.footer.description}
          onChange={(v) => onChange((s) => (s.footer.description = v))} />
        <div className="grid sm:grid-cols-3 gap-3">
          <Field label="Titel: Leistungen" value={site.footer.servicesTitle}
            onChange={(v) => onChange((s) => (s.footer.servicesTitle = v))} />
          <Field label="Titel: Unternehmen" value={site.footer.companyTitle}
            onChange={(v) => onChange((s) => (s.footer.companyTitle = v))} />
          <Field label="Titel: Kontakt" value={site.footer.contactTitle}
            onChange={(v) => onChange((s) => (s.footer.contactTitle = v))} />
        </div>
        <Field label="Copyright-Zusatz" value={site.footer.copyrightSuffix}
          onChange={(v) => onChange((s) => (s.footer.copyrightSuffix = v))} />
      </Group>

      <Group title="Fußzeile – Links: Leistungen">
        <LinkListEditor label="" links={site.footer.serviceLinks}
          onChange={(m) => onChange((s) => m(s.footer.serviceLinks))} />
      </Group>

      <Group title="Fußzeile – Links: Unternehmen">
        <LinkListEditor label="" links={site.footer.companyLinks}
          onChange={(m) => onChange((s) => m(s.footer.companyLinks))} />
      </Group>

      <Group title="Fußzeile – Rechtliche Links">
        <LinkListEditor label="" links={site.footer.legalLinks}
          onChange={(m) => onChange((s) => m(s.footer.legalLinks))} />
      </Group>
    </div>
  )
}
