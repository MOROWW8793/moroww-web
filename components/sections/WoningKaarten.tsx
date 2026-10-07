import { getTranslations } from 'next-intl/server'
import { type Locale, type Woning, sortForCollectie } from '@/lib/woningen'
import { PandKaart } from '@/components/PandKaart'

/**
 * Rendert een raster van pandkaarten zonder filter-tabs. Gebruikt op
 * /the-shore, /the-fields en overal waar we een subset panden willen
 * tonen. De filter-versie zit in CollectieStatisch. Sortering
 * (nieuw → shore → fields → prijs oplopend) gebeurt hier zodat elke caller
 * automatisch dezelfde volgorde krijgt.
 */
export async function WoningKaarten({
  woningen: items,
}: {
  woningen: Woning[]
  locale: Locale
}) {
  const t = await getTranslations('collectie')
  const vanaf = t('from')
  const perNacht = t('per_night')
  const gastenLabel = t('guests')
  const bedroomsLabel = t('bedrooms')

  const sorted = sortForCollectie(items)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {sorted.map((w, i) => {
        // Vaste volgorde: m² · X slk. · X gasten · vanaf €X / nacht.
        // Collectie zit al in de sortering (shore vóór fields) en in de
        // pagina-context; niet ook nog eens op de kaart.
        const auditItems = [
          w.oppervlakte ?? '',
          w.slaapkamers ? `${w.slaapkamers} ${bedroomsLabel}` : '',
          w.maxGasten ? `${w.maxGasten} ${gastenLabel}` : '',
          w.prijs ? `${vanaf} €${w.prijs} ${perNacht}` : '',
        ]
        return (
          <PandKaart
            key={w.id}
            href={{ pathname: '/collectie/[id]', params: { id: w.id } }}
            beeld={w.heroFoto}
            beeldAlt={w.naam}
            titel={w.naam}
            plaats={w.locatie}
            auditItems={auditItems}
            label={w.nieuw ? t('new_label') : undefined}
            // Eerste rij (2 kaarten op desktop, 1 op mobiel — we prioriteren
            // de eerste twee) laadt eager, zonder lazy-fade of vertraging.
            priority={i < 2}
          />
        )
      })}
    </div>
  )
}
