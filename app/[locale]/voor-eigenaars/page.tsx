import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { setRequestLocale } from 'next-intl/server'
import { Logo, MerkTeken } from '@/components/merk/Logo'

export const metadata: Metadata = {
  title: 'voor eigenaars',
  description:
    'Wat moroww voor eigenaars doet: het label voor je huis, moroww advisory voor de vraag waar je op vastloopt, en moroww hub met partners en academy.',
  alternates: { canonical: 'https://www.moroww.com/voor-eigenaars' },
}

type Tak = {
  merk: ReactNode
  kleur: string
  titel: string
  tekst: string
  href: string
  knop: string
}

const takken: Tak[] = [
  {
    merk: <Logo height={22} />,
    kleur: '#fea05e',
    titel: 'jouw huis met het label.',
    tekst:
      'We komen persoonlijk langs, kennen het label toe en zetten het in de collectie op moroww.com, met een rechtstreekse link naar je eigen boekingssite.',
    href: '/het-label',
    knop: 'over het label',
  },
  {
    merk: <MerkTeken merk="advisory" op="licht" size={28} />,
    kleur: '#fea05e',
    titel: 'loop je ergens op vast?',
    tekst:
      'Een vergunning, een opstart, een eigen boekingssite: elke vraag is anders. We kijken naar jouw situatie en stellen voor wat nodig is.',
    href: '/advisory',
    knop: 'naar moroww advisory',
  },
  {
    merk: <MerkTeken merk="hub" op="licht" size={28} />,
    kleur: '#fea05e',
    titel: 'partners, academy en market.',
    tekst:
      'Merken, vakmensen en tools met voordelen voor leden, en sessies van hosts voor hosts.',
    href: '/hub',
    knop: 'naar moroww hub',
  },
]

export default async function VoorEigenaarsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="bg-moroww-paper">
      {/* KOP */}
      <section className="w-full px-6 md:px-12 pt-mw-10 pb-mw-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-audit text-moroww-label-tekst">voor eigenaars</p>
          <h1 className="mt-mw-4 text-h2 md:text-[clamp(2.5rem,5vw,4.5rem)] md:leading-[1] text-moroww-dark max-w-[18ch]">
            drie manieren waarop moroww je helpt.
          </h1>
          <p className="mt-mw-5 text-body-lg text-moroww-dark max-w-mw-eigenaar">
            Het label laat gasten zien dat je huis klopt. moroww hub brengt je bij vakmensen, merken en andere hosts, en
            regelt wat je huis nodig heeft. moroww advisory helpt als je start of ergens op vastloopt. Kies wat past, of
            combineer.
          </p>
        </div>
      </section>

      {/* DE DRIE TAKKEN */}
      <section className="w-full px-6 md:px-12 pb-mw-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-mw-5">
          {takken.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group flex flex-col bg-white border border-moroww-rule p-mw-6 hover:border-moroww-dark transition-colors"
              style={{ borderTop: `4px solid ${t.kleur}` }}
            >
              <span className="h-12 flex items-center">{t.merk}</span>
              <h2 className="mt-mw-5 text-h3 text-moroww-dark">{t.titel}</h2>
              <p className="mt-mw-3 text-body text-moroww-ink-2">{t.tekst}</p>
              <span className="mt-auto pt-mw-6 text-body text-moroww-dark underline underline-offset-4 decoration-moroww-label group-hover:decoration-moroww-dark">
                {t.knop}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* VERDER */}
      <section className="w-full px-6 md:px-12 py-mw-8 mb-mw-8 border-t border-moroww-rule">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-mw-6">
          <div>
            <p className="text-audit text-moroww-label-tekst">kennisbank</p>
            <h2 className="mt-mw-2 text-h3 text-moroww-dark">eerst zelf lezen?</h2>
            <p className="mt-mw-3 text-body text-moroww-ink-2">
              Regels en belasting, wat een nacht kost, verzekering, de vier manieren om te verhuren. Alles wat we weten,
              in gewone taal.
            </p>
            <div className="mt-mw-5 flex flex-wrap gap-3">
              <Link href="/kennis" className="inline-flex items-center min-h-[48px] bg-moroww-orange text-moroww-dark px-6 text-body font-semibold">
                naar de kennisbank
              </Link>
              <a
                href="https://calendar.app.google/BH8wYeA9AGf6KrUz7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center min-h-[48px] border border-moroww-dark text-moroww-dark px-6 text-body"
              >
                of plan een gesprek
              </a>
            </div>
          </div>
          <div>
            <h2 className="text-h3 text-moroww-dark">je beheert huizen voor anderen?</h2>
            <p className="mt-mw-3 text-body text-moroww-ink-2">
              Voor property managers is er moroww hub: de partners, het label en de academy voor je hele portefeuille.
            </p>
            <Link
              href="/hub/property-managers"
              className="mt-mw-5 inline-block text-body text-moroww-dark underline underline-offset-4 decoration-moroww-label"
            >
              hub voor property managers
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
