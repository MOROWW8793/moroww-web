// Hub van de kennisbank. Geen scroll-fest — één kaart per pagina, twee zinnen
// die duidelijk maken waarom je die pagina zou openen.

import Link from 'next/link'
import { kennisMetadata } from '@/lib/kennis/meta'
import { Actualiteitsblok } from '@/components/kennis/Actualiteitsblok'
import { KennisHero } from '@/components/kennis/KennisHero'

export const metadata = kennisMetadata({
  titel: 'Kennisbank vakantieverhuur België · moroww',
  beschrijving:
    'Onderwerpen over rendement, btw, verblijfsbelasting per gemeente, brandveiligheid en de vier manieren om een vakantiewoning te verhuren.',
  pad: '/kennis',
})

interface Kaart {
  href: string
  eyebrow: string
  titel: string
  intro: string
}

// Getallen 1-20 in gewone hoofdletterstijl. Boven 20 valt de zin terug op
// het cijfer. Zo blijft de intro ook natuurlijk lezen als het cluster
// verder groeit.
const NL_WOORD: Record<number, string> = {
  1: 'Eén', 2: 'Twee', 3: 'Drie', 4: 'Vier', 5: 'Vijf',
  6: 'Zes', 7: 'Zeven', 8: 'Acht', 9: 'Negen', 10: 'Tien',
  11: 'Elf', 12: 'Twaalf', 13: 'Dertien', 14: 'Veertien', 15: 'Vijftien',
  16: 'Zestien', 17: 'Zeventien', 18: 'Achttien', 19: 'Negentien', 20: 'Twintig',
}

// Introzin op de hub. Als de telling faalt (count ≤ 0) toont de zin geen
// getal en start ze met "Onderwerpen …" — geen placeholder, geen "0
// onderwerpen".
function HubIntro({ count }: { count: number }) {
  if (count <= 0) {
    return (
      <>
        Onderwerpen die op geen andere plek helder naast elkaar staan. Voor
        eigenaars, geschreven met eigen data en met een bron per bewering. Elke
        pagina wordt elk kwartaal nagekeken. De datum van de laatste controle
        staat onderaan.
      </>
    )
  }
  const woord = NL_WOORD[count] ?? String(count)
  return (
    <>
      {woord} onderwerpen die op geen andere plek helder naast elkaar staan.
      Voor eigenaars, geschreven met eigen data en met een bron per bewering.
      Elke pagina wordt elk kwartaal nagekeken. De datum van de laatste
      controle staat onderaan.
    </>
  )
}

