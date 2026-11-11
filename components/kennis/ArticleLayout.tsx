// Gedeelde artikelchroom voor de kennispagina's.
//
// Opbouw: afgeronde fotoplaat met terugpad en H1, het korte antwoord als
// licht glas onderaan de plaat, en de body in de tekstkolom. Het beeld volgt
// het cluster (eyebrow), tenzij de pagina er zelf een meegeeft.

import Link from 'next/link'
import type { ReactNode } from 'react'
import { KennisHero, type KennisBeeld } from '@/components/kennis/KennisHero'

const CLUSTERBEELD: Record<string, KennisBeeld> = {
  'regels en vergunningen': { src: '/images/standaard/V2-56.jpg', alt: 'Een interieurboek op een stenen tafel in een moroww-huis' },
  'opbrengst en rendement': { src: '/images/standaard/V2-210.jpg', alt: 'Een glas met citrus op een stenen blad' },
  'kiezen hoe je verhuurt': { src: '/images/over-hero.jpg', alt: 'Leefruimte van een moroww-huis' },
  'wat het label anders doet': { src: '/images/standaard/V2-12.jpg', alt: 'Handdoeken worden klaargelegd op een opgemaakt bed' },
}
const STANDAARDBEELD: KennisBeeld = { src: '/images/collectie-4.jpg', alt: 'Interieur van een moroww-huis' }

interface Props {
  /** Cluster of paginatype boven de H1. Kiest ook het beeld. */
  eyebrow: string
  /** Volledige titel — één lange zin, niet verkort. */
  titel: string
  /** Korte antwoord, 40–60 woorden. Wordt hergebruikt in FAQ- en meta-blokken. */
  korteAntwoord: string
  /** Optionele bovenkopregel met terugpad naar de kennisbank-hub. */
  terug?: { href: string; label: string }
  beeld?: KennisBeeld
  children: ReactNode
}

export function ArticleLayout({ eyebrow, titel, korteAntwoord, terug, beeld, children }: Props) {
  const b = beeld ?? CLUSTERBEELD[eyebrow] ?? STANDAARDBEELD
  return (
    <>
      <KennisHero
        beelden={[b]}
        onder={
          <div className="mt-8 max-w-3xl rounded-3xl border border-white/70 bg-white/75 p-6 md:p-8 text-moroww-dark backdrop-blur-xl backdrop-saturate-150 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
            <p className="text-audit text-moroww-label-tekst">het korte antwoord</p>
            <p className="mt-3 text-body-lg text-moroww-dark">{korteAntwoord}</p>
          </div>
        }
      >
        <div className="flex flex-wrap items-center gap-2 text-audit">
          {terug && (
            <Link
              href={terug.href}
              className="inline-flex items-center rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-white backdrop-blur-md hover:bg-white/25 transition-colors"
            >
              ← {terug.label}
            </Link>
          )}
          <span className="text-white/80">{eyebrow}</span>
        </div>
        <h1
          className="mt-5 max-w-[22ch] font-semibold text-white leading-[1.02] tracking-[-0.025em] drop-shadow-md"
          style={{ fontSize: 'clamp(2.1rem, 5vw, 4rem)' }}
        >
          {titel}
        </h1>
      </KennisHero>

      <article className="w-full pt-mw-8 pb-16 px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="prose-kennis">
            {children}
          </div>
        </div>
      </article>
    </>
  )
}
