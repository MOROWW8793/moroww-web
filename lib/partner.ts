// Partners die gasten naar moroww.com sturen via ?ref=<slug>. De slug komt
// ook in partner_reservaties terecht; een slug hernoemen breekt de historiek.
export const PARTNERS = {
  beguin: 'Immo Beguin',
} as const

export type PartnerSlug = keyof typeof PARTNERS

export const PARTNER_COOKIE = 'moroww_partner'
export const PARTNER_COOKIE_DAGEN = 30

export function isPartner(s: unknown): s is PartnerSlug {
  return typeof s === 'string' && Object.prototype.hasOwnProperty.call(PARTNERS, s)
}

// Cookiewaarde: "<slug>.<eerste bezoek in ms>". Het tijdstip laat later zien
// hoe lang tussen doorklikken en boeken zit.
export function maakPartnerCookie(partner: PartnerSlug, nu = Date.now()) {
  return `${partner}.${nu}`
}

export function leesPartnerCookie(waarde: string | undefined) {
  if (!waarde) return null
  const [slug, ms] = waarde.split('.')
  const aangekomenOp = Number(ms)
  if (!isPartner(slug) || !Number.isFinite(aangekomenOp)) return null
  return { partner: slug, aangekomenOp: new Date(aangekomenOp) }
}
