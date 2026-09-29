import { StatCel } from '@/components/sections/StatCel'

/**
 * Statrij met drie of vier cijfers gescheiden door hairlines. Wordt gebruikt
 * op /eigenaar-worden (vier cellen) en /de-standaard (drie cellen). Cijfers
 * komen live uit de screenings_publiek-view op moroww-os (via
 * lib/screenings.ts) en uit lib/reviews.ts, aangeleverd door de caller.
 *
 * Wrapper blijft server-component; elke cel is een aparte client-component
 * (StatCel) die het cijfer eenmalig laat optellen bij in-view.
 */
export function Statrij({
  items,
}: {
  items: Array<{ cijfer: string; label: string }>
}) {
  // Desktop-kolomcount volgt items.length (3 of 4). Beide klassen staan
  // hardgecodeerd zodat Tailwind ze bij compile-time meepakt.
  const desktopGrid =
    items.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'
  return (
    <section className="w-full bg-moroww-dark py-14 md:py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className={`grid grid-cols-2 ${desktopGrid} divide-x divide-white/15`}>
          {items.map((item) => (
            <StatCel key={item.label} cijfer={item.cijfer} label={item.label} />
          ))}
        </div>
      </div>
    </section>
  )
}
