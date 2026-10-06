'use client'

import { useEffect, useMemo, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import type { KalenderDag, Offerte } from '@/lib/boeking'

// Data blijven overal 'YYYY-MM-DD'-strings in UTC: Guesty werkt met
// gelokaliseerde datums zonder tijd, en zo verschuift niets bij een
// bezoeker in een andere tijdzone.
function plusDagen(datum: string, n: number) {
  const d = new Date(`${datum}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

function nachten(van: string, tot: string) {
  return Math.round((Date.parse(tot) - Date.parse(van)) / 86_400_000)
}

function maandRaster(jaar: number, maand: number): (string | null)[] {
  const eerste = new Date(Date.UTC(jaar, maand, 1))
  const leeg = (eerste.getUTCDay() + 6) % 7 // maandag eerst
  const aantal = new Date(Date.UTC(jaar, maand + 1, 0)).getUTCDate()
  const cellen: (string | null)[] = Array(leeg).fill(null)
  for (let d = 1; d <= aantal; d++) {
    cellen.push(new Date(Date.UTC(jaar, maand, d)).toISOString().slice(0, 10))
  }
  return cellen
}

export function BoekWidget({
  woningId,
  maxGasten,
  uitwegUrl,
}: {
  woningId: string
  maxGasten: number
  uitwegUrl: string
}) {
  const t = useTranslations('booking')
  const locale = useLocale()
  const [kalender, setKalender] = useState<Map<string, KalenderDag> | null>(null)
  const [kalenderFout, setKalenderFout] = useState(false)
  const [maandIndex, setMaandIndex] = useState(0)
  const [aankomst, setAankomst] = useState<string | null>(null)
  const [vertrek, setVertrek] = useState<string | null>(null)
  const [gasten, setGasten] = useState(Math.min(2, maxGasten))
  const [offerte, setOfferte] = useState<Offerte | null>(null)
  const [offerteStatus, setOfferteStatus] = useState<'idle' | 'laden' | 'fout'>('idle')
  const [melding, setMelding] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/boeking/kalender?woning=${woningId}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((dagen: KalenderDag[]) => setKalender(new Map(dagen.map((d) => [d.datum, d]))))
      .catch(() => setKalenderFout(true))
  }, [woningId])

  useEffect(() => {
    setOfferte(null)
    if (!aankomst || !vertrek) return
    setOfferteStatus('laden')
    const ctrl = new AbortController()
    fetch('/api/boeking/offerte', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ woningId, aankomst, vertrek, gasten }),
      signal: ctrl.signal,
    })
      .then((r) => {
        if (r.status === 503) setKalenderFout(true)
        return r.ok ? r.json() : Promise.reject(r.status)
      })
      .then((o: Offerte) => {
        setOfferte(o)
        setOfferteStatus('idle')
      })
      .catch((e) => {
        if (e?.name !== 'AbortError') setOfferteStatus('fout')
      })
    return () => ctrl.abort()
  }, [woningId, aankomst, vertrek, gasten])

  const vandaag = new Date().toISOString().slice(0, 10)
  const nu = new Date()
  const jaar = nu.getUTCFullYear()
  const maand = nu.getUTCMonth() + maandIndex
  const raster = useMemo(() => maandRaster(jaar, maand), [jaar, maand])
  const maandLabel = new Intl.DateTimeFormat(locale === 'nl' ? 'nl-BE' : 'en-GB', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(jaar, maand, 1)))
  const weekdagen = locale === 'nl' ? ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'] : ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su']

  function kanAankomen(datum: string) {
    const d = kalender?.get(datum)
    return !!d && d.vrij && !d.geenAankomst && datum >= vandaag
  }

  // Vertrek moet na aankomst liggen, elke nacht ertussen vrij zijn en de
  // minimumduur van de aankomstdag halen. De vertrekdag zelf mag bezet zijn
  // (dan komt er die dag een nieuwe gast).
  function vertrekProbleem(van: string, tot: string): string | null {
    const d = kalender?.get(tot)
    if (d?.geenVertrek) return t('no_checkout_day')
    for (let x = van; x < tot; x = plusDagen(x, 1)) {
      if (!kalender?.get(x)?.vrij) return t('not_available_range')
    }
    const min = kalender!.get(van)!.minNachten
    if (nachten(van, tot) < min) return t('min_nights', { count: min })
    return null
  }

  function kies(datum: string) {
    setMelding(null)
    if (aankomst && !vertrek && datum > aankomst) {
      const probleem = vertrekProbleem(aankomst, datum)
      if (!probleem) {
        setVertrek(datum)
        return
      }
      if (!kanAankomen(datum)) {
        setMelding(probleem)
        return
      }
    }
    if (!kanAankomen(datum)) return
    setAankomst(datum)
    setVertrek(null)
  }

  // Kosteloos annuleren tot 14 dagen vóór aankomst (voorwaarden art. 5.2).
  const annulerenTot = aankomst ? plusDagen(aankomst, -14) : ''
  const kort = (d: string) =>
    new Intl.DateTimeFormat(locale === 'nl' ? 'nl-BE' : 'en-GB', {
      day: 'numeric',
      month: 'long',
      timeZone: 'UTC',
    }).format(new Date(`${d}T00:00:00Z`))

  const fmt = (n: number, valuta: string) =>
    new Intl.NumberFormat(locale === 'nl' ? 'nl-BE' : 'en-GB', {
      style: 'currency',
      currency: valuta,
      maximumFractionDigits: 0,
    }).format(n)

  // Antwoordt de kalender niet, dan nog altijd een weg naar een boeking.
  if (kalenderFout) {
    return (
      <div className="mt-mw-4">
        <p className="text-body text-moroww-ink-2">{t('calendar_fallback')}</p>
        <a
          href={uitwegUrl}
          className="mt-mw-4 flex w-full justify-center rounded-full px-mw-4 py-3 font-semibold bg-moroww-orange text-moroww-dark hover:bg-moroww-orange/85 transition-colors"
        >
          {t('calendar_fallback_cta')}
        </a>
      </div>
    )
  }

  return (
    <div className="mt-mw-4">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMaandIndex((i) => i - 1)}
          disabled={maandIndex === 0}
          aria-label={t('prev_month')}
          className="px-2 py-1 text-moroww-dark disabled:opacity-30"
        >
          ←
        </button>
        <p className="text-body font-semibold text-moroww-dark">{maandLabel}</p>
        <button
          type="button"
          onClick={() => setMaandIndex((i) => i + 1)}
          disabled={maandIndex >= 11}
          aria-label={t('next_month')}
          className="px-2 py-1 text-moroww-dark disabled:opacity-30"
        >
          →
        </button>
      </div>

      <div className="mt-mw-3 grid grid-cols-7 text-center text-audit uppercase text-moroww-ink-2">
        {weekdagen.map((w) => (
          <span key={w} className="py-1">{w}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center" aria-busy={!kalender}>
        {raster.map((datum, i) => {
          if (!datum) return <span key={`leeg-${i}`} />
          const gekozen = datum === aankomst || datum === vertrek
          const binnen = aankomst && vertrek && datum > aankomst && datum < vertrek
          const klikbaar =
            !!kalender &&
            (kanAankomen(datum) || (!!aankomst && !vertrek && datum > aankomst && !vertrekProbleem(aankomst, datum)))
          return (
            <button
              key={datum}
              type="button"
              onClick={() => kies(datum)}
              disabled={!kalender || datum < vandaag}
              aria-pressed={gekozen}
              className={[
                'h-9 text-sm tabular-nums transition-colors',
                gekozen
                  ? 'bg-moroww-dark text-white rounded-full'
                  : binnen
                    ? 'bg-moroww-blush text-moroww-dark'
                    : klikbaar
                      ? 'text-moroww-dark hover:bg-moroww-blush rounded-full'
                      : 'text-moroww-ink-2/40 line-through',
              ].join(' ')}
            >
              {Number(datum.slice(8))}
            </button>
          )
        })}
      </div>

      {melding && <p className="mt-mw-2 text-sm text-moroww-ink-2">{melding}</p>}

      <label className="mt-mw-4 flex items-center justify-between text-body text-moroww-dark">
        <span>{t('guests')}</span>
        <select
          value={gasten}
          onChange={(e) => setGasten(Number(e.target.value))}
          className="border border-moroww-rule bg-white px-3 py-2"
          style={{ borderRadius: 4 }}
        >
          {Array.from({ length: maxGasten }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </label>

      {aankomst && vertrek && (
        <div className="mt-mw-4 border-t border-moroww-rule pt-mw-3 text-body text-moroww-dark">
          <p className="text-moroww-ink-2">
            {t('nights', { count: nachten(aankomst, vertrek) })}
          </p>
          {offerteStatus === 'laden' && <p className="mt-1 text-moroww-ink-2">{t('calculating')}</p>}
          {offerteStatus === 'fout' && <p className="mt-1 text-moroww-ink-2">{t('quote_error')}</p>}
          {offerte && (
            <>
              <p className="mt-1 flex justify-between font-semibold">
                <span>{t('total')}</span>
                <span>{fmt(offerte.totaal, offerte.valuta)}</span>
              </p>
              {annulerenTot > vandaag && (
                <p className="mt-mw-2 text-sm text-moroww-ink-2">
                  {t('free_cancel_until', { date: kort(annulerenTot) })}
                </p>
              )}
            </>
          )}
        </div>
      )}

      {aankomst && vertrek && offerte ? (
        <Link
          href={{
            pathname: '/collectie/[id]/boeken',
            params: { id: woningId },
            query: { aankomst, vertrek, gasten },
          }}
          className="mt-mw-4 flex w-full justify-center rounded-full px-mw-4 py-3 font-semibold bg-moroww-orange text-moroww-dark hover:bg-moroww-orange/85 transition-colors"
        >
          {t('continue')}
        </Link>
      ) : (
        <p className="mt-mw-4 text-audit uppercase text-moroww-ink-2 text-center">
          {aankomst ? t('pick_checkout') : t('pick_checkin')}
        </p>
      )}
    </div>
  )
}
