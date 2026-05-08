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

export async function GET(request: NextRequest, { params }: { params: { pandId: string } }) {
  if (!isAuthed(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: pageData } = await adminClient()
    .from('welcome_pages')
    .select('*')
    .eq('pand_id', params.pandId)
    .maybeSingle()

  const { data: tips } = await adminClient()
    .from('lokale_tips')
    .select('*')
    .eq('pand_id', params.pandId)
    .order('created_at', { ascending: true })

  return NextResponse.json({ data: pageData, tips: tips ?? [] })
}

export async function POST(request: NextRequest, { params }: { params: { pandId: string } }) {
  if (!isAuthed(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { error } = await adminClient()
    .from('welcome_pages')
    .upsert({ ...body, pand_id: params.pandId }, { onConflict: 'pand_id' })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
