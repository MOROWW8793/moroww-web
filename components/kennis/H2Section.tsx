// H2-scheiding voor het artikelsjabloon. Bouwspec sectie 4.
//
// Boven elke H2 staat een auditlijn (density 'structural': lijn boven én
// onder) met de sectietitel als enige item. De H2 zelf blijft zichtbaar en
// leesbaar; de auditlijn is de sectiescheiding en het gedragen label.

import { AuditLijn } from '@/components/AuditLijn'

export function H2Section({ titel }: { titel: string }) {
  return (
    <section className="h2-section mt-14 mb-4">
      <AuditLijn density="structural" items={[titel]} />
      <h2>{titel}</h2>
    </section>
  )
}
