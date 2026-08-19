// Veelgestelde vragen + FAQPage-schema in één component.
//
// Antwoordmachines lezen het schema, mensen lezen de visuele lijst. Ze horen
// altijd hetzelfde te tonen — daarom render ik beide vanuit dezelfde array.

import { AuditLijn } from '@/components/AuditLijn'

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
    <section className="mt-14">
      <div className="h2-section mb-6">
        <AuditLijn density="structural" items={[titel]} />
        <h2>{titel}</h2>
      </div>
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
