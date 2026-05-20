// app/api/admin/prospects/[id]/route.ts
//
// Server-side PATCH endpoint voor het updaten van een single prospect.
// Whitelist van toegestane velden voorkomt dat de client onbedoeld
// gevoelige velden (score, owner_email, source_url, ...) kan overschrijven.

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

// Enkel deze velden mogen via de admin UI worden geüpdatet.
// Score-velden en bron-data worden door scraper_for_supabase.py beheerd.
const ALLOWED_FIELDS = [
  'status',
  'notes',
  'owner_name',
  'owner_phone',
  'follow_up_date',
  'last_contacted_at',
];

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Auth check
  const cookieStore = cookies();
  if (!cookieStore.get('admin_auth')) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  // Parse body
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }

  // Whitelist filtering
  const updates: Record<string, unknown> = {};
  for (const key of ALLOWED_FIELDS) {
    if (key in body) updates[key] = body[key];
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'no valid fields to update' }, { status: 400 });
  }

  // Auto-set last_contacted_at when status flips to 'contacted'
  if (updates.status === 'contacted' && !updates.last_contacted_at) {
    updates.last_contacted_at = new Date().toISOString();
  }

  // Service role client
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
    .update(updates)
    .eq('id', params.id)
    .select()
    .single();

  if (error) {
    console.error('Prospects update error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ prospect: data });
}
