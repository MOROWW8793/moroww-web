export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "moroww",
    "url": "https://www.moroww.com",
    "logo": "https://www.moroww.com/images/logo.png",
    "description": "Kwaliteitslabel voor premium vakantiewoningen in België.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BE",
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info@moroww.com",
      "contactType": "customer service",
      "availableLanguage": "Dutch",
    },
    "sameAs": [
      "https://www.instagram.com/moroww",
      "https://www.linkedin.com/company/moroww",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "moroww",
    "url": "https://www.moroww.com",
    "description": "Gecureerde premium vakantiewoningen in België.",
    "inLanguage": "nl-BE",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.moroww.com/collectie?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": "moroww",
    "url": "https://www.moroww.com",
    "description": "Premium vakantiewoningen in België. Kust, Ardennen, Meetjesland.",
    "areaServed": [
      { "@type": "State", "name": "West-Vlaanderen" },
      { "@type": "State", "name": "Oost-Vlaanderen" },
      { "@type": "State", "name": "Luxemburg" },
      { "@type": "State", "name": "Namen" },
    ],
    "priceRange": "€€€",
    "image": "https://www.moroww.com/images/og-image.jpg",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  );
}
