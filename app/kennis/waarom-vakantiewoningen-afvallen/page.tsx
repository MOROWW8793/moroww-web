import { kennisMetadata, KENNIS_GEPUBLICEERD } from '@/lib/kennis/meta'
import { ArticleLayout } from '@/components/kennis/ArticleLayout'
import { Cta, VerderLezen } from '@/components/kennis/Cta'
import { Faq } from '@/components/kennis/Faq'
import { Actualiteitsblok } from '@/components/kennis/Actualiteitsblok'
import { ArticleJsonLd, DatasetJsonLd } from '@/components/kennis/JsonLd'
import { SCREENINGS_TOTAL, SCREENINGS_ACCEPTED } from '@/lib/screenings'

const URL = 'https://www.moroww.com/kennis/waarom-vakantiewoningen-afvallen'

const percentageAccepted = ((SCREENINGS_ACCEPTED / SCREENINGS_TOTAL) * 100).toFixed(1)

// Nog niet publiek: de redenen-per-categorie ontbreken. Zodra de screeningstabel
// per reden gepubliceerd wordt (op moroww-os) hoort deze pagina met echte data
// terug te komen. Tot dan geen indexering en niet in de sitemap of op de hub.
export const metadata = {
  ...kennisMetadata({
    titel: `${SCREENINGS_TOTAL} vakantiewoningen bekeken, ${SCREENINGS_ACCEPTED} opgenomen · moroww`,
    beschrijving:
      'moroww bezoekt elke woning fysiek. De meeste halen de standaard niet. Dit zijn de aantallen; de gerangschikte redenen volgen zodra de screeningstabel per reden gepubliceerd wordt.',
    pad: '/kennis/waarom-vakantiewoningen-afvallen',
  }),
  robots: { index: false, follow: false },
}

