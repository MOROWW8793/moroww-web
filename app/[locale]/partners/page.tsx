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

// Herbruikbaar 2-koloms blok voor één partner. side='left' toont het beeld
// links, side='right' rechts — pagina wisselt om zodat het niet als een lijst leest.
function PartnerBlock({
  side,
  image,
  imageAlt,
  logo,
  naam,
  badge,
  category,
  paragraphs,
  cta,
  ctaHref,
}: {
  side: 'left' | 'right'
  image: string
  imageAlt: string
  // Optioneel logo bovenaan het tekstblok. Als er geen logo is, verschijnt de
  // partnernaam typografisch als h3 op dezelfde plek.
  logo?: { src: string; alt: string; width: number; height: number }
  naam: string
  badge: string
  category: string
  paragraphs: string[]
  cta: string
  ctaHref: string
}) {
  const imageBlock = (
    <div className="relative w-full md:w-[55%] shrink-0 overflow-hidden min-h-[300px] md:min-h-full">
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 55vw"
      />
    </div>
  )

  const textBlock = (
    <div className="w-full md:w-[45%] flex flex-col justify-center px-6 py-10 md:px-16 md:py-12 min-w-0">
      {logo ? (
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          className="self-start mb-6"
          style={{ maxHeight: 140, objectFit: "contain", width: "auto" }}
        />
      ) : null}
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
        {badge}
      </span>
      <p className="mb-2" style={{ fontSize: 14, fontWeight: 600, color: "#FEA05E" }}>
        {category}
      </p>
      {!logo && (
        <h3
          className="mb-6"
          style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 700, color: '#1A1A1A' }}
        >
          {naam}
        </h3>
      )}
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className="mb-4 break-words last:mb-0"
          style={{ fontSize: 16, lineHeight: 1.8, color: "#444444" }}
        >
          {p}
        </p>
      ))}
      <a
        href={ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        className="self-start mt-8"
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
        {cta}
      </a>
    </div>
  )

  return (
    <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden md:min-h-[500px]">
      {side === 'left' ? <>{imageBlock}{textBlock}</> : <>{textBlock}{imageBlock}</>}
    </div>
  )
}

