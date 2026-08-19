// Gedeelde artikelchroom voor de kennispagina's.
//
// Alle pagina's in `/kennis` hebben dezelfde opbouw: eyebrow met breadcrumb,
// hero met H1 en één sub-alinea, dan het korte antwoord in een kader dat als
// eerste door antwoordmachines wordt gelezen, en tot slot de body.

import Link from 'next/link'
import type { ReactNode } from 'react'

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
      <section className="w-full pt-28 pb-8 md:pt-36 md:pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          {terug ? (
            <Link
              href={terug.href}
              className="inline-block text-xs uppercase tracking-widest text-[#C08D6E] mb-6 hover:text-[#1A1A1A] transition-colors"
            >
              ← {terug.label}
            </Link>
          ) : (
            <p className="text-xs uppercase tracking-widest text-[#C08D6E] mb-6">{eyebrow}</p>
          )}
          <h1
            className="font-bold text-[#1A1A1A] leading-[1.05] tracking-[-0.02em] mb-10"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}
          >
            {titel}
          </h1>
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-moroww-brown/15">
            <p className="text-xs uppercase tracking-widest text-[#C08D6E] mb-3">Het korte antwoord</p>
            <p className="text-[#1A1A1A] leading-relaxed" style={{ fontSize: 18 }}>
              {korteAntwoord}
            </p>
          </div>
        </div>
      </section>

      <article className="w-full pb-16 px-6">
        <div className="max-w-3xl mx-auto prose-kennis">
          {children}
        </div>
      </article>
    </>
  )
}
