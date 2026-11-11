'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { KalenderDag } from '@/lib/boeking'

// Zoeken op data en gasten over de hele collectie (homepage, nov 2026).
// Leest per boekbare woning de kalender via /api/boeking/kalender en past
// dezelfde regels toe als BoekWidget: elke nacht vrij, aankomst toegestaan,
// vertrek toegestaan, minimumduur van de aankomstdag gehaald. Vrije huizen
// linken rechtstreeks naar de checkout met de gekozen data.

export type ZoekWoning = {
  id: string
  naam: string
  locatie: string
  stad: string
  collectie: 'the shore' | 'the fields'
  maxGasten: number
  prijs?: number
  foto: string
  boekbaar: boolean
}

const COPY = {
  nl: {
    streek: 'waar', alles: 'de hele collectie', aankomst: 'aankomst', vertrek: 'vertrek', gasten: 'gasten',
    zoek: 'bekijk beschikbaarheid', zoeken: 'even kijken…',
    vrij: (n: number, t: number) => `${n} van ${t} huizen vrij op die data`,
    geen: 'Op die data is er geen huis vrij dat bij je gezelschap past. Probeer een paar dagen vroeger of later.',
    nachten: (n: number) => (n === 1 ? '1 nacht' : `${n} nachten`),
    vanaf: 'vanaf', perNacht: '/ nacht', boek: 'boek dit huis', bekijk: 'bekijk de data',
    onbekend: 'kalender even niet beschikbaar',
    fout: 'Kies een aankomst- en vertrekdag.',
    allesLink: 'of bekijk de hele collectie →',
  },
  en: {
    streek: 'where', alles: 'the whole collection', aankomst: 'arrival', vertrek: 'departure', gasten: 'guests',
    zoek: 'check availability', zoeken: 'checking…',
    vrij: (n: number, t: number) => `${n} of ${t} homes available on those dates`,
    geen: 'No home that fits your party is free on those dates. Try a few days earlier or later.',
    nachten: (n: number) => (n === 1 ? '1 night' : `${n} nights`),
    vanaf: 'from', perNacht: '/ night', boek: 'book this home', bekijk: 'see the dates',
    onbekend: 'calendar briefly unavailable',
    fout: 'Choose an arrival and a departure date.',
    allesLink: 'or see the whole collection →',
  },
}

function plusDagen(iso: string, n: number) {
  const d = new Date(iso + 'T00:00:00Z')
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}
function nachten(van: string, tot: string) {
  return Math.round((Date.parse(tot) - Date.parse(van)) / 86_400_000)
}
function vrijOp(kal: Map<string, KalenderDag>, van: string, tot: string) {
  const a = kal.get(van)
  if (!a || !a.vrij || a.geenAankomst) return false
  if (kal.get(tot)?.geenVertrek) return false
  for (let x = van; x < tot; x = plusDagen(x, 1)) if (!kal.get(x)?.vrij) return false
  return nachten(van, tot) >= (a.minNachten || 1)
}

type Uitslag = { woning: ZoekWoning; status: 'vrij' | 'onbekend' }

const VELD = 'w-full bg-transparent border-0 border-b border-moroww-dark/25 rounded-none py-3 text-base text-moroww-dark focus:outline-none focus:border-moroww-dark transition-colors'
const LABEL = 'text-[0.875rem] text-moroww-ink-2'

export type ZoekBegin = { stad?: string; aankomst?: string; vertrek?: string; gasten?: number }

