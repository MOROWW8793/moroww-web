// De pandkaart voor de collectiepagina's.
//
// Bouwspec sectie 4: beeld 4:5, geen kaart eromheen, geen witte achtergrond,
// geen schaduw. Titel in type-h3, plaatsnaam eronder in type-body kleur
// ink-2. Daaronder een auditlijn (quiet) met de echte velden. Geen tags,
// geen prijs, geen knop — de hele kaart is de link.
//
// Hover: beeld schaalt 1.03 over 700ms, verder niets.
//
// Alleen velden die er zijn worden getoond. Geen placeholder-tekst.

import type { ComponentProps } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { AuditLijn } from '@/components/AuditLijn'

// next-intl's typed Link vertaalt het pandpad naar de juiste locale-URL.
// Callers geven het canonieke pattern: { pathname: '/collectie/[id]',
// params: { id } }. Zonder deze typering vervalt de kaart op
// /en/collection terug naar /collectie/[id] (NL) — dat was de oorzaak
// dat elke EN-pand-URL nul interne inkomende links had.
type LinkHref = ComponentProps<typeof Link>['href']

interface Props {
  href: LinkHref
  beeld: string
  beeldAlt: string
  titel: string
  plaats: string
  /** Reeds geformatteerde meta-items, in gewenste volgorde. Lege waarden
   *  worden hier eruit gefilterd zodat de AuditLijn geen crash krijgt en
   *  er geen placeholder verschijnt. */
  auditItems: string[]
}

export function PandKaart({ href, beeld, beeldAlt, titel, plaats, auditItems }: Props) {
  const items = auditItems.filter((it) => typeof it === 'string' && it.trim() !== '')

  return (
    <Link
      href={href}
      aria-label={`bekijk ${titel}`}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={beeld}
          alt={beeldAlt}
          fill
          className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="mt-mw-4">
        <h3 className="text-h3 text-moroww-dark">{titel}</h3>
        <p className="mt-1 text-body text-moroww-ink-2">{plaats}</p>
      </div>
      {items.length > 0 && (
        <div className="mt-mw-4">
          <AuditLijn density="quiet" items={items} />
        </div>
      )}
    </Link>
  )
}

/** Formatteert een ISO-datum (of jaar-maand) naar 'MM.YYYY'.
 *  Ongeldige input geeft null zodat de aanroeper het item kan weglaten. */
export function formatAuditMaand(iso: string | undefined | null): string | null {
  if (!iso) return null
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  return `${mm}.${d.getFullYear()}`
}
