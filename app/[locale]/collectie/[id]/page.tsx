import { notFound } from "next/navigation";
import Link from "next/link";
import { Users, MapPin, Check, LogIn, LogOut } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { woningen, BADGE_STYLES, lw, lwArr, type Locale } from "@/lib/woningen";
import { WoningGalerij } from "./WoningGalerij";
import { VacationRentalJsonLd } from "@/components/JsonLd";

interface Props { params: { locale: string; id: string } }

export function generateStaticParams() {
  return woningen.flatMap((w) => [
    { locale: 'nl', id: w.id },
    { locale: 'en', id: w.id },
  ]);
}

const woningMeta: Record<string, { title: string; description: string; keywords: string[] }> = {
  'nosso-knokke': {
    title: 'Nosso Logies — vakantiewoning Knokke-Heist | moroww',
    description: 'Luxe vakantiewoning in Heist-aan-Zee, Knokke. 110m², 2 slaapkamers, max 6 personen. Strand op 2 minuten. Fysiek gecertificeerd door moroww. Vanaf €370/nacht.',
    keywords: ['vakantiewoning Knokke', 'vakantiewoning Heist-aan-Zee', 'vakantiewoning kust België', 'luxe vakantiewoning Knokke-Heist', 'privé vakantiewoning Knokke', 'Nosso Logies Knokke', 'moroww kust'],
  },
  'moroww-oostende': {
    title: 'The Sixteenth — vakantiewoning Oostende met zeezicht | moroww',
    description: 'The Sixteenth — vakantiewoning op de 16e verdieping in Oostende. Panoramisch zeezicht, privé parking, 2 slaapkamers, max 4 personen. Gecertificeerd door moroww. Vanaf €210/nacht.',
    keywords: ['vakantiewoning Oostende', 'vakantiewoning zeezicht Oostende', 'appartement Oostende huren', 'luxe vakantiewoning Oostende', 'moroww Oostende'],
  },
  'ann-helena-ursel': {
    title: 'Chalet Anna-Helena — vakantiewoning Ursel Meetjesland | moroww',
    description: 'Chalet met privétuin en vijver in Ursel, Meetjesland. 2 slaapkamers, max 5 personen. Bosrand, gezinsvriendelijk. Gecertificeerd door moroww. Vanaf €220/nacht.',
    keywords: ['vakantiewoning Meetjesland', 'chalet Ursel', 'vakantiewoning Ursel', 'chalet huren Meetjesland', 'gezinsvakantie Meetjesland', 'moroww Meetjesland'],
  },
  'cozy-relax-beernem': {
    title: 'The Cozy Relax Home — vakantiewoning Beernem met zwembad | moroww',
    description: 'Ruime vakantiewoning in Beernem met zwembad, hottub en tuin met BBQ. 4 slaapkamers, max 10 personen. Ideaal voor groepen. Gecertificeerd door moroww. Vanaf €600/nacht.',
    keywords: ['vakantiewoning Beernem', 'vakantiewoning met zwembad België', 'vakantiewoning groep België', 'vakantiewoning hottub België', 'groepsaccommodatie Meetjesland', 'moroww Beernem'],
  },
  'sophora': {
    title: 'Sophora — vakantiewoning Elst, Vlaamse Ardennen | moroww',
    description: 'Een familiehuis in het hart van Elst, gedragen door drie zussen. 9 slaapkamers elk met eigen badkamer, zwembad, sauna en tuin. Max 18 personen. Gecertificeerd door moroww. Vanaf €800/nacht.',
    keywords: ['vakantiewoning Vlaamse Ardennen', 'vakantiewoning Elst', 'groepsaccommodatie Vlaamse Ardennen', 'vakantiewoning 18 personen België', 'moroww the fields', 'Sophora Elst'],
  },
  'lammersdamhoeve': {
    title: 'De Lammersdamhoeve — vakantiewoning Wingene, Brugse Ommeland | moroww',
    description: 'Hoeve in Wingene, aan de rand van natuurgebied De Gulke Putten. 220m², 4 slaapkamers, 2 badkamers, max 8 personen. Volledig omheinde tuin, huisdieren welkom zonder toeslag. Gecertificeerd door moroww. Vanaf €330/nacht.',
    keywords: ['vakantiewoning Wingene', 'vakantiewoning Brugse Ommeland', 'hoeve huren West-Vlaanderen', 'vakantiewoning De Gulke Putten', 'vakantiewoning met omheinde tuin', 'vakantiewoning honden welkom België', 'vakantiewoning Bulskampveld', 'moroww the fields', 'De Lammersdamhoeve'],
  },
};

