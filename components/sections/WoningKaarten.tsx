import { getTranslations } from 'next-intl/server'
import { type Locale, type Woning, sortForCollectie } from '@/lib/woningen'
import { PandKaart } from '@/components/PandKaart'

/**
 * Rendert een raster van pandkaarten zonder filter-tabs. Gebruikt op
 * /the-shore, /the-fields en overal waar we een subset panden willen
 * tonen. De filter-versie zit in CollectieStatisch. Sortering
 * (shore → fields → prijs oplopend) gebeurt hier zodat elke caller
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {sortForCollectie(items).map((w) => {
        const auditItems = [
          w.collectie,
          w.oppervlakte ?? '',
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
          />
        )
      })}
    </div>
  )
}
