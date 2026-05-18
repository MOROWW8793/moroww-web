import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Partners - Korteketen. Geen compromis.",
  description:
    "moroww werkt uitsluitend samen met Belgische en Europese merken die onze standaard delen. Waaronder Moro Essentials voor badkamerproducten.",
  alternates: { canonical: "https://www.moroww.com/partners" },
  openGraph: {
    title: "Partners | moroww",
    description: "Belgische en Europese merken die onze standaard delen.",
    url: "https://www.moroww.com/partners",
  },
};

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <div className="overflow-x-hidden">

      {/* ── 1. HERO — DONKER ── */}
      <section
        className="flex flex-col justify-end px-6 md:px-16 pt-28 pb-16 md:pt-32 md:pb-20"
        style={{ background: "#1A1A1A", minHeight: "60vh" }}
      >
        <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 3, color: "#C08D6E", marginBottom: 24 }}>
          Onze partners
        </p>
        <h1
          className="break-words"
          style={{ fontSize: "clamp(36px,6vw,72px)", fontWeight: 800, lineHeight: 1.0, color: "#ffffff", marginBottom: 32 }}
        >
          Korteketen.<br />Geen compromis.
        </h1>
        <p className="break-words" style={{ fontSize: 18, lineHeight: 1.7, color: "#999999", maxWidth: 560 }}>
          moroww kiest bewust voor Belgische en Europese merken die onze
          standaard delen. Niet omdat het moet - omdat het klopt.
        </p>
      </section>

      {/* ── 2. MORO ESSENTIALS — WIT ── */}
      <section className="bg-white px-6 py-12 md:px-16 md:py-20">
        <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden" style={{ minHeight: 500 }}>
          {/* Foto (55% op desktop, volledig op mobiel) */}
          <div className="relative w-full md:w-[55%] shrink-0 overflow-hidden min-h-[300px] md:min-h-full">
            <Image
              src="/images/partners/moro-essentials-sfeer.jpg"
              alt="Moro Essentials sfeerbeeld"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          </div>

          {/* Content (45% op desktop) */}
          <div className="w-full md:w-[45%] flex flex-col justify-center px-6 py-10 md:px-16 md:py-12 min-w-0">
            <Image
              src="/images/partners/moro-essentials-logo.png"
              alt="Moro Essentials"
              width={280}
              height={140}
              className="self-start mb-8"
              style={{ maxHeight: 140, objectFit: "contain", width: "auto" }}
            />
            <span
              className="self-start mb-5"
              style={{
                display: "inline-block",
                background: "#FAE4D6",
                color: "#C08D6E",
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                padding: "6px 14px",
                borderRadius: 100,
              }}
            >
              Belgisch merk
            </span>
            <p className="mb-4" style={{ fontSize: 14, fontWeight: 600, color: "#FEA05E" }}>
              Badkamerproducten
            </p>
            <p className="break-words mb-8" style={{ fontSize: 16, lineHeight: 1.8, color: "#444444" }}>
              De badkamer is de eerste test. Gasten voelen het meteen:
              goedkope zeep in een plastic flesje vertelt een verhaal -
              en niet het goede. Daarom kozen we voor Moro Essentials,
              een Belgisch merk dat huidverzorging herdenkt vanuit eerlijkheid.
              Geen overbodige ingrediënten, geen generieke geuren, geen massamarkt.
              Gewoon producten die werken, goed ruiken en kloppen met wie wij zijn.
              In elke moroww-woning. Geen uitzondering.
            </p>
            <a
              href="https://moro-essentials.com/nl/collections/all-products-new?tw_source=google&tw_adid=706041070227&tw_campaign=21468923487&tw_kwdid=kwd-138535284&gad_source=1&gad_campaignid=21468923487&gbraid=0AAAAA9Yqje7Xtvry2zO4cbJROuoZXN0FK&gclid=CjwKCAjw5NvPBhAoEiwA_2egftD5W_eeUIjpMgnjq3KAso8SoI32AwN2S9eVgDrkTyrZFLwZZTVnTRoC_4oQAvD_BwE"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start"
              style={{
                display: "inline-block",
                background: "#FEA05E",
                color: "#ffffff",
                borderRadius: 100,
                padding: "14px 28px",
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
              }}
            >
              Bekijk collectie
            </a>
          </div>
        </div>
      </section>

      {/* ── 3. COMING SOON — BLUSH ── */}
      <section className="px-6 py-16 md:px-16 md:py-20" style={{ background: "#FAE4D6" }}>
        <h2
          className="break-words mb-10 md:mb-12"
          style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, color: "#1A1A1A" }}
        >
          Meer partners. Binnenkort.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              titel: "Poetspartners",
              tekst: "Elke moroww-woning wordt professioneel klaargemaakt volgens een vast protocol. We werken uitsluitend met poetspartners die onze standaard kennen, onze checklist volgen en dezelfde zorg voor detail hebben als wij. Belgische bedrijven, korte communicatielijnen, geen verrassingen.",
            },
            {
              titel: "Lokale handelaars",
              tekst: "In elke regio waar moroww actief is, zoeken we contact met lokale bakkers, slagers, traiteurs en wijnhuizen. Gasten die willen weten waar ze terecht kunnen voor het beste van de streek, vinden dat via moroww. Geen gidsen, geen gesponsorde lijsten - enkel adressen waar we zelf voor instaan.",
            },
          ].map(({ titel, tekst }) => (
            <div key={titel} className="rounded-2xl p-8 md:p-10 min-w-0" style={{ background: "#ffffff" }}>
              <span
                className="inline-block mb-5"
                style={{
                  background: "#1A1A1A",
                  color: "#ffffff",
                  fontSize: 10,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  padding: "4px 12px",
                  borderRadius: 100,
                }}
              >
                Binnenkort
              </span>
              <h3 className="break-words mb-4" style={{ fontSize: 24, fontWeight: 700, color: "#1A1A1A" }}>
                {titel}
              </h3>
              <p className="break-words" style={{ fontSize: 15, lineHeight: 1.7, color: "#666666" }}>
                {tekst}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. PARTNER CTA — DONKER ── */}
      <section className="px-6 py-16 md:px-16 md:py-20 text-center" style={{ background: "#1A1A1A" }}>
        <h2
          className="break-words mx-auto mb-5"
          style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: "#ffffff", maxWidth: 560 }}
        >
          Jouw merk in onze woningen?
        </h2>
        <p className="break-words mx-auto mb-10" style={{ fontSize: 18, lineHeight: 1.7, color: "#999999", maxWidth: 480 }}>
          We zoeken Belgische en Europese merken die kwaliteit en
          eerlijkheid centraal stellen. Geen massamarkt. Geen compromis.
        </p>
        <a
          href="mailto:info@moroww.com"
          style={{
            display: "inline-block",
            background: "#FEA05E",
            color: "#ffffff",
            borderRadius: 100,
            padding: "16px 36px",
            fontWeight: 600,
            fontSize: 16,
            textDecoration: "none",
          }}
        >
          Neem contact op
        </a>
      </section>

    </div>
  );
}
