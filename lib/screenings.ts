// Cijfers uit de moroww-os-databank (project bnbrutpgcfyeycopameh),
// via de publieke read-only view `screenings_publiek`. Voedt de blokken
// op /de-standaard, /kennis/waarom-vakantiewoningen-afvallen en de
// Statrij op /eigenaar-worden.
//
// Aparte Supabase-client want moroww-web heeft zijn eigen project voor
// verblijfsbelasting en de guest-token; screenings zit in het OS-project.
// Server-only env-vars — de anon key hoort niet in de browserbundle
// (blijft dus zonder NEXT_PUBLIC_-prefix).
//
// Bij ontbrekende env, netwerkfout, of lege response geeft screeningsPubliek
// null terug. Callers moeten dan de zin ZONDER getallen renderen — nooit
// "0 woningen bezocht" tonen, dat zou een echt cijfer suggereren.

import { createClient } from '@supabase/supabase-js'

export interface ScreeningsPubliek {
  aantal_dossier: number
  aantal_bezoek: number
  aantal_opgenomen: number
  /** ISO timestamptz uit de view. */
  bijgewerkt_op: string
}

const url = process.env.MOROWW_OS_SUPABASE_URL
const key = process.env.MOROWW_OS_SUPABASE_ANON_KEY

// Client alleen aanmaken als beide env-vars gezet zijn; anders geven we
// hieronder netjes null terug. persistSession=false want dit is een
// server-side aggregate-lezer, geen user-session.
const client =
  url && key ? createClient(url, key, { auth: { persistSession: false } }) : null

export async function screeningsPubliek(): Promise<ScreeningsPubliek | null> {
  if (!client) return null
  try {
    const { data, error } = await client
      .from('screenings_publiek')
      .select('aantal_dossier, aantal_bezoek, aantal_opgenomen, bijgewerkt_op')
      .single()
    if (error || !data) return null
    return data as ScreeningsPubliek
  } catch {
    return null
  }
}

/** Formatteert een ISO-timestamp naar 'MM.JJJJ' voor de AuditLijn-eyebrow. */
export function formatBijgewerktMaand(iso: string | null | undefined): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  return `${mm}.${d.getFullYear()}`
}
