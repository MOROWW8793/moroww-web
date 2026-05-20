import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

function isAuthed(request: NextRequest) {
  return request.cookies.get('admin_auth')?.value === 'true'
}

// Fields that the admin UI is allowed to update.
// Scraper-owned fields (score, is_passing_filters, source_url, …) are excluded.
const ALLOWED_FIELDS = new Set([
  'status',
  'notes',
  'owner_name',
  'owner_phone',
  'follow_up_date',
  'last_contacted_at',
])

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = params
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }

  const body = await request.json() as Record<string, unknown>

  // Strip any fields not on the whitelist
  const updates: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(body)) {
    if (ALLOWED_FIELDS.has(key)) {
      updates[key] = value
    }
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No allowed fields in request' }, { status: 400 })
  }

  // Auto-set last_contacted_at when status transitions to contacted
  if (updates.status === 'contacted' && !updates.last_contacted_at) {
    updates.last_contacted_at = new Date().toISOString()
  }

  const { data, error } = await adminClient()
    .from('prospects')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}
