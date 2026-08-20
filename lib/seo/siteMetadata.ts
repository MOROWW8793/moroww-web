// Gemeenschappelijke metadata voor niet-kennis-pagina's.
//
// Waarom een helper: in Next.js worden `openGraph` en `twitter` als
// hele objecten door child-metadata VERVANGEN — niet gemerged. Als de
// root-layout hier default-waarden zet, gaan die op elke pagina die
// zijn eigen openGraph zet verloren. Elke pagina moet dus een volledig
// blok leveren. Deze helper zorgt dat het overal identiek gestructureerd
// is en dat title/description/url/image consistent doorlopen.

import type { Metadata } from 'next'

const BASE = 'https://www.moroww.com'
const DEFAULT_OG_IMAGE = '/images/og-default.jpg'

interface Options {
  /** De pagina-titel, zonder "| moroww"-suffix. */
  titel: string
  beschrijving: string
  /** Absoluut pad zonder trailing slash, bv. '/over-moroww' of '/en/about'. */
  pad: string
  /** Locale — bepaalt og:locale en helpt bij twitter:label. */
  locale?: 'nl' | 'en'
  /** Optioneel: absolute of relatieve URL naar og-beeld. Fallback: og-default.jpg. */
  ogBeeld?: string
  /** Optioneel: hreflang-mapping wanneer de pagina in beide talen bestaat. */
  hreflang?: { nl: string; en: string }
  /** Optioneel: wanneer de pagina noindex moet. */
  noindex?: boolean
}

export function siteMetadata({
  titel,
  beschrijving,
  pad,
  locale = 'nl',
  ogBeeld = DEFAULT_OG_IMAGE,
  hreflang,
  noindex,
}: Options): Metadata {
  const url = pad.startsWith('http') ? pad : `${BASE}${pad}`
  const imageUrl = ogBeeld.startsWith('http') ? ogBeeld : `${BASE}${ogBeeld}`

  const alternates: Metadata['alternates'] = { canonical: url }
  if (hreflang) {
    alternates.languages = {
      'nl-BE': hreflang.nl.startsWith('http') ? hreflang.nl : `${BASE}${hreflang.nl}`,
      nl: hreflang.nl.startsWith('http') ? hreflang.nl : `${BASE}${hreflang.nl}`,
      en: hreflang.en.startsWith('http') ? hreflang.en : `${BASE}${hreflang.en}`,
      'x-default': hreflang.nl.startsWith('http') ? hreflang.nl : `${BASE}${hreflang.nl}`,
    }
  }

  return {
    title: titel,
    description: beschrijving,
    alternates,
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: 'website',
      locale: locale === 'nl' ? 'nl_BE' : 'en_US',
      url,
      siteName: 'moroww',
      title: titel,
      description: beschrijving,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: titel }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titel,
      description: beschrijving,
      images: [imageUrl],
    },
  }
}
