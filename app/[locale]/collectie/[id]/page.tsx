import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { woningen, liveWoningen, lw, lwArr, type Locale } from "@/lib/woningen";
import { WoningGalerij } from "./WoningGalerij";
import { InlineFoto } from "@/components/InlineFoto";
import { VacationRentalJsonLd, BreadcrumbListJsonLd } from "@/components/JsonLd";
import { Register } from "@/components/Register";
import { AuditLijn } from "@/components/AuditLijn";
import { formatAuditMaand } from "@/components/PandKaart";

interface Props { params: { locale: string; id: string } }

export function generateStaticParams() {
  // Panden met status 'wacht_op_beeld' krijgen geen eigen pagina — er is
  // niets te tonen tot de fotoshoot klaar is. liveWoningen filtert ze uit.
  return liveWoningen().flatMap((w) => [
    { locale: 'nl', id: w.id },
    { locale: 'en', id: w.id },
  ]);
}

const woningMeta: Record<string, { title: string; description: string; keywords: string[] }> = {
  'nosso-knokke': {
    title: 'Nosso Logies — vakantiewoning Knokke-Heist',
    description: 'Luxe vakantiewoning in Heist-aan-Zee, Knokke. 110m², 2 slaapkamers, max 6 personen. Strand op 2 minuten. Fysiek gecertificeerd door moroww. Vanaf €370/nacht.',
    keywords: ['vakantiewoning Knokke', 'vakantiewoning Heist-aan-Zee', 'vakantiewoning kust België', 'luxe vakantiewoning Knokke-Heist', 'privé vakantiewoning Knokke', 'Nosso Logies Knokke', 'moroww kust'],
  },
  'moroww-oostende': {
    title: 'The Sixteenth — vakantiewoning Oostende met zeezicht',
    description: 'The Sixteenth — vakantiewoning op de 16e verdieping in Oostende. Panoramisch zeezicht, privé parking, 2 slaapkamers, max 4 personen. Gecertificeerd door moroww. Vanaf €210/nacht.',
    keywords: ['vakantiewoning Oostende', 'vakantiewoning zeezicht Oostende', 'appartement Oostende huren', 'luxe vakantiewoning Oostende', 'moroww Oostende'],
  },
  'anna-helena-ursel': {
    title: 'Chalet Anna-Helena — vakantiewoning Ursel Meetjesland',
    description: 'Chalet met privétuin en vijver in Ursel, Meetjesland. 2 slaapkamers, max 5 personen. Bosrand, gezinsvriendelijk. Gecertificeerd door moroww. Vanaf €220/nacht.',
    keywords: ['vakantiewoning Meetjesland', 'chalet Ursel', 'vakantiewoning Ursel', 'chalet huren Meetjesland', 'gezinsvakantie Meetjesland', 'moroww Meetjesland'],
  },
  'cozy-relax-beernem': {
    title: 'The Cozy Relax Home — vakantiewoning Beernem met zwembad',
    description: 'Ruime vakantiewoning in Beernem met zwembad, hottub en tuin met BBQ. 4 slaapkamers, max 10 personen. Ideaal voor groepen. Gecertificeerd door moroww. Vanaf €600/nacht.',
    keywords: ['vakantiewoning Beernem', 'vakantiewoning met zwembad België', 'vakantiewoning groep België', 'vakantiewoning hottub België', 'groepsaccommodatie Meetjesland', 'moroww Beernem'],
  },
  'sophora': {
    title: 'Sophora — vakantiewoning Elst, Vlaamse Ardennen',
    description: 'Een familiehuis in het hart van Elst, gedragen door drie zussen. 9 slaapkamers elk met eigen badkamer, zwembad, sauna en tuin. Max 18 personen. Gecertificeerd door moroww. Vanaf €800/nacht.',
    keywords: ['vakantiewoning Vlaamse Ardennen', 'vakantiewoning Elst', 'groepsaccommodatie Vlaamse Ardennen', 'vakantiewoning 18 personen België', 'moroww the fields', 'Sophora Elst'],
  },
  'lammersdamhoeve': {
    title: 'De Lammersdamhoeve — vakantiewoning Wingene, Brugse Ommeland',
    description: 'Hoeve in Wingene, aan de rand van natuurgebied De Gulke Putten. 220m², 4 slaapkamers, 2 badkamers, max 8 personen. Volledig omheinde tuin, huisdieren welkom zonder toeslag. Gecertificeerd door moroww. Vanaf €330/nacht.',
    keywords: ['vakantiewoning Wingene', 'vakantiewoning Brugse Ommeland', 'hoeve huren West-Vlaanderen', 'vakantiewoning De Gulke Putten', 'vakantiewoning met omheinde tuin', 'vakantiewoning honden welkom België', 'vakantiewoning Bulskampveld', 'moroww the fields', 'De Lammersdamhoeve'],
  },
};

