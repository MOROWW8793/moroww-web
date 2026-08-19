// Schema.org-blokken voor de kennispagina's.
//
// Alle pagina's krijgen Article. Sommige daarbovenop HowTo, SoftwareApplication
// of Dataset. FAQPage zit in Faq.tsx omdat de vragen daar al staan.

interface ArticleProps {
  titel: string
  beschrijving: string
  url: string
  datumGepubliceerd: string
  datumGewijzigd: string
}

export function ArticleJsonLd({ titel, beschrijving, url, datumGepubliceerd, datumGewijzigd }: ArticleProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: titel,
    description: beschrijving,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Organization', name: 'moroww', url: 'https://www.moroww.com' },
    publisher: {
      '@type': 'Organization',
      name: 'moroww',
      logo: { '@type': 'ImageObject', url: 'https://www.moroww.com/images/logo.png' },
    },
    datePublished: datumGepubliceerd,
    dateModified: datumGewijzigd,
    inLanguage: 'nl-BE',
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

interface HowToStep {
  naam: string
  tekst: string
}

interface HowToProps {
  naam: string
  beschrijving: string
  stappen: HowToStep[]
}

export function HowToJsonLd({ naam, beschrijving, stappen }: HowToProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: naam,
    description: beschrijving,
    step: stappen.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.naam,
      text: s.tekst,
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

interface SoftwareAppProps {
  naam: string
  beschrijving: string
  url: string
}

export function SoftwareApplicationJsonLd({ naam, beschrijving, url }: SoftwareAppProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: naam,
    description: beschrijving,
    url,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

interface DatasetProps {
  naam: string
  beschrijving: string
  url: string
  datumGewijzigd: string
}

export function DatasetJsonLd({ naam, beschrijving, url, datumGewijzigd }: DatasetProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: naam,
    description: beschrijving,
    url,
    creator: { '@type': 'Organization', name: 'moroww' },
    dateModified: datumGewijzigd,
    license: 'https://www.moroww.com/privacy',
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
