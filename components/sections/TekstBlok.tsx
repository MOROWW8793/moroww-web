// Twee-koloms tekst-sectie: eyebrow en kop links, body rechts vanaf lg.
// Op smaller schermen stapelt alles onder elkaar. Vervangt de eerdere
// GridSectie waar de kop en de body op één kolom stonden en de eyebrow
// als apart regeltje boven de kop verscheen.
//
// Container en horizontale padding komt van de caller — dit blok gaat
// binnen een <div className="mx-auto max-w-6xl px-6 md:px-12">-wrapper.

import type { ReactNode } from 'react'
import { AuditLijn } from '@/components/AuditLijn'

interface Props {
  /** Kleine tekst-eyebrow boven de kop (via AuditLijn). Optioneel. */
  eyebrow?: string
  /** Kop van het blok. Optioneel — sommige secties zijn eyebrow-only. */
  heading?: string
  /** Kop-niveau. Default h2. Gebruik h3 voor sub-secties. */
  headingLevel?: 'h2' | 'h3'
  /** Body-inhoud (paragrafen, lijsten, links, etc.). */
  children: ReactNode
}

export function TekstBlok({ eyebrow, heading, headingLevel = 'h2', children }: Props) {
  const headingClass = `text-moroww-dark ${headingLevel === 'h2' ? 'text-h2' : 'text-h3'}`
  return (
    <section className="w-full py-mw-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-mw-6">
        <div className="lg:col-span-4">
          {eyebrow && <AuditLijn density="quiet" items={[eyebrow]} />}
          {heading && (
            headingLevel === 'h2'
              ? <h2 className={`mt-mw-4 ${headingClass}`}>{heading}</h2>
              : <h3 className={`mt-mw-4 ${headingClass}`}>{heading}</h3>
          )}
        </div>
        <div className="lg:col-span-8 mt-mw-4 lg:mt-0 max-w-[62ch] text-body text-moroww-dark space-y-mw-3">
          {children}
        </div>
      </div>
    </section>
  )
}
