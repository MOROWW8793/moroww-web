import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'partners' });
  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: { canonical: "https://www.moroww.com/partners" },
    openGraph: {
      title: t('meta_title'),
      description: t('meta_description'),
      url: "https://www.moroww.com/partners",
    },
  };
}

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('partners')

  const komendePartners = [
    { titel: t('cleaners_title'), tekst: t('cleaners_body') },
    { titel: t('locals_title'),   tekst: t('locals_body') },
  ]

  return (
    <div className="overflow-x-hidden">

      {/* ── 1. HERO ── */}
      <section
        className="flex flex-col justify-end px-6 md:px-16 pt-28 pb-16 md:pt-32 md:pb-20"
        style={{ background: "#1A1A1A", minHeight: "60vh" }}
      >
        <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 3, color: "#C08D6E", marginBottom: 24 }}>
          {t('label')}
        </p>
        <h1
          className="break-words"
          style={{ fontSize: "clamp(36px,6vw,72px)", fontWeight: 800, lineHeight: 1.0, color: "#ffffff", marginBottom: 32 }}
        >
          {t('h1_line1')}<br />{t('h1_line2')}
        </h1>
        <p className="break-words" style={{ fontSize: 18, lineHeight: 1.7, color: "#999999", maxWidth: 560 }}>
          {t('hero_body')}
        </p>
      </section>

      {/* ── 2. MORO ESSENTIALS ── */}
      <section className="bg-white px-6 py-12 md:px-16 md:py-20">
        <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden md:min-h-[500px]">
          <div className="relative w-full md:w-[55%] shrink-0 overflow-hidden min-h-[300px] md:min-h-full">
            <Image
              src="/images/partners/moro-essentials-sfeer.jpg"
              alt="Moro Essentials"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          </div>

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
              {t('moro_badge')}
            </span>
            <p className="mb-4" style={{ fontSize: 14, fontWeight: 600, color: "#FEA05E" }}>
              {t('moro_category')}
            </p>
            <p className="break-words mb-8" style={{ fontSize: 16, lineHeight: 1.8, color: "#444444" }}>
              {t('moro_body')}
            </p>
            <a
              href="https://moro-essentials.com/nl/collections/all-products-new"
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
              {t('moro_cta')}
            </a>
          </div>
        </div>
      </section>

      {/* ── 3. COMING SOON ── */}
      <section className="px-6 py-16 md:px-16 md:py-20" style={{ background: "#FAE4D6" }}>
        <h2
          className="break-words mb-10 md:mb-12"
          style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, color: "#1A1A1A" }}
        >
          {t('coming_soon_title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {komendePartners.map(({ titel, tekst }) => (
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
                {t('coming_badge')}
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

      {/* ── 4. PARTNER CTA ── */}
      <section className="px-6 py-16 md:px-16 md:py-20 text-center" style={{ background: "#1A1A1A" }}>
        <h2
          className="break-words mx-auto mb-5"
          style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: "#ffffff", maxWidth: 560 }}
        >
          {t('cta_title')}
        </h2>
        <p className="break-words mx-auto mb-10" style={{ fontSize: 18, lineHeight: 1.7, color: "#999999", maxWidth: 480 }}>
          {t('cta_body')}
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
          {t('cta_button')}
        </a>
      </section>

    </div>
  );
}
