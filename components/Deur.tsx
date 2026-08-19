// Eén van de twee deuren op de homepage. Bouwspec sectie 3.
//
// Beeld 4:5, geen afgeronde hoeken, geen schaduw. Verloop van onderaf.
// Onderaan links: 3px kleurstreep, collectienaam in audit-caps, tagline in H2.
// Hover: beeld scale 1.03 over 700ms. Reduced motion: geen scale.
// Focus: 2px oranje ring, offset 4px.
//
// Placeholder: de container krijgt de collectiekleur als achtergrond. Als
// het beeld ontbreekt, blijft de gekleurde tegel zichtbaar met de tekst
// erover. Geen onError nodig — Next Image geeft een leeg vlak boven de bg.

import Image from 'next/image'
import Link from 'next/link'

interface Props {
  naam: 'the shore' | 'the fields'
  tagline: string
  href: string
  beeld: string
  beeldAlt: string
}

export function Deur({ naam, tagline, href, beeld, beeldAlt }: Props) {
  const isShore = naam === 'the shore'
  const kleur = isShore ? 'var(--moroww-shore)' : 'var(--moroww-fields)'
  const kleurClass = isShore ? 'bg-moroww-shore' : 'bg-moroww-fields'

  return (
    <Link
      href={href}
      className="group relative block w-full aspect-[4/5] overflow-hidden outline-none focus-visible:outline-2 focus-visible:outline-moroww-orange focus-visible:outline-offset-4"
      style={{ backgroundColor: kleur }}
      aria-label={`${naam} — ${tagline}`}
    >
      <Image
        src={beeld}
        alt={beeldAlt}
        fill
        className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(26,26,26,0.55), rgba(26,26,26,0))' }}
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 p-mw-5">
        <div className={`h-[3px] w-10 ${kleurClass}`} aria-hidden />
        <p className="mt-mw-3 text-audit uppercase text-white">{naam}</p>
        <h2 className="mt-mw-2 text-h2 text-white">{tagline}</h2>
      </div>
    </Link>
  )
}
