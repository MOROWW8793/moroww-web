"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { liveWoningen, sortForCollectie } from "@/lib/woningen";
import { PandKaart } from "@/components/PandKaart";
import { SneakPeek } from "@/components/sections/SneakPeek";

// Filter-tabs zijn Link-elementen naar de collectiepagina's. /collectie
// zelf toont altijd alle panden; klikken op 'the shore' of 'the fields'
// gaat naar de dedicated collectiepagina met streektekst.
export function CollectieStatisch() {
  const t = useTranslations('collectie')
  const locale = useLocale()

  return (
    <div>
      {/* ── Filter tabs (nu links naar collectiepagina's) ── */}
      <div className="px-6 md:px-16 lg:px-24 py-8">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full px-5 py-2 text-sm font-medium bg-moroww-black text-white">
            {t('filter_all')}
          </span>
          <Link
            href="/the-shore"
            className="rounded-full px-5 py-2 text-sm font-medium bg-white text-moroww-black/60 hover:text-moroww-black border border-moroww-brown/15 transition-colors duration-150"
          >
            the shore →
          </Link>
          <Link
            href="/the-fields"
            className="rounded-full px-5 py-2 text-sm font-medium bg-white text-moroww-black/60 hover:text-moroww-black border border-moroww-brown/15 transition-colors duration-150"
          >
            the fields →
          </Link>
        </div>
      </div>

      {/* ── Woning kaarten. Vaste volgorde via sortForCollectie:
              shore → fields, binnen collectie op prijs oplopend. ── */}
      <div className="px-6 md:px-16 lg:px-24 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sortForCollectie(liveWoningen()).map((w, i) => {
            // Vaste volgorde: m² · X slk. · X gasten · vanaf €X / nacht.
            const auditItems = [
              w.oppervlakte ?? '',
              w.slaapkamers ? `${w.slaapkamers} ${t('bedrooms')}` : '',
              w.maxGasten ? `${w.maxGasten} ${t('guests')}` : '',
              w.prijs ? `${t('from')} €${w.prijs} ${t('per_night')}` : '',
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
                // Eerste rij eager laden — geen fade-in above the fold.
                priority={i < 2}
              />
            )
          })}
        </div>
      </div>

      {/* Sneak peek — vervangt het oude binnenkort-tekstblok (WP O). Twee
          panden aan de kust in beeld, geen prijs of link. */}
      <SneakPeek locale={locale} />

      {/* ── CTA onderaan ── */}
      <div className="px-6 md:px-16 lg:px-24 pb-24">
        <div className="bg-moroww-orange rounded-3xl p-10 md:p-16 text-center">
          <h2
            className="font-bold lowercase text-white leading-[1.05] tracking-[-0.02em] mb-4"
            style={{ fontSize: "clamp(1.5rem,3vw,2.25rem)" }}
          >
            {t('cta_title')}
          </h2>
          <p className="text-white/80 leading-relaxed max-w-xl mx-auto" style={{ fontSize: 16 }}>
            {t('cta_body')}
          </p>
        </div>
      </div>
    </div>
  );
}
