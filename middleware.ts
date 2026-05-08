import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin/')) {
    if (pathname === '/admin' || pathname === '/admin/login') {
      return NextResponse.next()
    }
    const adminAuth = request.cookies.get('admin_auth')
    if (!adminAuth || adminAuth.value !== 'true') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