export default function AfvalRedenenPage() {
  return (
    <>
      <ArticleJsonLd
        titel={`${SCREENINGS_TOTAL} vakantiewoningen bekeken, ${SCREENINGS_ACCEPTED} opgenomen`}
        beschrijving="Cijfers over de fysieke selectie van vakantiewoningen door moroww: aantal bekeken woningen, aantal opgenomen en de redenen waarop de rest afviel."
        url={URL}
        datumGepubliceerd={KENNIS_GEPUBLICEERD}
        datumGewijzigd="2026-08-19"
      />
      <DatasetJsonLd
        naam="moroww · screenings van vakantiewoningen"
        beschrijving={`Aantallen uit het moroww-auditsysteem: ${SCREENINGS_TOTAL} bekeken woningen, ${SCREENINGS_ACCEPTED} opgenomen.`}
        url={URL}
        datumGewijzigd="2026-08-19"
      />

      <ArticleLayout
        eyebrow="wat het label anders doet"
        terug={{ href: '/kennis', label: 'kennisbank' }}
        titel="Waarom vakantiewoningen afvallen"
        korteAntwoord={`moroww, een Belgisch kwaliteitslabel voor vakantiewoningen, bekeek ${SCREENINGS_TOTAL} woningen. ${SCREENINGS_ACCEPTED} kwamen in de collectie. Dat is een aanvaardingspercentage van ${percentageAccepted} procent. Elke woning wordt fysiek bezocht voor er een oordeel valt, en woningen die niet meer voldoen verlaten de collectie.`}
      >
        <h2>De cijfers</h2>
        <table>
          <tbody>
            <tr><th>Woningen bekeken</th><td>{SCREENINGS_TOTAL}</td></tr>
            <tr><th>Opgenomen in de collectie</th><td>{SCREENINGS_ACCEPTED}</td></tr>
            <tr><th>Aanvaardingspercentage</th><td>{percentageAccepted} %</td></tr>
          </tbody>
        </table>
        <p>
          <em>Uit het moroww-auditsysteem. Bijgewerkt op 19 augustus 2026.</em>
        </p>

        <h2>De redenen</h2>
        <p>
          De uitgeschreven redenen — waarom een woning strandt op ligging, op oppervlakte,
          op de staat van de badkamers, op het karakter — worden hier live gepubliceerd
          zodra de screeningstabel per reden gecategoriseerd is. Dat is werk aan de andere
          kant, op het interne platform, en het gebeurt zonder een adres of eigenaar aan
          een cijfer te koppelen. Alleen aantallen per reden.
        </p>
        <p>
          Tot dan houden we ons hier aan wat we wél kunnen zeggen: de vier poorten waarop
          een woning wordt beoordeeld staan al publiek op{' '}
          <a href="/de-standaard">de standaard</a>, en de meest voorkomende reden waarom
          een woning afvalt is een combinatie van oppervlakte en karakter — te klein voor
          het segment, of gerenoveerd tot een showroom.
        </p>

        <h2>Waarom we dit publiceren</h2>
        <p>
          Een label dat enkel toont wat het aanvaardt, is een catalogus. Wat een label
          waard is, blijkt uit wat het weigert.
        </p>
        <p>
          In vakantieverhuur bestaat die weigering vandaag niet. Iedereen mag erin,
          niemand komt kijken. Dat is geen kwestie van slecht beheer; het is de
          afwezigheid van een filter. In elke sector waar kwaliteit telt bestaat een
          keurmerk. Voor restaurants, voor hotels, zelfs voor eieren. Voor
          vakantiewoningen niet.
        </p>
        <p>Daarom staan deze cijfers hier, en daarom bouwen we ze uit tot een levend overzicht.</p>

        <h2>Als jouw woning zou afvallen</h2>
        <p>
          Van de woningen die we bekijken, valt de overgrote meerderheid af. Dat betekent
          statistisch dat de kans groot is dat de jouwe er ook bij zit, en het is
          eerlijker dat je dat weet voor je tijd investeert.
        </p>
        <p>
          Het onderscheid dat telt: strandt je woning op iets wat op te lossen is, of op
          iets wat vastligt. Oppervlakte en ligging liggen vast. Inrichting, staat en
          uitrusting niet.
        </p>

        <Cta
          kind="poortentoets"
          intro="De toets stelt dezelfde vragen die wij ter plaatse stellen, op de punten die je zelf kan nagaan."
        />
        <Cta
          kind="vraag"
          intro="Twijfel je of jouw woning op een oplosbaar of een vast punt strandt? Stuur foto's en het adres."
        />

        <Faq
          items={[
            {
              vraag: 'Wordt elke woning echt fysiek bezocht?',
              antwoord:
                'Ja. Er komt geen woning in de collectie op basis van foto\'s alleen. De audit gebeurt ter plaatse, met een vaste checklist.',
            },
            {
              vraag: 'Kan een woning er weer uit?',
              antwoord:
                'Ja. We voeren heraudits uit en een woning die niet meer voldoet, verlaat de collectie. Het label weegt zwaarder dan eender welk contract.',
            },
            {
              vraag: 'Publiceren jullie welke woningen afvielen?',
              antwoord:
                'Nooit. We publiceren de redenen en de aantallen, nooit adressen of eigenaars.',
            },
          ]}
        />

        <Cta kind="gesprek" />

        <VerderLezen
          items={[
            {
              href: '/de-standaard',
              title: 'De vier poorten',
              eyebrow: 'over moroww',
            },
            {
              href: '/kennis/vakantiewoning-verhuren-zelf-platform-beheerder-label',
              title: 'Zelf, platform, beheerder of label?',
              eyebrow: 'kiezen hoe je verhuurt',
            },
            {
              href: '/kennis/rendement-vakantiewoning-berekenen',
              title: 'Rendement berekenen',
              eyebrow: 'opbrengst en rendement',
            },
          ]}
        />

        <Actualiteitsblok
          nagekekenOp="19 augustus 2026"
          bron="moroww auditsysteem — aantallen uit lib/screenings.ts, live-integratie met de screeningstabel volgt"
        />
      </ArticleLayout>
    </>
  )
}
