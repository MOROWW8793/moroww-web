import Image from 'next/image'
import { Bath, BedDouble, Car, Check, Flame, KeyRound, Minus, Ruler, Sun, Umbrella, Users, Waves, WavesLadder } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { lw, sortForCollectie, type Locale, type Woning } from '@/lib/woningen'
import { kenmerkenVan, KENMERK_LABELS, type Kenmerk } from '@/lib/kenmerken'

// Collectie-overzicht (nov 2026): per woning in één oogopslag wat ze te
// bieden heeft, plus een tabel om alles naast elkaar te leggen.

const ICOON: Record<Kenmerk, LucideIcon> = {
  zeezicht: Waves,
  strand: Umbrella,
  zwembad: WavesLadder,
  wellness: Flame,
  buiten: Sun,
  parking: Car,
  smartlock: KeyRound,
}

const T = {
  nl: {
    slk: (n: number) => (n === 1 ? '1 slaapkamer' : `${n} slaapkamers`),
    badk: (n: number) => (n === 1 ? '1 badkamer' : `${n} badkamers`),
    gasten: (n: number) => `tot ${n} gasten`,
    vanaf: 'vanaf', nacht: '/ nacht', bekijk: 'bekijk woning', boek: 'bekijk data en boek', nieuw: 'nieuw',
    tabelKop: 'alles op een rij', tabelIntro: 'Leg de huizen naast elkaar en kies wat bij je verblijf past.',
    kol: { woning: 'woning', streek: 'streek', m2: 'm²', slk: 'slaapk.', badk: 'badk.', gasten: 'gasten', prijs: 'vanaf / nacht' },
    ja: 'ja', nee: 'nee', opAanvraag: 'bekijk data',
  },
  en: {
    slk: (n: number) => (n === 1 ? '1 bedroom' : `${n} bedrooms`),
    badk: (n: number) => (n === 1 ? '1 bathroom' : `${n} bathrooms`),
    gasten: (n: number) => `up to ${n} guests`,
    vanaf: 'from', nacht: '/ night', bekijk: 'see the home', boek: 'see dates and book', nieuw: 'new',
    tabelKop: 'everything side by side', tabelIntro: 'Put the homes next to each other and choose what fits your stay.',
    kol: { woning: 'home', streek: 'region', m2: 'm²', slk: 'bedr.', badk: 'bathr.', gasten: 'guests', prijs: 'from / night' },
    ja: 'yes', nee: 'no', opAanvraag: 'see dates',
  },
}

const TABEL_KENMERKEN: Kenmerk[] = ['zeezicht', 'zwembad', 'buiten', 'parking']

function Feit({ icoon: I, children }: { icoon: LucideIcon; children: React.ReactNode }) {
  return (
    <li className="inline-flex items-center gap-2 text-body text-moroww-dark">
      <I aria-hidden className="h-4 w-4 shrink-0 text-moroww-ink-2" strokeWidth={1.5} />
      {children}
    </li>
  )
}

function Kaart({ w, locale, priority }: { w: Woning; locale: Locale; priority: boolean }) {
  const t = T[locale]
  const kenmerken = kenmerkenVan(w)
  const tags = w.tags.map((tg) => lw(tg, locale))
  return (
    <article className="flex flex-col">
      <Link href={{ pathname: '/collectie/[id]', params: { id: w.id } }} className="group block" aria-label={w.naam}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={w.heroFoto}
            alt={w.naam}
            fill
            priority={priority}
            className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.02] motion-reduce:group-hover:scale-100"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <span className="absolute left-3 top-3 bg-moroww-paper/95 px-2.5 py-1 text-[0.8125rem] text-moroww-dark">
            {w.collectie}
            {w.nieuw ? ` · ${t.nieuw}` : ''}
          </span>
        </div>
      </Link>

      <div className="mt-mw-4 flex items-baseline justify-between gap-mw-4">
        <div>
          <h2 className="text-h2 font-light text-moroww-dark">{w.naam}</h2>
          <p className="mt-1 text-body text-moroww-ink-2">{w.locatie}</p>
        </div>
        {w.prijs ? (
          <p className="shrink-0 text-right text-body text-moroww-dark">
            <span className="text-moroww-ink-2">{t.vanaf} </span>€{w.prijs}
            <span className="text-moroww-ink-2"> {t.nacht}</span>
          </p>
        ) : null}
      </div>

      <ul className="mt-mw-4 flex flex-wrap gap-x-mw-5 gap-y-mw-2 border-t border-moroww-dark/15 pt-mw-4">
        {w.oppervlakte ? <Feit icoon={Ruler}>{w.oppervlakte}</Feit> : null}
        {w.slaapkamers ? <Feit icoon={BedDouble}>{t.slk(w.slaapkamers)}</Feit> : null}
        {w.badkamers ? <Feit icoon={Bath}>{t.badk(w.badkamers)}</Feit> : null}
        {w.maxGasten ? <Feit icoon={Users}>{t.gasten(w.maxGasten)}</Feit> : null}
      </ul>

      {kenmerken.length > 0 && (
        <ul className="mt-mw-3 flex flex-wrap gap-2">
          {kenmerken.map((k) => {
            const I = ICOON[k]
            return (
              <li key={k} className="inline-flex items-center gap-1.5 border border-moroww-dark/15 px-2.5 py-1 text-[0.875rem] text-moroww-dark">
                <I aria-hidden className="h-3.5 w-3.5" strokeWidth={1.5} />
                {KENMERK_LABELS[k][locale]}
              </li>
            )
          })}
        </ul>
      )}

      {tags.length > 0 && <p className="mt-mw-3 text-[0.9375rem] text-moroww-ink-2">{tags.join(' · ')}</p>}

      <div className="mt-mw-4 flex flex-wrap gap-mw-3">
        <Link
          href={{ pathname: '/collectie/[id]', params: { id: w.id }, hash: 'boeken' }}
          className="inline-flex items-center min-h-[48px] px-mw-4 py-3 bg-moroww-orange text-moroww-dark text-[0.9375rem] font-semibold hover:bg-moroww-orange/85 transition-colors"
        >
          {t.boek}
        </Link>
        <Link
          href={{ pathname: '/collectie/[id]', params: { id: w.id } }}
          className="inline-flex items-center min-h-[48px] px-mw-4 py-3 border border-moroww-dark/30 text-moroww-dark text-[0.9375rem] hover:border-moroww-dark transition-colors"
        >
          {t.bekijk}
        </Link>
      </div>
    </article>
  )
}

