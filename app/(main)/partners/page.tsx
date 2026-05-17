import type { Metadata } from "next";

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

export default function PartnersPage() {
  return (
    <div>

      {/* ── 1. HERO — DONKER ── */}
      <section
        style={{
          background: "#1A1A1A",
          minHeight: "60vh",
          padding: "80px 64px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 3, color: "#C08D6E", marginBottom: 24 }}>
          Onze partners
        </p>
        <h1 style={{ fontSize: "clamp(40px,6vw,72px)", fontWeight: 800, lineHeight: 1.0, color: "#ffffff", marginBottom: 32 }}>
          Korteketen.<br />Geen compromis.
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.7, color: "#999999", maxWidth: 560 }}>
          moroww kiest bewust voor Belgische en Europese merken die onze
          standaard delen. Niet omdat het moet - omdat het klopt.
        </p>
      </section>

      {/* ── 2. MORO ESSENTIALS — WIT ── */}
      <section style={{ background: "#FFFFFF", padding: "80px 64px" }}>
        <div style={{ display: "flex", minHeight: 600, gap: 0, borderRadius: 16, overflow: "hidden" }}>
          {/* Foto links (55%) */}
          <div style={{ width: "55%", flexShrink: 0, overflow: "hidden", borderRadius: 12 }}>
            <img
              src="/images/partners/moro-essentials-sfeer.jpg"
              alt="Moro Essentials sfeerbeeld"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          {/* Content rechts (45%) */}
          <div style={{
            width: "45%",
            paddingLeft: 64,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
            <img
              src="/images/partners/moro-essentials-logo.png"
              alt="Moro Essentials"
              style={{ maxHeight: 140, objectFit: "contain", marginBottom: 32, alignSelf: "flex-start" }}
            />
            <span style={{
              display: "inline-block",
              background: "#FAE4D6",
              color: "#C08D6E",
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              padding: "6px 14px",
              borderRadius: 100,
              marginBottom: 20,
              alignSelf: "flex-start",
            }}>
              Belgisch merk
            </span>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#FEA05E", marginBottom: 16 }}>
              Badkamerproducten
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#444444", marginBottom: 32 }}>
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
              style={{
                display: "inline-block",
                background: "#FEA05E",
                color: "#ffffff",
                borderRadius: 100,
                padding: "14px 28px",
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
                alignSelf: "flex-start",
              }}
            >
              Bekijk collectie
            </a>
          </div>
        </div>
      </section>

      {/* ── 3. COMING SOON — BLUSH ── */}
      <section style={{ background: "#FAE4D6", padding: "80px 64px" }}>
        <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, color: "#1A1A1A", marginBottom: 48 }}>
          Meer partners. Binnenkort.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
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
            <div key={titel} style={{ background: "#ffffff", borderRadius: 16, padding: 40 }}>
              <span style={{
                display: "inline-block",
                background: "#1A1A1A",
                color: "#ffffff",
                fontSize: 10,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 1,
                padding: "4px 12px",
                borderRadius: 100,
                marginBottom: 20,
              }}>
                Binnenkort
              </span>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: "#1A1A1A", marginBottom: 16 }}>
                {titel}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "#666666" }}>
                {tekst}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. PARTNER CTA — DONKER ── */}
      <section style={{ background: "#1A1A1A", padding: "80px 64px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: "#ffffff", marginBottom: 20 }}>
          Jouw merk in onze woningen?
        </h2>
        <p style={{ fontSize: 18, lineHeight: 1.7, color: "#999999", maxWidth: 480, margin: "0 auto 40px" }}>
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
