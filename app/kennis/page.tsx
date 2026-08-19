// Hub van de kennisbank. Geen scroll-fest — één kaart per pagina, twee zinnen
// die duidelijk maken waarom je die pagina zou openen.

import Link from 'next/link'
import { kennisMetadata } from '@/lib/kennis/meta'
import { Actualiteitsblok } from '@/components/kennis/Actualiteitsblok'

export const metadata = kennisMetadata({
  titel: 'Kennisbank vakantieverhuur België · moroww',
  beschrijving:
    'Zes pagina\'s over rendement, btw, verblijfsbelasting per gemeente, brandveiligheidsattest en de vier manieren om een vakantiewoning te verhuren. Nagekeken tegen de bron.',
  pad: '/kennis',
})

interface Kaart {
  href: string
  eyebrow: string
  titel: string
  intro: string
}

const KAARTEN: Kaart[] = [
  {
    href: '/kennis/wat-kost-een-nacht-vakantiewoning',
    eyebrow: 'opbrengst en rendement',
    titel: 'Wat kost één nacht in je vakantiewoning je echt?',
    intro:
      'Van bruto naar netto, post per post. Btw ging op 1 maart 2026 van 6 naar 12 procent en er is geen drempel van € 25.000 meer. Wie het niet doorrekent, geeft de facto zes procent van zijn logiesomzet weg.',
  },
  {
    href: '/kennis/rendement-vakantiewoning-berekenen',
    eyebrow: 'opbrengst en rendement',
    titel: 'Rendement vakantiewoning berekenen (2026)',
    intro:
      'Een rekenmodule die alle kosten meerekent, ook de onze. Zeven velden, geen e-mailadres, geen belofte. Ze geeft een vork, geen getal.',
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
    href: '/kennis/vakantiewoning-verhuren-zelf-platform-beheerder-label',
    eyebrow: 'kiezen hoe je verhuurt',
    titel: 'Zelf verhuren, platform, beheerder of label?',
    intro:
      'Vier manieren, met hun echte kosten en tijdsbesteding. Inclusief de vier situaties waarin je beter iets anders kiest dan moroww.',
  },
  {
    href: '/kennis/waarom-vakantiewoningen-afvallen',
    eyebrow: 'wat het label anders doet',
    titel: 'Waarom vakantiewoningen afvallen',
    intro:
      'De cijfers achter het label. moroww bekijkt elke woning fysiek; de overgrote meerderheid haalt de standaard niet. Waarom dat zo is, welke redenen het vaakst terugkomen, en wat wel op te lossen valt.',
  },
]

export default function KennisHubPage() {
  return (
    <>
      <section className="w-full pt-32 pb-12 md:pt-40 md:pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-[#C08D6E] mb-6">kennisbank</p>
          <h1
            className="font-bold text-[#1A1A1A] leading-[1.05] tracking-[-0.02em] mb-8"
            style={{ fontSize: 'clamp(2.25rem, 6vw, 4.5rem)' }}
          >
            Alles wat we onderweg leerden over vakantieverhuur in België.
          </h1>
          <p className="text-[#1A1A1A]/70 leading-relaxed" style={{ fontSize: 20 }}>
            Zes onderwerpen die op geen andere plek helder naast elkaar staan. Voor eigenaars,
            geschreven met eigen data en met een bron per bewering. Elke pagina wordt elk
            kwartaal nagekeken; de datum van de laatste controle staat onderaan.
          </p>
        </div>
      </section>

      <section className="w-full pb-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {KAARTEN.map((k) => (
            <Link
              key={k.href}
              href={k.href}
              className="block bg-white rounded-2xl p-8 hover:shadow-md transition-shadow"
            >
              <p className="text-[11px] uppercase tracking-widest text-[#C08D6E] mb-3">{k.eyebrow}</p>
              <h2 className="font-bold text-[#1A1A1A] leading-tight mb-4" style={{ fontSize: 22 }}>
                {k.titel}
              </h2>
              <p className="text-[#1A1A1A]/75 leading-relaxed" style={{ fontSize: 16 }}>
                {k.intro}
              </p>
              <p className="mt-5 text-[#FEA05E] font-semibold">Lees verder →</p>
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
