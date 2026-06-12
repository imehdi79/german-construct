'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard, Globe, Wrench, Briefcase, Images, ClipboardList,
  LayoutGrid, BadgeCheck, Navigation, LayoutTemplate, FileText, Quote,
  Scale, LogOut, Menu, X, ChevronRight, Plus, Trash2, Save,
  CheckCircle2, AlertCircle, AlertTriangle, RotateCcw, ExternalLink,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import {
  logoutAction,
  publishContentAction,
  resetContentAction,
  type ActionResult,
} from '@/actions/admin'
import type { FullContent, FormSchemasContent, SiteContent } from '@/lib/content'
import type { Service, Job, GalleryItem } from '@/types'
import { DEFAULT_PLANNER_ICON } from '@/lib/plannerIcons'
import { FormSchemaEditor } from './FormSchemaEditor'
import { PlannerCardsEditor } from './PlannerCardsEditor'
import { BrandSeoEditor } from './BrandSeoEditor'
import { NavFooterEditor } from './NavFooterEditor'
import { HomeSectionsEditor } from './HomeSectionsEditor'
import { PageTextsEditor } from './PageTextsEditor'
import { TestimonialsEditor } from './TestimonialsEditor'
import { LegalEditor } from './LegalEditor'

type SectionId =
  | 'dashboard' | 'site' | 'brand' | 'navfooter' | 'homesections' | 'pagetexts'
  | 'services' | 'jobs' | 'gallery' | 'testimonials' | 'planner' | 'forms' | 'legal'

const navItems: { id: SectionId; icon: typeof LayoutDashboard; label: string }[] = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Übersicht' },
  { id: 'brand', icon: BadgeCheck, label: 'Marke & SEO' },
  { id: 'site', icon: Globe, label: 'Website-Inhalte' },
  { id: 'navfooter', icon: Navigation, label: 'Navigation & Fußzeile' },
  { id: 'homesections', icon: LayoutTemplate, label: 'Startseite-Abschnitte' },
  { id: 'pagetexts', icon: FileText, label: 'Seitentexte' },
  { id: 'services', icon: Wrench, label: 'Leistungen' },
  { id: 'jobs', icon: Briefcase, label: 'Stellenangebote' },
  { id: 'gallery', icon: Images, label: 'Galerie' },
  { id: 'testimonials', icon: Quote, label: 'Kundenstimmen' },
  { id: 'planner', icon: LayoutGrid, label: 'Projektplaner-Karten' },
  { id: 'forms', icon: ClipboardList, label: 'Projektplaner-Formulare' },
  { id: 'legal', icon: Scale, label: 'Rechtstexte' },
]

// ─── Reusable fields ─────────────────────────────────────────────────────────

function Field({ label, value, onChange, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; type?: string
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-gray-600 mb-1">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-aman-gold/40 focus:border-aman-gold transition-all"
      />
    </label>
  )
}

function TextArea({ label, value, onChange, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-gray-600 mb-1">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-aman-gold/40 focus:border-aman-gold transition-all resize-y"
      />
    </label>
  )
}

