import type { NextResponse } from 'next/server'

// Partners die gasten naar moroww.com sturen via ?ref=<slug>. De slug komt
// ook in partner_reservaties terecht; een slug hernoemen breekt de historiek.
export const PARTNERS = {
  beguin: 'Immo Beguin',
} as const

export type PartnerSlug = keyof typeof PARTNERS

export const PARTNER_COOKIE = 'moroww_partner'

// Een boeking telt voor de partner tot zoveel maanden na het eerste bezoek.
export const PARTNER_MAANDEN = 18

// Chrome kapt elke cookie af op 400 dagen. Daarom zet de server de cookie bij
// elk bezoek opnieuw, tot de 18 maanden vanaf het eerste bezoek om zijn.
const BROWSER_MAX_SECONDEN = 400 * 24 * 60 * 60

export type PartnerBezoek = { partner: PartnerSlug; aangekomenOp: Date }

export function isPartner(s: unknown): s is PartnerSlug {
  return typeof s === 'string' && Object.prototype.hasOwnProperty.call(PARTNERS, s)
}

function verlooptOp(aangekomenOp: Date) {
  const d = new Date(aangekomenOp)
  d.setMonth(d.getMonth() + PARTNER_MAANDEN)
  return d
}

// Cookiewaarde: "<slug>.<eerste bezoek in ms>". Het eerste bezoek blijft bij
// elke verlenging staan; daarop loopt de termijn van 18 maanden.
export function leesPartnerCookie(waarde: string | undefined, nu = new Date()): PartnerBezoek | null {
  if (!waarde) return null
  const [slug, ms] = waarde.split('.')
  const aangekomenOp = new Date(Number(ms))
  if (!isPartner(slug) || Number.isNaN(aangekomenOp.getTime())) return null
  if (verlooptOp(aangekomenOp) <= nu) return null
  return { partner: slug, aangekomenOp }
}

export function zetPartnerCookie(res: NextResponse, bezoek: PartnerBezoek, nu = new Date()) {
  const resterend = Math.floor((verlooptOp(bezoek.aangekomenOp).getTime() - nu.getTime()) / 1000)
  res.cookies.set(PARTNER_COOKIE, `${bezoek.partner}.${bezoek.aangekomenOp.getTime()}`, {
    maxAge: Math.min(resterend, BROWSER_MAX_SECONDEN),
    path: '/',
    sameSite: 'lax',
    secure: true,
    httpOnly: true,
  })
}
