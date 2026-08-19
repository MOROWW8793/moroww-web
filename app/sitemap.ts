import type { MetadataRoute } from 'next'
import { woningen } from '@/lib/woningen'
import { alleGemeenten } from '@/lib/kennis/verblijfsbelasting'
import { supabase } from '@/lib/supabase'

const BASE = 'https://www.moroww.com'
const GEMEENTE_URL_RE = /\/kennis\/verblijfsbelasting-vakantiewoning\/([^/]+)$/

// NL-only kennispagina's onder /kennis. Één bron van waarheid.
//
// /rendement-vakantiewoning-berekenen en /waarom-vakantiewoningen-afvallen
// zijn bewust weggelaten: de eerste heeft nog geen echte module, de tweede
// mist de redenen-per-categorie. Beide pagina's staan op noindex en horen
// hier terug zodra de content klaar is.
const KENNIS_ROUTES: Array<{ path: string; priority: number }> = [
  { path: '/kennis',                                                  priority: 0.85 },
  { path: '/kennis/wat-kost-een-nacht-vakantiewoning',                priority: 0.85 },
  { path: '/kennis/brandveiligheidsattest-vakantiewoning-vlaanderen', priority: 0.85 },
  { path: '/kennis/verblijfsbelasting-vakantiewoning',                priority: 0.85 },
  { path: '/kennis/tweedeverblijfsbelasting-of-logiesbelasting',      priority: 0.8  },
  { path: '/kennis/vakantiewoning-verhuren-zelf-platform-beheerder-label', priority: 0.8 },
]

// Routes die in beide talen bestaan. Voor NL: pad direct; voor EN: 'en'-alias.
// Zie i18n/routing.ts voor de pathname-mapping.
const BILINGUAL_ROUTES: Array<{
  nl: string
  en: string
  freq: 'weekly' | 'monthly' | 'yearly'
  priority: number
}> = [
  { nl: '/',              en: '/en',                    freq: 'weekly',  priority: 1.0 },
  { nl: '/collectie',     en: '/en/collection',         freq: 'weekly',  priority: 0.9 },
  { nl: '/the-shore',     en: '/en/the-shore',          freq: 'monthly', priority: 0.8 },
  { nl: '/the-fields',    en: '/en/the-fields',         freq: 'monthly', priority: 0.8 },
  { nl: '/over-moroww',   en: '/en/about',              freq: 'monthly', priority: 0.7 },
  { nl: '/de-standaard',  en: '/en/the-standard',       freq: 'monthly', priority: 0.8 },
  { nl: '/moroww-os',     en: '/en/moroww-os',          freq: 'monthly', priority: 0.7 },
  { nl: '/partners',      en: '/en/partners',           freq: 'monthly', priority: 0.5 },
  { nl: '/contact',       en: '/en/contact',            freq: 'yearly',  priority: 0.4 },
]

// NL-only routes (zie next.config.mjs voor 301 vanuit /en/...).
const NL_ONLY_ROUTES: Array<{
  path: string
  freq: 'weekly' | 'monthly' | 'yearly'
  priority: number
}> = [
  { path: '/eigenaar-worden', freq: 'monthly', priority: 0.9 },
  { path: '/vergelijking',    freq: 'monthly', priority: 0.7 },
  { path: '/privacy',         freq: 'yearly',  priority: 0.3 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  // Bilinguale statische routes — NL variant
  for (const r of BILINGUAL_ROUTES) {
    entries.push({
      url: `${BASE}${r.nl}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })
  }

  // Pandpagina's NL — iterreer over lib/woningen (zo staat elk nieuw pand
  // automatisch in de sitemap, wat eerder mis ging bij Sophora).
  for (const w of woningen) {
    entries.push({
      url: `${BASE}/collectie/${w.id}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  }

  // NL-only routes
  for (const r of NL_ONLY_ROUTES) {
    entries.push({
      url: `${BASE}${r.path}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })
  }

  // Bilinguale statische routes — EN variant
  for (const r of BILINGUAL_ROUTES) {
    entries.push({
      url: `${BASE}${r.en}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: Math.max(0.3, r.priority - 0.1),
    })
  }

  // Pandpagina's EN
  for (const w of woningen) {
    entries.push({
      url: `${BASE}/en/collection/${w.id}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  // Kennisbank — NL-only. Vaste pagina's uit de constante hierboven, plus één
  // detailpagina per gemeente uit de verblijfsbelasting-tabel. De list-query
  // is een goedkope call en verlaagt de kans dat een nieuwe gemeente vergeten
  // wordt in de sitemap.
  for (const r of KENNIS_ROUTES) {
    entries.push({
      url: `${BASE}${r.path}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: r.priority,
    })
  }

  const gemeenten = await alleGemeenten()
  for (const g of gemeenten) {
    entries.push({
      url: `${BASE}/kennis/verblijfsbelasting-vakantiewoning/${g.gemeente_slug}`,
      lastModified: new Date(g.laatst_nagekeken_op),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  // Build-time assert: elke gemeenteroute in de sitemap moet ook in
  // verblijfsbelasting_publiek staan. De view is onze source of truth voor
  // wat publiek zichtbaar mag zijn; als iemand ooit de sitemap-generator
  // wijzigt naar een andere bron (bijv. de rauwe tabel), vangt deze check
  // dat op — en `next build` faalt in plaats van dat een niet-vrijgegeven
  // gemeente in de sitemap belandt.
  //
  // We doen een aparte round trip naar de view. Zo bewijst de assert iets:
  // als sitemap en assert uit dezelfde helper zouden lezen, is de check
  // tautologisch.
  //
  // Zonder Supabase-credentials in de env valt de sitemap-loop hierboven al
  // stil terug op geen gemeenteroutes; dan hoeft er ook niets gecheckt te
  // worden. We loggen dat wel, want in productie hoort de query te slagen.
  const { data: publiek, error: publiekErr } = await supabase
    .from('verblijfsbelasting_publiek')
    .select('gemeente_slug')
  if (publiekErr) {
    console.warn(
      `[sitemap] kon verblijfsbelasting_publiek niet lezen voor consistency-check: ${publiekErr.message}`,
    )
  } else {
    const publiekeSlugs = new Set((publiek ?? []).map((r) => r.gemeente_slug as string))
    for (const entry of entries) {
      const m = entry.url.match(GEMEENTE_URL_RE)
      if (m && !publiekeSlugs.has(m[1])) {
        throw new Error(
          `[sitemap] gemeente '${m[1]}' zit in de sitemap maar niet in verblijfsbelasting_publiek. De sitemap mag alleen publieke gemeenten bevatten.`,
        )
      }
    }
  }

  return entries
}
