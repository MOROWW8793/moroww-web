/**
 * Vaste statrij met vier cijfers gescheiden door hairlines. Wordt gebruikt
 * op /eigenaar-worden. Cijfers komen live uit de screenings_publiek-view op
 * moroww-os (via lib/screenings.ts) en uit lib/reviews.ts, aangeleverd door
 * de caller. Bij een null-cijfer valt de cel terug op '—' (nooit '0').
 */
export function Statrij({
  items,
}: {
  items: Array<{ cijfer: string; label: string }>
}) {
  return (
    <section className="w-full bg-moroww-dark py-14 md:py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/15">
          {items.map((item) => (
            <div key={item.label} className="px-4 py-3 md:px-8 text-center">
              <div
                className="font-bold text-moroww-orange leading-none"
                style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)', letterSpacing: '-0.02em' }}
              >
                {item.cijfer}
              </div>
              <div className="text-white/60 mt-3" style={{ fontSize: 13, letterSpacing: 0.5 }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
