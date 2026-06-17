/**
 * Logo lab — a throwaway design surface for comparing hand-built SVG logo
 * concepts for Fliesen-Naturstein AMAN. Not linked from the site; visit
 * /logo-lab to review. Once a direction is picked, the chosen mark moves into
 * components/layout/Logo.tsx and this page can be deleted.
 */
import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Cinzel,
  Marcellus,
  Italiana,
  Bodoni_Moda,
  Tenor_Sans,
  Montserrat,
  Jost,
  Josefin_Sans,
  Forum,
} from "next/font/google";

export const metadata: Metadata = {
  title: "Logo Lab",
  robots: { index: false, follow: false },
};

/* Brand palette (from globals.css) */
const GOLD = "#C9A96E";
const CHARCOAL = "#1A1917";
const CREAM = "#FAF8F5";
const STONE = "#C4B5A0";
const STONE_DARK = "#8B7B64";

type Tone = "onLight" | "onDark";
const ink = (t: Tone) => (t === "onLight" ? CHARCOAL : CREAM);
const sub = (t: Tone) => (t === "onLight" ? "#6B6560" : "rgba(250,248,245,0.6)");

/* Google Fonts for the typographic wordmark studies */
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "600"], display: "swap" });
const marcellus = Marcellus({ subsets: ["latin"], weight: "400", display: "swap" });
const italiana = Italiana({ subsets: ["latin"], weight: "400", display: "swap" });
const bodoni = Bodoni_Moda({ subsets: ["latin"], display: "swap" });
const tenor = Tenor_Sans({ subsets: ["latin"], weight: "400", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });
const jost = Jost({ subsets: ["latin"], display: "swap" });
const josefin = Josefin_Sans({ subsets: ["latin"], display: "swap" });
const forum = Forum({ subsets: ["latin"], weight: "400", display: "swap" });

/* ──────────────────────────────────────────────────────────────────────────
 * Concept — Tiled diamond (Fliesen laid on point)
 * Four tiles set on a diamond with a grout cross; the top tile is laid in gold.
 * ────────────────────────────────────────────────────────────────────────── */
