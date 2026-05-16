import { notFound } from "next/navigation";
import Link from "next/link";
import { Users, MapPin, Check, LogIn, LogOut } from "lucide-react";
import { woningen, BADGE_STYLES } from "@/lib/woningen";
import { WoningGalerij } from "./WoningGalerij";

interface Props { params: { id: string } }

export function generateStaticParams() {
  return woningen.map((w) => ({ id: w.id }));
}

export async function generateMetadata({ params }: Props) {
  const woning = woningen.find((w) => w.id === params.id);
  return {
    title: woning ? `${woning.naam} - moroww` : "Woning - moroww",
    description: woning?.beschrijving,
  };
}

export default function WoningDetailPage({ params }: Props) {
  const woning = woningen.find((w) => w.id === params.id);
  if (!woning) notFound();

  const badge = BADGE_STYLES[woning.collectie];

  return (
    <div className="bg-moroww-blush min-h-screen">
      <div className="mx-auto max-w-6xl px-6 md:px-12 pt-28 pb-0">

        {/* ── Breadcrumb ── */}
        <div className="flex items-center gap-2 text-sm text-moroww-black/40 mb-6">
          <Link href="/collectie" className="hover:text-moroww-black transition-colors">
            De Collectie
          </Link>
          <span>/</span>
          <span className="text-moroww-black/70">{woning.naam}</span>
        </div>

        {/* ── 1. GALERIJ ── */}
        <div className="mb-8">
          <WoningGalerij fotos={woning.fotos} naam={woning.naam} />
        </div>

        {/* ── 2. HERO INFO + STICKY BOOKING ── */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start mb-0">

          {/* Links: naam, locatie, specs */}
          <div
            className="rounded-2xl p-8"
            style={{ background: '#FFFFFF', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
          >
            {/* Badge */}
            <span
              style={{
                display: 'inline-block',
                background: badge.bg,
                color: badge.color,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                borderRadius: 100,
                padding: '6px 14px',
              }}
            >
              {woning.collectie}
            </span>

            {/* Naam */}
            <h1
              style={{
                fontSize: 'clamp(32px,5vw,48px)',
                fontWeight: 800,
                color: '#1A1A1A',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                marginTop: 12,
                marginBottom: 0,
              }}
            >
              {woning.naam}
            </h1>

            {/* Slogan */}
            <p style={{ fontStyle: 'italic', color: '#C08D6E', fontSize: 16, marginTop: 8 }}>
              {woning.slogan}
            </p>

            {/* Locatie */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#666666', fontSize: 14, marginTop: 12 }}>
              <MapPin size={14} />
              {woning.locatie}
            </div>

            {/* Specs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>
              {[
                `${woning.slaapkamers} slaapkamers`,
                `${woning.badkamers} badkamers`,
                `Max ${woning.maxGasten} gasten`,
                ...(woning.oppervlakte ? [woning.oppervlakte] : []),
              ].map((spec) => (
                <span
                  key={spec}
                  style={{
                    background: '#FAE4D6',
                    borderRadius: 8,
                    padding: '8px 16px',
                    color: '#1A1A1A',
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Rechts: sticky booking */}
          <div className="lg:sticky lg:top-24">
            <div
              className="rounded-2xl p-7"
              style={{ background: '#1A1A1A', boxShadow: '0 2px 16px rgba(0,0,0,0.12)' }}
            >
              <div className="mb-5">
                <span style={{ fontWeight: 800, fontSize: 32, color: '#ffffff' }}>€{woning.prijs}</span>
                <span style={{ color: '#999999', fontSize: 14, marginLeft: 6 }}>/ nacht</span>
              </div>
              <a
                href={woning.boekUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center rounded-full font-semibold py-4 text-base transition-colors duration-200 mb-3"
                style={{ background: '#FEA05E', color: '#ffffff' }}
              >
                Boek direct
              </a>
              <p style={{ color: '#666666', fontSize: 12, textAlign: 'center', lineHeight: 1.5 }}>
                Je wordt doorgestuurd naar onze boekingspagina.
              </p>
            </div>
            <div className="mt-4 text-center">
              <Link href="/collectie" className="text-xs text-moroww-black/40 hover:text-moroww-black transition-colors underline underline-offset-2">
                ← Terug naar collectie
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. HOOGTEPUNTEN ── */}
      <section className="px-6 md:px-12 mt-10" style={{ borderTop: '1px solid #E8D5C4' }}>
        <div className="max-w-6xl mx-auto py-16">
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 24 }}>Waarom deze woning?</h2>
          <div
            className="rounded-2xl p-8"
            style={{ background: '#FFFFFF', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {woning.hoogtepunten.map((h) => (
                <div key={h} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: '#FEA05E' }}
                  >
                    <Check size={11} className="text-white" strokeWidth={3} />
                  </div>
                  <span style={{ color: '#1A1A1A', fontWeight: 500, fontSize: 14, lineHeight: 1.6 }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. BESCHRIJVING ── */}
      <section className="px-6 md:px-12 pb-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[2fr_1fr] gap-10">
          <div>
            <div
              className="rounded-2xl p-8 mb-6"
              style={{ background: '#FFFFFF', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
            >
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 20 }}>Over deze woning</h2>
              <p style={{ fontSize: 18, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.7, marginBottom: 24 }}>
                {woning.introductie}
              </p>
              <p style={{ fontSize: 15, color: '#444444', lineHeight: 1.8 }}>
                {woning.volledigeBeschrijving}
              </p>
            </div>

            {woning.buurt && (
              <div
                className="rounded-2xl p-8"
                style={{ background: '#FFFFFF', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
              >
                <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 16 }}>De buurt</h2>
                <p style={{ fontSize: 15, color: '#444444', lineHeight: 1.8 }}>
                  {woning.buurt}
                </p>
              </div>
            )}
          </div>

          {/* ── 5. PRAKTISCH ── */}
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 16 }}>Praktische info</h2>
            <div className="space-y-3">
              {[
                { icon: <LogIn size={16} style={{ color: '#fff' }} />, label: 'Inchecken', value: `Vanaf ${woning.inCheckin}` },
                { icon: <LogOut size={16} style={{ color: '#fff' }} />, label: 'Uitchecken', value: `Voor ${woning.uitCheckin}` },
                { icon: <Users size={16} style={{ color: '#fff' }} />, label: 'Max gasten', value: `${woning.maxGasten} personen` },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center gap-4 rounded-2xl p-5"
                  style={{ background: '#FFFFFF', border: '1px solid #E8D5C4' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: '#FEA05E' }}>
                    {icon}
                  </div>
                  <div>
                    <p style={{ fontSize: 11, color: '#C08D6E', textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600, marginBottom: 2 }}>{label}</p>
                    <p style={{ fontSize: 16, color: '#1A1A1A', fontWeight: 600 }}>{value}</p>
                  </div>
                </div>
              ))}
              {woning.tags.map((tag) => (
                <div key={tag} className="flex items-center gap-4 rounded-2xl p-5"
                  style={{ background: '#FFFFFF', border: '1px solid #E8D5C4' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: '#FEA05E' }}>
                    <Check size={16} style={{ color: '#fff' }} />
                  </div>
                  <p style={{ fontSize: 15, color: '#1A1A1A' }}>{tag}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. BOOKING CTA ── */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="bg-moroww-orange rounded-3xl p-10 md:p-16 text-center">
            <h2
              className="font-bold lowercase text-white leading-[1.05] tracking-[-0.02em] mb-3"
              style={{ fontSize: "clamp(1.75rem,3vw,2.5rem)" }}
            >
              klaar om te boeken?
            </h2>
            <p className="text-white/80 leading-relaxed mb-8 max-w-md mx-auto" style={{ fontSize: 17 }}>
              Beschikbaarheid checken en direct reserveren.
            </p>
            <a
              href={woning.boekUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-white text-moroww-orange font-semibold px-10 py-4 text-base hover:bg-moroww-blush transition-colors duration-200 mb-4"
            >
              Boek direct
            </a>
            <p className="text-white/60 text-sm">
              Vragen?{" "}
              <a href="mailto:info@moroww.com" className="underline underline-offset-2 hover:text-white transition-colors">
                Neem contact op via info@moroww.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
