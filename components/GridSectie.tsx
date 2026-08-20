// Register-sectie in het 12-koloms raster.
//
// Vanaf lg (1024px):
//   kolom 1-3   sticky sectietitel in text-audit ink-2
//   kolom 4-10  inhoud (kop + body), max 62ch
//   kolom 11-12 leeg (marge)
//   hairline    spant kolom 1-10 en zit boven de inhoud
//
// Onder lg vervalt het raster: sectietitel boven de kop, hairline over
// de volledige kolom.

import type { ReactNode } from 'react'

interface Props {
  titel: string
  children: ReactNode
  /** Wanneer true: geen hairline erboven (voor de eerste sectie). */
  geenHairline?: boolean
}

export function GridSectie({ titel, children, geenHairline }: Props) {
  return (
    <section className="mt-mw-8 mb-mw-6 lg:grid lg:grid-cols-12 lg:gap-mw-5">
      {!geenHairline && (
        <hr
          className="lg:col-span-10 lg:col-start-1 mb-mw-4 lg:mb-mw-5 border-0 border-t border-moroww-rule"
          aria-hidden
        />
      )}
      <p className="text-audit uppercase text-moroww-ink-2 lg:col-span-3 lg:col-start-1 lg:sticky lg:top-24 lg:self-start mb-mw-3 lg:mb-0">
        {titel}
      </p>
      <div className="lg:col-span-7 lg:col-start-4 max-w-[62ch]">
        {children}
      </div>
    </section>
  )
}
