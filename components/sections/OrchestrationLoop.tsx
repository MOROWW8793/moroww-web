import { getTranslations } from 'next-intl/server'

/**
 * Orchestration loop als cirkel — port van variant A uit
 * moroww-orchestration-loop.html. Alle animatie via CSS-keyframes en
 * inline SVG, geen framer-motion, geen base64-fonts.
 *
 * Op mobiel (< md) valt de cirkel weg en wordt de bestaande genummerde
 * lijst gerenderd (zie /moroww-os). Cirkel is 940×940 — te groot voor
 * telefoonschermen; een tussenvorm heeft weinig meerwaarde.
 *
 * Reduced-motion: alle stappen krijgen tegelijk hun 'verlichte' state
 * (statische ring met alle nodes zichtbaar).
 */

// SVG-icoonpaden per stap (24×24 viewbox, stroke-only).
const LOOP_ICON_PATHS = [
  'M4 7h16M4 12h10M4 17h7',                                          // 01 boeking bevestigd
  'M4 12l8-7 8 7M6 11v8h12v-8',                                       // 02 woning bereidt zich voor
  'M14 4h4v16h-4M4 12h9M10 8l4 4-4 4',                                // 03 gast arriveert
  'M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z',                           // 04 verblijf bewaakt
  'M10 4H6v16h4M20 12h-9M15 8l4 4-4 4',                               // 05 vertrek
  'M4 20l5-5M9 15l6-9 3 3-9 6zM15 4l5 5',                             // 06 schoonmaak
  'M12 4l2.3 4.9 5.2.7-3.8 3.7.9 5.3-4.6-2.6-4.6 2.6.9-5.3L4.5 9.6l5.2-.7z', // 07 review
] as const

const N = 7
const CENTER = 470
const RING_RADIUS = 250
const NODE_RADIUS = 356
const DUR_S = 28

export async function OrchestrationLoop() {
  const t = await getTranslations('morowwos')

  const steps = LOOP_ICON_PATHS.map((path, i) => {
    const degree = -90 + i * (360 / N)
    const rad = (degree * Math.PI) / 180
    const tickX = CENTER + RING_RADIUS * Math.cos(rad)
    const tickY = CENTER + RING_RADIUS * Math.sin(rad)
    const nodeX = CENTER + NODE_RADIUS * Math.cos(rad)
    const nodeY = CENTER + NODE_RADIUS * Math.sin(rad)
    const delay = `${(i * DUR_S) / N}s`
    const num = String(i + 1).padStart(2, '0')
    return {
      num,
      title: t(`loop_${num}` as 'loop_01'),
      when: t(`loop_${num}_when` as 'loop_01_when'),
      path,
      tickX, tickY, nodeX, nodeY, delay,
    }
  })

  return (
    <div className="orchestration-loop hidden md:block" style={{ '--dur': `${DUR_S}s` } as React.CSSProperties}>
      <div className="ol-stage">
        <div className="ol-glow" aria-hidden="true" />

        <svg className="ol-ring" viewBox={`0 0 ${CENTER * 2} ${CENTER * 2}`}>
          <defs>
            <linearGradient id="ol-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FEA05E" stopOpacity=".92" />
              <stop offset="45%" stopColor="#FAE4D6" stopOpacity=".48" />
              <stop offset="100%" stopColor="#C08D6E" stopOpacity=".32" />
            </linearGradient>
          </defs>
          <circle cx={CENTER} cy={CENTER} r={RING_RADIUS} fill="none" stroke="#2C2C2C" strokeWidth={22} />
          <circle cx={CENTER} cy={CENTER} r={RING_RADIUS} fill="none" stroke="url(#ol-grad)" strokeWidth={2} />
          {steps.map((s, i) => (
            <circle
              key={i}
              cx={s.tickX}
              cy={s.tickY}
              r={4}
              fill="#5A4A3E"
              className="ol-tick"
              style={{ animationDelay: s.delay }}
            />
          ))}
        </svg>

        {/* Hub center */}
        <div className="ol-hub">
          <div className="ol-hub-veil" aria-hidden="true" />
          <div className="ol-hub-txt">
            <div className="ol-hub-k">{t('loop_hub_label')}</div>
            <div className="ol-hub-b">{t('loop_hub_body')}</div>
            <div className="ol-hub-live"><i aria-hidden="true" /> {t('loop_hub_live')}</div>
          </div>
        </div>

        {/* Nodes rond de ring */}
        {steps.map((s, i) => (
          <div
            key={i}
            className="ol-node"
            style={{ left: `${s.nodeX}px`, top: `${s.nodeY - 42}px` }}
          >
            <div className="ol-blob" style={{ animationDelay: s.delay }}>
              <svg viewBox="0 0 24 24" style={{ animationDelay: s.delay }}>
                <path d={s.path} />
              </svg>
            </div>
            <span className="ol-n" style={{ animationDelay: s.delay }}>{s.num}</span>
            <div className="ol-t" style={{ animationDelay: s.delay }}>{s.title}</div>
            <div className="ol-w">{s.when}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
