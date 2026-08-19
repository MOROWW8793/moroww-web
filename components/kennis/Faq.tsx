// Veelgestelde vragen + FAQPage-schema in één component.
//
// Antwoordmachines lezen het schema, mensen lezen de visuele lijst. Ze horen
// altijd hetzelfde te tonen — daarom render ik beide vanuit dezelfde array.

import { H2Section } from '@/components/kennis/H2Section'

interface FaqItem {
  vraag: string
  antwoord: string
}

interface Props {
  titel?: string
  items: FaqItem[]
}

export function Faq({ titel = 'Veelgestelde vragen', items }: Props) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.vraag,
      acceptedAnswer: { '@type': 'Answer', text: it.antwoord },
    })),
  }
  return (
    <section>
      <H2Section titel={titel} />
      <div className="space-y-6">
        {items.map((it) => (
          <div key={it.vraag}>
            <p className="font-semibold text-moroww-dark mb-2">{it.vraag}</p>
            <p className="text-moroww-dark/80 leading-relaxed">{it.antwoord}</p>
          </div>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  )
}
