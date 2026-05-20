import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextRequest, NextResponse } from 'next/server'

const intlMiddleware = createIntlMiddleware(routing)

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect all /admin/* pages and /api/admin/* routes with the cookie.
  if (pathname.startsWith('/admin/') || pathname.startsWith('/api/admin/')) {
    const adminAuth = request.cookies.get('admin_auth')
    if (!adminAuth || adminAuth.value !== 'true') {
      // API callers get 401; browser navigation gets a redirect.
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return NextResponse.next()
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: [
    // Include /admin/* and /api/admin/* so the middleware actually runs for those paths.
    '/admin/:path*',
    '/api/admin/:path*',
    // Everything else except static files, _next, and other known public prefixes.
    '/((?!api|_next|onboarding|welcome|.*\\..*).*)',
  ],
}
