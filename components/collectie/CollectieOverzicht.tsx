import Image from 'next/image'
import { Check, Minus } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { lw, sortForCollectie, type Locale, type Woning } from '@/lib/woningen'
import { kenmerkenVan, KENMERK_LABELS, type Kenmerk } from '@/lib/kenmerken'

// Collectie-overzicht (nov 2026): per woning in één oogopslag wat ze te
// bieden heeft, plus een tabel om alles naast elkaar te leggen.

const T = {
  nl: {
    slk: (n: number) => (n === 1 ? '1 slaapkamer' : `${n} slaapkamers`),
    badk: (n: number) => (n === 1 ? '1 badkamer' : `${n} badkamers`),
    gasten: (n: number) => `tot ${n} gasten`,
    vanaf: 'vanaf', nacht: '/ nacht', bekijk: 'bekijk woning', boek: 'boek', nieuw: 'nieuw',
    tabelKop: 'alles op een rij', tabelIntro: 'Leg de huizen naast elkaar en kies wat bij je verblijf past.',
    kol: { woning: 'woning', streek: 'streek', m2: 'm²', slk: 'slaapk.', badk: 'badk.', gasten: 'gasten', prijs: 'vanaf / nacht' },
    ja: 'ja', nee: 'nee', opAanvraag: 'bekijk data',
  },
  en: {
    slk: (n: number) => (n === 1 ? '1 bedroom' : `${n} bedrooms`),
    badk: (n: number) => (n === 1 ? '1 bathroom' : `${n} bathrooms`),
    gasten: (n: number) => `up to ${n} guests`,
    vanaf: 'from', nacht: '/ night', bekijk: 'see the home', boek: 'book', nieuw: 'new',
    tabelKop: 'everything side by side', tabelIntro: 'Put the homes next to each other and choose what fits your stay.',
    kol: { woning: 'home', streek: 'region', m2: 'm²', slk: 'bedr.', badk: 'bathr.', gasten: 'guests', prijs: 'from / night' },
    ja: 'yes', nee: 'no', opAanvraag: 'see dates',
  },
}

const TABEL_KENMERKEN: Kenmerk[] = ['zeezicht', 'zwembad', 'buiten', 'parking']

function feitenLijn(w: Woning, locale: Locale) {
  const t = T[locale]
  return [
    w.oppervlakte ?? '',
    w.slaapkamers ? t.slk(w.slaapkamers) : '',
    w.badkamers ? t.badk(w.badkamers) : '',
    w.maxGasten ? t.gasten(w.maxGasten) : '',
  ].filter(Boolean).join('  ·  ')
}

const TEKSTLINK = 'inline-flex items-center min-h-[44px] text-[0.9375rem] text-moroww-dark underline underline-offset-[6px] decoration-moroww-dark/30 hover:decoration-moroww-dark transition-colors'

// Raster (collectiepagina): beeld, naam, één regel feiten, één regel
// kenmerken in woorden, twee tekstlinks. Geen badges, geen iconen.
function Kaart({ w, locale, priority }: { w: Woning; locale: Locale; priority: boolean }) {
  const t = T[locale]
  const kenmerken = kenmerkenVan(w).map((k) => KENMERK_LABELS[k][locale])
  return (
    <article className="flex flex-col">
      <Link href={{ pathname: '/collectie/[id]', params: { id: w.id } }} className="group block" aria-label={w.naam}>
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={w.heroFoto}
            alt={w.naam}
            fill
            priority={priority}
            className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.02] motion-reduce:group-hover:scale-100"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </Link>
      <p className="mt-mw-4 text-[0.875rem] text-moroww-ink-2">{w.collectie}{w.nieuw ? `  ·  ${t.nieuw}` : ''}</p>
      <h2 className="mt-1 text-h2 font-light text-moroww-dark">{w.naam}</h2>
      <p className="mt-1 text-body text-moroww-ink-2">{w.locatie}</p>
      <p className="mt-mw-3 text-body text-moroww-dark">{feitenLijn(w, locale)}</p>
      {kenmerken.length > 0 && <p className="mt-1 text-body text-moroww-ink-2">{kenmerken.join(', ')}</p>}
      <div className="mt-mw-3 flex flex-wrap items-center gap-x-mw-5">
        <Link href={{ pathname: '/collectie/[id]', params: { id: w.id }, hash: 'boeken' }} className={TEKSTLINK}>
          {w.prijs ? `${t.vanaf} €${w.prijs} ${t.nacht}  ·  ${t.boek} →` : `${t.boek} →`}
        </Link>
      </div>
    </article>
  )
}

