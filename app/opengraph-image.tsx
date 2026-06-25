import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { siteConfig } from '@/config/site'
import { TEST_MODE } from '@/lib/test-mode'

export const alt = TEST_MODE
  ? 'Musterbetrieb'
  : `${siteConfig.name} – ${siteConfig.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Brand palette (mirrors app/globals.css)
const charcoal = '#1A1917'
const gold = '#C9A96E'
const cream = '#FAF8F5'

/**
 * Fetches a Google Font as raw TTF so Satori can render it. Returns null on
 * failure so the build never breaks — ImageResponse falls back to its default
 * font if no data is provided.
 */
async function loadGoogleFont(
  family: string,
  weight: number,
  text: string,
): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family.replace(
      / /g,
      '+',
    )}:wght@${weight}&text=${encodeURIComponent(text)}`
    const css = await (
      await fetch(url, {
        headers: {
          // Spoof an old UA so Google serves TTF instead of woff2 (Satori can't read woff2).
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.30',
        },
      })
    ).text()
    const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)
    if (!src) return null
    return await (await fetch(src[1])).arrayBuffer()
  } catch {
    return null
  }
}

export default async function Image() {
  const eyebrow = TEST_MODE ? 'Fliesen & Naturstein · Musterstadt' : 'Fliesen & Naturstein · Neu-Ulm'
  const headline = TEST_MODE ? 'Muster' : 'Fliesen-Naturstein'
  const wordmark = TEST_MODE ? 'MUSTER' : 'AMAN'
  const services = 'Fliesen · Platten · Naturstein'
  const domain = TEST_MODE ? 'example.com' : 'fliesen-aman.de'
  const glyphs = `${eyebrow}${headline}${wordmark}${services}${domain}`

  const [bgData, playfair, playfairBold, inter] = await Promise.all([
    readFile(join(process.cwd(), 'public/hero-bg.jpg'), 'base64'),
    loadGoogleFont('Playfair Display', 500, glyphs),
    loadGoogleFont('Playfair Display', 700, glyphs),
    loadGoogleFont('Inter', 500, glyphs),
  ])

  const bgSrc = `data:image/jpeg;base64,${bgData}`

  const fonts = [
    playfair && { name: 'Playfair', data: playfair, weight: 500 as const, style: 'normal' as const },
    playfairBold && { name: 'Playfair', data: playfairBold, weight: 700 as const, style: 'normal' as const },
    inter && { name: 'Inter', data: inter, weight: 500 as const, style: 'normal' as const },
  ].filter(Boolean) as {
    name: string
    data: ArrayBuffer
    weight: 500 | 700
    style: 'normal'
  }[]

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: charcoal,
        }}
      >
        {/* Background photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgSrc}
          alt=""
          width={size.width}
          height={size.height}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {/* Charcoal gradient overlay — dark on the left for text legibility */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            backgroundImage: `linear-gradient(90deg, ${charcoal}F2 0%, ${charcoal}D9 45%, ${charcoal}66 100%)`,
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            padding: '0 80px',
          }}
        >
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
            <div style={{ width: 48, height: 2, backgroundColor: gold, marginRight: 18 }} />
            <div
              style={{
                color: gold,
                fontFamily: 'Inter',
                fontSize: 22,
                letterSpacing: 4,
                textTransform: 'uppercase',
              }}
            >
              {eyebrow}
            </div>
          </div>

          {/* Headline + wordmark */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'Playfair',
              lineHeight: 1.05,
            }}
          >
            <div style={{ color: cream, fontSize: 84, fontWeight: 500 }}>{headline}</div>
            <div style={{ color: gold, fontSize: 108, fontWeight: 700, letterSpacing: 6 }}>
              {wordmark}
            </div>
          </div>

          {/* Gold rule */}
          <div style={{ width: 120, height: 3, backgroundColor: gold, margin: '36px 0 28px' }} />

          {/* Services */}
          <div style={{ color: cream, fontFamily: 'Inter', fontSize: 30, opacity: 0.85 }}>
            {services}
          </div>
        </div>

        {/* Domain, bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: 44,
            right: 80,
            display: 'flex',
            color: cream,
            fontFamily: 'Inter',
            fontSize: 22,
            letterSpacing: 1,
            opacity: 0.65,
          }}
        >
          {domain}
        </div>
      </div>
    ),
    { ...size, fonts },
  )
}