export async function generateMetadata({ params }: Props) {
  const locale = params.locale as Locale
  const woning = woningen.find((w) => w.id === params.id);
  if (!woning) return { title: "Woning - moroww" };
  const meta = woningMeta[woning.id];
  const desc = meta?.description ?? lw(woning.beschrijving, locale)
  return {
    title: meta?.title ?? `${woning.naam} — vakantiewoning in ${woning.locatie}`,
    description: desc,
    keywords: meta?.keywords,
    alternates: { canonical: `https://www.moroww.com/collectie/${woning.id}` },
    openGraph: {
      title: meta?.title ?? `${woning.naam} | moroww`,
      description: desc,
      images: [{ url: woning.heroFoto, width: 1200, height: 800, alt: woning.naam }],
    },
  };
}

export default async function WoningDetailPage({ params }: Props) {
  const t = await getTranslations('property')
  const locale = params.locale as Locale
  const woning = woningen.find((w) => w.id === params.id);
  if (!woning) notFound();

  const badge = BADGE_STYLES[woning.collectie];

  return (
    <div className="bg-moroww-blush min-h-screen">
      <VacationRentalJsonLd
        name={woning.naam}
        description={lw(woning.beschrijving, locale)}
        image={woning.heroFoto}
        pricePerNight={woning.prijs}
        maxOccupancy={woning.maxGasten}
        address={woning.locatie}
        url={`https://www.moroww.com/collectie/${woning.id}`}
      />
      {/* pricePerNight en maxOccupancy zijn optioneel; VacationRentalJsonLd
          spread ze alleen in het schema als ze gezet zijn. Zie components/JsonLd.tsx. */}
      <div className="mx-auto max-w-6xl px-6 md:px-12 pt-28 pb-0">

        {/* ── Breadcrumb ── */}
        <div className="flex items-center gap-2 text-sm text-moroww-black/40 mb-6">
          <Link href="/collectie" className="hover:text-moroww-black transition-colors">
            {t('breadcrumb_collection')}
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
              {lw(woning.slogan, locale)}
            </p>

            {/* Locatie */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#666666', fontSize: 14, marginTop: 12 }}>
              <MapPin size={14} />
              {woning.locatie}
            </div>

            {/* Specs — verberg elk item dat ontbreekt of 0 is */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>
              {[
                woning.slaapkamers ? `${woning.slaapkamers} ${t('bedrooms')}` : null,
                woning.badkamers ? `${woning.badkamers} ${t('bathrooms')}` : null,
                woning.maxGasten ? `Max ${woning.maxGasten} ${t('guests')}` : null,
                woning.oppervlakte || null,
              ].filter((s): s is string => Boolean(s)).map((spec) => (
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
              {woning.comingSoon ? (
                <>
                  <p style={{ color: '#C08D6E', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>
                    {t('coming_soon')}
                  </p>
                  <p style={{ color: '#9CA3AF', fontSize: 15, lineHeight: 1.6 }}>
                    {t('coming_soon_body')}
                  </p>
                </>
              ) : (
                <>
                  {woning.prijs ? (
                    <div className="mb-5">
                      <span style={{ color: '#C08D6E', fontSize: 14, marginRight: 6 }}>{t('from_label')}</span>
                      <span style={{ fontWeight: 800, fontSize: 32, color: '#ffffff' }}>€{woning.prijs}</span>
                      <span style={{ color: '#999999', fontSize: 14, marginLeft: 6 }}>{t('per_night')}</span>
                    </div>
                  ) : null}
                  <a
                    href={woning.boekUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center rounded-full font-semibold py-4 text-base transition-colors duration-200 mb-3"
                    style={{ background: '#FEA05E', color: '#ffffff' }}
                  >
                    {t('book_direct')}
                  </a>
                  <p style={{ color: '#666666', fontSize: 12, textAlign: 'center', lineHeight: 1.5 }}>
                    {t('redirect_note')}
                  </p>
                </>
              )}
            </div>
            <div className="mt-4 text-center">
              <Link href="/collectie" className="text-xs text-moroww-black/40 hover:text-moroww-black transition-colors underline underline-offset-2">
                {t('back_to_collection')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. HOOGTEPUNTEN ── */}
      <section className="px-6 md:px-12 mt-10" style={{ borderTop: '1px solid #E8D5C4' }}>
        <div className="max-w-6xl mx-auto py-16">
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 24 }}>{t('highlights_title')}</h2>
          <div
            className="rounded-2xl p-8"
            style={{ background: '#FFFFFF', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {lwArr(woning.hoogtepunten, locale).map((h) => (
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

      {/* ── waaromOpgenomen — stem van het label ── */}
      {woning.waaromOpgenomen && (() => {
        const raw = lw(woning.waaromOpgenomen, locale)
        const [head, ...rest] = raw.split('\n\n')
        return (
          <section className="px-6 md:px-12 pb-16">
            <div className="max-w-6xl mx-auto">
              <div className="rounded-2xl p-8 md:p-12" style={{ background: '#1A1A1A' }}>
                <p style={{ fontSize: 11, color: '#FEA05E', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>
                  {t('waarom_label')}
                </p>
                <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', color: '#ffffff', fontWeight: 700, lineHeight: 1.2, marginBottom: 24 }}>
                  {head}
                </h2>
                {rest.map((p, i) => (
                  <p key={i} style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </section>
        )
      })()}

      {/* ── 4. BESCHRIJVING ── */}
      <section className="px-6 md:px-12 pb-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[2fr_1fr] gap-10">
          <div>
            <div
              className="rounded-2xl p-8 mb-6"
              style={{ background: '#FFFFFF', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
            >
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 20 }}>{t('about_title')}</h2>
              <p style={{ fontSize: 18, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.7, marginBottom: 24 }}>
                {lw(woning.introductie, locale)}
              </p>
              <p style={{ fontSize: 15, color: '#444444', lineHeight: 1.8 }}>
                {lw(woning.volledigeBeschrijving, locale)}
              </p>
            </div>

            {woning.buurt && (
              <div
                className="rounded-2xl p-8"
                style={{ background: '#FFFFFF', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
              >
                <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 16 }}>{t('neighbourhood_title')}</h2>
                <p style={{ fontSize: 15, color: '#444444', lineHeight: 1.8 }}>
                  {lw(woning.buurt!, locale)}
                </p>
              </div>
            )}
          </div>

          {/* ── 5. PRAKTISCH ── */}
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 16 }}>{t('practical_title')}</h2>
            <div className="space-y-3">
              {[
                { icon: <LogIn size={16} style={{ color: '#fff' }} />, label: t('checkin_label'), value: `${t('from_label')} ${woning.inCheckin}` },
                { icon: <LogOut size={16} style={{ color: '#fff' }} />, label: t('checkout_label'), value: `${t('before_label')} ${woning.uitCheckin}` },
                ...(woning.maxGasten ? [{ icon: <Users size={16} style={{ color: '#fff' }} />, label: t('max_guests_label'), value: `${woning.maxGasten} ${t('persons')}` }] : []),
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
              {lwArr(woning.tags, locale).map((tag) => (
                <div key={tag} className="flex items-center gap-4 rounded-2xl p-5"
                  style={{ background: '#FFFFFF', border: '1px solid #E8D5C4' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: '#FEA05E' }}>
                    <Check size={16} style={{ color: '#fff' }} />
                  </div>
                  <p style={{ fontSize: 15, color: '#1A1A1A' }}>{tag}</p>
                </div>
              ))}
              {woning.vergunningsnummer && (
                <div className="flex items-center gap-4 rounded-2xl p-5"
                  style={{ background: '#FFFFFF', border: '1px solid #E8D5C4' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: '#FEA05E' }}>
                    <Check size={16} style={{ color: '#fff' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 11, color: '#C08D6E', textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600, marginBottom: 2 }}>{t('vergunning_label')}</p>
                    <p style={{ fontSize: 16, color: '#1A1A1A', fontWeight: 600 }}>{woning.vergunningsnummer}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. REVIEWS ── */}
      {(woning.reviews?.length ?? 0) > 0 && (
        <section className="px-6 md:px-12 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-2xl p-8" style={{ background: '#FFFFFF', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
              <p className="text-xs uppercase tracking-widest text-[#C08D6E] mb-6">
                {t('reviews_label')}
              </p>
              <div className="space-y-8">
                {woning.reviews!.map(({ citaat, naam }) => (
                  <blockquote key={naam} className="flex flex-col gap-3">
                    <p className="text-base leading-relaxed text-[#1A1A1A] italic">
                      &ldquo;{lw(citaat, locale)}&rdquo;
                    </p>
                    <footer className="flex items-center gap-3">
                      <span className="text-[#FEA05E] text-sm">★★★★★</span>
                      <span className="text-sm font-medium text-[#1A1A1A]">{naam}</span>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 7. BOOKING CTA ── */}
      {!woning.comingSoon && (
        <section className="px-6 md:px-12 pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="bg-moroww-orange rounded-3xl p-10 md:p-16 text-center">
              <h2
                className="font-bold lowercase text-white leading-[1.05] tracking-[-0.02em] mb-3"
                style={{ fontSize: "clamp(1.75rem,3vw,2.5rem)" }}
              >
                {t('cta_title')}
              </h2>
              <p className="text-white/80 leading-relaxed mb-8 max-w-md mx-auto" style={{ fontSize: 17 }}>
                {t('cta_body')}
              </p>
              <a
                href={woning.boekUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-white text-moroww-orange font-semibold px-10 py-4 text-base hover:bg-moroww-blush transition-colors duration-200 mb-4"
              >
                {t('book_direct')}
              </a>
              <p className="text-white/60 text-sm">
                {t('cta_questions')}{" "}
                <a href="mailto:info@moroww.com" className="underline underline-offset-2 hover:text-white transition-colors">
                  {t('cta_contact')}
                </a>
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
