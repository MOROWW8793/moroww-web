'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from '@/i18n/navigation'

// Hero van de homepage (nov 2026): een rustige slideshow van de huizen,
// met de kop en een zoekbalk erover. De zoekbalk stuurt door naar /boeken,
// waar de beschikbaarheid meteen voor die data wordt opgehaald.

export type HeroSlide = { src: string; alt: string; naam: string; plaats: string }

const COPY = {
  nl: {
    kop: 'karaktervolle huizen. een standaard die niet wijkt.',
    waar: 'waar', alles: 'de hele collectie', aankomst: 'aankomst', vertrek: 'vertrek', gasten: 'gasten',
    zoek: 'zoek', fout: 'Kies een aankomst- en vertrekdag.', dia: 'foto',
    pauzeer: 'pauzeer de foto’s', speel: 'speel de foto’s af',
  },
  en: {
    kop: 'homes with character. a standard that does not bend.',
    waar: 'where', alles: 'the whole collection', aankomst: 'arrival', vertrek: 'departure', gasten: 'guests',
    zoek: 'search', fout: 'Choose an arrival and a departure date.', dia: 'photo',
    pauzeer: 'pause the photos', speel: 'play the photos',
  },
}

const INTERVAL = 6500

function plusDagen(iso: string, n: number) {
  const d = new Date(iso + 'T00:00:00Z')
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

const VELD =
  'w-full bg-transparent border-0 border-b border-moroww-ink-2 rounded-none p-0 pt-1 pb-1 text-base text-moroww-dark appearance-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moroww-dark'
const LABEL = 'text-audit text-moroww-ink-2'

export function HomeHero({ slides, locale, maxGasten }: { slides: HeroSlide[]; locale: string; maxGasten: number }) {
  const c = locale === 'en' ? COPY.en : COPY.nl
  const router = useRouter()
  const vandaag = useMemo(() => new Date().toISOString().slice(0, 10), [])

  const [actief, setActief] = useState(0)
  // Gepauzeerd door de bezoeker (knop), of tijdelijk zolang de muis of de
  // focus in de hero staat. Draaien doet de slideshow alleen als geen van
  // beide geldt, en nooit bij minder-beweging.
  const [gepauzeerd, setGepauzeerd] = useState(false)
  const [erboven, setErboven] = useState(false)
  const [focusBinnen, setFocusBinnen] = useState(false)
  const [rustig, setRustig] = useState(false)

  const [streek, setStreek] = useState<'alles' | 'the shore' | 'the fields'>('alles')
  const [aankomst, setAankomst] = useState('')
  const [vertrek, setVertrek] = useState('')
  const [gasten, setGasten] = useState(2)
  const [fout, setFout] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setRustig(mq.matches)
  }, [])

  useEffect(() => {
    if (gepauzeerd || erboven || focusBinnen || rustig || slides.length < 2) return
    const t = window.setTimeout(() => setActief((i) => (i + 1) % slides.length), INTERVAL)
    return () => window.clearTimeout(t)
  }, [actief, gepauzeerd, erboven, focusBinnen, rustig, slides.length])

  function zoek(e: React.FormEvent) {
    e.preventDefault()
    if (!aankomst || !vertrek || vertrek <= aankomst) {
      setFout(true)
      return
    }
    setFout(false)
    const query: Record<string, string> = { aankomst, vertrek, gasten: String(gasten) }
    if (streek !== 'alles') query.streek = streek
    router.push({ pathname: '/boeken', query })
  }

  const huidig = slides[actief]

  return (
    <section
      className="relative w-full min-h-[640px] h-[92svh] max-h-[960px] overflow-hidden bg-moroww-dark"
      aria-roledescription="carousel"
      onMouseEnter={() => setErboven(true)}
      onMouseLeave={() => setErboven(false)}
      onFocusCapture={() => setFocusBinnen(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusBinnen(false)
      }}
    >
      {/* SLIDES */}
      {slides.map((s, i) => (
        <div
          key={s.src}
          className="absolute inset-0 transition-opacity duration-[1400ms] ease-out"
          style={{ opacity: i === actief ? 1 : 0 }}
          aria-hidden={i !== actief}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
            style={{
              transform: !rustig && i === actief ? 'scale(1.06)' : 'scale(1)',
              transition: rustig ? 'none' : `transform ${INTERVAL + 1500}ms linear`,
            }}
          />
        </div>
      ))}

      {/* Verloop voor leesbaarheid van kop en menu */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/45 via-black/10 to-black/55" />

      {/* KOP + ZOEKBALK */}
      <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 pb-mw-6 md:pb-mw-8">
        <div className="mx-auto max-w-7xl w-full">
          <h1 className="text-[clamp(2.4rem,5vw,4.75rem)] leading-[1.02] tracking-[-0.02em] font-semibold text-white max-w-[18ch] drop-shadow-md">{c.kop}</h1>

          <form
            onSubmit={zoek}
            className="mt-mw-6 bg-moroww-paper grid grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_0.8fr_auto] gap-px shadow-xl"
            style={{ borderRadius: 2 }}
          >
            <label className="col-span-2 lg:col-span-1 flex flex-col px-mw-5 py-mw-3 bg-moroww-paper">
              <span className={LABEL}>{c.waar}</span>
              <select value={streek} onChange={(e) => setStreek(e.target.value as typeof streek)} className={VELD}>
                <option value="alles">{c.alles}</option>
                <option value="the shore">the shore · {locale === 'en' ? 'the coast' : 'de kust'}</option>
                <option value="the fields">the fields · {locale === 'en' ? 'the countryside' : 'het platteland'}</option>
              </select>
            </label>
            <label className="flex flex-col px-mw-5 py-mw-3 bg-moroww-paper lg:border-l border-moroww-rule">
              <span className={LABEL}>{c.aankomst}</span>
              <input
                type="date"
                min={vandaag}
                value={aankomst}
                onChange={(e) => {
                  setAankomst(e.target.value)
                  if (vertrek && vertrek <= e.target.value) setVertrek('')
                }}
                className={VELD}
              />
            </label>
            <label className="flex flex-col px-mw-5 py-mw-3 bg-moroww-paper border-l border-moroww-rule">
              <span className={LABEL}>{c.vertrek}</span>
              <input
                type="date"
                min={aankomst ? plusDagen(aankomst, 1) : plusDagen(vandaag, 1)}
                value={vertrek}
                onChange={(e) => setVertrek(e.target.value)}
                className={VELD}
              />
            </label>
            <label className="flex flex-col px-mw-5 py-mw-3 bg-moroww-paper lg:border-l border-moroww-rule">
              <span className={LABEL}>{c.gasten}</span>
              <select value={gasten} onChange={(e) => setGasten(Number(e.target.value))} className={VELD}>
                {Array.from({ length: maxGasten }, (_, i) => i + 1).map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </label>
            <div className="flex items-stretch p-2 bg-moroww-paper">
              <button
                type="submit"
                className="w-full lg:w-auto bg-moroww-orange text-moroww-dark rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moroww-dark active:bg-moroww-orange/75 px-8 min-h-[48px] text-body font-semibold hover:bg-moroww-orange/85 transition-colors"
              >
                {c.zoek}
              </button>
            </div>
          </form>
          {fout && <p className="mt-2 text-body text-white" role="alert">{c.fout}</p>}

          {/* Bijschrift + bolletjes */}
          <div className="mt-mw-4 flex items-center justify-end sm:justify-between gap-mw-4 text-white/85">
            <p className="hidden sm:block text-audit" aria-live="polite">
              {huidig.naam}, {huidig.plaats}
            </p>
            <div className="flex items-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => { setActief(i); setGepauzeerd(true) }}
                  aria-label={`${c.dia} ${i + 1}: ${s.naam}`}
                  aria-current={i === actief}
                  className="p-2 -m-1"
                >
                  <span
                    className={`block h-[3px] w-5 sm:w-8 origin-left transition-[transform,opacity] duration-300 motion-reduce:transition-none ${i === actief ? 'scale-x-100 opacity-100' : 'scale-x-50 opacity-45'} bg-white`}
                  />
                </button>
              ))}
              <button
                type="button"
                onClick={() => setGepauzeerd((g) => !g)}
                aria-pressed={gepauzeerd}
                aria-label={gepauzeerd ? c.speel : c.pauzeer}
                className="ml-2 inline-flex items-center justify-center w-11 h-11 -my-3 rounded-full text-white hover:bg-white/15 transition-colors motion-reduce:transition-none"
              >
                {gepauzeerd ? (
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor"><path d="M4 2.5v11l9-5.5z" /></svg>
                ) : (
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor"><path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
