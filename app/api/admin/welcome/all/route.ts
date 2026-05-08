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

export async function GET(request: NextRequest) {
  if (!isAuthed(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { data } = await adminClient().from('welcome_pages').select('pand_id, actief')
  return NextResponse.json({ data })
}
