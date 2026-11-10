'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { PARTNERS, PARTNER_MAANDEN, isPartner, type PartnerSlug } from '@/lib/partner'
import { DOELEN, TOESTEMMING_COOKIE, leesToestemming, type Doel } from '@/lib/toestemming'

export const OPEN_COOKIE_INSTELLINGEN = 'moroww:cookie-instellingen'

function huidigeToestemming() {
  const rij = document.cookie.split('; ').find((c) => c.startsWith(`${TOESTEMMING_COOKIE}=`))
  return leesToestemming(rij?.slice(TOESTEMMING_COOKIE.length + 1))
}

// Weigeren en aanvaarden krijgen bewust dezelfde vorm: de GBA aanvaardt geen
// banner die met kleur of grootte naar "aanvaarden" duwt.
const knop = 'min-h-[44px] border border-moroww-black px-4 py-2 text-moroww-black'

export function CookieBanner() {
  const t = useTranslations('cookies')
  const [open, setOpen] = useState(false)
  const [details, setDetails] = useState(false)
  const [gekozen, setGekozen] = useState<Doel[]>([])
  // Enkel in het geheugen: zonder toestemming bewaren we niets op het toestel.
  const [partner, setPartner] = useState<PartnerSlug | null>(null)

  useEffect(() => {
    const url = new URL(window.location.href)
    const ref = url.searchParams.get('ref')
    if (isPartner(ref)) {
      fetch('/api/partner/bezoek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partner: ref }),
        keepalive: true,
      })
      // ref meteen uit de adresbalk: een refresh telt anders dubbel, en een
      // gedeelde link zou het bezoek van iemand anders aan de partner toeschrijven.
      url.searchParams.delete('ref')
      window.history.replaceState(window.history.state, '', url)
      setPartner(ref)
    }

    if (!huidigeToestemming()) setOpen(true)

    function heropen() {
      setGekozen(huidigeToestemming()?.doelen ?? [])
      setDetails(true)
      setOpen(true)
    }
    window.addEventListener(OPEN_COOKIE_INSTELLINGEN, heropen)
    return () => window.removeEventListener(OPEN_COOKIE_INSTELLINGEN, heropen)
  }, [])

  async function bewaar(doelen: Doel[]) {
    setOpen(false)
    await fetch('/api/toestemming', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ doelen, partner }),
    })
  }

  function wissel(doel: Doel) {
    setGekozen((g) => (g.includes(doel) ? g.filter((d) => d !== doel) : [...g, doel]))
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-label={t('label')}
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-md border border-moroww-rule bg-moroww-white p-4 md:p-5 text-sm text-moroww-black shadow-sm md:inset-x-auto md:right-6 md:bottom-6"
    >
      <p className="leading-relaxed">
        {partner && <>{t('via_partner', { partner: PARTNERS[partner] })} </>}
        {t('intro')}{' '}
        <Link href="/privacy" className="underline underline-offset-2">
          {t('meer')}
        </Link>
      </p>

      {details && (
        <ul className="mt-4 flex flex-col gap-3 border-t border-moroww-rule pt-4">
          <li className="flex items-start justify-between gap-4">
            <span>
              <span className="block font-medium">{t('noodzakelijk_titel')}</span>
              <span className="text-moroww-ink-2">{t('noodzakelijk_uitleg')}</span>
            </span>
            <span className="shrink-0 text-moroww-ink-2">{t('altijd_aan')}</span>
          </li>
          {DOELEN.map((doel) => (
            <li key={doel}>
              <label className="flex items-start justify-between gap-4">
                <span>
                  <span className="block font-medium">{t(`doel_${doel}_titel`)}</span>
                  <span className="text-moroww-ink-2">
                    {t(`doel_${doel}_uitleg`, { maanden: PARTNER_MAANDEN })}
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={gekozen.includes(doel)}
                  onChange={() => wissel(doel)}
                  className="mt-1 h-4 w-4 shrink-0 accent-moroww-black"
                />
              </label>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={() => bewaar([])} className={knop}>
          {t('weigeren')}
        </button>
        <button type="button" onClick={() => bewaar([...DOELEN])} className={knop}>
          {t('aanvaarden')}
        </button>
        {details ? (
          <button type="button" onClick={() => bewaar(gekozen)} className={knop}>
            {t('bewaren')}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setDetails(true)}
            className="min-h-[44px] px-1 py-2 text-moroww-ink-2 underline underline-offset-2"
          >
            {t('kiezen')}
          </button>
        )}
      </div>
    </div>
  )
}
