// Gedeelde artikelchroom voor de kennispagina's.
//
// Opbouw: eyebrow met breadcrumb, hero met H1, dan het korte antwoord —
// geen kader, geen achtergrond, één auditlijn boven het label — en tot
// slot de body.
//
// Kolommen gebruiken het register-column-patroon: outer mx-auto max-w-6xl
// centreert het gebied op zeer brede schermen, inner .register-column
// beperkt de tekstkolom tot 68ch en centreert zichzelf vanaf 1440px.

import Link from 'next/link'
import type { ReactNode } from 'react'
import { AuditLijn } from '@/components/AuditLijn'

interface Props {
  /** Cluster of paginatype boven de H1, in caps. */
  eyebrow: string
  /** Volledige titel — één lange zin, niet verkort. */
  titel: string
  /** Korte antwoord, 40–60 woorden. Wordt hergebruikt in FAQ- en meta-blokken. */
  korteAntwoord: string
  /** Optionele bovenkopregel met terugpad naar de kennisbank-hub. */
  terug?: { href: string; label: string }
  children: ReactNode
}

export function ArticleLayout({ eyebrow, titel, korteAntwoord, terug, children }: Props) {
  return (
    <>
      <section className="w-full pt-28 pb-8 md:pt-36 md:pb-12 px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="register-column">
            {terug ? (
              <Link
                href={terug.href}
                className="inline-block text-xs uppercase tracking-widest text-moroww-label mb-6 hover:text-moroww-dark transition-colors"
              >
                ← {terug.label}
              </Link>
            ) : (
              <p className="text-xs uppercase tracking-widest text-moroww-label mb-6">{eyebrow}</p>
            )}
            <h1
              className="font-bold text-moroww-dark leading-[1.05] tracking-[-0.02em] mb-10"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}
            >
              {titel}
            </h1>
            <AuditLijn density="quiet" items={['het korte antwoord']} />
            <p className="mt-6 text-body-lg text-moroww-dark">
              {korteAntwoord}
            </p>
          </div>
        </div>
      </section>

      <article className="w-full pb-16 px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="register-column prose-kennis">
            {children}
          </div>
        </div>
      </article>
    </>
  )
}