// Blok voor partners waar het beeld het keurmerk-embleem zelf is (Nuki Pro
// Partner) of waar er nog geen beeld/logo geleverd is (Opruimingen CB). Het
// embleem staat op een blush-achtergrond, groot maar niet claimend, met de
// tekst ernaast — 'geef het dezelfde behandeling als een keurmerk'.
function PartnerBlockEmblem({
  side,
  emblem,
  naam,
  badge,
  category,
  paragraphs,
  cta,
  ctaHref,
}: {
  side: 'left' | 'right'
  // Als emblem ontbreekt, vult de kolom met de partnernaam typografisch op.
  emblem?: { src: string; alt: string }
  naam: string
  badge: string
  category: string
  paragraphs: string[]
  cta: string
  ctaHref: string
}) {
  const visualBlock = (
    <div
      className="relative w-full md:w-[55%] shrink-0 flex items-center justify-center min-h-[300px] md:min-h-full p-10"
      style={{ background: "#FAE4D6" }}
    >
      {emblem ? (
        <Image
          src={emblem.src}
          alt={emblem.alt}
          width={360}
          height={360}
          className="w-auto h-auto"
          style={{ maxHeight: 260, maxWidth: '100%', objectFit: "contain" }}
        />
      ) : (
        <span
          className="font-bold lowercase text-center leading-none"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#C08D6E', letterSpacing: '-0.02em' }}
        >
          {naam}
        </span>
      )}
    </div>
  )

  const textBlock = (
    <div className="w-full md:w-[45%] flex flex-col justify-center px-6 py-10 md:px-16 md:py-12 min-w-0">
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
        {badge}
      </span>
      <p className="mb-2" style={{ fontSize: 14, fontWeight: 600, color: "#FEA05E" }}>
        {category}
      </p>
      <h3
        className="mb-6"
        style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 700, color: '#1A1A1A' }}
      >
        {naam}
      </h3>
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className="mb-4 break-words last:mb-0"
          style={{ fontSize: 16, lineHeight: 1.8, color: "#444444" }}
        >
          {p}
        </p>
      ))}
      <a
        href={ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        className="self-start mt-8"
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
        {cta}
      </a>
    </div>
  )

  return (
    <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden md:min-h-[500px]">
      {side === 'left' ? <>{visualBlock}{textBlock}</> : <>{textBlock}{visualBlock}</>}
    </div>
  )
}

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('partners')

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

      {/* ── 2. MORO ESSENTIALS — foto links ── */}
      <section className="bg-white px-6 py-12 md:px-16 md:py-20">
        <PartnerBlock
          side="left"
          image="/images/partners/moro-essentials-sfeer.jpg"
          imageAlt="Moro Essentials sfeerbeeld"
          logo={{ src: "/images/partners/moro-essentials-logo.png", alt: "Moro Essentials", width: 280, height: 140 }}
          naam="Moro Essentials"
          badge={t('moro_badge')}
          category={t('moro_category')}
          paragraphs={[t('moro_body')]}
          cta={t('moro_cta')}
          ctaHref="https://moro-essentials.com/nl/collections/all-products-new"
        />
      </section>

      {/* ── 3. NUKI — embleem rechts, keurmerk-behandeling ── */}
      <section className="bg-white px-6 py-12 md:px-16 md:py-20 pt-0 md:pt-0">
        <PartnerBlockEmblem
          side="right"
          emblem={{ src: "/images/partners/nuki-pro-partner-badge.png", alt: t('nuki_pro_partner_alt') }}
          naam="Nuki"
          badge={t('nuki_badge')}
          category={t('nuki_category')}
          paragraphs={[t('nuki_body_p1'), t('nuki_body_p2'), t('nuki_body_p3')]}
          cta={t('nuki_cta')}
          ctaHref="https://nuki.io/nl-nl/"
        />
      </section>

      {/* ── 4. AMELIE BAUWENS — foto links ── */}
      <section className="bg-white px-6 py-12 md:px-16 md:py-20 pt-0 md:pt-0">
        <PartnerBlock
          side="left"
          image="/images/partners/amelie-bauwens.jpg"
          imageAlt="Amelie Bauwens fotografie"
          naam="Amelie Bauwens"
          badge={t('amelie_badge')}
          category={t('amelie_category')}
          paragraphs={[t('amelie_body_p1'), t('amelie_body_p2'), t('amelie_body_p3')]}
          cta={t('amelie_cta')}
          ctaHref="https://www.ameliebauwens.com/"
        />
      </section>

      {/* ── 5. OPRUIMINGEN CB — nog geen logo, blush-vak met naam links ── */}
      <section className="bg-white px-6 py-12 md:px-16 md:py-20 pt-0 md:pt-0">
        <PartnerBlockEmblem
          side="left"
          naam="Opruimingen CB"
          badge={t('opruimingen_badge')}
          category={t('opruimingen_category')}
          paragraphs={[t('opruimingen_body_p1'), t('opruimingen_body_p2'), t('opruimingen_body_p3')]}
          cta={t('opruimingen_cta')}
          ctaHref="https://www.opruimingencb.be/"
        />
      </section>

      {/* ── 6. BINNENKORT — alleen lokale handelaars ── */}
      <section className="px-6 py-16 md:px-16 md:py-20" style={{ background: "#FAE4D6" }}>
        <h2
          className="break-words mb-10 md:mb-12"
          style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, color: "#1A1A1A" }}
        >
          {t('coming_soon_title')}
        </h2>
        <div className="grid grid-cols-1 gap-6 max-w-2xl">
          <div className="rounded-2xl p-8 md:p-10 min-w-0" style={{ background: "#ffffff" }}>
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
              {t('locals_title')}
            </h3>
            <p className="break-words" style={{ fontSize: 15, lineHeight: 1.7, color: "#666666" }}>
              {t('locals_body')}
            </p>
          </div>
        </div>
      </section>

      {/* ── 7. CTA — jouw merk in onze woningen? ── */}
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
