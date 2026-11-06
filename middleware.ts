import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextRequest, NextResponse } from 'next/server'
import { PARTNER_COOKIE, isPartner, leesPartnerCookie, zetPartnerCookie } from './lib/partner'
import { TOESTEMMING_COOKIE, leesToestemming } from './lib/toestemming'

const intlMiddleware = createIntlMiddleware(routing)

// Verlengt de partnercookie bij elk bezoek (Chrome houdt een cookie maximaal
// 400 dagen bij) en zet ze meteen bij een partnerlink als de bezoeker al
// toestemming gaf. Zonder keuze gebeurt hier niets: dat beslist de banner.
function partnerCookie(request: NextRequest, response: NextResponse) {
  const toestemming = leesToestemming(request.cookies.get(TOESTEMMING_COOKIE)?.value)
  if (!toestemming) return
  const waarde = request.cookies.get(PARTNER_COOKIE)?.value
  if (!toestemming.doelen.includes('partner')) {
    if (waarde) response.cookies.delete(PARTNER_COOKIE)
    return
  }
  const bestaand = leesPartnerCookie(waarde)
  const ref = request.nextUrl.searchParams.get('ref')
  if (bestaand) zetPartnerCookie(response, bestaand)
  else if (isPartner(ref)) zetPartnerCookie(response, { partner: ref, aangekomenOp: new Date() })
  else if (waarde) response.cookies.delete(PARTNER_COOKIE)
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // moroww how en moroww hub hebben hun eigen layout buiten [locale] (NL-only).
  if (/^\/(how|hub)(\/|$)/.test(pathname)) {
    return NextResponse.next()
  }

  // Admin protection
  if (pathname.startsWith('/admin/')) {
    const adminAuth = request.cookies.get('admin_auth')
    if (!adminAuth || adminAuth.value !== 'true') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return NextResponse.next()
  }

  const response = intlMiddleware(request)
  partnerCookie(request, response)
  return response
}

export const config = {
  matcher: [
    // 'welkom' (met k) is uitgesloten omdat /welkom/<token> via rewrites naar
    // moroww-os wordt geproxyd; next-intl mag die token niet aanraken (anders
    // wordt hij tot /nl/welkom/<token> verminkt). 'welcome' (met c) blijft
    // apart bestaan als de bestaande pandpagina.
    // 'kennis' is NL-only en heeft een eigen layout — geen next-intl-routing
    // erop, anders krijgen /kennis/... URLs een /nl-prefix die niemand zoekt.
    '/((?!api|_next|admin|onboarding|welcome|welkom|kennis|.*\\..*).*)',
  ],
}
