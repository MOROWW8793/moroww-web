import { NextRequest, NextResponse } from 'next/server';
import { hubClient } from '@/lib/hub/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const sb = await hubClient();
  await sb.auth.signOut();
  return NextResponse.redirect(new URL('/hub', request.url), { status: 303 });
}
