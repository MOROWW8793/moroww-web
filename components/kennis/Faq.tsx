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
      <div className="space-y-3">
        {items.map((it) => (
          <details key={it.vraag} className="group rounded-2xl border border-moroww-rule bg-white px-5 md:px-6 open:shadow-[0_30px_60px_-40px_rgba(26,26,26,0.35)]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-moroww-dark [&::-webkit-details-marker]:hidden">
              {it.vraag}
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-moroww-blush transition-transform group-open:rotate-45 motion-reduce:transition-none" aria-hidden>+</span>
            </summary>
            <p className="pb-5 text-moroww-dark/80 leading-relaxed">{it.antwoord}</p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  )
}
