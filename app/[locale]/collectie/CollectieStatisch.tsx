"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BedDouble, Bath, Users } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { woningen, BADGE_STYLES, lwArr, type Locale } from "@/lib/woningen";

type Filter = "Alles" | "the shore" | "the fields";

export function CollectieStatisch() {
  const t = useTranslations('collectie')
  const locale = useLocale() as Locale
  const [filter, setFilter] = useState<Filter>("Alles");

  const gefilterd =
    filter === "Alles" ? woningen : woningen.filter((w) => w.collectie === filter);

  return (
    <div>
      {/* ── Filter tabs ── */}
      <div className="px-6 md:px-16 lg:px-24 py-8">
        <div className="flex flex-wrap gap-2">
          {(["Alles", "the shore", "the fields"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors duration-150 ${
                filter === f
                  ? "bg-moroww-black text-white"
                  : "bg-white text-moroww-black/60 hover:text-moroww-black border border-moroww-border"
              }`}
            >
              {f === "Alles" ? t('filter_all') : f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Woning kaarten ── */}
      <div className="px-6 md:px-16 lg:px-24 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {gefilterd.map((w) => (
            <div
              key={w.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
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
                {/* Collectie badge */}
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
                  <h2 className="font-bold text-moroww-black text-xl leading-tight">
                    {w.naam}
                  </h2>
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

                {/* Specs */}
                <div className="flex gap-5 text-sm text-moroww-black/55 mb-5">
                  <span className="flex items-center gap-1.5">
                    <BedDouble size={14} />
                    {w.slaapkamers} {t('bedrooms')}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Bath size={14} />
                    {w.badkamers} {t('bathrooms')}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users size={14} />
                    {w.maxGasten} {t('guests')}
                  </span>
                </div>

                {/* Prijs + CTA */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-moroww-border">
                  <div>
                    <span className="font-bold text-xl text-moroww-black">€{w.prijs}</span>
                    <span className="text-sm text-moroww-black/45 ml-1">{t('per_night')}</span>
                  </div>
                  <Link
                    href={`/collectie/${w.id}`}
                    className="rounded-full bg-[#FEA05E] hover:bg-[#e8904e] text-white font-semibold text-sm px-5 py-2.5 transition-colors duration-200"
                  >
                    {t('view_book')}
                  </Link>
                </div>
              </div>
            </div>
          ))}
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
