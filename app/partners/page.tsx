import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Partners — Korteketen. Geen compromis.",
  description:
    "moroww kiest bewust voor Belgische en Europese merken die onze standaard delen. Elke fles, elk product, elk detail — van een merk dat wij met naam en gezicht kennen.",
  alternates: { canonical: "https://www.moroww.com/partners" },
};

export default function PartnersPage() {
  return (
    <div className="bg-moroww-blush min-h-screen">

      {/* ── 1. HERO ── */}
      <section className="relative overflow-hidden px-6 md:px-16 lg:px-24 pt-32 pb-24">
        {/* Decoratief oranje blob rechtsboven */}
        <div
          className="absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{ background: "#FEA05E", opacity: 0.15 }}
        />
        {/* Dot-pattern achtergrondtextuur */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(26,26,26,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <p className="text-xs font-medium uppercase tracking-widest text-moroww-orange">
              Onze partners
            </p>
            <div className="h-px flex-1 max-w-[60px] bg-moroww-orange opacity-50" />
          </div>

          <h1
            className="font-bold lowercase text-moroww-black leading-[1.05] tracking-[-0.02em] mb-10"
            style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)" }}
          >
            korteketen. <span className="text-moroww-orange">—</span> geen compromis.
          </h1>

          <p className="text-moroww-black/60 leading-relaxed max-w-xl" style={{ fontSize: 18 }}>
            moroww kiest bewust voor Belgische en Europese merken die onze standaard delen.
            Niet omdat het moet — omdat het klopt. Elke fles, elk product, elk detail in onze
            woningen komt van een merk dat wij met naam en gezicht kennen. Korte keten betekent:
            wij weten wie het maakt, hoe het gemaakt wordt, en waarom het goed is.
          </p>
        </div>
      </section>

      {/* ── 2. PARTNER SPOTLIGHT — Moro Essentials ── */}
      <section className="px-6 md:px-16 lg:px-24 pb-32 max-w-6xl mx-auto">
        <div
          className="bg-white rounded-3xl overflow-hidden"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}
        >
          {/* Split: sfeerbeeld links (55%), content rechts (45%) */}
          <div className="flex flex-col md:flex-row min-h-[480px]">

            {/* Sfeerbeeld — geen left border-radius, alleen right */}
            <div
              className="relative w-full md:w-[55%] h-[280px] md:h-auto overflow-hidden"
              style={{ borderRadius: "1.5rem 0 0 0" }}
            >
              <img
                src="/images/partners/moro-essentials-sfeer.jpg"
                alt="Moro Essentials sfeerbeeld"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Content rechts */}
            <div className="w-full md:w-[45%] flex flex-col">
              {/* Logo sectie — eigen witte zone met padding */}
              <div className="px-10 pt-10 pb-6 border-b border-moroww-border/40">
                <img
                  src="/images/partners/moro-essentials-logo.png"
                  alt="Moro Essentials"
                  style={{ width: "auto", height: "auto", maxHeight: "140px", maxWidth: "180px", objectFit: "contain" }}
                />
              </div>

              {/* Tekst */}
              <div className="px-10 py-8 flex flex-col justify-center flex-1">
                <span className="inline-block text-xs font-medium uppercase tracking-widest text-moroww-orange bg-moroww-blush px-3 py-1 rounded-full mb-5 self-start">
                  Belgisch merk
                </span>
                <h2
                  className="font-bold text-moroww-black leading-[1.05] tracking-[-0.02em] mb-1"
                  style={{ fontSize: "clamp(1.5rem,2.5vw,2.25rem)" }}
                >
                  Moro Essentials
                </h2>
                <p className="text-moroww-orange text-sm font-medium mb-5">Badkamerproducten</p>
                <p className="text-moroww-black/60 leading-relaxed" style={{ fontSize: 15 }}>
                  De badkamer is waar het eerste oordeel valt. Moro Essentials is een Belgisch
                  merk dat huidverzorging herdenkt — puur, eerlijk, zonder overbodige
                  ingrediënten. In elke moroww-woning vind je hun producten. Niet als gadget,
                  maar als standaard.
                </p>
              </div>
            </div>
          </div>

          {/* QR blok — donkere achtergrond */}
          <div className="bg-[#1A1A1A] px-10 py-8 flex flex-col sm:flex-row items-center gap-8 rounded-b-3xl">
            {/* QR gestippeld vierkant */}
            <div
              className="w-28 h-28 shrink-0 flex items-center justify-center rounded-xl"
              style={{
                border: "2px dashed #FEA05E",
                background: "rgba(254,160,94,0.08)",
              }}
            >
              <p className="text-moroww-orange/60 text-xs text-center leading-tight px-2 font-medium">
                QR-code
              </p>
            </div>
            <div>
              <p className="font-semibold text-white text-base mb-2">
                Gevonden in onze woningen. Ook thuis te gebruiken.
              </p>
              <p className="text-white/55 leading-relaxed mb-3" style={{ fontSize: 15 }}>
                Scan de QR-code in de woning en bestel rechtstreeks bij Moro Essentials.
              </p>
              <a
                href="https://moro-essentials.be"
                target="_blank"
                rel="noopener noreferrer"
                className="text-moroww-orange text-sm hover:underline underline-offset-2"
              >
                of bezoek moro-essentials.be →
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. COMING SOON ── */}
      <section className="px-6 md:px-16 lg:px-24 pb-32 max-w-6xl mx-auto">
        <h2
          className="font-bold lowercase text-moroww-black leading-[1.05] tracking-[-0.02em] mb-10"
          style={{ fontSize: "clamp(1.75rem,3vw,2.5rem)" }}
        >
          meer partners. binnenkort.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { categorie: "Poetsproducten" },
            { categorie: "Lokale partner" },
          ].map(({ categorie }) => (
            <div key={categorie} className="bg-white rounded-3xl overflow-hidden shadow-sm">
              <div className="h-[180px] bg-moroww-blush/60 flex items-center justify-center">
                <p className="text-moroww-black/20 text-sm tracking-widest uppercase text-xs">Binnenkort</p>
              </div>
              <div className="p-8">
                <span className="inline-block text-xs font-medium uppercase tracking-widest text-moroww-black/30 bg-moroww-blush px-3 py-1 rounded-full mb-4">
                  Binnenkort
                </span>
                <p className="font-semibold text-moroww-black text-base mb-2">{categorie}</p>
                <p className="text-moroww-black/50 text-sm leading-relaxed">
                  We zijn op zoek naar Belgische en Europese merken die onze standaard delen.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. CTA VOOR MERKEN ── */}
      <section className="px-6 md:px-16 lg:px-24 pb-32 max-w-6xl mx-auto">
        <div className="bg-moroww-orange rounded-3xl p-10 md:p-16 text-center">
          <h2
            className="font-bold lowercase text-white leading-[1.05] tracking-[-0.02em] mb-4"
            style={{ fontSize: "clamp(1.75rem,3vw,2.5rem)" }}
          >
            jouw merk in onze woningen?
          </h2>
          <p className="text-white/80 leading-relaxed mb-8 max-w-xl mx-auto" style={{ fontSize: 17 }}>
            We zoeken Belgische en Europese merken die kwaliteit en eerlijkheid centraal stellen.
            Geen massamarkt. Geen compromis.
          </p>
          <Link
            href="mailto:info@moroww.com"
            className="inline-flex items-center rounded-full bg-white text-moroww-orange font-semibold px-8 py-4 text-base hover:bg-moroww-blush transition-colors duration-200"
          >
            Neem contact op
          </Link>
        </div>
      </section>

    </div>
  );
}
