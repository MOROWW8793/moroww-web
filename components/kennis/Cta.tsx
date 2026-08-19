// De vijf CTA-blokken uit de kennisbank-blueprint.
//
// Kop en tekst liggen vast; alleen de openingszin (`intro`) varieert per
// pagina en per sectie. Zo hoort een CTA nooit als losse knoppen in de body
// geschreven te worden — dat maakt van de kennisbank een verkooppagina.

import Link from 'next/link'
import type { ReactNode } from 'react'

type CtaKind = 'poortentoets' | 'rekenmodule' | 'vraag' | 'gesprek'

interface Props {
  kind: CtaKind
  intro?: string
}

interface Variant {
  title: string
  body: string
  label: string
  href: string
  external: boolean
}

// Bewust expliciet — vroegere lookup via CONFIG[kind].label brak silently
// wanneer één veld leeg raakte en gaf een pill zonder tekst. Nu is elk
// veld type-verplicht en direct zichtbaar in de source.
const VARIANTS: Record<CtaKind, Variant> = {
  poortentoets: {
    title:    'Haalt jouw woning de standaard?',
    body:     'moroww neemt woningen op na een fysieke inspectie. De toets geeft je in twee minuten hetzelfde oordeel dat wij ter plaatse vellen, op de punten die je zelf kan nagaan.',
    label:    'Doe de poortentoets',
    href:     '/eigenaar-worden#poortentoets',
    external: false,
  },
  rekenmodule: {
    title:    'Wat levert jouw woning op?',
    body:     'Reken het door met echte cijfers uit de collectie, en met alle kosten erin. Ook die van ons.',
    label:    'Bereken je opbrengst',
    href:     '/kennis/rendement-vakantiewoning-berekenen',
    external: false,
  },
  vraag: {
    title:    'Niet zeker over jouw situatie?',
    body:     'Stuur je vraag naar info@moroww.com. We antwoorden binnen twee werkdagen, ook als je woning niet in aanmerking komt voor de collectie.',
    label:    'Stel je vraag',
    href:     'mailto:info@moroww.com',
    external: true,
  },
  gesprek: {
    title:    'Liever meteen iemand spreken?',
    body:     'Kies zelf een moment voor een digitaal gesprek van twintig minuten.',
    label:    'Kies een moment',
    href:     'https://calendar.app.google/BH8wYeA9AGf6KrUz7',
    external: true,
  },
}

function Knop({
  href,
  external,
  isPrimary,
  children,
}: {
  href: string
  external: boolean
  isPrimary: boolean
  children: ReactNode
}) {
  const cls = `inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-semibold transition-colors ${
    isPrimary
      ? 'bg-moroww-orange text-moroww-dark hover:bg-moroww-orange/85'
      : 'bg-moroww-dark text-white hover:bg-moroww-dark/85'
  }`
  if (external) {
    const isMail = href.startsWith('mailto:')
    return (
      <a
        href={href}
        target={isMail ? undefined : '_blank'}
        rel={isMail ? undefined : 'noopener noreferrer'}
        className={cls}
      >
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  )
}

export function Cta({ kind, intro }: Props) {
  const v = VARIANTS[kind]
  const isPrimary = kind === 'poortentoets'

  return (
    <aside
      className={`my-12 rounded-2xl p-8 md:p-10 ${
        isPrimary
          ? 'bg-moroww-dark text-white'
          : 'bg-white/70 border border-moroww-brown/20 text-moroww-dark'
      }`}
    >
      <h3
        className={`font-bold leading-tight mb-3 ${isPrimary ? 'text-white' : 'text-moroww-dark'}`}
        style={{ fontSize: 'clamp(1.25rem, 2vw, 1.5rem)' }}
      >
        {v.title}
      </h3>
      <p
        className={`leading-relaxed mb-6 ${isPrimary ? 'text-white/75' : 'text-moroww-dark/75'}`}
        style={{ fontSize: 17 }}
      >
        {intro ? `${intro} ` : ''}
        {v.body}
      </p>
      <Knop href={v.href} external={v.external} isPrimary={isPrimary}>
        <span>{v.label}</span>
        <span aria-hidden>→</span>
      </Knop>
    </aside>
  )
}

interface VerderLezenItem {
  href: string
  title: string
  eyebrow?: string
}

// CTA-E · verder lezen. Vier tegels: drie gerelateerde pagina's plus altijd
// de poortentoets als vierde, per blueprint.
export function VerderLezen({ items }: { items: VerderLezenItem[] }) {
  const withPoort: VerderLezenItem[] = [
    ...items.slice(0, 3),
    { href: '/eigenaar-worden#poortentoets', title: 'Doe de poortentoets', eyebrow: 'in twee minuten' },
  ]
  return (
    <section className="my-16 border-t border-moroww-brown/20 pt-12">
      <p className="text-xs uppercase tracking-widest text-moroww-label mb-6">verder lezen</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {withPoort.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className="block bg-white rounded-2xl p-6 hover:shadow-md transition-shadow"
          >
            {it.eyebrow && (
              <p className="text-[11px] uppercase tracking-widest text-moroww-label mb-2">{it.eyebrow}</p>
            )}
            <p className="text-moroww-dark font-semibold leading-snug">{it.title} →</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
