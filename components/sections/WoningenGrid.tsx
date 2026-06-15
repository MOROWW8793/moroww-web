"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BedDouble, Bath, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { woningen, BADGE_STYLES, lwArr, type Locale } from "@/lib/woningen";

type Filter = "Alles" | "the shore" | "the fields";

export function WoningenGrid() {
  const t = useTranslations('home')
  const locale = useLocale() as Locale
  const [filter, setFilter] = useState<Filter>("Alles");

  const gefilterd =
    filter === "Alles" ? woningen : woningen.filter((w) => w.collectie === filter);

  const filterLabels: Record<Filter, string> = {
    "Alles": t('filter_all'),
    "the shore": t('filter_shore'),
    "the fields": t('filter_fields'),
  }

  return (
    <section style={{ background: "#FAE4D6" }} className="py-16 md:py-24 px-6 md:px-16 lg:px-24 w-full">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p style={{ color: "#C08D6E", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, marginBottom: 14 }}>
            {t('collection_label')}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <h2 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 800, color: "#1A1A1A", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              {t('collection_title')}
            </h2>
            {/* Filter tabs */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mb-1 flex-nowrap shrink-0 max-w-full">
              {(["Alles", "the shore", "the fields"] as Filter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    borderRadius: 100,
                    padding: "8px 20px",
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: "pointer",
                    border: "1px solid #1A1A1A",
                    transition: "all 0.15s",
                    background: filter === f ? "#1A1A1A" : "transparent",
                    color: filter === f ? "#ffffff" : "#1A1A1A",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    minHeight: 44,
                  }}
                >
                  {filterLabels[f]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gefilterd.map((w) => {
            const badge = BADGE_STYLES[w.collectie];
            return (
              <Link
                key={w.id}
                href={`/collectie/${w.id}`}
                aria-label={`bekijk ${w.naam}`}
                style={{
                  display: "block",
                  background: "#ffffff",
                  borderRadius: 16,
                  boxShadow: "0 2px 20px rgba(0,0,0,0.07)",
                  overflow: "hidden",
                  transition: "transform 0.2s ease",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
              >
                {/* Foto */}
                <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                  <Image
                    src={w.heroFoto}
                    alt={w.naam}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Badge */}
                  <span
                    style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      background: badge.bg,
                      color: badge.color,
                      fontSize: 10,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      padding: "4px 10px",
                      borderRadius: 100,
                    }}
                  >
                    {w.collectie}
                  </span>
                </div>

                {/* Body */}
                <div style={{ padding: 20 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 20, color: "#1A1A1A", marginBottom: 4 }}>
                    {w.naam}
                  </h3>
                  <p style={{ fontSize: 13, color: "#888888", marginBottom: 10 }}>{w.locatie}</p>

                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                    {lwArr(w.tags, locale).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: "#FAE4D6",
                          color: "#1A1A1A",
                          fontSize: 11,
                          padding: "4px 10px",
                          borderRadius: 100,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Specs */}
                  <div style={{ display: "flex", gap: 12, fontSize: 13, color: "#666666", marginBottom: 16 }}>
                    <span className="flex items-center gap-1">
                      <BedDouble size={13} />
                      {w.slaapkamers} {t('bedrooms')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath size={13} />
                      {w.badkamers} {t('bathrooms')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={13} />
                      {w.maxGasten} {t('guests')}
                    </span>
                  </div>

                  {/* Prijs + CTA */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #F0E4D8", paddingTop: 16 }}>
                    {w.comingSoon ? (
                      <span style={{ fontSize: 12, color: "#C08D6E", fontWeight: 600, textTransform: "lowercase", letterSpacing: "0.04em" }}>
                        {t('coming_soon')}
                      </span>
                    ) : (
                      <>
                        <div>
                          <span style={{ fontWeight: 700, fontSize: 18, color: "#1A1A1A" }}>{t('from')} €{w.prijs}</span>
                          <span style={{ fontSize: 13, color: "#999999", marginLeft: 4 }}>{t('per_night')}</span>
                        </div>
                        <span
                          style={{
                            background: "#FEA05E",
                            color: "#ffffff",
                            borderRadius: 100,
                            padding: "10px 20px",
                            fontSize: 14,
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {t('view_book')}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
