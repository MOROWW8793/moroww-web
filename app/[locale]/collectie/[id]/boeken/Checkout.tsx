'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { loadStripe, type Stripe, type StripeCardElement } from '@stripe/stripe-js'
import { useRouter } from '@/i18n/navigation'
import type { Offerte } from '@/lib/boeking'

// Stripe-account dat in Guesty aan de panden hangt. Kaartgegevens gaan van
// Stripe's iframe rechtstreeks naar Stripe; wij krijgen een PaymentMethod-id
// (pm_…) die Guesty bij de reservatie valideert en volgens het
// betaalschema aanrekent.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// Guesty levert factuurregels met Engelse titels; de normalType-code is
// stabiel, dus daarop vertalen. Onbekende codes tonen Guesty's titel.
const REGEL_SLEUTELS: Record<string, string> = {
  AF: 'line_stay',
  CF: 'line_cleaning',
  VAT: 'line_vat',
}

interface Props {
  woningId: string
  aankomst: string
  vertrek: string
  gasten: number
}

export function Checkout({ woningId, aankomst, vertrek, gasten }: Props) {
  const t = useTranslations('booking')
  const locale = useLocale()
  const router = useRouter()
  const [offerte, setOfferte] = useState<Offerte | null>(null)
  const [fout, setFout] = useState<string | null>(null)
  const [bezig, setBezig] = useState(false)
  const [kaartKlaar, setKaartKlaar] = useState(false)
  const kaartRef = useRef<HTMLDivElement>(null)
  const stripe = useRef<Stripe | null>(null)
  const kaart = useRef<StripeCardElement | null>(null)

  useEffect(() => {
    fetch('/api/boeking/offerte', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ woningId, aankomst, vertrek, gasten }),
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(setOfferte)
      .catch(() => setFout(t('quote_error')))
  }, [woningId, aankomst, vertrek, gasten, t])

  useEffect(() => {
    if (!offerte || !kaartRef.current) return
    let actief = true
    stripePromise
      .then((s) => {
        if (!actief || !s || !kaartRef.current) return
        const el = s
          .elements({ locale: locale === 'nl' ? 'nl' : 'en' })
          .create('card', {
            hidePostalCode: true,
            style: {
              base: {
                fontFamily: 'OverusedGrotesk, Inter, sans-serif',
                fontSize: '17px',
                color: '#1A1A1A',
                '::placeholder': { color: '#6B6863' },
              },
            },
          })
        el.mount(kaartRef.current)
        el.on('change', (e) => setKaartKlaar(e.complete))
        stripe.current = s
        kaart.current = el
      })
      .catch(() => setFout(t('payment_load_error')))
    return () => {
      actief = false
      kaart.current?.destroy()
      kaart.current = null
    }
  }, [offerte, locale, t])

  async function bevestig(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!offerte || !stripe.current || !kaart.current) return
    const f = new FormData(e.currentTarget)
    const gast = {
      voornaam: String(f.get('voornaam')),
      achternaam: String(f.get('achternaam')),
      email: String(f.get('email')),
      telefoon: String(f.get('telefoon')),
    }
    setFout(null)
    setBezig(true)
    try {
      const { paymentMethod, error } = await stripe.current.createPaymentMethod({
        type: 'card',
        card: kaart.current,
        billing_details: {
          name: `${gast.voornaam} ${gast.achternaam}`,
          email: gast.email,
          phone: gast.telefoon,
        },
      })
      if (error) {
        setFout(error.message ?? t('booking_error'))
        setBezig(false)
        return
      }
      const r = await fetch('/api/boeking/reservatie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quoteId: offerte.quoteId, ccToken: paymentMethod.id, gast }),
      })
      if (!r.ok) throw new Error(String(r.status))
      const { code } = await r.json()
      router.push({
        pathname: '/collectie/[id]/bevestigd',
        params: { id: woningId },
        query: { code },
      })
    } catch {
      setFout(t('booking_error'))
      setBezig(false)
    }
  }

  const fmt = (n: number) =>
    new Intl.NumberFormat(locale === 'nl' ? 'nl-BE' : 'en-GB', {
      style: 'currency',
      currency: offerte!.valuta,
    }).format(n)
  const datum = (d: string) =>
    new Intl.DateTimeFormat(locale === 'nl' ? 'nl-BE' : 'en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(`${d}T00:00:00Z`))

  const veld =
    'mt-1 w-full border border-moroww-rule bg-white px-3 py-2 text-body text-moroww-dark focus:outline-none focus:border-moroww-dark'

  return (
    <div className="mt-mw-5">
      <dl className="grid grid-cols-3 gap-mw-3 text-body text-moroww-dark">
        <div>
          <dt className="text-audit uppercase text-moroww-ink-2">{t('checkin')}</dt>
          <dd className="mt-1">{datum(aankomst)}</dd>
        </div>
        <div>
          <dt className="text-audit uppercase text-moroww-ink-2">{t('checkout')}</dt>
          <dd className="mt-1">{datum(vertrek)}</dd>
        </div>
        <div>
          <dt className="text-audit uppercase text-moroww-ink-2">{t('guests')}</dt>
          <dd className="mt-1">{gasten}</dd>
        </div>
      </dl>

      <hr className="my-mw-5 border-0 border-t border-moroww-rule" aria-hidden />

      {!offerte && !fout && <p className="text-body text-moroww-ink-2">{t('calculating')}</p>}
      {offerte && (
        <table className="w-full text-body text-moroww-dark">
          <tbody>
            {offerte.regels.map((r, i) => (
              <tr key={i}>
                <td className="py-1 text-moroww-ink-2">
                  {REGEL_SLEUTELS[r.code] ? t(REGEL_SLEUTELS[r.code]) : r.titel}
                </td>
                <td className="py-1 text-right tabular-nums">{fmt(r.bedrag)}</td>
              </tr>
            ))}
            <tr className="border-t border-moroww-rule font-semibold">
              <td className="pt-mw-2">{t('total')}</td>
              <td className="pt-mw-2 text-right tabular-nums">{fmt(offerte.totaal)}</td>
            </tr>
          </tbody>
        </table>
      )}

      {offerte && (
        <form onSubmit={bevestig} className="mt-mw-6">
          <p className="text-audit uppercase text-moroww-label">{t('your_details')}</p>
          <div className="mt-mw-3 grid gap-mw-3 sm:grid-cols-2">
            <label className="text-sm text-moroww-ink-2">
              {t('first_name')}
              <input name="voornaam" required autoComplete="given-name" className={veld} style={{ borderRadius: 4 }} />
            </label>
            <label className="text-sm text-moroww-ink-2">
              {t('last_name')}
              <input name="achternaam" required autoComplete="family-name" className={veld} style={{ borderRadius: 4 }} />
            </label>
            <label className="text-sm text-moroww-ink-2">
              {t('email')}
              <input name="email" type="email" required autoComplete="email" className={veld} style={{ borderRadius: 4 }} />
            </label>
            <label className="text-sm text-moroww-ink-2">
              {t('phone')}
              <input name="telefoon" type="tel" required autoComplete="tel" className={veld} style={{ borderRadius: 4 }} />
            </label>
          </div>

          <p className="mt-mw-6 text-audit uppercase text-moroww-label">{t('payment')}</p>
          <div
            ref={kaartRef}
            className="mt-mw-3 border border-moroww-rule bg-white px-3 py-3"
            style={{ borderRadius: 4 }}
          />

          <button
            type="submit"
            disabled={!kaartKlaar || bezig}
            className="mt-mw-5 flex w-full justify-center rounded-full px-mw-4 py-3 font-semibold bg-moroww-orange text-moroww-dark hover:bg-moroww-orange/85 transition-colors disabled:opacity-50"
          >
            {bezig ? t('processing') : t('confirm_and_pay', { amount: fmt(offerte.totaal) })}
          </button>
        </form>
      )}

      {fout && <p className="mt-mw-4 text-body text-moroww-dark">{fout}</p>}
    </div>
  )
}