// /rendement-vakantiewoning-berekenen en /waarom-vakantiewoningen-afvallen
// staan bewust niet in de hub — hun content is nog niet klaar. Zie de
// robots-metadata op die pagina's zelf en de comment in app/sitemap.ts.
const KAARTEN: Kaart[] = [
  {
    href: '/kennis/logiesdecreet-vakantiewoning-vlaanderen',
    eyebrow: 'regels en vergunningen',
    titel: 'Het Vlaams Logiesdecreet in mensentaal',
    intro:
      'Aanmelden bij Toerisme Vlaanderen, brandveiligheidsattest, verzekering, strafregister, stedenbouw. Vijf voorwaarden voor wie in Vlaanderen tegen betaling laat overnachten.',
  },
  {
    href: '/kennis/omgevingsvergunning-functiewijziging-vakantiewoning',
    eyebrow: 'regels en vergunningen',
    titel: 'Omgevingsvergunning voor een vakantiewoning',
    intro:
      'De verplichting waar de meeste eigenaars over vallen. Je aanmelding bij Toerisme Vlaanderen is geen vergunning. Brugge en De Panne geven de vergunning niet meer af in de binnenstad.',
  },
  {
    href: '/kennis/wat-kost-een-nacht-vakantiewoning',
    eyebrow: 'opbrengst en rendement',
    titel: 'Wat kost één nacht in je vakantiewoning je echt?',
    intro:
      'Van bruto naar netto, post per post. Btw ging op 1 maart 2026 van 6 naar 12 procent en er is geen drempel van € 25.000 meer. Wie het niet doorrekent, geeft de facto zes procent van zijn logiesomzet weg.',
  },
  {
    href: '/kennis/belasting-huurinkomsten-vakantiewoning',
    eyebrow: 'opbrengst en rendement',
    titel: 'Belasting op je huurinkomsten',
    intro:
      'De 60/40-opsplitsing tussen onroerend en roerend inkomen, het kadastraal inkomen, en wanneer de fiscus alles herkwalificeert als beroepsinkomen.',
  },
  {
    href: '/kennis/verblijfsbelasting-vakantiewoning',
    eyebrow: 'regels en vergunningen',
    titel: 'Verblijfsbelasting vakantiewoning per gemeente',
    intro:
      'Gemeentelijke tarieven, bron per rij, datum van laatste controle. Vandaag staat die informatie enkel versnipperd op pdf\'s die niemand vindt.',
  },
  {
    href: '/kennis/tweedeverblijfsbelasting-of-logiesbelasting',
    eyebrow: 'regels en vergunningen',
    titel: 'Tweedeverblijfsbelasting of logiesbelasting?',
    intro:
      'Twee aparte gemeentelijke belastingen die eigenaars structureel verwarren. In Knokke sluiten ze elkaar uit. In De Panne zijn ze allebei verschuldigd. Het verschil is honderden euro\'s per jaar.',
  },
  {
    href: '/kennis/brandveiligheidsattest-vakantiewoning-vlaanderen',
    eyebrow: 'regels en vergunningen',
    titel: 'Brandveiligheidsattest vakantiewoning Vlaanderen',
    intro:
      'A, Abis, B of C — welk type, welke bijlage, waar aanvragen en hoe lang het geldig is. Sinds 28 september 2025 loopt de keuring voor kleinere logies via ACEG vzw, niet meer via Vinçotte.',
  },
  {
    href: '/kennis/verzekering-vakantiewoning',
    eyebrow: 'regels en vergunningen',
    titel: 'Verzekering voor een vakantiewoning',
    intro:
      'Een gewone brandpolis dekt toeristische verhuur niet automatisch. Wat je nodig hebt, wat er misgaat, en welke vraag je aan je makelaar moet stellen.',
  },
  {
    href: '/kennis/vakantiewoning-verhuren-zelf-platform-beheerder-label',
    eyebrow: 'kiezen hoe je verhuurt',
    titel: 'Zelf verhuren, platform, beheerder of label?',
    intro:
      'Vier manieren, met hun echte kosten en tijdsbesteding. Inclusief de vier situaties waarin je beter iets anders kiest dan moroww.',
  },
  {
    href: '/kennis/is-je-woning-klaar-voor-premium-verhuur',
    eyebrow: 'wat het label anders doet',
    titel: 'Is je woning klaar voor het hogere segment?',
    intro:
      'De meeste woningen die we bekijken halen de standaard niet. Wat vast is en wat op te lossen is. De enige bottom-of-funnel-pagina die eerlijk durft nee te zeggen.',
  },
]

export default function KennisHubPage() {
  return (
    <>
      <KennisHero
        beelden={[
          { src: '/images/standaard/V2-56.jpg', alt: 'Een interieurboek op een stenen tafel in een moroww-huis' },
          { src: '/images/over-hero.jpg', alt: 'Leefruimte van een moroww-huis' },
          { src: '/images/standaard/V2-210.jpg', alt: 'Een glas met citrus op een stenen blad' },
        ]}
      >
        <p className="text-audit text-white/80">kennisbank</p>
        <h1
          className="mt-4 max-w-[20ch] font-semibold text-white leading-[1.02] tracking-[-0.025em] drop-shadow-md"
          style={{ fontSize: 'clamp(2.25rem, 6vw, 4.5rem)' }}
        >
          Alles wat we onderweg leerden over vakantieverhuur in België.
        </h1>
        <p className="mt-6 max-w-[58ch] text-body-lg text-white/90">
          <HubIntro count={KAARTEN.length} />
        </p>
      </KennisHero>

      <section className="w-full pt-mw-8 pb-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {KAARTEN.map((k) => (
            <Link
              key={k.href}
              href={k.href}
              className="group flex flex-col bg-white border border-moroww-rule rounded-3xl p-8 no-underline [&_*]:no-underline shadow-[0_30px_60px_-40px_rgba(26,26,26,0.35)] hover:-translate-y-1 hover:shadow-[0_40px_80px_-40px_rgba(26,26,26,0.5)] transition-[transform,box-shadow] duration-300 motion-reduce:transition-none"
            >
              <span className="self-start rounded-full bg-moroww-blush px-3 py-1 text-audit text-moroww-label-tekst">{k.eyebrow}</span>
              <h2 className="mt-5 font-semibold text-moroww-dark leading-tight tracking-[-0.01em]" style={{ fontSize: 24 }}>
                {k.titel}
              </h2>
              <p className="mt-3 text-moroww-dark/75 leading-relaxed" style={{ fontSize: 16 }}>
                {k.intro}
              </p>
              <span className="mt-auto pt-6 flex items-center justify-between font-semibold text-moroww-dark">
                Lees verder
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-moroww-blush group-hover:bg-moroww-orange transition-colors" aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-16">
          <Actualiteitsblok nagekekenOp="19 augustus 2026" />
        </div>
      </section>
    </>
  )
}
