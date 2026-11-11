import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { BadgeCheck, Bath, BedDouble, CalendarCheck, Check, Handshake, Maximize2, Users } from "lucide-react";
import { woningen, liveWoningen, lw, lwArr, type Locale } from "@/lib/woningen";
import { boekbareWoning, boekPaginaUrl } from "@/lib/boeking";
import { BoekWidget } from "./BoekWidget";
import { MobielBoekBalk, NaarBoekenKnop } from "./MobielBoekBalk";
import { GalerijProvider, FotoKnop, HeroDiashow, FotoCarrousel } from "./WoningGalerij";
import { PandKaart } from "@/components/PandKaart";
import { VacationRentalJsonLd, BreadcrumbListJsonLd } from "@/components/JsonLd";
import { Register } from "@/components/Register";
import { siteMetadata } from "@/lib/seo/siteMetadata";

interface Props { params: Promise<{ locale: string; id: string }> }

export function generateStaticParams() {
  // Panden met status 'wacht_op_beeld' krijgen geen eigen pagina — er is
  // niets te tonen tot de fotoshoot klaar is. liveWoningen filtert ze uit.
  return liveWoningen().flatMap((w) => [
    { locale: 'nl', id: w.id },
    { locale: 'en', id: w.id },
  ]);
}

// Per pand overrulen we titel en meta-beschrijving in beide talen. Vóór
// deze stap deelden alle EN-pand-URL's de NL-titel en -description — dat
// gaf 6 dubbele title-tags in de zoekresultaten. keywords staan hier bewust
// niet: Google negeert die tag sinds 2009 en de lijst met concurrent-
// alternatieven stond zichtbaar in de broncode.
//
// Descriptions blijven onder 155 tekens (SERP-cutoff Google), titels
// onder 60 (idem, plus ruimte voor het `| moroww`-suffix).
const woningMeta: Record<
  string,
  { title: { nl: string; en: string }; description: { nl: string; en: string } }