function ListField({ label, value, onChange }: {
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

function Card({ children, onRemove }: { children: React.ReactNode; onRemove?: () => void }) {
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

// ─── Main ────────────────────────────────────────────────────────────────────

export function AdminDashboard({ initialContent }: { initialContent: FullContent }) {
  const [content, setContent] = useState<FullContent>(initialContent)
  const [section, setSection] = useState<SectionId>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [result, setResult] = useState<ActionResult | null>(null)
  const [publishing, startPublish] = useTransition()
  const [resetting, startReset] = useTransition()

  // generic immutable updater
  const update = (fn: (draft: FullContent) => FullContent) => {
    setContent((c) => fn(structuredClone(c)))
    setDirty(true)
    setResult(null)
  }

  // Scoped updater for the site-content tree (used by the copy editors).
  const editSite = (mutator: (site: SiteContent) => void) =>
    update((d) => {
      mutator(d.site)
      return d
    })

  const publish = () => {
    startPublish(async () => {
      const res = await publishContentAction(content)
      setResult(res)
      if (res.success) setDirty(false)
    })
  }

  // Hard reset: restore the original default content and refresh the editor state.
  const reset = () => {
    startReset(async () => {
      const res = await resetContentAction()
      setResult(res)
      if (res.success && res.content) {
        setContent(res.content)
        setDirty(false)
      }
    })
  }

  // Add a planner card together with its (empty) form schema, keyed by the same id.
  const addPlannerCard = () =>
    update((d) => {
      const id = `karte-${Date.now()}`
      d.plannerCards.push({
        id,
        title: 'Neue Karte',
        description: 'Kurze Beschreibung dieses Projekttyps.',
        icon: DEFAULT_PLANNER_ICON,
      })
      d.formSchemas[id] = newSchema()
      return d
    })

  // Remove a planner card and its matching form schema.
  const removePlannerCard = (i: number) =>
    update((d) => {
      const [removed] = d.plannerCards.splice(i, 1)
      if (removed) delete d.formSchemas[removed.id]
      return d
    })

  const { site, services, jobs, gallery, plannerCards } = content

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-aman-charcoal flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        aria-label="Navigationsmenü"
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
          <div>
            <p className="text-white text-sm font-semibold leading-tight">{siteConfig.shortName} Admin</p>
            <p className="text-white/40 text-xs">Content-Verwaltung</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/50 hover:text-white transition-colors"
            aria-label="Menü schließen"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3" aria-label="Admin Navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setSection(item.id); setSidebarOpen(false) }}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all mb-1',
                section === item.id
                  ? 'bg-aman-gold/20 text-aman-gold font-medium'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              )}
            >
              <item.icon size={17} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 text-white/50 hover:text-red-400 text-xs py-2 rounded-lg hover:bg-white/5 transition-all"
            >
              <LogOut size={14} />
              Abmelden
            </button>
          </form>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar with global Save & Publish */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 shrink-0 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Menü öffnen"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-base font-semibold text-gray-800 truncate">
              {navItems.find((n) => n.id === section)?.label}
            </h1>
            {dirty && (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                Ungespeicherte Änderungen
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 hover:text-aman-gold transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-50"
            >
              Website ansehen <ExternalLink size={12} />
            </Link>
            <button
              onClick={publish}
              disabled={publishing || !dirty}
              className="flex items-center gap-2 bg-aman-gold hover:bg-aman-gold-dark text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {publishing ? (
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save size={15} />
              )}
              {publishing ? 'Veröffentlichen…' : 'Speichern & Veröffentlichen'}
            </button>
          </div>
        </header>

        {/* Result banner */}
        {result && (
          <div
            className={cn(
              'flex items-center gap-2 px-4 md:px-6 py-3 text-sm border-b',
              result.success
                ? 'bg-green-50 text-green-700 border-green-100'
                : 'bg-red-50 text-red-700 border-red-100'
            )}
            role="status"
          >
            {result.success ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {result.message}
          </div>
        )}

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {section === 'dashboard' && (
            <Dashboard
              content={content}
              onGo={setSection}
              dirty={dirty}
              onReset={reset}
              resetting={resetting}
            />
          )}

          {section === 'brand' && (
            <BrandSeoEditor site={site} onChange={editSite} />
          )}

          {section === 'navfooter' && (
            <NavFooterEditor site={site} onChange={editSite} />
          )}

          {section === 'homesections' && (
            <HomeSectionsEditor site={site} onChange={editSite} />
          )}

          {section === 'pagetexts' && (
            <PageTextsEditor site={site} onChange={editSite} />
          )}

          {section === 'testimonials' && (
            <TestimonialsEditor
              testimonials={content.testimonials}
              onChange={(m) => update((d) => { m(d.testimonials); return d })}
            />
          )}

          {section === 'legal' && (
            <LegalEditor
              legal={content.legal}
              onChange={(m) => update((d) => { m(d.legal); return d })}
            />
          )}

          {section === 'site' && (
            <div className="max-w-3xl space-y-6">
              <Group title="Hero-Bereich (Startseite)">
                <Field label="Eyebrow / Label" value={site.hero.eyebrow}
                  onChange={(v) => update((d) => { d.site.hero.eyebrow = v; return d })} />
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="Titel (Zeile 1)" value={site.hero.titleLine1}
                    onChange={(v) => update((d) => { d.site.hero.titleLine1 = v; return d })} />
                  <Field label="Titel (Akzent)" value={site.hero.titleAccent}
                    onChange={(v) => update((d) => { d.site.hero.titleAccent = v; return d })} />
                </div>
                <TextArea label="Untertitel" value={site.hero.subtitle}
                  onChange={(v) => update((d) => { d.site.hero.subtitle = v; return d })} />
              </Group>

              <Group title="Kurzbeschreibung">
                <TextArea label="Beschreibung (Footer / SEO)" value={site.descriptionShort}
                  onChange={(v) => update((d) => { d.site.descriptionShort = v; return d })} />
              </Group>

              <Group title="Kontaktdaten">
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="Telefon" value={site.contact.phone}
                    onChange={(v) => update((d) => { d.site.contact.phone = v; return d })} />
                  <Field label="Mobil" value={site.contact.mobile}
                    onChange={(v) => update((d) => { d.site.contact.mobile = v; return d })} />
                </div>
                <Field label="E-Mail" value={site.contact.email}
                  onChange={(v) => update((d) => { d.site.contact.email = v; return d })} />
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="Straße" value={site.contact.address.street}
                    onChange={(v) => update((d) => { d.site.contact.address.street = v; return d })} />
                  <Field label="PLZ" value={site.contact.address.zip}
                    onChange={(v) => update((d) => { d.site.contact.address.zip = v; return d })} />
                  <Field label="Stadt" value={site.contact.address.city}
                    onChange={(v) => update((d) => { d.site.contact.address.city = v; return d })} />
                  <Field label="Region" value={site.contact.address.region}
                    onChange={(v) => update((d) => { d.site.contact.address.region = v; return d })} />
                </div>
              </Group>

              <Group title="Öffnungszeiten">
                <Field label="Wochentags" value={site.openingHours.weekdays}
                  onChange={(v) => update((d) => { d.site.openingHours.weekdays = v; return d })} />
                <Field label="Samstag" value={site.openingHours.saturday}
                  onChange={(v) => update((d) => { d.site.openingHours.saturday = v; return d })} />
                <Field label="Sonntag" value={site.openingHours.sunday}
                  onChange={(v) => update((d) => { d.site.openingHours.sunday = v; return d })} />
              </Group>

              <Group title="Social Media">
                <Field label="Instagram URL" value={site.social.instagram}
                  onChange={(v) => update((d) => { d.site.social.instagram = v; return d })} />
                <Field label="Facebook URL" value={site.social.facebook}
                  onChange={(v) => update((d) => { d.site.social.facebook = v; return d })} />
              </Group>

              <Group title="Kennzahlen (Startseite)">
                {site.stats.map((stat, i) => (
                  <div key={i} className="grid grid-cols-2 sm:grid-cols-4 gap-3 pb-3 border-b border-gray-100 last:border-0">
                    <Field label="Wert" type="number" value={String(stat.value)}
                      onChange={(v) => update((d) => { d.site.stats[i].value = Number(v) || 0; return d })} />
                    <Field label="Suffix" value={stat.suffix}
                      onChange={(v) => update((d) => { d.site.stats[i].suffix = v; return d })} />
                    <Field label="Label" value={stat.label}
                      onChange={(v) => update((d) => { d.site.stats[i].label = v; return d })} />
                    <Field label="Beschreibung" value={stat.description}
                      onChange={(v) => update((d) => { d.site.stats[i].description = v; return d })} />
                  </div>
                ))}
              </Group>
            </div>
          )}

          {section === 'services' && (
            <div className="max-w-3xl space-y-4">
              {services.map((svc, i) => (
                <Card key={svc.id} onRemove={() => update((d) => { d.services.splice(i, 1); return d })}>
                  <Field label="Titel" value={svc.title}
                    onChange={(v) => update((d) => { d.services[i].title = v; return d })} />
                  <TextArea label="Kurzbeschreibung" value={svc.shortDescription}
                    onChange={(v) => update((d) => { d.services[i].shortDescription = v; return d })} />
                  <TextArea label="Beschreibung" rows={4} value={svc.description}
                    onChange={(v) => update((d) => { d.services[i].description = v; return d })} />
                  <ListField label="Leistungsmerkmale" value={svc.features}
                    onChange={(v) => update((d) => { d.services[i].features = v; return d })} />
                </Card>
              ))}
              <AddButton label="Leistung hinzufügen" onClick={() => update((d) => {
                d.services.push(newService(d.services.length)); return d
              })} />
            </div>
          )}

          {section === 'jobs' && (
            <div className="max-w-3xl space-y-4">
              {jobs.map((job, i) => (
                <Card key={job.id} onRemove={() => update((d) => { d.jobs.splice(i, 1); return d })}>
                  <Field label="Titel" value={job.title}
                    onChange={(v) => update((d) => { d.jobs[i].title = v; return d })} />
                  <div className="grid sm:grid-cols-3 gap-3">
                    <Field label="Art" value={job.type}
                      onChange={(v) => update((d) => { d.jobs[i].type = v as Job['type']; return d })} />
                    <Field label="Level" value={job.level}
                      onChange={(v) => update((d) => { d.jobs[i].level = v as Job['level']; return d })} />
                    <Field label="Standort" value={job.location}
                      onChange={(v) => update((d) => { d.jobs[i].location = v; return d })} />
                  </div>
                  <Field label="Vergütung" value={job.salary ?? ''}
                    onChange={(v) => update((d) => { d.jobs[i].salary = v; return d })} />
                  <TextArea label="Beschreibung" value={job.description}
                    onChange={(v) => update((d) => { d.jobs[i].description = v; return d })} />
                  <ListField label="Anforderungen" value={job.requirements}
                    onChange={(v) => update((d) => { d.jobs[i].requirements = v; return d })} />
                  <ListField label="Wir bieten" value={job.benefits}
                    onChange={(v) => update((d) => { d.jobs[i].benefits = v; return d })} />
                </Card>
              ))}
              <AddButton label="Stelle hinzufügen" onClick={() => update((d) => {
                d.jobs.push(newJob()); return d
              })} />
            </div>
          )}

          {section === 'gallery' && (
            <div className="max-w-3xl grid sm:grid-cols-2 gap-4">
              {gallery.map((item, i) => (
                <Card key={item.id} onRemove={() => update((d) => { d.gallery.splice(i, 1); return d })}>
                  <Field label="Titel" value={item.title}
                    onChange={(v) => update((d) => { d.gallery[i].title = v; return d })} />
                  <Field label="Kategorie" value={item.category}
                    onChange={(v) => update((d) => { d.gallery[i].category = v as GalleryItem['category']; return d })} />
                  <Field label="Bildpfad" value={item.image}
                    onChange={(v) => update((d) => { d.gallery[i].image = v; return d })} />
                  <TextArea label="Beschreibung" value={item.description ?? ''}
                    onChange={(v) => update((d) => { d.gallery[i].description = v; return d })} />
                </Card>
              ))}
              <div className="sm:col-span-2">
                <AddButton label="Bild hinzufügen" onClick={() => update((d) => {
                  d.gallery.push(newGalleryItem()); return d
                })} />
              </div>
            </div>
          )}

          {section === 'planner' && (
            <PlannerCardsEditor
              cards={plannerCards}
              onChange={(mutator) => update((d) => { mutator(d.plannerCards); return d })}
              onAdd={addPlannerCard}
              onRemove={removePlannerCard}
            />
          )}

          {section === 'forms' && (
            <FormSchemaEditor
              schemas={content.formSchemas}
              labels={Object.fromEntries(plannerCards.map((c) => [c.id, c.title]))}
              onChange={(mutator) => update((d) => { mutator(d.formSchemas); return d })}
            />
          )}
        </main>
      </div>
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
      <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
      {children}
    </section>
  )
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-gray-200 text-sm text-gray-500 hover:border-aman-gold hover:text-aman-gold transition-colors"
    >
      <Plus size={16} /> {label}
    </button>
  )
}

