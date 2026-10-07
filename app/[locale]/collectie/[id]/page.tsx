import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { BadgeCheck, Bath, BedDouble, CalendarCheck, Handshake, Maximize2, Users } from "lucide-react";
import { woningen, liveWoningen, lw, lwArr, type Locale } from "@/lib/woningen";
import { boekbareWoning, boekPaginaUrl } from "@/lib/boeking";
import { BoekWidget } from "./BoekWidget";
import { MobielBoekBalk, NaarBoekenKnop } from "./MobielBoekBalk";
import { GalerijProvider, FotoKnop, AlleFotosKnop } from "./WoningGalerij";
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
      nl: 'Appartement van 110 m² in Heist-aan-Zee, op twee minuten van het strand. 2 slaapkamers, max 6. Gecertificeerd door moroww. Vanaf €370/nacht.',
      en: 'Apartment of 110 sqm in Heist-aan-Zee, two minutes from the beach. 2 bedrooms, up to 6 guests. Certified by moroww. From €370/night.',
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
  'lammersdamhoeve': {
    title: {
      nl: 'De Lammersdamhoeve — vakantiewoning Wingene, Brugse Ommeland',
      en: 'De Lammersdamhoeve — Wingene farmhouse, Bruges Ommeland',
    },
    description: {
      nl: 'Hoeve in Wingene aan De Gulke Putten. 220 m², 4 slaapkamers, max 8, omheinde tuin, huisdieren welkom. Gecertificeerd. Vanaf €330/nacht.',
      en: 'Farmhouse in Wingene by De Gulke Putten. 220 sqm, 4 bedrooms, up to 8 guests, fenced garden, pets welcome. Certified. From €330/night.',
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

// Sectiescheiding tussen inhoudsblokken. Bouwspec: hairlines in --moroww-rule,
// geen kaders.
function Hr() {
  return <hr className="mt-mw-8 mb-mw-6 border-0 border-t border-moroww-rule" aria-hidden />
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
// Bouwspec: wit vlak, 1px rand in --moroww-rule, radius 4px, padding space-5.
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
        className="bg-white border border-moroww-rule p-mw-5"
        style={{ borderRadius: 4 }}
      >
        <p className="text-audit uppercase text-moroww-label mb-mw-3">{t('coming_soon')}</p>
        <p className="text-body text-moroww-dark">{t('coming_soon_body')}</p>
      </div>
    )
  }

  const auditMaand = maandLang(woning.geauditeerdOp, locale)

  return (
    <div
      className="bg-white border border-moroww-rule p-mw-5"
      style={{ borderRadius: 4 }}
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
            <CalendarCheck className="h-4 w-4 shrink-0 mt-0.5 text-moroww-label" aria-hidden />
            {t('trust_cancel')}
          </li>
          <li className="flex gap-3">
            <Handshake className="h-4 w-4 shrink-0 mt-0.5 text-moroww-label" aria-hidden />
            {t('trust_direct')}
          </li>
          {auditMaand && (
            <li className="flex gap-3">
              <BadgeCheck className="h-4 w-4 shrink-0 mt-0.5 text-moroww-label" aria-hidden />
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

  // De rondleiding toont vijf foto's die nergens anders op de pagina staan.
  const heroIndex = Math.max(0, woning.fotos.indexOf(woning.heroFoto))
  const elders = new Set([woning.fotos[heroIndex], fotoNaBeschrijving, fotoNaBuurt])
  const rondleiding = woning.fotos
    .map((src, i) => ({ src, i }))
    .filter(({ src }) => !elders.has(src))
    .slice(0, 5)
    .map(({ i }) => i)

  const alineas = (tekst: string) => tekst.split('\n\n').filter((a) => a.trim() !== '')

  // waaromOpgenomen is opgebouwd als kop + alinea's die elk openen met een
  // korte reden ("Om het gebouw."). Die eerste zin wordt de tussenkop.
  const standaard = woning.waaromOpgenomen ? alineas(lw(woning.waaromOpgenomen, locale)) : []
  const standaardKop = standaard[0]
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
        {/* Hero — het huis eerst, volle breedte, tot onder de navbar. */}
        <section className="relative h-[78svh] min-h-[480px] md:h-[88vh] w-full bg-moroww-dark">
          <FotoKnop index={heroIndex} sizes="100vw" priority className="absolute inset-0 h-full w-full" />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/0 to-black/65"
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 md:px-12 pb-mw-6 md:pb-mw-8 flex flex-col gap-mw-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-audit uppercase text-white/80">
                {woning.nieuw ? t('new_in', { collection: woning.collectie }) : woning.collectie} · {woning.locatie}
              </p>
              <h1
                className="mt-mw-2 font-bold text-white leading-[1.02] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(2.75rem, 7vw, 6rem)' }}
              >
                {woning.naam}
              </h1>
              <p className="mt-mw-3 max-w-[46ch] text-body-lg text-white/90">{lw(woning.slogan, locale)}</p>
            </div>
            <AlleFotosKnop
              label={t('gallery_button', { count: woning.fotos.length })}
              className="pointer-events-auto self-start md:self-auto shrink-0 bg-white text-moroww-dark text-audit uppercase font-semibold px-4 py-2 rounded-[2px] hover:bg-moroww-blush transition-colors"
            />
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 md:px-12 pt-mw-6 lg:pt-mw-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-mw-6">

            {/* LINKS · content — kolom 1 tot 7 */}
            <div className="lg:col-span-7">
              <nav className="text-audit uppercase text-moroww-ink-2">
                <Link
                  href={isNl ? '/collectie' : '/en/collection'}
                  className="hover:text-moroww-dark transition-colors"
                >
                  {t('breadcrumb_collection')}
                </Link>
                <span className="mx-2">·</span>
                <span>{woning.naam}</span>
              </nav>

              {kerncijfers.length > 0 && (
                <ul className="mt-mw-5 flex flex-wrap gap-x-mw-5 gap-y-mw-2 border-y border-moroww-rule py-mw-3">
                  {kerncijfers.map(({ Icoon, tekst }) => (
                    <li key={tekst} className="flex items-center gap-2 text-body text-moroww-dark">
                      <Icoon className="h-[18px] w-[18px] text-moroww-label" strokeWidth={1.5} aria-hidden />
                      {tekst}
                    </li>
                  ))}
                </ul>
              )}

              <p className="mt-mw-5 max-w-[58ch] text-body-lg text-moroww-dark">
                {lw(woning.introductie, locale)}
              </p>

              {/* Eén gastenstem bovenaan, waar de beslissing valt. */}
              {reviews[0] && (
                <figure className="mt-mw-5 max-w-[58ch] border-l-2 border-moroww-label pl-mw-3">
                  <blockquote className="text-body italic text-moroww-dark line-clamp-3">
                    &ldquo;{lw(reviews[0].citaat, locale)}&rdquo;
                  </blockquote>
                  <figcaption className="mt-1 text-sm text-moroww-ink-2">
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

              {/* Waarom deze woning — hoogtepunten als scanbaar raster */}
              {woning.hoogtepunten.length > 0 && (
                <>
                  <Hr />
                  <div className="flex items-center gap-mw-4">
                    <Image
                      src="/images/Moroww_Certified_01_RGB.png"
                      alt="moroww certified"
                      width={64}
                      height={64}
                      className="w-14 h-14 shrink-0"
                    />
                    <div>
                      <h2 className="text-h2 text-moroww-dark">{t('highlights_title')}</h2>
                      {auditMaand && (
                        <p className="mt-1 text-audit uppercase text-moroww-ink-2">
                          {t('audited_prefix')} {auditMaand}
                        </p>
                      )}
                    </div>
                  </div>
                  <ul className="mt-mw-5 grid grid-cols-1 sm:grid-cols-2 gap-x-mw-5">
                    {lwArr(woning.hoogtepunten, locale).map((h) => (
                      <li key={h} className="border-t border-moroww-rule py-mw-3 text-body-lg text-moroww-dark">
                        {h}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-mw-3">
                    <Link
                      href={isNl ? '/de-standaard' : '/en/the-standard'}
                      className="text-audit uppercase text-moroww-dark underline underline-offset-4 decoration-moroww-label hover:decoration-moroww-dark transition-colors"
                    >
                      {t('label_link_short')}
                    </Link>
                  </p>
                </>
              )}

              {/* Waarom moroww deze woning opnam */}
              {standaardKop && (
                <>
                  <Hr />
                  <h2 className="text-h2 text-moroww-dark">{standaardKop}</h2>
                  <div className="mt-mw-5 space-y-mw-5 max-w-[58ch]">
                    {standaardRedenen.map(({ kop, rest }) => (
                      <div key={kop}>
                        <h3 className="text-h3 text-moroww-dark">{kop}</h3>
                        {rest && <p className="mt-mw-2 text-body text-moroww-ink-2">{rest}</p>}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Over deze woning */}
              <Hr />
              <h2 className="text-h2 text-moroww-dark">{t('about_title')}</h2>
              <div className="max-w-[58ch]">
                {alineas(lw(woning.volledigeBeschrijving, locale)).map((a) => (
                  <p key={a} className="mt-mw-3 text-body text-moroww-dark">{a}</p>
                ))}
              </div>

              {/* Praktisch */}
              <Hr />
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
                <p className="mt-mw-4 text-audit uppercase text-moroww-ink-2 max-w-[58ch]">
                  {lwArr(woning.tags, locale).join(' · ')}
                </p>
              )}
            </div>

            {/* RECHTS · boekingspaneel — kolom 9 tot 12, sticky vanaf lg */}
            <aside id="boeken" className="hidden lg:block lg:col-span-4 lg:col-start-9 scroll-mt-24">
              <div className="sticky top-24">{paneel}</div>
            </aside>
          </div>
        </div>

        {/* Rondleiding — vijf beelden in één blik, de rest in de galerij */}
        {rondleiding.length === 5 && (
          <section className="mx-auto max-w-7xl px-6 md:px-12 mt-mw-10">
            <div className="flex items-end justify-between gap-mw-4">
              <h2 className="text-h2 text-moroww-dark">{t('tour_title', { name: woning.naam })}</h2>
              <AlleFotosKnop
                label={t('gallery_button', { count: woning.fotos.length })}
                className="shrink-0 text-audit uppercase text-moroww-dark underline underline-offset-4 decoration-moroww-label hover:decoration-moroww-dark transition-colors"
              />
            </div>
            <div className="mt-mw-5 grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-2 md:h-[72vh]">
              {rondleiding.map((i, n) => (
                <FotoKnop
                  key={i}
                  index={i}
                  sizes={n === 0 ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
                  className={
                    n === 0
                      ? 'col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto'
                      : 'aspect-square md:aspect-auto'
                  }
                />
              ))}
            </div>
          </section>
        )}

        {/* Beeldband — één sfeerbeeld over de volle breedte */}
        {fotoNaBeschrijving && (
          <section className="relative mt-mw-10 h-[60vh] md:h-[80vh] w-full">
            {woning.fotos.includes(fotoNaBeschrijving) ? (
              <FotoKnop
                index={woning.fotos.indexOf(fotoNaBeschrijving)}
                sizes="100vw"
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <Image
                src={fotoNaBeschrijving}
                alt={`${woning.naam} — ${t('atmosphere_alt_suffix')}`}
                fill
                sizes="100vw"
                className="object-cover"
              />
            )}
          </section>
        )}

        {/* De buurt */}
        {woning.buurt && (
          <section className="mx-auto max-w-7xl px-6 md:px-12 mt-mw-10 lg:grid lg:grid-cols-12 lg:gap-x-mw-6 lg:items-center">
            <div className="lg:col-span-6">
              <h2 className="text-h2 text-moroww-dark">{t('neighbourhood_title')}</h2>
              <p className="mt-mw-4 text-body text-moroww-dark max-w-[58ch]">{lw(woning.buurt, locale)}</p>
            </div>
            {fotoNaBuurt && (
              <div className="relative mt-mw-6 lg:mt-0 lg:col-span-5 lg:col-start-8 aspect-[4/5]">
                {woning.fotos.includes(fotoNaBuurt) ? (
                  <FotoKnop
                    index={woning.fotos.indexOf(fotoNaBuurt)}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="absolute inset-0 h-full w-full"
                  />
                ) : (
                  <Image
                    src={fotoNaBuurt}
                    alt={`${woning.naam} — ${t('surroundings_alt_suffix')}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                )}
              </div>
            )}
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
                <blockquote className="text-h3 font-normal text-moroww-dark">
                  &ldquo;{lw(citaat, locale)}&rdquo;
                </blockquote>
                <figcaption className="mt-mw-3 text-audit uppercase text-moroww-ink-2">
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
          <div className="bg-moroww-dark px-mw-5 py-mw-8 md:px-mw-8 md:flex md:items-end md:justify-between md:gap-mw-6">
            <div>
              <h2 className="text-h2 text-white">{t('closing_title', { name: woning.naam })}</h2>
              <p className="mt-mw-3 text-body text-white/75 max-w-[48ch]">
                {[prijsLabel, t('trust_cancel')].filter(Boolean).join(' · ')}
              </p>
            </div>
            <NaarBoekenKnop
              doelIds={['boeken', 'boeken-mobiel']}
              label={t('mobile_cta')}
              className="mt-mw-5 md:mt-0 shrink-0 rounded-full px-mw-5 py-3 font-semibold bg-moroww-orange text-moroww-dark hover:bg-moroww-orange/85 transition-colors"
            />
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
      <dt className="text-audit uppercase text-moroww-ink-2">{label}</dt>
      <dd className="text-body text-moroww-dark">{value}</dd>
    </div>
  )
}
