/**
 * Hub-en-spoke SVG van het moroww-ecosysteem.
 *   Kern:   'het label'
 *   Rondom: de collectie · de partners · de community · de hub
 *
 * Trigger via data-anim="rise" op de wrap — de CSS in hallmark.css doet de
 * lijn-tekening, de kern- en satelliet-onthulling en de ademhaling van de kern.
 * Reduced-motion en scripting-off laten het schema zien in eindstaat.
 */

type Tekst = { nl: string; en: string }

interface Node {
  id: string
  naam: Tekst
  x: number
  y: number
}

const SATELLIETEN: Node[] = [
  { id: 'collectie', naam: { nl: 'de collectie', en: 'the collection' }, x: 150, y: 115 },
  { id: 'partners',  naam: { nl: 'de partners',  en: 'the partners'  }, x: 650, y: 115 },
  { id: 'community', naam: { nl: 'de community', en: 'the community' }, x: 150, y: 385 },
  { id: 'hub',       naam: { nl: 'de hub',       en: 'the hub'       }, x: 650, y: 385 },
]

const CX = 400
const CY = 250

export function EcosysteemSchema({ locale }: { locale: 'nl' | 'en' }) {
  const label = locale === 'nl' ? 'het label' : 'the label'
  const titel = locale === 'nl' ? 'het ecosysteem rond het label' : 'the ecosystem around the label'

  return (
    <div className="hm-ecosysteem-wrap" data-anim="rise">
      <svg
        className="hm-ecosysteem"
        viewBox="0 0 800 500"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={titel}
      >
        {/* Lijnen eerst: ze liggen onder de cirkels. Stroke-dasharray = de
            afstand, zodat de onthulling de hele lijn beslaat. Delay stijgt
            per satelliet zodat ze in volgorde tekenen. */}
        {SATELLIETEN.map((s, i) => {
          const len = Math.hypot(s.x - CX, s.y - CY)
          return (
            <line
              key={`l-${s.id}`}
              x1={CX} y1={CY}
              x2={s.x} y2={s.y}
              className="hm-eco-line"
              style={{
                strokeDasharray: len,
                strokeDashoffset: len,
                transitionDelay: `${400 + i * 140}ms`,
              }}
            />
          )
        })}

        {/* Kern — oranje cirkel met 'het label' + 'moroww'. */}
        <g className="hm-eco-core">
          <circle cx={CX} cy={CY} r={82} />
          <text x={CX} y={CY - 10} className="hm-eco-core-title">{label}</text>
          <text x={CX} y={CY + 16} className="hm-eco-core-sub">moroww</text>
        </g>

        {/* Satellieten — wit cirkel + tekst, lijn eronder verdwijnt door de
            fill. Transition-delay stijgt per satelliet. */}
        {SATELLIETEN.map((s, i) => (
          <g
            key={`n-${s.id}`}
            className="hm-eco-node"
            style={{ transitionDelay: `${1000 + i * 140}ms` }}
          >
            <circle cx={s.x} cy={s.y} r={62} />
            <text x={s.x} y={s.y + 4} className="hm-eco-node-label">{s.naam[locale]}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}
