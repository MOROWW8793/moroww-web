import { getTranslations } from 'next-intl/server'
import { type Locale, type Woning, sortForCollectie } from '@/lib/woningen'
import { PandKaart } from '@/components/PandKaart'
import type { LabelWoning } from '@/lib/labelWoningen'
import { Link } from '@/i18n/navigation'

/**
 * Rendert een raster van pandkaarten zonder filter-tabs. Gebruikt op
 * /the-shore, /the-fields en overal waar we een subset panden willen
 * tonen. De filter-versie zit in CollectieStatisch. Sortering
 * (nieuw → shore → fields → prijs oplopend) gebeurt hier zodat elke caller
 * automatisch dezelfde volgorde krijgt.
 */
export async function WoningKaarten({
  woningen: items,
  labelWoningen = [],
  locale,
  plekVoorEigenaar = false,
}: {
  woningen: Woning[]
  locale: Locale
  /** Labelhuizen die de eigenaar zelf verhuurt; komen na de eigen collectie. */
  labelWoningen?: LabelWoning[]
  /** Toont na de huizen een lege kaart "jouw huis hier?" die naar het label leidt. */
  plekVoorEigenaar?: boolean
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
      {labelWoningen.map((w) => (
        <PandKaart
          key={w.id}
          href="/"
          externeHref={w.eigenBoekingsUrl}
          beeld={w.heroFoto}
          beeldAlt={w.naam}
          titel={w.naam}
          plaats={w.locatie}
          auditItems={[
            w.oppervlakte ?? '',
            w.slaapkamers ? `${w.slaapkamers} ${bedroomsLabel}` : '',
            w.maxGasten ? `${w.maxGasten} ${gastenLabel}` : '',
            locale === 'en' ? 'book with the owner ↗' : 'boek bij de eigenaar ↗',
          ]}
          label={w.gekeurd ? (locale === 'en' ? `moroww label ${w.gekeurd}` : `moroww-label ${w.gekeurd}`) : 'moroww-label'}
        />
      ))}
      {plekVoorEigenaar && (
        <Link href="/het-label" className="group block">
          <div className="relative aspect-[4/5] flex flex-col items-center justify-center gap-mw-4 border-2 border-dashed border-moroww-dark/25 group-hover:border-moroww-orange transition-colors duration-300 text-center px-mw-6">
            <svg aria-hidden viewBox="0 0 64 40" className="w-16 h-auto opacity-80 group-hover:opacity-100 transition-opacity">
              <g fill="#fea05e">
                <ellipse cx="32" cy="12" rx="5" ry="11" />
                <ellipse cx="32" cy="12" rx="5" ry="11" transform="rotate(-38 32 30)" />
                <ellipse cx="32" cy="12" rx="5" ry="11" transform="rotate(38 32 30)" />
                <ellipse cx="32" cy="12" rx="4.5" ry="10" transform="rotate(-76 32 30)" />
                <ellipse cx="32" cy="12" rx="4.5" ry="10" transform="rotate(76 32 30)" />
              </g>
            </svg>
            <p className="text-h3 text-moroww-dark">
              {locale === 'en' ? 'your home here?' : 'jouw huis hier?'}
            </p>
            <p className="text-body text-moroww-ink-2 max-w-[30ch]">
              {locale === 'en'
                ? 'With the moroww label, your home joins the collection, with a direct link to your own booking site.'
                : 'Met het moroww-label staat je huis in de collectie, met een rechtstreekse link naar je eigen boekingssite.'}
            </p>
          </div>
          <div className="mt-mw-4">
            <h3 className="text-h3 text-moroww-dark">{locale === 'en' ? 'for owners' : 'voor eigenaars'}</h3>
            <p className="mt-1 text-body text-moroww-ink-2 underline underline-offset-4 decoration-moroww-label group-hover:decoration-moroww-dark">
              {locale === 'en' ? 'about the label →' : 'over het label →'}
            </p>
          </div>
        </Link>
      )}
    </div>
  )
}
