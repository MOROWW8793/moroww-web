// Datalaag voor de verblijfsbelasting per gemeente.
//
// De tabel leeft in Supabase omdat ze gemeente-per-gemeente aangevuld wordt
// naarmate wij reglementen opvragen. De andere kennispagina's staan statisch
// in de repo — dit is de enige die schaalt met rijen.
//
// De app leest niét uit de rauwe tabel maar uit de view `verblijfsbelasting_publiek`.
// Die view filtert op `gepubliceerd = true AND status = 'bevestigd'` en is
// onze enige source of truth voor wat publiek zichtbaar mag zijn. Zo staat er
// geen filterlogica in de app die per ongeluk kan wijken; een gemeente krijgt
// een pagina zodra we ze in de databank vrijgeven, niet eerder.

import { supabase } from '@/lib/supabase'

/** De publieke view. Wijziging op één plaats propageert naar hub, detail en sitemap. */
const PUBLIEKE_BRON = 'verblijfsbelasting_publiek'

export type Heffingsvorm =
  | 'per_persoon_per_nacht'
  | 'forfait_per_slaapplaats'
  | 'forfait_per_eenheid'
  | 'belasting_op_uitbating'
  | 'onbekend'
  | 'geen'

export interface VerblijfsbelastingRow {
  gemeente_naam: string
  gemeente_slug: string
  provincie: string
  heffingsvorm: Heffingsvorm
  tarief_bedrag: number | null
  tarief_eenheid: string | null
  tarief_bedrag_alt: number | null
  tarief_eenheid_alt: string | null
  doorrekenbaar_max: number | null
  aangifte_frequentie: string | null
  reglement_url: string | null
  laatst_nagekeken_op: string
  status: string | null
}

export const HEFFINGSVORM_LABEL: Record<Heffingsvorm, string> = {
  per_persoon_per_nacht:   'per persoon per overnachting',
  forfait_per_slaapplaats: 'forfait per slaapplaats per jaar',
  forfait_per_eenheid:     'forfait per verblijfseenheid per jaar',
  belasting_op_uitbating:  'belasting op de uitbating van toeristische logies',
  onbekend:                'op te vragen bij dienst belastingen',
  geen:                    'geen verblijfsbelasting',
}

export async function alleGemeenten(): Promise<VerblijfsbelastingRow[]> {
  const { data, error } = await supabase
    .from(PUBLIEKE_BRON)
    .select('*')
    .order('gemeente_naam', { ascending: true })
  if (error) {
    console.error('[kennis/verblijfsbelasting] alle:', error.message)
    return []
  }
  return (data ?? []) as VerblijfsbelastingRow[]
}

export async function gemeenteBySlug(slug: string): Promise<VerblijfsbelastingRow | null> {
  const { data, error } = await supabase
    .from(PUBLIEKE_BRON)
    .select('*')
    .eq('gemeente_slug', slug)
    .maybeSingle()
  if (error) {
    console.error('[kennis/verblijfsbelasting] bySlug:', error.message)
    return null
  }
  return (data as VerblijfsbelastingRow | null) ?? null
}

/** ISO-datum → '19 augustus 2026' */
export function formatDatumNL(iso: string): string {
  const d = new Date(iso)
  return new Intl.DateTimeFormat('nl-BE', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Brussels',
  }).format(d)
}

export function formatEuro(n: number): string {
  return new Intl.NumberFormat('nl-BE', {
    style: 'currency', currency: 'EUR', maximumFractionDigits: 2,
  }).format(n).replace(/\s/g, ' ')
}
