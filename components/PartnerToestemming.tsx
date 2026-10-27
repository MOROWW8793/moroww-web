'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import {
  PARTNERS,
  PARTNER_COOKIE,
  PARTNER_COOKIE_DAGEN,
  isPartner,
  maakPartnerCookie,
  type PartnerSlug,
} from '@/lib/partner'

// De cookie wordt pas gezet na een expliciet "ja" (de privacypagina belooft
// geen andere cookies dan functionele). Het bezoek zelf telt wel altijd mee,
// anoniem via /api/partner/bezoek.
export function PartnerToestemming() {
  const t = useTranslations('partner_tracking')
  const [partner, setPartner] = useState<PartnerSlug | null>(null)

  useEffect(() => {
    const url = new URL(window.location.href)
    const ref = url.searchParams.get('ref')
    if (!isPartner(ref)) return

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

    if (document.cookie.split('; ').some((c) => c.startsWith(`${PARTNER_COOKIE}=`))) return
    setPartner(ref)
  }, [])

  if (!partner) return null

  function akkoord() {
    if (!partner) return
    document.cookie = `${PARTNER_COOKIE}=${maakPartnerCookie(partner)}; Max-Age=${PARTNER_COOKIE_DAGEN * 86400}; Path=/; SameSite=Lax; Secure`
    setPartner(null)
  }

  return (
    <div
      role="region"
      aria-label={t('label')}
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md border border-moroww-rule bg-moroww-white p-5 text-sm text-moroww-black shadow-sm md:inset-x-auto md:right-6 md:bottom-6"
    >
      <p className="leading-relaxed">
        {t('vraag', { partner: PARTNERS[partner], dagen: PARTNER_COOKIE_DAGEN })}{' '}
        <Link href="/privacy" className="underline underline-offset-2">
          {t('meer')}
        </Link>
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={akkoord}
          className="bg-moroww-orange px-4 py-2 text-moroww-black"
        >
          {t('ja')}
        </button>
        <button
          type="button"
          onClick={() => setPartner(null)}
          className="px-4 py-2 text-moroww-ink-2 underline underline-offset-2"
        >
          {t('nee')}
        </button>
      </div>
    </div>
  )
}
