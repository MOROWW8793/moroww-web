import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { woningen, lw, lwArr, type Locale } from "@/lib/woningen";
import { WoningGalerij } from "./WoningGalerij";
import { VacationRentalJsonLd, BreadcrumbListJsonLd } from "@/components/JsonLd";
import { Register } from "@/components/Register";
import { AuditLijn } from "@/components/AuditLijn";
import { formatAuditMaand } from "@/components/PandKaart";

interface Props { params: { locale: string; id: string } }

export function generateStaticParams() {
  return woningen.flatMap((w) => [
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

// Hairline in --moroww-rule tussen secties. Bouwspec sectie 4: structuur
// komt van hairlines en witruimte, niet van kaders.
function Hr() {
  return <hr className="mt-mw-8 mb-mw-6 border-0 border-t border-moroww-rule" aria-hidden />
}

export default async function WoningDetailPage({ params }: Props) {
  const t = await getTranslations('property')
  const locale = params.locale as Locale
  const woning = woningen.find((w) => w.id === params.id);
  if (!woning) notFound();

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

      <div className="mx-auto max-w-6xl px-6 md:px-12 pt-28">
        {/* Breadcrumb — geen kader, alleen tekst */}
        <nav className="mb-mw-6 text-audit uppercase text-moroww-ink-2">
          <Link href="/collectie" className="hover:text-moroww-dark transition-colors">
            {t('breadcrumb_collection')}
          </Link>
          <span className="mx-2">·</span>
          <span>{woning.naam}</span>
        </nav>

        {/* Galerij vult breed */}
        <div className="mb-mw-8">
          <WoningGalerij fotos={woning.fotos} naam={woning.naam} />
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 md:px-12 pb-mw-10">
        {/* Kop */}
        <h1
          className="font-bold text-moroww-dark leading-[1.05] tracking-[-0.02em]"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          {woning.naam}
        </h1>
        <p className="mt-mw-3 text-body italic text-moroww-ink-2">
          {lw(woning.slogan, locale)}
        </p>
        <p className="mt-mw-3 text-body text-moroww-dark">{woning.locatie}</p>

        {auditItems.length > 0 && (
          <div className="mt-mw-5">
            <AuditLijn density="quiet" items={auditItems} />
          </div>
        )}

        {/* Prijs + Boek direct — geen zwart vlak, hairline erboven */}
        {!woning.comingSoon && woning.prijs ? (
          <>
            <Hr />
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-mw-4">
              <p className="text-h3 text-moroww-dark">
                {t('from_label')} <span className="font-semibold">€{woning.prijs}</span>{' '}
                <span className="text-body text-moroww-ink-2">{t('per_night')}</span>
              </p>
              <a
                href={woning.boekUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-semibold bg-moroww-orange text-moroww-dark hover:bg-moroww-orange/85 transition-colors self-start"
              >
                <span>{t('book_direct')}</span>
                <span aria-hidden>→</span>
              </a>
            </div>
          </>
        ) : woning.comingSoon ? (
          <>
            <Hr />
            <p className="text-audit uppercase text-moroww-label">{t('coming_soon')}</p>
            <p className="mt-mw-3 text-body text-moroww-dark">{t('coming_soon_body')}</p>
          </>
        ) : null}

        {/* Waarom deze woning — hoogtepunten in twee kolommen, geen vinkjes */}
        {woning.hoogtepunten.length > 0 && (
          <>
            <Hr />
            <h2 className="text-h2 text-moroww-dark">{t('highlights_title')}</h2>
            <div className="mt-mw-4 grid grid-cols-1 sm:grid-cols-2 gap-x-mw-4 gap-y-mw-3">
              {lwArr(woning.hoogtepunten, locale).map((h) => (
                <p key={h} className="text-body text-moroww-dark">{h}</p>
              ))}
            </div>
          </>
        )}

        {/* Waarom moroww deze woning opnam — één gewicht, lopende tekst */}
        {woning.waaromOpgenomen && (() => {
          const raw = lw(woning.waaromOpgenomen, locale)
          const alineas = raw.split('\n\n')
          return (
            <>
              <Hr />
              <h2 className="text-h2 text-moroww-dark">{t('waarom_label')}</h2>
              {alineas.map((p, i) => (
                <p key={i} className="mt-mw-3 text-body text-moroww-dark">{p}</p>
              ))}
            </>
          )
        })()}

        {/* Over deze woning — lopende tekst, één gewicht */}
        <Hr />
        <h2 className="text-h2 text-moroww-dark">{t('about_title')}</h2>
        <p className="mt-mw-4 text-body text-moroww-dark">
          {lw(woning.introductie, locale)}
        </p>
        <p className="mt-mw-3 text-body text-moroww-dark">
          {lw(woning.volledigeBeschrijving, locale)}
        </p>

        {/* Buurt */}
        {woning.buurt && (
          <>
            <Hr />
            <h2 className="text-h2 text-moroww-dark">{t('neighbourhood_title')}</h2>
            <p className="mt-mw-4 text-body text-moroww-dark">
              {lw(woning.buurt, locale)}
            </p>
          </>
        )}

        {/* Praktisch — definitielijst met hairlines tussen rijen */}
        <Hr />
        <h2 className="text-h2 text-moroww-dark">{t('practical_title')}</h2>
        <dl className="mt-mw-4 divide-y divide-moroww-rule border-t border-b border-moroww-rule">
          <PraktischRij label={t('checkin_label')} value={`${t('from_label')} ${woning.inCheckin}`} />
          <PraktischRij label={t('checkout_label')} value={`${t('before_label')} ${woning.uitCheckin}`} />
          {woning.maxGasten ? (
            <PraktischRij label={t('max_guests_label')} value={`${woning.maxGasten} ${t('persons')}`} />
          ) : null}
          {woning.oppervlakte ? (
            <PraktischRij label="oppervlakte" value={woning.oppervlakte} />
          ) : null}
          {lwArr(woning.tags, locale).map((tag) => (
            <PraktischRij key={tag} label="" value={tag} />
          ))}
          {woning.vergunningsnummer && (
            <PraktischRij label={t('vergunning_label')} value={woning.vergunningsnummer} />
          )}
        </dl>

        {/* Reviews */}
        {(woning.reviews?.length ?? 0) > 0 && (
          <>
            <Hr />
            <h2 className="text-h2 text-moroww-dark">{t('reviews_label')}</h2>
            <div className="mt-mw-4 space-y-mw-5">
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

        {/* Boek onderaan — hairline + prijs + knop, geen kader */}
        {!woning.comingSoon && woning.prijs ? (
          <>
            <Hr />
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-mw-4">
              <p className="text-h3 text-moroww-dark">
                {t('from_label')} <span className="font-semibold">€{woning.prijs}</span>{' '}
                <span className="text-body text-moroww-ink-2">{t('per_night')}</span>
              </p>
              <a
                href={woning.boekUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-semibold bg-moroww-orange text-moroww-dark hover:bg-moroww-orange/85 transition-colors self-start"
              >
                <span>{t('book_direct')}</span>
                <span aria-hidden>→</span>
              </a>
            </div>
            <p className="mt-mw-3 text-audit uppercase text-moroww-ink-2">
              {t('cta_questions')}{' '}
              <a href="mailto:info@moroww.com" className="underline underline-offset-2 hover:text-moroww-dark">
                {t('cta_contact')}
              </a>
            </p>
          </>
        ) : null}
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
