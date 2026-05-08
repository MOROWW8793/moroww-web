import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { WelcomeClient } from './WelcomeClient'

export const dynamic = 'force-dynamic'

function serverClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

const PAND_NAMEN: Record<string, string> = {
  'nosso-knokke':       'Nosso Logies',
  'ann-helena-ursel':   'Chalet Ann-Helena',
  'moroww-oostende':    'Oostende',
  'cozy-relax-beernem': 'The Cozy Relax Home',
}

export async function generateMetadata({ params }: { params: { pandId: string } }) {
  const naam = PAND_NAMEN[params.pandId] ?? 'Welkom'
  return {
    title: `${naam} - Welkom bij moroww`,
    description: `Welkomstpagina voor gasten van ${naam}.`,
  }
}

export default async function WelcomePage({ params }: { params: { pandId: string } }) {
  const supabase = serverClient()

  const { data: page } = await supabase
    .from('welcome_pages')
    .select('*')
    .eq('pand_id', params.pandId)
    .eq('actief', true)
    .maybeSingle()

  if (!page) notFound()

  const { data: tips } = await supabase
    .from('lokale_tips')
    .select('*')
    .eq('pand_id', params.pandId)
    .order('categorie', { ascending: true })

  const pandNaam = PAND_NAMEN[params.pandId] ?? params.pandId

  return <WelcomeClient page={page} tips={tips ?? []} pandNaam={pandNaam} />
}
