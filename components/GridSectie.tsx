// Register-sectie: sectietitel als eyebrow boven de kop, één tekstkolom
// links uitgelijnd op het raster, hairline op de breedte van die kolom.
//
// De vroegere 12-koloms-variant met sticky sidebar-titel is teruggedraaid:
// die herhaalde de H2 en liet naast korte secties een leeg vlak van meer
// dan 1000px achter. Deze layout leest natuurlijker en houdt de hairline
// nooit langer dan de inhoud.

import type { ReactNode } from 'react'

interface Props {
  titel: string
  children: ReactNode
  /** Wanneer true: geen hairline erboven (voor de eerste sectie). */
  geenHairline?: boolean
  /** Wanneer true: geen 62ch-cap op de inhoud. Gebruiken bij secties met
   *  een intern raster (bv. de tech-tegels op /de-standaard) die anders
   *  te krap zouden zijn. */
  breed?: boolean
}

export function GridSectie({ titel, children, geenHairline, breed }: Props) {
  return (
    <section className="mt-mw-8 mb-mw-6">
      <div className={breed ? '' : 'max-w-[62ch]'}>
        {!geenHairline && (
          <hr
            className="mb-mw-5 border-0 border-t border-moroww-rule"
            aria-hidden
          />
        )}
        <p className="text-audit uppercase text-moroww-ink-2 mb-mw-3">
          {titel}
        </p>
        {children}
      </div>
    </section>
  )
}
