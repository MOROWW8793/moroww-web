export const dynamic = 'force-dynamic'
export const revalidate = 0

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

  const { data: page } = await supabase
    .from('welcome_pages')
    .select('*')
    .eq('pand_id', params.pandId)
    .is('actief', true)
    .maybeSingle()

  const { data: tips } = await supabase
    .from('lokale_tips')
    .select('*')
    .eq('pand_id', params.pandId)
    .order('categorie', { ascending: true })

  if (!page) {
    return <div style={{ padding: 40 }}>Pagina niet gevonden voor {params.pandId}</div>
  }

  const { WelcomeClient } = await import('./WelcomeClient')

  return (
    <WelcomeClient
      page={page}
      tips={tips ?? []}
      pandNaam={page.pand_naam ?? params.pandId}
      pandId={params.pandId}
    />
  )
}