function MarkDiamond({ tone, size = 48 }: { tone: Tone; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <g transform="rotate(45 24 24)">
        <rect x="24.2" y="8.8" width="14.8" height="14.8" rx="1.5" fill={GOLD} />
        <rect x="9" y="9" width="30" height="30" rx="3" stroke={ink(tone)} strokeWidth="2.4" />
        <path d="M24 9 V39 M9 24 H39" stroke={ink(tone)} strokeWidth="2.4" />
      </g>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * Concept 3 — Natural stone strata
 * A cut stone core: sedimentary bands inside a circle, one seam in gold.
 * ────────────────────────────────────────────────────────────────────────── */
function MarkStrata({ tone, size = 48 }: { tone: Tone; size?: number }) {
  const id = `strata-${tone}-${size}`;
  const base = tone === "onLight" ? CREAM : "#262320";
  const band = tone === "onLight" ? STONE : STONE_DARK;
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <defs>
        <clipPath id={id}>
          <circle cx="24" cy="24" r="21" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect x="3" y="3" width="42" height="42" fill={base} />
        <rect x="3" y="6" width="42" height="7" fill={band} />
        <rect x="3" y="16" width="42" height="5" fill={GOLD} />
        <rect x="3" y="24" width="42" height="9" fill={ink(tone)} />
        <rect x="3" y="36" width="42" height="6" fill={band} />
      </g>
      <circle cx="24" cy="24" r="21" stroke={ink(tone)} strokeWidth="2.4" />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * Concept — Tiles in a running bond (Fliesen im Verband)
 * Laid wall tiles with grout joints, one set in gold. Instantly a tiled wall.
 * ────────────────────────────────────────────────────────────────────────── */
function MarkBrick({ tone, size = 48 }: { tone: Tone; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      {/* <rect x="2" y="2" width="44" height="44" rx="9" stroke={ink(tone)} strokeWidth="2.4" /> */}
      <g stroke={ink(tone)} strokeWidth="2" fill="none">
        {/* row 1 */}
        <rect x="9" y="11" width="14" height="8" rx="1.5" />
        <rect x="25" y="11" width="14" height="8" rx="1.5" />
        {/* row 2 — offset, middle tile laid in gold */}
        <rect x="9" y="21" width="6" height="8" rx="1.5" />
        <rect x="17" y="21" width="14" height="8" rx="1.5" fill={GOLD} stroke="none" />
        <rect x="33" y="21" width="6" height="8" rx="1.5" />
        {/* row 3 */}
        <rect x="9" y="31" width="14" height="8" rx="1.5" />
        <rect x="25" y="31" width="14" height="8" rx="1.5" />
      </g>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * Concept — House in renovation (Haus in Sanierung)
 * A house framed by scaffolding with a freshly laid gold roof. Reads as
 * "we renovate / refurbish buildings".
 * ────────────────────────────────────────────────────────────────────────── */
function MarkRenovation({ tone, size = 48 }: { tone: Tone; size?: number }) {
  const scaffold = tone === "onLight" ? STONE_DARK : STONE;
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      {/* scaffolding frame (behind the house) */}
      <g stroke={scaffold} strokeWidth="1.8" strokeLinecap="round">
        <line x1="10" y1="15" x2="10" y2="42" />
        <line x1="38" y1="15" x2="38" y2="42" />
        <line x1="10" y1="20" x2="38" y2="20" />
        <line x1="10" y1="31" x2="38" y2="31" />
        <line x1="10" y1="42" x2="38" y2="42" />
      </g>
      {/* house: freshly laid gold roof + body */}
      <path d="M12 24 L24 13 L36 24 Z" fill={GOLD} />
      <path d="M15 24 V39 H33 V24" stroke={ink(tone)} strokeWidth="2.4" fill="none" strokeLinejoin="round" />
      <rect x="21" y="31" width="6" height="8" fill={ink(tone)} />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * Concept — House upgrade (Haus-Aufwertung)
 * A house whose roof is an upward arrow. Reads as "modernise / improve /
 * increase the value of your home".
 * ────────────────────────────────────────────────────────────────────────── */
function MarkUpgrade({ tone, size = 48 }: { tone: Tone; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      {/* house body */}
      <path d="M14 24 V39 H34 V24" stroke={ink(tone)} strokeWidth="2.4" fill="none" strokeLinejoin="round" />
      <rect x="21" y="31" width="6" height="8" fill={ink(tone)} />
      {/* roof as an upward arrow = improvement */}
      <path d="M9 26 L24 11 L39 26" stroke={GOLD} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 12 V23" stroke={GOLD} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

/* A small gold tile (diamond) used as a separator / favicon fallback */
function TileDot({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" aria-hidden>
      <rect x="2.2" y="2.2" width="7.6" height="7.6" rx="1" transform="rotate(45 6 6)" fill={GOLD} />
    </svg>
  );
}

/* ── Word lockups ────────────────────────────────────────────────────────── */

function Wordmark({ tone }: { tone: Tone }) {
  return (
    <div className="leading-none">
      <div
        className="font-serif tracking-tight"
        style={{ color: ink(tone), fontSize: "1.9rem", letterSpacing: "0.06em" }}
      >
        AMAN
      </div>
      <div className="mt-1.5 text-[10px] font-medium uppercase" style={{ color: sub(tone), letterSpacing: "0.34em" }}>
        Fliesen · Naturstein
      </div>
    </div>
  );
}

type Concept = {
  key: string;
  name: string;
  note: string;
  Mark?: (p: { tone: Tone; size?: number }) => React.ReactElement;
};

const CONCEPTS: Concept[] = [
  {
    key: "diamond",
    name: "1 · Diagonal verlegte Fliesen",
    note: 'Vier auf Spitze verlegte Fliesen mit Fugenkreuz – die obere in Gold. Klar „Fliesenleger".',
    Mark: MarkDiamond,
  },
  {
    key: "brick",
    name: "2 · Fliesen im Verband",
    note: "Verlegte Wandfliesen mit Fugen, eine in Gold. Liest sich sofort als geflieste Wand.",
    Mark: MarkBrick,
  },
  {
    key: "strata",
    name: "3 · Natursteinschichten",
    note: 'Geschnittener Steinkern mit Sedimentbändern und goldener Ader. Betont „Naturstein".',
    Mark: MarkStrata,
  },
  {
    key: "renovation",
    name: "4 · Haus in Sanierung",
    note: "Haus mit Gerüst und frisch verlegtem Golddach. Steht für Sanierung und Renovierung.",
    Mark: MarkRenovation,
  },
  {
    key: "upgrade",
    name: "5 · Haus-Aufwertung",
    note: "Haus mit Aufwärtspfeil als Dach. Steht für Modernisierung und Wertsteigerung.",
    Mark: MarkUpgrade,
  },
];

function Lockup({ tone, Mark }: { tone: Tone; Mark?: Concept["Mark"] }) {
  return (
    <div className="flex items-center gap-3">
      {Mark ? <Mark tone={tone} size={48} /> : <TileDot size={16} />}
      <Wordmark tone={tone} />
    </div>
  );
}

function Card({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return (
    <div
      className="flex min-h-35 items-center justify-center rounded-xl border p-8"
      style={{
        background: tone === "onLight" ? "#FFFFFF" : CHARCOAL,
        borderColor: tone === "onLight" ? "#E8E2DA" : "rgba(255,255,255,0.08)",
      }}
    >
      {children}
    </div>
  );
}

/* ── Typographic wordmarks (no icon) ──────────────────────────────────────── */

type Accent = "rule" | "bars" | "dot" | "inline" | "none";

type TypeLogo = {
  key: string;
  label: string;
  fontClass: string;
  weight: number;
  size: string;
  tracking: string;
  accent: Accent;
};

const TYPE_LOGOS: TypeLogo[] = [
  { key: "cormorant", label: "Cormorant Garamond · schlanke Renaissance-Serife", fontClass: cormorant.className, weight: 500, size: "2.4rem", tracking: "0.18em", accent: "rule" },
  { key: "cinzel", label: "Cinzel · gravierte römische Kapitale", fontClass: cinzel.className, weight: 600, size: "1.9rem", tracking: "0.16em", accent: "none" },
  { key: "marcellus", label: "Marcellus · klassisch, ruhig", fontClass: marcellus.className, weight: 400, size: "2.3rem", tracking: "0.2em", accent: "bars" },
  { key: "italiana", label: "Italiana · Haute-Couture-Serife", fontClass: italiana.className, weight: 400, size: "2.6rem", tracking: "0.34em", accent: "rule" },
  { key: "bodoni", label: "Bodoni Moda · hoher Kontrast, Mode", fontClass: bodoni.className, weight: 600, size: "2.3rem", tracking: "0.06em", accent: "inline" },
  { key: "tenor", label: "Tenor Sans · reduziert, serifenlos", fontClass: tenor.className, weight: 400, size: "2.1rem", tracking: "0.36em", accent: "dot" },
  { key: "montserrat", label: "Montserrat · geometrisch, kräftig", fontClass: montserrat.className, weight: 700, size: "1.9rem", tracking: "0.12em", accent: "none" },
  { key: "jost", label: "Jost · modern geometrisch", fontClass: jost.className, weight: 500, size: "2.2rem", tracking: "0.34em", accent: "rule" },
  { key: "josefin", label: "Josefin Sans · hoch & elegant", fontClass: josefin.className, weight: 600, size: "2.2rem", tracking: "0.3em", accent: "bars" },
  { key: "forum", label: "Forum · antike römische Anmutung", fontClass: forum.className, weight: 400, size: "2.4rem", tracking: "0.18em", accent: "dot" },
];

function Subtitle({ tone, size = "0.6rem", tracking = "0.34em" }: { tone: Tone; size?: string; tracking?: string }) {
  return (
    <span
      className="font-medium uppercase"
      style={{ color: sub(tone), fontSize: size, letterSpacing: tracking, fontFamily: "var(--font-inter)" }}
    >
      Fliesen · Naturstein
    </span>
  );
}

function TypeLockup({ tone, logo }: { tone: Tone; logo: TypeLogo }) {
  const word = (
    <span
      className={`${logo.fontClass} uppercase`}
      style={{ color: ink(tone), fontWeight: logo.weight, fontSize: logo.size, letterSpacing: logo.tracking, lineHeight: 1 }}
    >
      AMAN
    </span>
  );
  const bar = <span style={{ width: 2, height: "1.4em", background: GOLD, display: "inline-block" }} />;

  switch (logo.accent) {
    case "rule":
      return (
        <div className="flex flex-col items-center gap-2.5">
          {word}
          <span style={{ width: "72%", height: 1.5, background: GOLD }} />
          <Subtitle tone={tone} />
        </div>
      );
    case "bars":
      return (
        <div className="flex flex-col items-center gap-2.5">
          <span className="flex items-center gap-3.5">
            {bar}
            {word}
            {bar}
          </span>
          <Subtitle tone={tone} />
        </div>
      );
    case "dot":
      return (
        <div className="flex flex-col items-center gap-2.5">
          {word}
          <span className="flex items-center gap-2.5">
            <TileDot size={7} />
            <Subtitle tone={tone} />
            <TileDot size={7} />
          </span>
        </div>
      );
    case "inline":
      return (
        <span className="flex items-center gap-3.5">
          {word}
          <span style={{ width: 1.5, height: 38, background: GOLD }} />
          <span className="flex flex-col gap-1">
            <Subtitle tone={tone} size="0.62rem" tracking="0.24em" />
            <Subtitle tone={tone} size="0.62rem" tracking="0.24em" />
          </span>
        </span>
      );
    default:
      return (
        <div className="flex flex-col items-center gap-2">
          {word}
          <Subtitle tone={tone} />
        </div>
      );
  }
}

export default function LogoLabPage() {
  return (
    <main style={{ background: CREAM }} className="min-h-screen px-6 py-14 text-aman-text">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-aman-border bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-aman-text-light">
            <TileDot size={10} /> Logo Lab
          </div>
          <h1 className="font-serif text-3xl text-aman-charcoal">Logo-Konzepte · Fliesen-Naturstein AMAN</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-aman-text-muted">
            Fünf handgebaute SVG-Richtungen. Jede ist auf hellem und dunklem Grund sowie als kleines Emblem
            (Favicon-Tauglichkeit) gezeigt. Sag mir, welche Richtung dir gefällt – dann verfeinere ich sie und setze sie
            in <code>components/layout/Logo.tsx</code> ein.
          </p>
        </header>

        <div className="space-y-10">
          {CONCEPTS.map(({ key, name, note, Mark }) => (
            <section key={key}>
              <div className="mb-3 flex items-baseline justify-between gap-4 border-b border-aman-border pb-2">
                <h2 className="font-serif text-lg text-aman-charcoal">{name}</h2>
                {Mark && (
                  <div className="flex items-center gap-4 pr-1">
                    <Mark tone="onLight" size={32} />
                    <Mark tone="onLight" size={24} />
                    <Mark tone="onLight" size={18} />
                  </div>
                )}
              </div>
              <p className="mb-4 text-sm text-aman-text-muted">{note}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card tone="onLight">
                  <Lockup tone="onLight" Mark={Mark} />
                </Card>
                <Card tone="onDark">
                  <Lockup tone="onDark" Mark={Mark} />
                </Card>
              </div>
            </section>
          ))}
        </div>

        <header className="mb-10 mt-16">
          <h2 className="font-serif text-2xl text-aman-charcoal">Typografische Wortmarken (ohne Icon)</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-aman-text-muted">
            Zehn reine Schrift-Lösungen mit Google Fonts – „AMAN“ steht im Mittelpunkt, „Fliesen · Naturstein“
            bleibt zurückhaltend. Gold nur als feiner Akzent (Linie, Balken, Fliesen-Punkt).
          </p>
        </header>

        <div className="space-y-8">
          {TYPE_LOGOS.map((logo) => (
            <section key={logo.key}>
              <h3 className="mb-3 border-b border-aman-border pb-2 text-xs font-medium uppercase tracking-[0.18em] text-aman-text-light">
                {logo.label}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card tone="onLight">
                  <TypeLockup tone="onLight" logo={logo} />
                </Card>
                <Card tone="onDark">
                  <TypeLockup tone="onDark" logo={logo} />
                </Card>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
