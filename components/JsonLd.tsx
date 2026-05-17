export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'moroww',
          url: 'https://www.moroww.com',
          logo: 'https://www.moroww.com/images/moroww-logo.png',
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'info@moroww.com',
            contactType: 'customer service',
            availableLanguage: ['Dutch', 'French', 'English'],
          },
          sameAs: [
            'https://www.instagram.com/moroww.com_/',
            'https://www.linkedin.com/company/moroww/',
          ],
          areaServed: {
            '@type': 'Country',
            name: 'Belgium',
          },
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
