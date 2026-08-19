// Gemeenschappelijke metadata voor alle /kennis-pagina's.
//
// Voorkomt dat elke pagina hetzelfde OG- en canonical-blok kopieert.

import type { Metadata } from 'next'

const BASE = 'https://www.moroww.com'

export function kennisMetadata({
  titel,
  beschrijving,
  pad,
}: {
  titel: string
  beschrijving: string
  /** Pad zonder trailing slash, bv. '/kennis/wat-kost-een-nacht-vakantiewoning'. */
  pad: string
}): Metadata {
  const url = `${BASE}${pad}`
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
      images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'moroww' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titel,
      description: beschrijving,
      images: ['/images/og-default.jpg'],
    },
    robots: { index: true, follow: true },
  }
}

/** Constanten die vaak in schema.org-blokken terugkomen. */
export const KENNIS_GEPUBLICEERD = '2026-08-19'
