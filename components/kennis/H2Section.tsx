// Sectiescheiding voor het artikelsjabloon.
//
// Enkele hairline in --moroww-rule, zonder tekst, gevolgd door de zichtbare
// H2. Ritme: space-8 boven de hairline, space-6 eronder. De auditlijn is
// hier bewust niet gebruikt — een sectietitel is geen metadata en zou de
// tekst verdubbelen.

export function H2Section({ titel }: { titel: string }) {
  return (
    <section className="h2-section mt-mw-8">
      <hr className="border-0 border-t border-moroww-rule mb-mw-6" aria-hidden />
      <h2>{titel}</h2>
    </section>
  )
}
