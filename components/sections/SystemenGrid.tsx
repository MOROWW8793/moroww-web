/**
 * De zes systemen die samen moroww-os vormen: het slot, licht/warmte/geluid,
 * geur, geluidsgrens, incident-detectie, en het gewone. Wordt gebruikt op
 * /de-standaard en op de homepage — één component, één bron van waarheid.
 * Bedoeld voor donkere secties (border en tekstkleuren gaan uit van dark bg).
 */
export function SystemenGrid({
  items,
}: {
  items: Array<{ title: string; body: string }>
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
      {items.map((item) => (
        <div key={item.title} className="border-t border-white/15 pt-6">
          <h3 className="text-white font-semibold mb-2" style={{ fontSize: 18 }}>
            {item.title}
          </h3>
          <p className="text-white/60 leading-relaxed" style={{ fontSize: 15 }}>
            {item.body}
          </p>
        </div>
      ))}
    </div>
  )
}
