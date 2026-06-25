import Link from 'next/link'
import type { LegalPage, LinkItem } from '@/types'

/**
 * Generic renderer for an editable legal page (Impressum, Datenschutz, …).
 * Renders the title and an ordered list of `{ heading, body }` blocks. Body text
 * keeps its line breaks via `whitespace-pre-line` (blank lines = paragraph gaps).
 */
export function LegalPageView({
  page,
  links,
  showStand = false,
}: {
  page: LegalPage
  /** Cross-links to the other legal pages. */
  links: LinkItem[]
  /** Append a "Stand: <month year>" line (used by Datenschutz/Nutzungsbedingungen). */
  showStand?: boolean
}) {
  const stand = new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })

  return (
    <div className="pt-28 md:pt-36 pb-20 bg-white">
      <div className="container-aman max-w-3xl">
        <nav aria-label="Brotkrümel" className="flex items-center gap-2 text-sm text-aman-text-muted mb-8">
          <Link href="/" className="hover:text-aman-gold transition-colors">Startseite</Link>
          <span>/</span>
          <span className="text-aman-charcoal">{page.breadcrumb}</span>
        </nav>

        <h1 className="font-serif text-aman-charcoal mb-10" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          {page.title}
        </h1>

        <div className="space-y-8 text-aman-text-muted text-[0.9375rem] leading-relaxed">
          {page.sections.map((section, i) => (
            <section key={i}>
              <h2 className="font-serif text-xl text-aman-charcoal mb-4">{section.heading}</h2>
              <p className="whitespace-pre-line">{section.body}</p>
            </section>
          ))}

          {showStand && (
            <p className="text-xs text-aman-text-light pt-4 border-t border-aman-border">
              Stand: {stand}
            </p>
          )}
        </div>

        {links.length > 0 && (
          <div className="mt-12 pt-8 border-t border-aman-border flex flex-wrap gap-4 text-sm text-aman-text-light">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-aman-gold transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