export function Beschikbaarheid({ woningen, locale, begin }: { woningen: ZoekWoning[]; locale: string; begin?: ZoekBegin }) {
  const c = locale === 'nl' ? COPY.nl : COPY.en
  const vandaag = useMemo(() => new Date().toISOString().slice(0, 10), [])
  const maxGasten = Math.max(2, ...woningen.map((w) => w.maxGasten))

  const [stad, setStad] = useState(begin?.stad ?? 'alles')
  const steden = Array.from(new Set(woningen.map((w) => w.stad))).sort()
  const [aankomst, setAankomst] = useState(begin?.aankomst ?? '')
  const [vertrek, setVertrek] = useState(begin?.vertrek ?? '')
  const [gasten, setGasten] = useState(begin?.gasten ?? 2)
  const [bezig, setBezig] = useState(false)
  const [melding, setMelding] = useState<string | null>(null)
  const [uitslag, setUitslag] = useState<{ lijst: Uitslag[]; totaal: number } | null>(null)
  const cache = useRef(new Map<string, Map<string, KalenderDag> | null>())

  async function kalender(id: string) {
    if (cache.current.has(id)) return cache.current.get(id)!
    try {
      const r = await fetch(`/api/boeking/kalender?woning=${encodeURIComponent(id)}`)
      if (!r.ok) throw new Error(String(r.status))
      const dagen: KalenderDag[] = await r.json()
      const m = new Map(dagen.map((d) => [d.datum, d]))
      cache.current.set(id, m)
      return m
    } catch {
      return null
    }
  }

  async function zoek(e?: React.FormEvent) {
    e?.preventDefault()
    setMelding(null)
    if (!aankomst || !vertrek || vertrek <= aankomst) {
      setMelding(c.fout)
      return
    }
    setBezig(true)
    const kandidaten = woningen.filter(
      (w) => w.boekbaar && w.maxGasten >= gasten && (stad === 'alles' || w.stad === stad),
    )
    const lijst: Uitslag[] = []
    await Promise.all(
      kandidaten.map(async (w) => {
        const kal = await kalender(w.id)
        if (kal === null) lijst.push({ woning: w, status: 'onbekend' })
        else if (vrijOp(kal, aankomst, vertrek)) lijst.push({ woning: w, status: 'vrij' })
      }),
    )
    const volgorde = new Map(woningen.map((w, i) => [w.id, i]))
    lijst.sort((a, b) => (a.status === b.status ? volgorde.get(a.woning.id)! - volgorde.get(b.woning.id)! : a.status === 'vrij' ? -1 : 1))
    setUitslag({ lijst, totaal: kandidaten.length })
    setBezig(false)
  }

  // Komt de bezoeker van de zoekbalk op de home, zoek dan meteen.
  const autoGezocht = useRef(false)
  useEffect(() => {
    if (autoGezocht.current) return
    if (begin?.aankomst && begin?.vertrek && begin.vertrek > begin.aankomst) {
      autoGezocht.current = true
      void zoek()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const n = aankomst && vertrek && vertrek > aankomst ? nachten(aankomst, vertrek) : 0
  const vrijeAantal = uitslag?.lijst.filter((u) => u.status === 'vrij').length ?? 0

  return (
    <div>
      <form onSubmit={zoek} className="grid grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_0.7fr_auto] gap-x-mw-5 gap-y-mw-4 items-end">
        <label className="col-span-2 lg:col-span-1 flex flex-col gap-1">
          <span className={LABEL}>{c.streek}</span>
          <select value={stad} onChange={(e) => setStad(e.target.value)} className={VELD}>
            <option value="alles">{c.alles}</option>
            {steden.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
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
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className={LABEL}>{c.vertrek}</span>
          <input
            type="date"
            min={aankomst ? plusDagen(aankomst, 1) : plusDagen(vandaag, 1)}
            value={vertrek}
            onChange={(e) => setVertrek(e.target.value)}
            className={VELD}
            required
          />
        </label>
        <label className="col-span-2 lg:col-span-1 flex flex-col gap-1">
          <span className={LABEL}>{c.gasten}</span>
          <select value={gasten} onChange={(e) => setGasten(Number(e.target.value))} className={VELD}>
            {Array.from({ length: maxGasten }, (_, i) => i + 1).map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          disabled={bezig}
          className="col-span-2 lg:col-span-1 min-h-[52px] px-mw-5 py-4 bg-moroww-dark text-moroww-paper border border-moroww-dark text-[0.9375rem] hover:bg-transparent hover:text-moroww-dark transition-colors duration-500 disabled:opacity-60"
        >
          {bezig ? c.zoeken : c.zoek}
        </button>
      </form>

      {melding && <p className="mt-mw-3 text-body text-moroww-dark" role="alert">{melding}</p>}

      <div aria-live="polite">
        {uitslag && (
          <div className="mt-mw-6">
            <p className="text-[0.9375rem] text-moroww-ink-2">
              {vrijeAantal > 0 ? c.vrij(vrijeAantal, uitslag.totaal) : ''}
            </p>
            {uitslag.lijst.length === 0 ? (
              <p className="mt-mw-3 text-body-lg text-moroww-dark max-w-[52ch]">{c.geen}</p>
            ) : (
              <ul className="mt-mw-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-mw-5">
                {uitslag.lijst.map(({ woning: w, status }) => (
                  <li key={w.id}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={w.foto} alt={w.naam} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    </div>
                    <p className="mt-mw-3 text-h3 font-normal text-moroww-dark">{w.naam}</p>
                    <p className="text-[0.9375rem] text-moroww-ink-2">
                      {w.locatie}
                      {w.prijs ? ` · ${c.vanaf} €${w.prijs} ${c.perNacht}` : ''}
                    </p>
                    {status === 'vrij' ? (
                      <Link
                        href={{ pathname: '/collectie/[id]/boeken', params: { id: w.id }, query: { aankomst, vertrek, gasten: String(gasten) } }}
                        className="mt-mw-3 inline-flex items-center min-h-[48px] px-mw-4 py-3 bg-moroww-orange text-moroww-dark text-[0.9375rem] font-semibold hover:bg-moroww-orange/85 transition-colors"
                      >
                        {c.boek} · {c.nachten(n)}
                      </Link>
                    ) : (
                      <Link
                        href={{ pathname: '/collectie/[id]', params: { id: w.id } }}
                        className="mt-mw-3 inline-flex items-center min-h-[48px] py-3 text-[0.9375rem] text-moroww-dark underline underline-offset-[6px] decoration-moroww-dark/30"
                      >
                        {c.bekijk} · {c.onbekend}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-mw-5">
              <Link href="/collectie" className="text-[0.9375rem] text-moroww-dark underline underline-offset-[6px] decoration-moroww-dark/30 hover:decoration-moroww-dark">{c.allesLink}</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