> = {
  'nosso-knokke': {
    title: {
      nl: 'Nosso Logies — vakantiewoning Knokke-Heist',
      en: 'Nosso Logies — holiday home in Knokke-Heist',
    },
    description: {
      nl: 'Appartement van 110 m² in Heist-aan-Zee, op twee minuten van het strand. 2 slaapkamers, max 6. Gecertificeerd door moroww. Vanaf €230/nacht.',
      en: 'Apartment of 110 sqm in Heist-aan-Zee, two minutes from the beach. 2 bedrooms, up to 6 guests. Certified by moroww. From €230/night.',
    },
  },
  'moroww-oostende': {
    title: {
      nl: 'The Sixteenth — vakantiewoning Oostende met zeezicht',
      en: 'The Sixteenth — Ostend holiday home with sea view',
    },
    description: {
      nl: 'The Sixteenth — vakantiewoning op de 16e verdieping in Oostende. Panoramisch zeezicht, 2 slaapkamers, max 4. Gecertificeerd. Vanaf €210/nacht.',
      en: 'The Sixteenth — 16th-floor holiday home in Ostend. Panoramic sea view, 2 bedrooms, up to 4 guests. Certified by moroww. From €210/night.',
    },
  },
  'anna-helena-ursel': {
    title: {
      nl: 'Chalet Anna-Helena — vakantiewoning Ursel Meetjesland',
      en: 'Chalet Anna-Helena — holiday home in Ursel, Meetjesland',
    },
    description: {
      nl: 'Chalet Anna-Helena — privétuin en vijver in Ursel, Meetjesland. 2 slaapkamers, max 5, gezinsvriendelijk. Gecertificeerd. Vanaf €220/nacht.',
      en: 'Chalet Anna-Helena — private garden and pond in Ursel, Meetjesland. 2 bedrooms, up to 5 guests, family-friendly. Certified. From €220/night.',
    },
  },
  'cozy-relax-beernem': {
    title: {
      nl: 'The Cozy Relax Home — vakantiewoning Beernem met zwembad',
      en: 'The Cozy Relax Home — Beernem holiday home with pool',
    },
    description: {
      nl: 'Ruime vakantiewoning in Beernem met zwembad, hottub en BBQ-tuin. 4 slaapkamers, max 10, ideaal voor groepen. Gecertificeerd. Vanaf €600/nacht.',
      en: 'Spacious holiday home in Beernem with pool, hot tub and BBQ garden. 4 bedrooms, up to 10 guests, ideal for groups. Certified. From €600/night.',
    },
  },
  'sophora': {
    title: {
      nl: 'Sophora — vakantiewoning Elst, Vlaamse Ardennen',
      en: 'Sophora — holiday home in Elst, Flemish Ardennes',
    },
    description: {
      nl: 'Familiehuis in Elst, Vlaamse Ardennen. Gedragen door drie zussen. 9 en-suite slaapkamers, zwembad, sauna, max 18. Gecertificeerd. Vanaf €800/nacht.',
      en: 'Family home in Elst, Flemish Ardennes, run by three sisters. 9 en-suite bedrooms, pool, sauna, up to 18 guests. Certified. From €800/night.',
    },
  },
  'house-1783-11': {
    title: {
      nl: 'House 1783-11 — vakantiewoning Knokke-Heist aan zee',
      en: 'House 1783-11 — holiday home in Knokke-Heist by the sea',
    },
    description: {
      nl: 'House 1783-11 — appartement in Heist-aan-Zee, twee minuten van het strand. 3 slaapkamers, 2 badkamers, twee terrassen, max 6. Gecertificeerd.',
      en: 'House 1783-11 — apartment in Heist-aan-Zee, two minutes from the beach. 3 bedrooms, 2 bathrooms, two terraces, up to 6 guests. Certified.',
    },
  },
  'penthouse-v8b': {
    title: {
      nl: 'Penthouse V8B — vakantiewoning Oostende met zeezicht',
      en: 'Penthouse V8B — Ostend holiday home with sea view',
    },
    description: {
      nl: 'Penthouse V8B — 8e verdieping in Oostende, terras recht op zee. 2 slaapkamers, max 7, zwembad, parking. Gecertificeerd. Vanaf €300/nacht.',
      en: 'Penthouse V8B — 8th-floor holiday home in Ostend, terrace onto the sea. 2 bedrooms, up to 7 guests, pool, parking. Certified. From €300/night.',
    },
  },
  'zeedijk-nieuwpoort': {
    title: {
      nl: 'The Eighth — vakantiewoning Nieuwpoort met zeezicht',
      en: 'The Eighth — Nieuwpoort holiday home with sea view',
    },
    description: {
      nl: 'The Eighth — 8e verdieping op de Zeedijk in Nieuwpoort-Bad. Zicht op staketsel en vuurtoren, 3 slaapkamers, max 8. Gecertificeerd. Vanaf €270/nacht.',
      en: 'The Eighth — 8th-floor apartment on the Zeedijk in Nieuwpoort-Bad. Views of pier and lighthouse, 3 bedrooms, up to 8 guests. Certified. From €270/night.',
    },
  },
};

export async function generateMetadata({ params }: Props) {
  const p = await params
  const locale = p.locale as Locale
  const woning = woningen.find((w) => w.id === p.id);
  if (!woning) return { title: "Woning" };
  const meta = woningMeta[woning.id];
  const isNl = locale === 'nl'
  const fallbackTitleNl = `${woning.naam} — vakantiewoning in ${woning.locatie}`
  const fallbackTitleEn = `${woning.naam} — holiday home in ${woning.locatie}`
  const pageTitle = meta?.title?.[locale] ?? (isNl ? fallbackTitleNl : fallbackTitleEn)
  const desc = meta?.description?.[locale] ?? lw(woning.beschrijving, locale)
  return siteMetadata({
    titel: pageTitle,
    beschrijving: desc,
    pad: isNl ? `/collectie/${woning.id}` : `/en/collection/${woning.id}`,
    locale: isNl ? 'nl' : 'en',
    // heroFoto is een absoluut of relatief pad in /public. Als het pand
    // status='wacht_op_beeld' had zou heroFoto leeg zijn, maar wachtende
    // panden komen niet in generateStaticParams dus die case gebeurt niet.
    ogBeeld: woning.heroFoto,
    hreflang: {
      nl: `/collectie/${woning.id}`,
      en: `/en/collection/${woning.id}`,
    },
  });
}