export async function generateMetadata({ params }: Props) {
  const locale = params.locale as Locale
  const woning = woningen.find((w) => w.id === params.id);
  if (!woning) return { title: "Woning" };
  const meta = woningMeta[woning.id];
  const desc = meta?.description ?? lw(woning.beschrijving, locale)
  const pageTitle = meta?.title ?? `${woning.naam} — vakantiewoning in ${woning.locatie}`
  return {
    title: pageTitle,
    description: desc,
    keywords: meta?.keywords,
    alternates: { canonical: `https://www.moroww.com/collectie/${woning.id}` },
    openGraph: {
      title: `${pageTitle} | moroww`,
      description: desc,
      images: [{ url: woning.heroFoto, width: 1200, height: 800, alt: woning.naam }],
    },
  };
}

// Sectiescheiding tussen inhoudsblokken. Bouwspec: hairlines in --moroww-rule,
// geen kaders. Blijft zoals in 3c.
function Hr() {
  return <hr className="mt-mw-8 mb-mw-6 border-0 border-t border-moroww-rule" aria-hidden />
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
      <a
        href={woning.boekUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-mw-4 inline-flex items-center rounded-full px-mw-4 py-3 font-semibold bg-moroww-orange text-moroww-dark hover:bg-moroww-orange/85 transition-colors"
      >
        {t('book_direct')}
      </a>
      <p className="mt-mw-3 text-audit uppercase text-moroww-ink-2 text-center">
        {t('redirect_note')}
      </p>
    </div>
  )
}

