import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextRequest, NextResponse } from 'next/server'

const intlMiddleware = createIntlMiddleware(routing)

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Admin protection
  if (pathname.startsWith('/admin/')) {
    const adminAuth = request.cookies.get('admin_auth')
    if (!adminAuth || adminAuth.value !== 'true') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return NextResponse.next()
  }

  return intlMiddleware(request)
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
