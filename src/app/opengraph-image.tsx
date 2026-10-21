import { ImageResponse } from 'next/og'

// Link-preview card in the Wall Index look. Colors are hardcoded because CSS
// variables don't exist inside the image renderer; they mirror WALL_CSS in page.tsx.
const BG = '#101113'
const INK = '#e8e5de'
const SOFT = '#8f939a'
const LINE = '#2d3035'
const ACCENT = '#ff6557' // oklch(0.70 0.19 28)

export const alt = 'Divy Parekh, software engineer: "The Internet\'s not written in pencil, Mark. It\'s written in ink."'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Google Fonts serves TTF to clients without a browser user agent, which is
// what the renderer needs. If the fetch fails the card falls back to the default font.
async function googleFont(family: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}`)).text()
    const url = css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1]
    return url ? await (await fetch(url)).arrayBuffer() : null
  } catch {
    return null
  }
}

export default async function Image() {
  const [serif, serifItalic, mono] = await Promise.all([
    googleFont('Instrument+Serif'),
    googleFont('Instrument+Serif:ital@1'),
    googleFont('JetBrains+Mono'),
  ])
  const fonts = [
    serif && { name: 'Serif', data: serif, style: 'normal' as const, weight: 400 as const },
    serifItalic && { name: 'Serif', data: serifItalic, style: 'italic' as const, weight: 400 as const },
    mono && { name: 'Mono', data: mono, style: 'normal' as const, weight: 400 as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; style: 'normal' | 'italic'; weight: 400 }[]

  const monoText = { fontFamily: 'Mono', fontSize: 20, letterSpacing: '0.12em', color: SOFT, textTransform: 'uppercase' as const }

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: BG, color: INK, padding: '56px 72px', fontFamily: 'Serif' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', ...monoText, paddingBottom: 22, borderBottom: `1px solid ${LINE}` }}>
          <span style={{ color: INK }}>divy parekh</span>
          <span>wall index · ahmedabad</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', fontSize: 92, lineHeight: 1, letterSpacing: '-0.03em' }}>
          <span>The Internet&apos;s not</span>
          <span>written in pencil, Mark.</span>
          <span style={{ display: 'flex' }}>
            It&apos;s written in&nbsp;
            <span style={{ display: 'flex', flexDirection: 'column', fontStyle: 'italic', color: ACCENT }}>
              ink
              <svg width="104" height="14" viewBox="0 0 130 14" preserveAspectRatio="none" style={{ marginTop: -6 }}>
                <path d="M3 9 C 30 3, 70 4, 127 6 M 10 12 C 45 8, 90 9, 120 10" fill="none" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
            .
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 22, borderTop: `1px solid ${LINE}` }}>
          <span style={{ fontSize: 34, fontStyle: 'italic', color: INK }}>Software engineer. Occasional writer.</span>
          <span style={{ ...monoText, color: ACCENT }}>divyparekh.xyz</span>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  )
}