// Verhaal (homepage): elk huis als een hoofdstuk. Groot beeld, naam in
// de dunne letter, de slogan van het huis, feiten in één regel.
function Hoofdstuk({ w, locale, i }: { w: Woning; locale: Locale; i: number }) {
  const t = T[locale]
  const rechts = i % 2 === 1
  const kenmerken = kenmerkenVan(w).map((k) => KENMERK_LABELS[k][locale])
  return (
    <article className="grid grid-cols-1 lg:grid-cols-12 gap-mw-5 lg:gap-mw-6 items-end">
      <Link
        href={{ pathname: '/collectie/[id]', params: { id: w.id } }}
        aria-label={w.naam}
        className={`group block lg:col-span-7 ${rechts ? 'lg:order-2 lg:col-start-6' : ''}`}
      >
        <div className="relative aspect-[4/5] sm:aspect-[5/4] overflow-hidden">
          <Image
            src={w.heroFoto}
            alt={w.naam}
            fill
            priority={i === 0}
            className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.02] motion-reduce:group-hover:scale-100"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        </div>
      </Link>
      <div className={`lg:col-span-4 ${rechts ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-9'} pb-mw-2`}>
        <p className="text-[0.875rem] text-moroww-ink-2">
          {String(i + 1).padStart(2, '0')}  ·  {w.collectie}  ·  {w.locatie}
        </p>
        <h2 className="mt-mw-3 text-h2 lg:text-[3rem] lg:leading-[1.02] font-light text-moroww-dark">{w.naam}</h2>
        <p className="mt-mw-3 text-body-lg text-moroww-dark">{lw(w.slogan, locale)}</p>
        <p className="mt-mw-4 text-body text-moroww-ink-2">{feitenLijn(w, locale)}</p>
        {kenmerken.length > 0 && <p className="mt-1 text-body text-moroww-ink-2">{kenmerken.join(', ')}</p>}
        <div className="mt-mw-4 flex flex-col items-start">
          <Link href={{ pathname: '/collectie/[id]', params: { id: w.id }, hash: 'boeken' }} className={TEKSTLINK}>
            {w.prijs ? `${t.vanaf} €${w.prijs} ${t.nacht}  ·  ${t.boek} →` : `${t.boek} →`}
          </Link>
        </div>
      </div>
    </article>
  )
}

// Scherm (homepage): elk huis vult het scherm. Beeld eerst, tekst als
// een rustige laag onderaan, één link om te boeken.
function Scherm({ w, locale, i }: { w: Woning; locale: Locale; i: number }) {
  const t = T[locale]
  return (
    <article className="relative w-full h-[92svh] min-h-[560px] overflow-hidden text-white">
      <Link href={{ pathname: '/collectie/[id]', params: { id: w.id } }} aria-label={w.naam} className="group absolute inset-0">
        <Image
          src={w.heroFoto}
          alt={w.naam}
          fill
          priority={i === 0}
          className="object-cover transition-transform duration-[2500ms] ease-out group-hover:scale-[1.02] motion-reduce:group-hover:scale-100"
          sizes="100vw"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[70%] pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(20,16,13,0.8), rgba(20,16,13,0))' }}
        />
      </Link>
      <div className="relative h-full px-6 md:px-12 pointer-events-none">
        <div className="mx-auto max-w-7xl h-full flex flex-col justify-end pb-mw-6 lg:pb-mw-8">
          <p className="text-[0.875rem] text-white/75">{w.collectie}  ·  {w.locatie}</p>
          <h2 className="mt-mw-2 text-display font-light text-white max-w-[14ch]">{w.naam}</h2>
          <div className="mt-mw-4 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-mw-4">
            <p className="text-body-lg text-white/90 max-w-[44ch]">{lw(w.slogan, locale)}</p>
            <Link
              href={{ pathname: '/collectie/[id]', params: { id: w.id }, hash: 'boeken' }}
              className="pointer-events-auto self-start lg:self-auto inline-flex items-center min-h-[48px] text-[0.9375rem] text-white underline underline-offset-[6px] decoration-white/40 hover:decoration-white transition-colors"
            >
              {w.prijs ? `${t.vanaf} €${w.prijs} ${t.nacht}  ·  ${t.boek} →` : `${t.boek} →`}
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export function CollectieOverzicht({ woningen, locale, tabel = true, variant = 'raster' }: { woningen: Woning[]; locale: Locale; tabel?: boolean; variant?: 'raster' | 'verhaal' | 'scherm' }) {
  const t = T[locale]
  const lijst = sortForCollectie(woningen)
  return (
    <>
      {variant === 'scherm' ? (
        <div className="flex flex-col gap-2">
          {lijst.map((w, i) => (
            <Scherm key={w.id} w={w} locale={locale} i={i} />
          ))}
        </div>
      ) : variant === 'verhaal' ? (
        <div className="space-y-mw-8 lg:space-y-mw-12">
          {lijst.map((w, i) => (
            <Hoofdstuk key={w.id} w={w} locale={locale} i={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-mw-6 gap-y-mw-8">
          {lijst.map((w, i) => (
            <Kaart key={w.id} w={w} locale={locale} priority={i < 2} />
          ))}
        </div>
      )}

      {tabel && (
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
      )}
    </>
  )
}
