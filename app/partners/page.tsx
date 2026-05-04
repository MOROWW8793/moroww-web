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
      <section className="px-6 md:px-16 lg:px-24 pt-32 pb-20 max-w-4xl mx-auto">
        <p className="text-xs font-medium uppercase tracking-widest text-moroww-orange mb-6">
          Onze partners
        </p>
        <h1
          className="font-bold lowercase text-moroww-black leading-[1.05] tracking-[-0.02em] mb-8"
          style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)" }}
        >
          korteketen.<br />geen compromis.
        </h1>
        <p className="text-moroww-black/60 leading-relaxed max-w-2xl" style={{ fontSize: 18 }}>
          moroww kiest bewust voor Belgische en Europese merken die onze standaard delen.
          Niet omdat het moet — omdat het klopt. Elke fles, elk product, elk detail in onze
          woningen komt van een merk dat wij met naam en gezicht kennen. Korte keten betekent:
          wij weten wie het maakt, hoe het gemaakt wordt, en waarom het goed is.
        </p>
      </section>

      {/* ── 2. PARTNER SPOTLIGHT — Moro Essentials ── */}
      <section className="px-6 md:px-16 lg:px-24 pb-24 max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm">

          {/* Header van de kaart */}
          <div className="flex flex-col md:flex-row">
            {/* Sfeerbeeld placeholder */}
            <div className="relative w-full md:w-1/2 h-[280px] md:h-auto bg-moroww-blush flex items-center justify-center">
              {/* Vervang dit door <Image> zodra moro-essentials-sfeer.jpg beschikbaar is */}
              <div className="w-full h-full bg-gradient-to-br from-moroww-blush to-moroww-border flex items-center justify-center">
                <p className="text-moroww-black/30 text-sm">Sfeerbeeld</p>
              </div>
            </div>

            {/* Tekst */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              {/* Logo placeholder */}
              <div className="w-32 h-12 bg-moroww-blush rounded-lg flex items-center justify-center mb-6">
                <p className="text-moroww-black/30 text-xs">Logo</p>
              </div>

              <span className="inline-block text-xs font-medium uppercase tracking-widest text-moroww-orange bg-moroww-blush px-3 py-1 rounded-full mb-4 self-start">
                Belgisch merk
              </span>
              <h2
                className="font-bold text-moroww-black leading-[1.05] tracking-[-0.02em] mb-1"
                style={{ fontSize: "clamp(1.75rem,3vw,2.5rem)" }}
              >
                Moro Essentials
              </h2>
              <p className="text-moroww-orange text-sm font-medium mb-6">Badkamerproducten</p>
              <p className="text-moroww-black/60 leading-relaxed" style={{ fontSize: 16 }}>
                De badkamer is waar het eerste oordeel valt. Moro Essentials is een Belgisch
                merk dat huidverzorging herdenkt — puur, eerlijk, zonder overbodige
                ingrediënten. In elke moroww-woning vind je hun producten. Niet als gadget,
                maar als standaard.
              </p>
            </div>
          </div>

          {/* QR blok */}
          <div className="border-t border-moroww-border mx-6 md:mx-12" />
          <div className="flex flex-col sm:flex-row items-center gap-8 p-8 md:p-12">
            {/* QR placeholder */}
            <div className="w-28 h-28 shrink-0 bg-moroww-blush rounded-xl flex items-center justify-center border border-moroww-border">
              <p className="text-moroww-black/30 text-xs text-center leading-tight px-2">QR-code</p>
            </div>
            <div>
              <p className="font-semibold text-moroww-black text-base mb-2">
                Gevonden in onze woningen. Ook thuis te gebruiken.
              </p>
              <p className="text-moroww-black/55 leading-relaxed" style={{ fontSize: 15 }}>
                Scan de QR-code in de woning en bestel rechtstreeks bij Moro Essentials.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. COMING SOON ── */}
      <section className="px-6 md:px-16 lg:px-24 pb-24 max-w-6xl mx-auto">
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
              <div className="h-[180px] bg-moroww-blush flex items-center justify-center">
                <p className="text-moroww-black/20 text-sm">Binnenkort</p>
              </div>
              <div className="p-8">
                <span className="inline-block text-xs font-medium uppercase tracking-widest text-moroww-black/40 bg-moroww-blush px-3 py-1 rounded-full mb-4">
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
      <section className="px-6 md:px-16 lg:px-24 pb-24 max-w-6xl mx-auto">
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
