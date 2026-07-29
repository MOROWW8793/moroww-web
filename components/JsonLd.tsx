export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': ['Organization', 'LocalBusiness'],
          name: 'moroww',
          alternateName: ['morrow', 'moroww vakantiewoningen'],
          url: 'https://www.moroww.com',
          logo: 'https://www.moroww.com/images/moroww-logo.png',
          image: 'https://www.moroww.com/images/og-default.jpg',
          description: 'moroww is een gecertificeerd kwaliteitslabel voor premium vakantiewoningen in België. Elke woning wordt fysiek geïnspecteerd voor opname.',
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
            addressRegion: 'Oost-Vlaanderen',
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

export function VacationRentalJsonLd({
  name,
  description,
  image,
  pricePerNight,
  maxOccupancy,
  address,
  url,
}: {
  name: string
  description: string
  image: string
  pricePerNight: number
  maxOccupancy: number
  address: string
  url: string
}) {
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
          priceRange: `€${pricePerNight}`,
          maximumAttendeeCapacity: maxOccupancy,
          address: {
            '@type': 'PostalAddress',
            addressLocality: address,
            addressCountry: 'BE',
          },
          amenityFeature: [
            { '@type': 'LocationFeatureSpecification', name: 'Smart lock', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Eigen parking', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Wifi', value: true },
          ],
        }),
      }}
    />
  )
}
