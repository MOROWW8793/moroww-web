// app/api/admin/prospects/route.ts
//
// Server-side GET endpoint voor de prospects-lijst.
// Gebruikt de SUPABASE_SERVICE_KEY (server-only, niet client-exposed).
// Auth-check op admin_auth cookie zoals middleware.ts.

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  // Auth check - zelfde cookie als middleware.ts
  const cookieStore = cookies();
  if (!cookieStore.get('admin_auth')) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  // Service role client - server-only
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
    {
      auth: {
        persistSession: false,
      },
    }
  );

  const { data, error } = await supabase
    .from('prospects')
    .select('*')
    .order('score', { ascending: false })
    .limit(500);

  if (error) {
    console.error('Prospects fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ prospects: data || [] });
}
