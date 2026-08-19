"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { woningen } from "@/lib/woningen";
import { PandKaart, formatAuditMaand } from "@/components/PandKaart";

// Filter-tabs zijn Link-elementen naar de collectiepagina's. /collectie
// zelf toont altijd alle panden; klikken op 'the shore' of 'the fields'
// gaat naar de dedicated collectiepagina met streektekst.
export function CollectieStatisch() {
  const t = useTranslations('collectie')

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

      {/* ── Woning kaarten ── */}
      <div className="px-6 md:px-16 lg:px-24 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {woningen.map((w) => {
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
                href={`/collectie/${w.id}`}
                beeld={w.heroFoto}
                beeldAlt={w.naam}
                titel={w.naam}
                plaats={w.locatie}
                auditItems={auditItems}
              />
            )
          })}
        </div>
      </div>

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