function maandLang(iso: string | undefined, locale: Locale) {
  const d = iso ? new Date(iso) : null
  if (!d || Number.isNaN(d.getTime())) return null
  return new Intl.DateTimeFormat(locale === 'nl' ? 'nl-BE' : 'en-GB', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(d)
}

// Boekingspaneel. Enige plek op het gastenregister waar een kader mag staan.
async function BoekingsPaneel({
  woning,
  locale,
}: {
  woning: (typeof woningen)[number]
  locale: Locale
}) {
  const t = await getTranslations({ locale, namespace: 'property' })
  const boekbaar = boekbareWoning(woning.id)

  if (woning.comingSoon) {
    return (
      <div
        className="bg-white border border-moroww-rule rounded-3xl p-mw-5 shadow-[0_30px_60px_-40px_rgba(26,26,26,0.45)]"
      >
        <p className="text-audit text-moroww-label-tekst mb-mw-3">{t('coming_soon')}</p>
        <p className="text-body text-moroww-dark">{t('coming_soon_body')}</p>
      </div>
    )
  }

  const auditMaand = maandLang(woning.geauditeerdOp, locale)

  return (
    <div
      className="bg-white border border-moroww-rule rounded-3xl p-mw-5 shadow-[0_30px_60px_-40px_rgba(26,26,26,0.45)]"
    >
      {woning.prijs ? (
        <p className="text-h3 text-moroww-dark">
          <span className="text-body text-moroww-ink-2">{t('from_label')} </span>
          <span className="font-semibold">€{woning.prijs}</span>
          <span className="text-body text-moroww-ink-2"> {t('per_night')}</span>
        </p>
      ) : null}
      {boekbaar && (
        <BoekWidget
          woningId={boekbaar.id}
          maxGasten={boekbaar.maxGasten}
          uitwegUrl={boekPaginaUrl(boekbaar.listingId, locale)}
        />
      )}
      {boekbaar && (
        <ul className="mt-mw-4 space-y-mw-2 border-t border-moroww-rule pt-mw-4 text-sm text-moroww-ink-2">
          <li className="flex gap-3">
            <CalendarCheck className="h-4 w-4 shrink-0 mt-0.5 text-moroww-label-tekst" aria-hidden />
            {t('trust_cancel')}
          </li>
          <li className="flex gap-3">
            <Handshake className="h-4 w-4 shrink-0 mt-0.5 text-moroww-label-tekst" aria-hidden />
            {t('trust_direct')}
          </li>
          {auditMaand && (
            <li className="flex gap-3">
              <BadgeCheck className="h-4 w-4 shrink-0 mt-0.5 text-moroww-label-tekst" aria-hidden />
              {t('trust_audit', { month: auditMaand })}
            </li>
          )}
        </ul>
      )}
    </div>
  )
}

export default async function WoningDetailPage({ params }: Props) {
  const t = await getTranslations('property')
  const p = await params
  const locale = p.locale as Locale
  const woning = woningen.find((w) => w.id === p.id);
  if (!woning) notFound();
  // Wachtende panden hebben geen inhoud om te tonen — 404 tot ze live gaan.
  if (woning.status === 'wacht_op_beeld') notFound();

  const isNl = locale === 'nl'
  const baseUrl = 'https://www.moroww.com'
  const collectieUrl = isNl ? `${baseUrl}/collectie` : `${baseUrl}/en/collection`
  const pandUrl = isNl ? `${baseUrl}/collectie/${woning.id}` : `${baseUrl}/en/collection/${woning.id}`
  const breadcrumbs = [
    { name: 'Home', url: isNl ? baseUrl : `${baseUrl}/en` },
    { name: isNl ? 'de collectie' : 'the collection', url: collectieUrl },
    { name: woning.naam, url: pandUrl },
  ]

  const boekbaar = boekbareWoning(woning.id)
  const auditMaand = maandLang(woning.geauditeerdOp, locale)
  const prijsLabel = woning.prijs ? `${t('from_label')} €${woning.prijs} ${t('per_night')}` : null

  const kerncijfers = [
    woning.maxGasten ? { Icoon: Users, tekst: t('facts_guests', { count: woning.maxGasten }) } : null,
    woning.slaapkamers ? { Icoon: BedDouble, tekst: t('facts_bedrooms', { count: woning.slaapkamers }) } : null,
    woning.badkamers ? { Icoon: Bath, tekst: t('facts_bathrooms', { count: woning.badkamers }) } : null,
    woning.oppervlakte ? { Icoon: Maximize2, tekst: woning.oppervlakte } : null,
  ].filter((k): k is NonNullable<typeof k> => k !== null)

  // Per-pand override via `fotoNaBeschrijving` / `fotoNaBuurt`:
  //   undefined → default (fotos[2] resp. fotos[3])
  //   null      → expliciet geen foto bij die sectie
  //   string    → dat specifieke pad gebruiken
  const fotoNaBeschrijving =
    woning.fotoNaBeschrijving === undefined ? woning.fotos[2] : woning.fotoNaBeschrijving
  const fotoNaBuurt =
    woning.fotoNaBuurt === undefined ? woning.fotos[3] : woning.fotoNaBuurt

  // De hero draait door het eerste zestal, vanaf de herofoto. De strook
  // verderop toont de rest, zodat geen beeld twee keer na elkaar opduikt.
  const heroIndex = Math.max(0, woning.fotos.indexOf(woning.heroFoto))
  const alle = woning.fotos.map((_, i) => i)
  const diashow = [heroIndex, ...alle.filter((i) => i !== heroIndex)].slice(0, 6)
  const rest = alle.filter((i) => !diashow.includes(i))
  const strook = rest.length >= 4 ? rest : alle

  const alineas = (tekst: string) => tekst.split('\n\n').filter((a) => a.trim() !== '')

  // waaromOpgenomen is opgebouwd als kop + alinea's die elk openen met een
  // korte reden ("Om het gebouw."). Die eerste zin wordt de tussenkop.
  const standaard = woning.waaromOpgenomen ? alineas(lw(woning.waaromOpgenomen, locale)) : []
  const standaardRedenen = standaard.slice(1).map((a) => {
    const einde = a.indexOf('. ')
    return einde === -1 ? { kop: a, rest: '' } : { kop: a.slice(0, einde + 1), rest: a.slice(einde + 2) }
  })

  const paneel = await BoekingsPaneel({ woning, locale })

  // Twee andere huizen uit dezelfde collectie; is die te klein, aangevuld
  // met de andere collectie.
  const anderen = liveWoningen().filter((w) => w.id !== woning.id)
  const verwant = [
    ...anderen.filter((w) => w.collectie === woning.collectie),
    ...anderen.filter((w) => w.collectie !== woning.collectie),
  ].slice(0, 2)

  const reviews = woning.reviews ?? []

  const beeld = (src: string, sizes: string, className: string, altSuffix: string) =>
    woning.fotos.includes(src) ? (
      <FotoKnop index={woning.fotos.indexOf(src)} sizes={sizes} className={className} />
    ) : (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={src} alt={`${woning.naam} — ${altSuffix}`} fill sizes={sizes} className="object-cover" />
      </div>
    )

  const GLAS = 'bg-white/[0.12] backdrop-blur-xl backdrop-saturate-150 border border-white/25'

  return (
    <Register kant="gast">
      <BreadcrumbListJsonLd items={breadcrumbs} />
      <VacationRentalJsonLd
        name={woning.naam}
        description={lw(woning.beschrijving, locale)}
        image={woning.heroFoto}
        pricePerNight={woning.prijs}
        maxOccupancy={woning.maxGasten}
        address={woning.locatie}
        url={pandUrl}
        amenities={woning.amenities}
      />

      <GalerijProvider
        fotos={woning.fotos}
        naam={woning.naam}
        alts={woning.fotoAlts ? lwArr(woning.fotoAlts, locale) : undefined}
        labels={{
          sluit: t('gallery_close'),
          vorige: t('gallery_prev'),
          volgende: t('gallery_next'),
          foto: t('gallery_photo', { name: woning.naam, n: '{n}' }),
        }}
      >
        {/* Hero — het huis eerst, als diavoorstelling tot onder de navbar. */}
        <HeroDiashow
          indices={diashow}
          labels={{
            pauzeer: t('slideshow_pause'),
            speel: t('slideshow_play'),
            dia: t('slide'),
            alle: t('all_photos', { count: woning.fotos.length }),
          }}
        >
          <p className="text-audit text-white/80">
            {woning.nieuw ? t('new_in', { collection: woning.collectie }) : woning.collectie} · {woning.locatie}
          </p>
          <h1
            className="mt-mw-2 font-semibold text-white leading-[0.98] tracking-[-0.03em] drop-shadow-md"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            {woning.naam}
          </h1>
          <p className="mt-mw-3 max-w-[46ch] text-body-lg text-white/90">{lw(woning.slogan, locale)}</p>

          {(kerncijfers.length > 0 || boekbaar) && (
            <div className={`${GLAS} pointer-events-auto mt-mw-5 inline-flex max-w-full flex-wrap items-center gap-x-mw-4 gap-y-2 rounded-[28px] md:rounded-full py-1.5 pl-mw-5 ${boekbaar ? 'pr-1.5' : 'pr-mw-5'} shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)]`}>
              {kerncijfers.map(({ Icoon, tekst }) => (
                <span key={tekst} className="flex items-center gap-2 py-2 text-body text-white">
                  <Icoon className="h-[18px] w-[18px] text-white/70" strokeWidth={1.5} aria-hidden />
                  {tekst}
                </span>
              ))}
              {boekbaar && (
                <span className="flex items-center gap-mw-3 md:ml-mw-2 md:pl-mw-4 md:border-l md:border-white/25">
                  {woning.prijs ? (
                    <span className="text-body text-white">
                      <span className="text-white/70">{t('from_label')} </span>
                      <span className="font-semibold">€{woning.prijs}</span>
                      <span className="text-white/70"> {t('per_night')}</span>
                    </span>
                  ) : null}
                  <NaarBoekenKnop
                    doelIds={['boeken', 'boeken-mobiel']}
                    label={t('mobile_cta')}
                    className="rounded-full bg-moroww-orange px-mw-5 py-3 font-semibold text-moroww-dark hover:bg-white transition-colors"
                  />
                </span>
              )}
            </div>
          )}
        </HeroDiashow>

        <div className="mx-auto max-w-7xl px-6 md:px-12 pt-mw-6 lg:pt-mw-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-mw-6">

            {/* LINKS · het verhaal — kolom 1 tot 7 */}
            <div className="lg:col-span-7">
              <nav className="text-audit text-moroww-ink-2">
                <Link
                  href={isNl ? '/collectie' : '/en/collection'}
                  className="hover:text-moroww-dark transition-colors"
                >
                  {t('breadcrumb_collection')}
                </Link>
                <span className="mx-2">·</span>
                <span>{woning.naam}</span>
              </nav>

              <p className="mt-mw-5 max-w-[30ch] text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.22] tracking-[-0.015em] text-moroww-dark">
                {lw(woning.introductie, locale)}
              </p>

              {/* Eén gastenstem bovenaan, waar de beslissing valt. */}
              {reviews[0] && (
                <figure className="mt-mw-6 max-w-[52ch] border-l-2 border-moroww-label pl-mw-4">
                  <blockquote className="text-body-lg italic text-moroww-dark line-clamp-3">
                    &ldquo;{lw(reviews[0].citaat, locale)}&rdquo;
                  </blockquote>
                  <figcaption className="mt-2 text-audit text-moroww-ink-2">
                    {reviews[0].naam}
                    {reviews.length > 1 && (
                      <>
                        {' · '}
                        <a href="#reviews" className="underline underline-offset-2 hover:text-moroww-dark">
                          {t('all_reviews', { count: reviews.length })}
                        </a>
                      </>
                    )}
                  </figcaption>
                </figure>
              )}

              {/* Boekingspaneel op mobiel — inline, geen sticky */}
              <div id="boeken-mobiel" className="lg:hidden mt-mw-6 scroll-mt-24">{paneel}</div>

              {/* Wat dit verblijf moroww waard maakt — de redenen uit de audit,
                  genummerd zoals een rapport, de hoogtepunten als checklist. */}
              {(standaardRedenen.length > 0 || woning.hoogtepunten.length > 0) && (
                <section className="mt-mw-10">
                  <div className="flex items-center gap-mw-3">
                    <Image
                      src="/images/Moroww_Certified_01_RGB.png"
                      alt="moroww certified"
                      width={64}
                      height={64}
                      className="w-12 h-12 shrink-0"
                    />
                    <p className="text-audit text-moroww-label-tekst">
                      {t('waarom_label')}
                      {auditMaand && <> · {t('audited_prefix')} {auditMaand}</>}
                    </p>
                  </div>
                  <h2 className="mt-mw-4 text-h2 text-moroww-dark max-w-[20ch]">{t('worth_title')}</h2>

                  {standaardRedenen.length > 0 && (
                    <ol className="mt-mw-6 border-t border-moroww-rule">
                      {standaardRedenen.map(({ kop, rest }, n) => (
                        <li key={kop} className="grid grid-cols-[3rem_1fr] md:grid-cols-[5rem_1fr] gap-x-mw-3 border-b border-moroww-rule py-mw-5">
                          <span className="text-h2 text-moroww-label tabular-nums leading-none" aria-hidden>
                            {String(n + 1).padStart(2, '0')}
                          </span>
                          <div className="max-w-[52ch]">
                            <h3 className="text-[clamp(1.25rem,1.8vw,1.6rem)] font-semibold leading-tight tracking-[-0.01em] text-moroww-dark">{kop}</h3>
                            {rest && <p className="mt-mw-2 text-body text-moroww-ink-2">{rest}</p>}
                          </div>
                        </li>
                      ))}
                    </ol>
                  )}

                  {woning.hoogtepunten.length > 0 && (
                    <>
                      <h3 className="mt-mw-6 text-audit text-moroww-ink-2">{t('in_short')}</h3>
                      <ul className="mt-mw-3 grid grid-cols-1 sm:grid-cols-2 gap-x-mw-5 gap-y-mw-3">
                        {lwArr(woning.hoogtepunten, locale).map((h) => (
                          <li key={h} className="flex gap-3 text-body text-moroww-dark">
                            <Check className="h-[18px] w-[18px] shrink-0 mt-[3px] text-moroww-label-tekst" strokeWidth={2} aria-hidden />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  <p className="mt-mw-5">
                    <Link
                      href={isNl ? '/de-standaard' : '/en/the-standard'}
                      className="text-audit text-moroww-dark underline underline-offset-4 decoration-moroww-label hover:decoration-moroww-dark transition-colors"
                    >
                      {t('label_link_short')}
                    </Link>
                  </p>
                </section>
              )}

              {/* Over deze woning */}
              <section className="mt-mw-10">
                <h2 className="text-h2 text-moroww-dark">{t('about_title')}</h2>
                <div className="mt-mw-4 max-w-[58ch] space-y-mw-3">
                  {alineas(lw(woning.volledigeBeschrijving, locale)).map((a, n) => (
                    <p key={a} className={n === 0 ? 'text-body-lg text-moroww-dark' : 'text-body text-moroww-dark'}>{a}</p>
                  ))}
                </div>
                {fotoNaBeschrijving &&
                  beeld(
                    fotoNaBeschrijving,
                    '(max-width: 1024px) 100vw, 55vw',
                    'mt-mw-6 aspect-[4/3] w-full rounded-2xl',
                    t('atmosphere_alt_suffix'),
                  )}
              </section>

              {/* Praktisch */}
              <section className="mt-mw-10">
                <h2 className="text-h2 text-moroww-dark">{t('practical_title')}</h2>
                <dl className="mt-mw-4 divide-y divide-moroww-rule border-t border-b border-moroww-rule max-w-[58ch]">
                  <PraktischRij label={t('checkin_label')} value={`${t('from_label')} ${woning.inCheckin}`} />
                  <PraktischRij label={t('checkout_label')} value={`${t('before_label')} ${woning.uitCheckin}`} />
                  {woning.vergunningsnummer && (
                    <PraktischRij label={t('vergunning_label')} value={woning.vergunningsnummer} />
                  )}
                  {woning.geluidssensor && (
                    <PraktischRij label={t('geluidssensor_label')} value={t('geluidssensor_body')} />
                  )}
                </dl>
                {woning.tags.length > 0 && (
                  <ul className="mt-mw-4 flex flex-wrap gap-2 max-w-[58ch]">
                    {lwArr(woning.tags, locale).map((tag) => (
                      <li key={tag} className="rounded-full border border-moroww-rule bg-white/60 px-3 py-1.5 text-audit text-moroww-ink-2">{tag}</li>
                    ))}
                  </ul>
                )}
              </section>
            </div>

            {/* RECHTS · boekingspaneel — kolom 9 tot 12, sticky vanaf lg */}
            <aside id="boeken" className="hidden lg:block lg:col-span-4 lg:col-start-9 scroll-mt-24">
              <div className="sticky top-24">{paneel}</div>
            </aside>
          </div>
        </div>

        {/* Rondleiding — doorlopende strook, de hele reeks in de galerij */}
        {strook.length > 0 && (
          <section className="mt-mw-10">
            <h2 className="mx-auto max-w-7xl px-6 md:px-12 text-h2 text-moroww-dark">{t('tour_title', { name: woning.naam })}</h2>
            <div className="mt-mw-5">
              <FotoCarrousel indices={strook} />
            </div>
          </section>
        )}

        {/* De buurt — tekst als glasplaat over het beeld */}
        {woning.buurt && (
          <section className="relative mt-mw-10 min-h-[80vh] w-full overflow-hidden bg-moroww-dark flex items-end">
            {fotoNaBuurt && beeld(fotoNaBuurt, '100vw', 'absolute inset-0 h-full w-full', t('surroundings_alt_suffix'))}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" aria-hidden />
            <div className="pointer-events-none relative mx-auto w-full max-w-7xl px-6 md:px-12 py-mw-6 md:py-mw-8">
              <div className={`${GLAS} pointer-events-auto max-w-xl rounded-3xl p-mw-5 md:p-mw-6 text-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]`}>
                <p className="text-audit text-white/70">{woning.locatie}</p>
                <h2 className="mt-mw-2 text-h2">{t('neighbourhood_title')}</h2>
                <p className="mt-mw-4 text-body text-white/90">{lw(woning.buurt, locale)}</p>
              </div>
            </div>
          </section>
        )}
      </GalerijProvider>

      {/* Wat gasten zeggen — groot, want dit is wat overtuigt */}
      {reviews.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 md:px-12 mt-mw-10">
          <h2 id="reviews" className="text-h2 text-moroww-dark scroll-mt-24">{t('reviews_label')}</h2>
          <div className="mt-mw-5 grid grid-cols-1 md:grid-cols-2 gap-x-mw-6 gap-y-mw-6">
            {reviews.map(({ citaat, naam, datum }) => (
              <figure key={naam} className="border-t border-moroww-rule pt-mw-4">
                <blockquote className="text-[clamp(1.25rem,1.8vw,1.6rem)] leading-snug tracking-[-0.01em] text-moroww-dark">
                  &ldquo;{lw(citaat, locale)}&rdquo;
                </blockquote>
                <figcaption className="mt-mw-3 text-audit text-moroww-ink-2">
                  {[naam, maandLang(datum, locale)].filter(Boolean).join(' · ')}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Afsluiter — wie tot hier leest, krijgt de beslissing nog één keer
          aangereikt in plaats van terug te moeten scrollen. */}
      {boekbaar && (
        <section className="mx-auto max-w-7xl px-6 md:px-12 mt-mw-10">
          <div className="relative overflow-hidden rounded-[32px] bg-moroww-dark">
            <Image src={woning.heroFoto} alt="" fill sizes="(max-width: 1280px) 100vw, 80rem" className="object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/10" aria-hidden />
            <div className="relative px-mw-4 py-mw-8 md:px-mw-8 md:py-mw-10">
              <div className={`${GLAS} max-w-lg rounded-3xl p-mw-5 md:p-mw-6 text-white`}>
                <h2 className="text-h2">{t('closing_title', { name: woning.naam })}</h2>
                <p className="mt-mw-3 text-body text-white/80">
                  {[prijsLabel, t('trust_cancel')].filter(Boolean).join(' · ')}
                </p>
                <NaarBoekenKnop
                  doelIds={['boeken', 'boeken-mobiel']}
                  label={t('mobile_cta')}
                  className="mt-mw-5 rounded-full px-mw-5 py-3 font-semibold bg-moroww-orange text-moroww-dark hover:bg-white transition-colors"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Wie deze data of dit huis niet vindt, krijgt een volgende stap
          binnen dezelfde collectie in plaats van een doodlopend einde. */}
      {verwant.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 md:px-12 mt-mw-10 pb-mw-10">
          <h2 className="text-h2 text-moroww-dark">{t('more_in', { collection: woning.collectie })}</h2>
          <div className="mt-mw-5 grid grid-cols-1 md:grid-cols-2 gap-8">
            {verwant.map((w) => (
              <PandKaart
                key={w.id}
                href={{ pathname: '/collectie/[id]', params: { id: w.id } }}
                beeld={w.heroFoto}
                beeldAlt={w.naam}
                titel={w.naam}
                plaats={w.locatie}
                auditItems={[
                  w.slaapkamers ? `${w.slaapkamers} ${t('bedrooms')}` : '',
                  w.maxGasten ? `${w.maxGasten} ${t('guests')}` : '',
                  w.prijs ? `${t('from_label')} €${w.prijs} ${t('per_night')}` : '',
                ]}
              />
            ))}
          </div>
        </section>
      )}

      {boekbaar && (
        <MobielBoekBalk doelId="boeken-mobiel" prijsLabel={prijsLabel} knopLabel={t('mobile_cta')} />
      )}
    </Register>
  );
}

function PraktischRij({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[minmax(0,10rem)_1fr] gap-mw-3 py-mw-3">
      <dt className="text-audit text-moroww-ink-2">{label}</dt>
      <dd className="text-body text-moroww-dark">{value}</dd>
    </div>
  )
}