export function CollectieOverzicht({ woningen, locale }: { woningen: Woning[]; locale: Locale }) {
  const t = T[locale]
  const lijst = sortForCollectie(woningen)
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-mw-6 gap-y-mw-8">
        {lijst.map((w, i) => (
          <Kaart key={w.id} w={w} locale={locale} priority={i < 2} />
        ))}
      </div>

      <section className="mt-mw-8 lg:mt-mw-10" aria-labelledby="tabel-kop">
        <h2 id="tabel-kop" className="text-h2 font-light text-moroww-dark">{t.tabelKop}</h2>
        <p className="mt-mw-2 text-body text-moroww-ink-2">{t.tabelIntro}</p>
        <div className="mt-mw-5 overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
          <table className="w-full min-w-[56rem] text-left text-body">
            <thead>
              <tr className="border-b border-moroww-dark/30 text-[0.875rem] text-moroww-ink-2">
                <th scope="col" className="py-3 pr-4 font-normal">{t.kol.woning}</th>
                <th scope="col" className="py-3 pr-4 font-normal">{t.kol.streek}</th>
                <th scope="col" className="py-3 pr-4 font-normal">{t.kol.m2}</th>
                <th scope="col" className="py-3 pr-4 font-normal">{t.kol.slk}</th>
                <th scope="col" className="py-3 pr-4 font-normal">{t.kol.badk}</th>
                <th scope="col" className="py-3 pr-4 font-normal">{t.kol.gasten}</th>
                {TABEL_KENMERKEN.map((k) => (
                  <th key={k} scope="col" className="py-3 pr-4 font-normal">{KENMERK_LABELS[k][locale]}</th>
                ))}
                <th scope="col" className="py-3 font-normal text-right">{t.kol.prijs}</th>
              </tr>
            </thead>
            <tbody>
              {lijst.map((w) => {
                const k = kenmerkenVan(w)
                return (
                  <tr key={w.id} className="border-b border-moroww-dark/10">
                    <th scope="row" className="py-3 pr-4 font-normal">
                      <Link href={{ pathname: '/collectie/[id]', params: { id: w.id } }} className="text-moroww-dark underline underline-offset-[5px] decoration-moroww-dark/25 hover:decoration-moroww-dark">
                        {w.naam}
                      </Link>
                      <span className="block text-[0.875rem] text-moroww-ink-2">{w.locatie}</span>
                    </th>
                    <td className="py-3 pr-4 text-moroww-ink-2">{w.collectie}</td>
                    <td className="py-3 pr-4">{w.oppervlakte ?? '–'}</td>
                    <td className="py-3 pr-4">{w.slaapkamers ?? '–'}</td>
                    <td className="py-3 pr-4">{w.badkamers ?? '–'}</td>
                    <td className="py-3 pr-4">{w.maxGasten ?? '–'}</td>
                    {TABEL_KENMERKEN.map((kk) => (
                      <td key={kk} className="py-3 pr-4">
                        {k.includes(kk) ? (
                          <Check aria-label={t.ja} className="h-4 w-4 text-moroww-dark" strokeWidth={1.75} />
                        ) : (
                          <Minus aria-label={t.nee} className="h-4 w-4 text-moroww-dark/25" strokeWidth={1.5} />
                        )}
                      </td>
                    ))}
                    <td className="py-3 text-right">
                      {w.prijs ? `€${w.prijs}` : (
                        <Link href={{ pathname: '/collectie/[id]', params: { id: w.id }, hash: 'boeken' }} className="text-[0.9375rem] underline underline-offset-[5px] decoration-moroww-dark/25">{t.opAanvraag}</Link>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
