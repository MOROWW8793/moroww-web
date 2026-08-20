// Eén van de twee deuren op de homepage. Bouwspec sectie 3.
//
// Hoogte: aspect 4:5 op mobiel, gecapt op 72vh op lg — op grote schermen
// snijdt het beeld bij in plaats van de pagina op te rekken.
// Beeld optional: als het bestand ontbreekt, rendert er GEEN <img> — alleen
// de effen collectiekleur met de tekst er normaal overheen in --moroww-dark
// in plaats van wit. Zo staat er nooit een broken-image-icoon of een
// blootgestelde alt-tekst op de pagina.
// Hover: beeld scale 1.03 over 700ms. Reduced motion: geen scale.
// Focus: 2px --moroww-orange, offset 4px.

import Image from 'next/image'
import Link from 'next/link'

interface Props {
  naam: 'the shore' | 'the fields'
  tagline: string
  href: string
  /** Absoluut pad in /public. Ontbreekt of undefined → placeholder-tegel. */
  beeld?: string
  beeldAlt: string
}

export function Deur({ naam, tagline, href, beeld, beeldAlt }: Props) {
  const bgKleur = naam === 'the shore' ? 'var(--moroww-shore)' : 'var(--moroww-fields)'

  const heeftBeeld = Boolean(beeld)

  // Met beeld: witte tekst op donker verloop. Zonder beeld: donkere tekst op
  // de gekleurde tegel. De 3px-streep is wit boven een beeld (de
  // collectiekleur zou wegvallen tegen de zee bij the shore) en donker op
  // de placeholder-tegel (waar wit weer wegvalt tegen de eigen kleur).
  const tekstKleur = heeftBeeld ? 'text-white' : 'text-moroww-dark'
  const streepClass = heeftBeeld ? 'bg-white' : 'bg-moroww-dark'

  return (
    <Link
      href={href}
      className="group relative block w-full aspect-[4/5] lg:max-h-[62vh] overflow-hidden outline-none focus-visible:outline-2 focus-visible:outline-moroww-orange focus-visible:outline-offset-4"
      style={{ backgroundColor: bgKleur }}
      aria-label={`${naam} — ${tagline}`}
    >
      {heeftBeeld && (
        <>
          <Image
            src={beeld as string}
            alt={beeldAlt}
            fill
            className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[60%] pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(26,26,26,0.65), rgba(26,26,26,0))' }}
            aria-hidden
          />
        </>
      )}

      <div className="absolute inset-x-0 bottom-0 p-mw-5">
        <div className={`h-[3px] w-10 ${streepClass}`} aria-hidden />
        <p className={`mt-mw-3 text-audit uppercase ${tekstKleur}`}>{naam}</p>
        <h2 className={`mt-mw-2 text-h2 ${tekstKleur}`}>{tagline}</h2>
      </div>
    </Link>
  )
}
