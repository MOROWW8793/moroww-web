/**
 * Vaste statrij met vier cijfers gescheiden door hairlines. Wordt gebruikt
 * op /de-standaard (350 · 7 · 129 · 10/10) en op /eigenaar-worden. Cijfers
 * komen uit constanten (lib/screenings.ts, lib/reviews.ts) via props, zodat
 * ze op één plek staan en niet in lopende tekst verdwijnen.
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