export default async function WoningDetailPage({ params }: Props) {
  const t = await getTranslations('property')
  const locale = params.locale as Locale
  const woning = woningen.find((w) => w.id === params.id);
  if (!woning) notFound();
  // Wachtende panden hebben geen inhoud om te tonen — 404 tot ze live gaan.
  if (woning.status === 'wacht_op_beeld') notFound();

  const isNl = locale === 'nl'
  const baseUrl = 'https://www.moroww.com'
  const collectieUrl = isNl ? `${baseUrl}/collectie` : `${baseUrl}/en/collection`
  const pandUrl = isNl ? `${baseUrl}/collectie/${woning.id}` : `${baseUrl}/en/collection/${woning.id}`
  const breadcrumbs = [
    { name: 'Home', url: isNl ? baseUrl : `${baseUrl}/en` },
    { name: isNl ? 'De Collectie' : 'The Collection', url: collectieUrl },
    { name: woning.naam, url: pandUrl },
  ]

  const auditMaand = formatAuditMaand(woning.geauditeerdOp)
  const auditItems = [
    woning.collectie,
    woning.oppervlakte ?? '',
    woning.slaapkamers ? `${woning.slaapkamers} ${t('bedrooms')}` : '',
    auditMaand ? `geauditeerd ${auditMaand}` : '',
  ].filter((s) => s.trim() !== '')

  // Foto's die tussen de secties komen. Fotos[0,1] zitten in de hero-galerij.
  // Rest zit in de lightbox; wij hangen er twee expliciet op tussen de tekst.
  //
  // Per-pand override via `fotoNaBeschrijving` / `fotoNaBuurt`:
  //   undefined → default (fotos[2] resp. fotos[3])
  //   null      → expliciet geen foto onder die sectie
  //   string    → dat specifieke pad gebruiken
  const fotoNaBeschrijving =
    woning.fotoNaBeschrijving === undefined ? woning.fotos[2] : woning.fotoNaBeschrijving
  const fotoNaBuurt =
    woning.fotoNaBuurt === undefined ? woning.fotos[3] : woning.fotoNaBuurt

  const paneel = await BoekingsPaneel({ woning, locale })

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
        url={`https://www.moroww.com/collectie/${woning.id}`}
        amenities={woning.amenities}
      />

      {/* Container voor beeld én grid — één set marges, zodat het beeld
          exact even breed is als de inhoudskolom eronder. */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 pt-24 pb-mw-10">

        {/* Hero-galerij */}
        <div className="mb-mw-6">
          <WoningGalerij fotos={woning.fotos} naam={woning.naam} />
        </div>

        {/* Twee kolommen vanaf lg. Onder lg: stacken (breadcrumb → kop → tagline
            → boeking → auditlijn → inhoud). */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-mw-6">

          {/* LINKS · content — kolom 1 tot 7 */}
          <div className="lg:col-span-7">
            {/* Breadcrumb */}
            <nav className="text-audit uppercase text-moroww-ink-2">
              <Link href="/collectie" className="hover:text-moroww-dark transition-colors">
                {t('breadcrumb_collection')}
              </Link>
              <span className="mx-2">·</span>
              <span>{woning.naam}</span>
            </nav>

            {/* Titel */}
            <h1
              className="mt-mw-4 font-bold text-moroww-dark leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              {woning.naam}
            </h1>

            {/* Tagline */}
            <p className="mt-mw-3 text-body-lg italic text-moroww-ink-2 max-w-[62ch]">
              {lw(woning.slogan, locale)}
            </p>
            <p className="mt-mw-2 text-body text-moroww-dark">{woning.locatie}</p>

            {/* Boekingspaneel op mobiel — inline na de tagline, geen sticky */}
            <div className="lg:hidden mt-mw-5">{paneel}</div>

            {auditItems.length > 0 && (
              <div className="mt-mw-5 max-w-[62ch]">
                <AuditLijn density="quiet" items={auditItems} />
              </div>
            )}

            {/* Waarom deze woning — hoogtepunten, met certified-embleem naast de kop */}
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
                  <h2 className="text-h2 text-moroww-dark">{t('highlights_title')}</h2>
                </div>
                <div className="mt-mw-4 grid grid-cols-1 sm:grid-cols-2 gap-x-mw-4 gap-y-mw-3 max-w-[62ch]">
                  {lwArr(woning.hoogtepunten, locale).map((h) => (
                    <p key={h} className="text-body text-moroww-dark">{h}</p>
                  ))}
                </div>
              </>
            )}

            {/* Waarom moroww deze woning opnam */}
            {woning.waaromOpgenomen && (() => {
              const raw = lw(woning.waaromOpgenomen, locale)
              const alineas = raw.split('\n\n')
              return (
                <>
                  <Hr />
                  <h2 className="text-h2 text-moroww-dark">{t('waarom_label')}</h2>
                  <div className="max-w-[62ch]">
                    {alineas.map((p, i) => (
                      <p key={i} className="mt-mw-3 text-body text-moroww-dark">{p}</p>
                    ))}
                  </div>
                </>
              )
            })()}

            {/* Over deze woning */}
            <Hr />
            <h2 className="text-h2 text-moroww-dark">{t('about_title')}</h2>
            <div className="max-w-[62ch]">
              <p className="mt-mw-4 text-body text-moroww-dark">
                {lw(woning.introductie, locale)}
              </p>
              <p className="mt-mw-3 text-body text-moroww-dark">
                {lw(woning.volledigeBeschrijving, locale)}
              </p>
            </div>
            {fotoNaBeschrijving && (
              <InlineFoto src={fotoNaBeschrijving} alt={`${woning.naam} — sfeerbeeld`} />
            )}

            {/* Buurt */}
            {woning.buurt && (
              <>
                <Hr />
                <h2 className="text-h2 text-moroww-dark">{t('neighbourhood_title')}</h2>
                <p className="mt-mw-4 text-body text-moroww-dark max-w-[62ch]">
                  {lw(woning.buurt, locale)}
                </p>
                {fotoNaBuurt && (
                  <InlineFoto src={fotoNaBuurt} alt={`${woning.naam} — omgeving`} />
                )}
              </>
            )}

            {/* Praktisch */}
            <Hr />
            <h2 className="text-h2 text-moroww-dark">{t('practical_title')}</h2>
            <dl className="mt-mw-4 divide-y divide-moroww-rule border-t border-b border-moroww-rule max-w-[62ch]">
              <PraktischRij label={t('checkin_label')} value={`${t('from_label')} ${woning.inCheckin}`} />
              <PraktischRij label={t('checkout_label')} value={`${t('before_label')} ${woning.uitCheckin}`} />
              {woning.maxGasten ? (
                <PraktischRij label={t('max_guests_label')} value={`${woning.maxGasten} ${t('persons')}`} />
              ) : null}
              {woning.oppervlakte ? (
                <PraktischRij label="oppervlakte" value={woning.oppervlakte} />
              ) : null}
              {woning.vergunningsnummer && (
                <PraktischRij label={t('vergunning_label')} value={woning.vergunningsnummer} />
              )}
            </dl>

            {/* Kenmerken — geen labelparen. Gescheiden door " · ". */}
            {woning.tags.length > 0 && (
              <>
                <hr className="mt-mw-6 mb-mw-4 border-0 border-t border-moroww-rule max-w-[62ch]" aria-hidden />
                <p className="text-audit uppercase text-moroww-ink-2 max-w-[62ch]">
                  {lwArr(woning.tags, locale).join(' · ')}
                </p>
              </>
            )}

            {/* Reviews */}
            {(woning.reviews?.length ?? 0) > 0 && (
              <>
                <Hr />
                <h2 className="text-h2 text-moroww-dark">{t('reviews_label')}</h2>
                <div className="mt-mw-4 space-y-mw-5 max-w-[62ch]">
                  {woning.reviews!.map(({ citaat, naam }) => (
                    <blockquote key={naam}>
                      <p className="text-body italic text-moroww-dark">
                        &ldquo;{lw(citaat, locale)}&rdquo;
                      </p>
                      <footer className="mt-mw-2 text-audit uppercase text-moroww-ink-2">
                        {naam}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* RECHTS · boekingspaneel — kolom 9 tot 12, sticky vanaf lg */}
          <aside className="hidden lg:block lg:col-span-4 lg:col-start-9">
            <div className="sticky top-24">{paneel}</div>
          </aside>
        </div>
      </div>
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
