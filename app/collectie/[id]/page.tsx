import { notFound } from "next/navigation";
import Link from "next/link";
import { BedDouble, Bath, Users, MapPin } from "lucide-react";
import { woningen } from "@/lib/woningen";

interface Props { params: { id: string } }

export function generateStaticParams() {
  return woningen.map((w) => ({ id: w.id }));
}

export async function generateMetadata({ params }: Props) {
  const woning = woningen.find((w) => w.id === params.id);
  return {
    title: woning ? `${woning.naam} — moroww` : "Woning — moroww",
    description: woning?.beschrijving,
  };
}

export default function WoningDetailPage({ params }: Props) {
  const woning = woningen.find((w) => w.id === params.id);
  if (!woning) notFound();

  return (
    <div className="bg-moroww-blush min-h-screen">

      {/* ── Hero foto ── */}
      <div className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden bg-moroww-black">
        <img
          src={woning.heroFoto}
          alt={woning.naam}
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(250,228,214,0.9) 0%, transparent 60%)" }}
        />
        {/* Collectie badge */}
        <span className="absolute top-24 left-6 md:left-12 bg-moroww-orange text-white text-xs font-medium uppercase tracking-widest px-3 py-1 rounded-full">
          {woning.collectie}
        </span>
      </div>

      {/* ── Content ── */}
      <div className="mx-auto max-w-5xl px-6 md:px-12 -mt-16 relative z-10 pb-32">
        <div className="grid lg:grid-cols-[1fr_340px] gap-10 items-start">

          {/* Links: details */}
          <div>
            <h1
              className="font-bold text-moroww-black leading-[1.05] tracking-[-0.02em] mb-2"
              style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}
            >
              {woning.naam}
            </h1>

            <div className="flex items-center gap-2 text-moroww-black/50 text-sm mb-6">
              <MapPin size={14} />
              {woning.locatie}
            </div>

            {/* Specs */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-moroww-black/70 text-sm">
                <BedDouble size={16} className="text-moroww-orange" />
                <span>{woning.slaapkamers} slaapkamers</span>
              </div>
              <div className="flex items-center gap-2 text-moroww-black/70 text-sm">
                <Bath size={16} className="text-moroww-orange" />
                <span>{woning.badkamers} badkamers</span>
              </div>
              <div className="flex items-center gap-2 text-moroww-black/70 text-sm">
                <Users size={16} className="text-moroww-orange" />
                <span>Max {woning.maxGasten} gasten</span>
              </div>
              {woning.oppervlakte && (
                <div className="text-moroww-black/50 text-sm">{woning.oppervlakte}</div>
              )}
            </div>

            {/* Beschrijving */}
            <div className="bg-white rounded-2xl p-6 md:p-8 mb-6 shadow-sm">
              <h2 className="font-semibold text-moroww-black text-base mb-3">Over dit verblijf</h2>
              <p className="text-moroww-black/65 leading-relaxed">{woning.beschrijving}</p>
            </div>

            {/* Tags */}
            <div>
              <h2 className="font-semibold text-moroww-black text-base mb-4">Kenmerken</h2>
              <div className="flex flex-wrap gap-2">
                {woning.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm font-medium text-moroww-black/65 bg-white border border-moroww-border px-4 py-2 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Rechts: boekings-CTA sticky */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-2xl bg-white shadow-sm p-7">
              <div className="mb-6">
                <span className="font-bold text-3xl text-moroww-black">€{woning.prijs}</span>
                <span className="text-moroww-black/50 text-sm ml-1">/ nacht</span>
              </div>
              <a
                href={woning.boekUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center rounded-full bg-moroww-orange hover:bg-moroww-orange-dark text-white font-semibold py-4 transition-colors duration-200"
              >
                Boek direct
              </a>
              <p className="text-xs text-moroww-black/40 text-center mt-4 leading-relaxed">
                Je wordt doorgestuurd naar onze boekingspagina.
              </p>
            </div>
            <div className="mt-4 text-center">
              <Link
                href="/collectie"
                className="text-xs text-moroww-black/40 hover:text-moroww-black transition-colors underline underline-offset-2"
              >
                ← Terug naar collectie
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
