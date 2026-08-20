import { getTranslations } from 'next-intl/server'
import { type Locale, type Woning } from '@/lib/woningen'
import { PandKaart, formatAuditMaand } from '@/components/PandKaart'

/**
 * Rendert een raster van pandkaarten zonder filter-tabs. Gebruikt op
 * /the-shore, /the-fields en overal waar we een subset panden willen
 * tonen. De filter-versie zit in CollectieStatisch.
 */
export async function WoningKaarten({
  woningen: items,
}: {
  woningen: Woning[]
  locale: Locale
}) {
  const t = await getTranslations('collectie')

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {items.map((w) => {
        const maand = formatAuditMaand(w.geauditeerdOp)
        const auditItems = [
          w.collectie,
          w.oppervlakte ?? '',
          w.slaapkamers ? `${w.slaapkamers} ${t('bedrooms')}` : '',
          maand ? `geauditeerd ${maand}` : '',
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
