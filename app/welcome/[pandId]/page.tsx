export const dynamic = 'force-dynamic'

import { createClient } from '@supabase/supabase-js'

export default async function WelcomePage({
  params
}: {
  params: { pandId: string }
}) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data, error } = await supabase
    .from('welcome_pages')
    .select('*')
    .eq('pand_id', params.pandId)
    .maybeSingle()

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Debug</h1>
      <p>Pand ID: {params.pandId}</p>
      <p>Error: {error ? JSON.stringify(error) : 'geen'}</p>
      <p>Data: {data ? JSON.stringify(data).slice(0, 200) : 'null'}</p>
      <p>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'aanwezig' : 'ONTBREEKT'}</p>
      <p>Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'aanwezig' : 'ONTBREEKT'}</p>
    </div>
  )
}
