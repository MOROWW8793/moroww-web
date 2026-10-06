'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { loadStripe, type Stripe, type StripeCardElement } from '@stripe/stripe-js'
import { CalendarCheck, KeyRound, Lock } from 'lucide-react'
import { Link, useRouter } from '@/i18n/navigation'
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

// Termijnen uit de voorwaarden: saldo 30 dagen vóór aankomst (art. 4.2),
// kosteloos annuleren tot 14 dagen vóór aankomst (art. 5.2, "Firm" in
// Guesty). Guesty int en annuleert; dit toont enkel wat de gast verwacht.
const SALDO_DAGEN_VOOR_AANKOMST = 30
const ANNULEREN_DAGEN_VOOR_AANKOMST = 14

function dagenVoor(datum: string, dagen: number) {
  const d = new Date(`${datum}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() - dagen)
  return d.toISOString().slice(0, 10)
}

function betaalschema(totaal: number, aankomst: string, vandaag: string) {
  const saldoDatum = dagenVoor(aankomst, SALDO_DAGEN_VOOR_AANKOMST)
  if (saldoDatum <= vandaag) return { nu: totaal, saldo: 0, saldoDatum: null }
  const nu = Math.round(totaal * 50) / 100
  return { nu, saldo: Math.round((totaal - nu) * 100) / 100, saldoDatum }
}

export interface CheckoutWoning {
  id: string
  naam: string
  locatie: string
  heroFoto: string
  inCheckin: string
  uitCheckin: string
  review: { citaat: string; naam: string } | null
}

interface Props {
  woning: CheckoutWoning
  aankomst: string
  vertrek: string
  gasten: number
}

export function Checkout({ woning, aankomst, vertrek, gasten }: Props) {
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
      body: JSON.stringify({ woningId: woning.id, aankomst, vertrek, gasten }),
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(setOfferte)
      .catch(() => setFout(t('quote_error')))
  }, [woning.id, aankomst, vertrek, gasten, t])

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
        params: { id: woning.id },
        query: { code, aankomst },
      })
    } catch {
      setFout(t('booking_error'))
      setBezig(false)
    }
  }

  const taal = locale === 'nl' ? 'nl-BE' : 'en-GB'
  const fmt = (n: number) =>
    new Intl.NumberFormat(taal, { style: 'currency', currency: offerte!.valuta }).format(n)
  const datum = (d: string, lang = false) =>
    new Intl.DateTimeFormat(taal, {
      weekday: lang ? 'long' : 'short',
      day: 'numeric',
      month: 'long',
      timeZone: 'UTC',
    }).format(new Date(`${d}T00:00:00Z`))

  const vandaag = new Date().toISOString().slice(0, 10)
  const nachten = Math.round((Date.parse(vertrek) - Date.parse(aankomst)) / 86_400_000)
  const annulerenTot = dagenVoor(aankomst, ANNULEREN_DAGEN_VOOR_AANKOMST)
  const kosteloosAnnuleerbaar = annulerenTot > vandaag
  const schema = offerte ? betaalschema(offerte.totaal, aankomst, vandaag) : null

  const veld =
    'mt-1 w-full border border-moroww-rule bg-white px-3 py-3 text-body text-moroww-dark focus:outline-none focus:border-moroww-dark'

  const samenvatting = (
    <div className="bg-white border border-moroww-rule" style={{ borderRadius: 4 }}>
      <div className="grid grid-cols-2 border-b border-moroww-rule">
        <div className="p-mw-4 border-r border-moroww-rule">
          <p className="text-sm text-moroww-ink-2">{t('checkin')}</p>
          <p className="mt-1 text-body text-moroww-dark">{datum(aankomst)}</p>
          <p className="text-sm text-moroww-ink-2">{t('from_time', { time: woning.inCheckin })}</p>
        </div>
        <div className="p-mw-4">
          <p className="text-sm text-moroww-ink-2">{t('checkout')}</p>
          <p className="mt-1 text-body text-moroww-dark">{datum(vertrek)}</p>
          <p className="text-sm text-moroww-ink-2">{t('until_time', { time: woning.uitCheckin })}</p>
        </div>
      </div>
      <div className="p-mw-4">
        <p className="text-body text-moroww-dark">
          {t('nights', { count: nachten })} · {t('guest_count', { count: gasten })}
        </p>

        {!offerte && !fout && <p className="mt-mw-3 text-body text-moroww-ink-2">{t('calculating')}</p>}
        {offerte && schema && (
          <>
            <table className="mt-mw-3 w-full text-body text-moroww-dark">
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
            <p className="mt-1 text-sm text-moroww-ink-2">{t('no_service_fees')}</p>

            <div className="mt-mw-4 bg-moroww-blush/60 p-mw-3 text-sm text-moroww-dark" style={{ borderRadius: 4 }}>
              {schema.saldoDatum ? (
                <>
                  <p className="flex justify-between">
                    <span>{t('pay_now_deposit')}</span>
                    <span className="tabular-nums font-semibold">{fmt(schema.nu)}</span>
                  </p>
                  <p className="mt-1 flex justify-between text-moroww-ink-2">
                    <span>{t('balance_on', { date: datum(schema.saldoDatum) })}</span>
                    <span className="tabular-nums">{fmt(schema.saldo)}</span>
                  </p>
                </>
              ) : (
                <p>{t('pay_now_full')}</p>
              )}
            </div>
          </>
        )}
      </div>
      {woning.review && (
        <figure className="border-t border-moroww-rule p-mw-4">
          <blockquote className="text-body italic text-moroww-dark">“{woning.review.citaat}”</blockquote>
          <figcaption className="mt-mw-2 text-sm text-moroww-ink-2">{woning.review.naam}</figcaption>
        </figure>
      )}
    </div>
  )

  return (
    <>
      <section className="relative h-[52vh] min-h-[360px] w-full overflow-hidden">
        <Image src={woning.heroFoto} alt={woning.naam} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-mw-4 pb-mw-6">
          <p className="text-body-lg text-white/85">
            {t('hero_line', { nights: nachten, place: woning.locatie })}
          </p>
          <h1 className="mt-mw-2 text-display text-white" style={{ fontSize: 'clamp(2.75rem, 7vw, 6rem)' }}>
            {woning.naam}
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-mw-4 py-mw-8 lg:grid lg:grid-cols-12 lg:gap-mw-6">
        <aside className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
          <div className="lg:sticky lg:top-24">{samenvatting}</div>
        </aside>

        <div className="mt-mw-6 lg:col-span-6 lg:row-start-1 lg:mt-0">
          <p className="max-w-mw-gast text-body-lg text-moroww-dark">{t('intro', { place: woning.naam })}</p>

          {offerte && (
            <form onSubmit={bevestig} className="mt-mw-6">
              <h2 className="text-h3 text-moroww-dark">{t('your_details')}</h2>
              <p className="mt-1 text-sm text-moroww-ink-2">{t('details_why')}</p>
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

              <h2 className="mt-mw-6 text-h3 text-moroww-dark">{t('payment')}</h2>
              <div
                ref={kaartRef}
                className="mt-mw-3 border border-moroww-rule bg-white px-3 py-4"
                style={{ borderRadius: 4 }}
              />

              <label className="mt-mw-5 flex items-start gap-3 text-sm text-moroww-dark">
                <input type="checkbox" name="voorwaarden" required className="mt-1" />
                <span>
                  {t.rich('accept_terms', {
                    link: (chunks) => (
                      <Link href="/voorwaarden" target="_blank" className="underline underline-offset-2">
                        {chunks}
                      </Link>
                    ),
                  })}
                </span>
              </label>

              <button
                type="submit"
                disabled={!kaartKlaar || bezig}
                className="mt-mw-5 flex w-full justify-center rounded-full px-mw-4 py-4 text-body font-semibold bg-moroww-orange text-moroww-dark hover:bg-moroww-orange/85 transition-colors disabled:opacity-50"
              >
                {bezig ? t('processing') : t('confirm_and_pay', { amount: fmt(schema!.nu) })}
              </button>

              <ul className="mt-mw-5 space-y-mw-2 text-sm text-moroww-ink-2">
                <li className="flex gap-3">
                  <CalendarCheck className="h-4 w-4 shrink-0 mt-0.5 text-moroww-label" aria-hidden />
                  {kosteloosAnnuleerbaar
                    ? t('free_cancel_until', { date: datum(annulerenTot, true) })
                    : t('no_free_cancel')}
                </li>
                <li className="flex gap-3">
                  <KeyRound className="h-4 w-4 shrink-0 mt-0.5 text-moroww-label" aria-hidden />
                  {t('access_code_note')}
                </li>
                <li className="flex gap-3">
                  <Lock className="h-4 w-4 shrink-0 mt-0.5 text-moroww-label" aria-hidden />
                  {t('secure_payment')}
                </li>
              </ul>
            </form>
          )}

          {fout && <p className="mt-mw-4 text-body text-moroww-dark">{fout}</p>}
        </div>
      </div>
    </>
  )
}
