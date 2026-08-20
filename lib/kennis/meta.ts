// Gemeenschappelijke metadata voor alle /kennis-pagina's.
//
// Voorkomt dat elke pagina hetzelfde OG- en canonical-blok kopieert.
// article:published_time en article:modified_time zijn verplicht op
// artikelen — zonder is de opengraph 'article' technisch incompleet
// en pakken sommige platforms de kaart als generieke website-preview.

import type { Metadata } from 'next'

const BASE = 'https://www.moroww.com'
const DEFAULT_OG_IMAGE = '/images/og-default.jpg'

/** Vaste publicatiedatum voor de eerste release van de kennisbank.
 *  Individuele pagina's kunnen dit overrulen als de content herzien is. */
export const KENNIS_GEPUBLICEERD = '2026-08-19'

export function kennisMetadata({
  titel,
  beschrijving,
  pad,
  gepubliceerd = KENNIS_GEPUBLICEERD,
  gewijzigd,
  ogBeeld = DEFAULT_OG_IMAGE,
}: {
  titel: string
  beschrijving: string
  /** Pad zonder trailing slash, bv. '/kennis/wat-kost-een-nacht-vakantiewoning'. */
  pad: string
  /** ISO-datum. Default = KENNIS_GEPUBLICEERD. */
  gepubliceerd?: string
  /** ISO-datum. Default = `gepubliceerd`. Voor gemeentepagina's is dit
   *  laatst_nagekeken_op uit de verblijfsbelasting-tabel. */
  gewijzigd?: string
  /** Optioneel eigen og-beeld per artikel of cluster. Fallback: og-default.jpg. */
  ogBeeld?: string
}): Metadata {
  const url = `${BASE}${pad}`
  const imageUrl = ogBeeld.startsWith('http') ? ogBeeld : `${BASE}${ogBeeld}`
  const modified = gewijzigd ?? gepubliceerd

  return {
    title: titel,
    description: beschrijving,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      locale: 'nl_BE',
      url,
      siteName: 'moroww',
      title: titel,
      description: beschrijving,
      publishedTime: gepubliceerd,
      modifiedTime: modified,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: titel }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titel,
      description: beschrijving,
      images: [imageUrl],
    },
    robots: { index: true, follow: true },
  }
}
