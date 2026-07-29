import Image from 'next/image'
import { BedDouble, Bath, Users } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { BADGE_STYLES, lwArr, type Locale, type Woning } from '@/lib/woningen'

/**
 * Rendert een raster van pandkaarten zonder filter-tabs. Gebruikt op
 * /the-shore, /the-fields en overal waar we een subset panden willen tonen.
 * De filter-versie met tabs zit in CollectieStatisch.
 */
export async function WoningKaarten({
  woningen: items,
  locale,
}: {
  woningen: Woning[]
  locale: Locale
}) {
  const t = await getTranslations('collectie')

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {items.map((w) => (
        <Link
          key={w.id}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          href={`/collectie/${w.id}` as any}
          aria-label={`bekijk ${w.naam}`}
          className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col cursor-pointer"
        >
          {/* Hero foto */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={w.heroFoto}
              alt={w.naam}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <span
              className="absolute top-4 left-4 text-xs font-medium uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: BADGE_STYLES[w.collectie].bg, color: BADGE_STYLES[w.collectie].color }}
            >
              {w.collectie}
            </span>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            <div className="mb-3">
              <h3 className="font-bold text-moroww-black text-xl leading-tight">
                {w.naam}
              </h3>
              <p className="text-moroww-black/50 text-sm mt-1">{w.locatie}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {lwArr(w.tags, locale).map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-moroww-black/60 bg-moroww-blush px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Specs — verberg elk item dat ontbreekt of 0 is */}
            <div className="flex gap-5 text-sm text-moroww-black/55 mb-5">
              {w.slaapkamers ? (
                <span className="flex items-center gap-1.5">
                  <BedDouble size={14} />
                  {w.slaapkamers} {t('bedrooms')}
                </span>
              ) : null}
              {w.badkamers ? (
                <span className="flex items-center gap-1.5">
                  <Bath size={14} />
                  {w.badkamers} {t('bathrooms')}
                </span>
              ) : null}
              {w.maxGasten ? (
                <span className="flex items-center gap-1.5">
                  <Users size={14} />
                  {w.maxGasten} {t('guests')}
                </span>
              ) : null}
            </div>

            {/* Prijs + CTA */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-moroww-brown/15">
              {w.comingSoon ? (
                <span className="text-xs font-semibold text-moroww-brown lowercase tracking-wide">
                  {t('coming_soon')}
                </span>
              ) : (
                <>
                  {w.prijs ? (
                    <div>
                      <span className="font-bold text-xl text-moroww-black">{t('from')} €{w.prijs}</span>
                      <span className="text-sm text-moroww-black/45 ml-1">{t('per_night')}</span>
                    </div>
                  ) : <div />}
                  <span className="rounded-full bg-moroww-orange group-hover:bg-moroww-orange/85 text-white font-semibold text-sm px-5 py-2.5 transition-colors duration-200">
                    {t('view_book')}
                  </span>
                </>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
