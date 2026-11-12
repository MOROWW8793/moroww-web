export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': ['Organization', 'LocalBusiness'],
          name: 'moroww',
          legalName: 'MOROWW BV',
          vatID: 'BE1030667956',
          telephone: '+32 456 91 20 24',
          email: 'info@moroww.com',
          alternateName: ['morrow', 'moroww vakantiewoningen'],
          url: 'https://www.moroww.com',
          logo: 'https://www.moroww.com/images/logo.png',
          image: 'https://www.moroww.com/images/og-default.jpg',
          description: 'moroww is een kwaliteitslabel voor vakantiewoningen in België. Elk huis in de collectie wordt persoonlijk bezocht, elk jaar opnieuw, en is rechtstreeks te boeken op moroww.com. Voor eigenaars: het label, moroww advisory, moroww hub en volledig beheer.',
          '@id': 'https://www.moroww.com',
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'info@moroww.com',
            contactType: 'customer service',
            availableLanguage: ['Dutch', 'French', 'English'],
          },
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'BE',
            addressRegion: 'West-Vlaanderen',
            addressLocality: 'Waregem',
          },
          sameAs: [
            'https://www.instagram.com/moroww.com_/',
            'https://www.linkedin.com/company/moroww/',
            'https://book.moroww.com',
          ],
          areaServed: [
            { '@type': 'Country', name: 'Belgium' },
          ],
          knowsAbout: [
            'vakantiewoning verhuren',
            'kwaliteitslabel vakantiewoningen',
            'gecertificeerde vakantiewoningen',
            'sensory design',
            'smart lock vakantiewoning',
          ],
        }),
      }}
    />
  )
}

/**
 * BreadcrumbList JSON-LD voor pandpagina's. Toont Home > Collectie > Naam.
 * Gebruikt de canonical URL (dus zonder locale-prefix voor NL, met /en voor EN).
 */
export function BreadcrumbListJsonLd({
  items,
}: {
  items: Array<{ name: string; url: string }>
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: item.url,
          })),
        }),
      }}
    />
  )
}

export function VacationRentalJsonLd({
  name,
  description,
  image,
  pricePerNight,
  maxOccupancy,
  address,
  url,
  amenities,
}: {
  name: string
  description: string
  image: string
  pricePerNight?: number
  maxOccupancy?: number
  address: string
  url: string
  amenities?: string[]
}) {
  const amenityFeatures = (amenities ?? []).map((n) => ({
    '@type': 'LocationFeatureSpecification' as const,
    name: n,
    value: true,
  }))
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LodgingBusiness',
          name,
          description,
          image: `https://www.moroww.com${image}`,
          url,
          ...(pricePerNight ? { priceRange: `€${pricePerNight}` } : {}),
          ...(maxOccupancy ? { maximumAttendeeCapacity: maxOccupancy } : {}),
          address: {
            '@type': 'PostalAddress',
            addressLocality: address,
            addressCountry: 'BE',
          },
          ...(amenityFeatures.length > 0 ? { amenityFeature: amenityFeatures } : {}),
        }),
      }}
    />
  )
}

/** Service-schema voor de eigenaarsdiensten (label, advisory, beheer). */
export function ServiceJsonLd({
  naam,
  beschrijving,
  url,
  soort,
}: {
  naam: string
  beschrijving: string
  url: string
  soort: string
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: naam,
          description: beschrijving,
          url,
          serviceType: soort,
          areaServed: { '@type': 'Country', name: 'Belgium' },
          provider: { '@id': 'https://www.moroww.com' },
        }),
      }}
    />
  )
}