function Dashboard({ content, onGo, dirty, onReset, resetting }: {
  content: FullContent
  onGo: (s: SectionId) => void
  dirty: boolean
  onReset: () => void
  resetting: boolean
}) {
  const [confirmReset, setConfirmReset] = useState(false)
  const cards = [
    { id: 'services' as const, label: 'Leistungen', count: content.services.length, icon: Wrench },
    { id: 'jobs' as const, label: 'Stellenangebote', count: content.jobs.length, icon: Briefcase },
    { id: 'gallery' as const, label: 'Galerie-Bilder', count: content.gallery.length, icon: Images },
    { id: 'testimonials' as const, label: 'Kundenstimmen', count: content.testimonials.length, icon: Quote },
    { id: 'planner' as const, label: 'Projektplaner-Karten', count: content.plannerCards.length, icon: LayoutGrid },
    { id: 'forms' as const, label: 'Projektplaner-Formulare', count: Object.keys(content.formSchemas).length, icon: ClipboardList },
  ]
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <button
            key={c.id}
            onClick={() => onGo(c.id)}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-left hover:border-aman-gold/40 transition-colors"
          >
            <div className="inline-flex p-2 rounded-xl mb-3 text-aman-gold bg-aman-gold/10">
              <c.icon size={18} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{c.count}</p>
            <p className="text-xs font-medium text-gray-600 mt-0.5 flex items-center gap-1">
              {c.label} <ChevronRight size={12} />
            </p>
          </button>
        ))}
      </div>

      <div className="bg-aman-gold/5 border border-aman-gold/20 rounded-2xl p-5">
        <p className="text-sm font-medium text-aman-charcoal mb-1">
          {dirty ? 'Sie haben ungespeicherte Änderungen' : 'Alles veröffentlicht'}
        </p>
        <p className="text-xs text-aman-text-muted leading-relaxed">
          Bearbeiten Sie die Inhalte in den Bereichen links. Mit
          <span className="font-medium"> „Speichern &amp; Veröffentlichen“</span> oben rechts
          werden Ihre Änderungen gespeichert und die öffentliche Website neu generiert
          (SEO-freundlich, ohne Neustart) – ähnlich wie bei einem Klick auf „Veröffentlichen“ in WordPress.
        </p>
      </div>

      {/* Danger zone – hard reset to the original defaults */}
      <div className="bg-red-50/60 border border-red-200 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <span className="inline-flex p-2 rounded-xl bg-red-100 text-red-600 shrink-0">
            <AlertTriangle size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-red-700">Inhalte zurücksetzen</p>
            <p className="text-xs text-red-600/80 leading-relaxed mt-0.5">
              Setzt <span className="font-medium">alle</span> Inhalte (Website-Texte,
              Leistungen, Stellen, Galerie, Projektplaner-Karten und -Formulare) auf die
              ursprünglichen Standardwerte zurück. Ihre gespeicherten Änderungen gehen
              dabei unwiderruflich verloren und die Website wird sofort neu veröffentlicht.
            </p>

            {!confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-red-600 border border-red-300 bg-white hover:bg-red-50 px-4 py-2 rounded-xl transition-colors"
              >
                <RotateCcw size={15} />
                Auf Standardwerte zurücksetzen
              </button>
            ) : (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-red-700">
                  Sind Sie sicher? Dies kann nicht rückgängig gemacht werden.
                </span>
                <button
                  type="button"
                  onClick={() => { onReset(); setConfirmReset(false) }}
                  disabled={resetting}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resetting ? (
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <RotateCcw size={15} />
                  )}
                  {resetting ? 'Wird zurückgesetzt…' : 'Ja, alles zurücksetzen'}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  disabled={resetting}
                  className="text-sm font-medium text-gray-600 hover:text-gray-800 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  Abbrechen
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Factories for new entries ───────────────────────────────────────────────

function newService(n: number): Service {
  return {
    id: `leistung-${Date.now()}`,
    title: 'Neue Leistung',
    shortDescription: '',
    description: '',
    icon: 'wrench',
    features: [],
    href: `/leistungen#leistung-${n}`,
  }
}

function newJob(): Job {
  return {
    id: `stelle-${Date.now()}`,
    title: 'Neue Stelle (m/w/d)',
    type: 'Vollzeit',
    level: 'Senior',
    location: 'Frankfurt am Main',
    salary: '',
    description: '',
    requirements: [],
    benefits: [],
    posted: new Date().toISOString().slice(0, 10),
  }
}

function newGalleryItem(): GalleryItem {
  return {
    id: `bild-${Date.now()}`,
    title: 'Neues Bild',
    category: 'fliesen',
    image: '/gallery/bad-modern.jpg',
    width: 800,
    height: 1000,
    description: '',
  }
}

// A minimal one-step, one-field form schema for a freshly added planner card.
function newSchema(): FormSchemasContent[string] {
  const uid = () => `fb-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
  return [
    {
      id: uid(),
      title: 'Schritt 1',
      fields: [{ id: uid(), type: 'text', label: 'Neues Feld', required: false }],
    },
  ]
}
