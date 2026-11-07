import { NextRequest, NextResponse } from 'next/server';
import { hubClient } from '@/lib/hub/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const naar = url.searchParams.get('naar') || '/hub/leden';
  const veilig = /^\/hub\/(leden|partner|beheer)(\/[\w/-]*)?$/.test(naar) ? naar : '/hub/leden';
  if (code) {
    const sb = await hubClient();
    const { error } = await sb.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(veilig, url.origin));
  }
  return NextResponse.redirect(new URL('/hub/inloggen?fout=link', url.origin));
}
