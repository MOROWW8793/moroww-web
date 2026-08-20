import { kennisMetadata, KENNIS_GEPUBLICEERD } from '@/lib/kennis/meta'
import { ArticleLayout } from '@/components/kennis/ArticleLayout'
import { Cta, VerderLezen } from '@/components/kennis/Cta'
import { Faq } from '@/components/kennis/Faq'
import { Actualiteitsblok } from '@/components/kennis/Actualiteitsblok'
import { ArticleJsonLd, DatasetJsonLd } from '@/components/kennis/JsonLd'
import { CijferBlok } from '@/components/CijferBlok'
import { screeningsPubliek, formatBijgewerktMaand } from '@/lib/screenings'

const URL = 'https://www.moroww.com/kennis/waarom-vakantiewoningen-afvallen'

// ISR — dezelfde bron als /de-standaard, zelfde revalidate-window.
export const revalidate = 3600

// Blijft noindex tot screenings_redenen effectief gevuld is (nu 0 rijen,
// zie migratie 053 op moroww-os). Zodra we per bezochte reject een
// reden_categorie invullen, kan deze bovenkant terug naar index.
export async function generateMetadata() {
  return {
    ...kennisMetadata({
      titel: 'Waarom vakantiewoningen afvallen · moroww',
      beschrijving:
        'moroww bezoekt elke woning fysiek. De meeste halen de standaard niet. Dit zijn de aantallen; de redenen volgen per publicatiereeks.',
      pad: '/kennis/waarom-vakantiewoningen-afvallen',
    }),
    robots: { index: false, follow: false },
  }
}

export default async function AfvalRedenenPage() {
  const cijfers = await screeningsPubliek()
  const maand = cijfers ? formatBijgewerktMaand(cijfers.bijgewerkt_op) : ''

  // Bij een fout op de view: schrijf de korte-antwoord zonder cijfers. De
  // DatasetJsonLd laten we dan weg — zonder aantallen is er geen dataset.
  const korteAntwoord = cijfers
    ? `moroww, een Belgisch kwaliteitslabel voor vakantiewoningen, bezocht ${cijfers.aantal_bezoek} woningen. ${cijfers.aantal_opgenomen} kwamen in de collectie. Daarvoor lagen er ${cijfers.aantal_dossier} dossiers op tafel. Elke woning wordt fysiek bezocht voor er een oordeel valt, en woningen die niet meer voldoen verlaten de collectie.`
    : 'moroww, een Belgisch kwaliteitslabel voor vakantiewoningen, bezoekt elke woning fysiek voor er een oordeel valt. Woningen die niet meer voldoen verlaten de collectie. De actuele aantallen zijn nu even niet bereikbaar.'

  return (
    <>
      <ArticleJsonLd
        titel="Waarom vakantiewoningen afvallen"
        beschrijving="Cijfers over de fysieke selectie van vakantiewoningen door moroww: aantal bezochte woningen, aantal opgenomen en de redenen waarop de rest afviel."
        url={URL}
        datumGepubliceerd={KENNIS_GEPUBLICEERD}
        datumGewijzigd={cijfers?.bijgewerkt_op?.slice(0, 10) ?? KENNIS_GEPUBLICEERD}
      />
      {cijfers && (
        <DatasetJsonLd
          naam="moroww · screenings van vakantiewoningen"
          beschrijving={`Aantallen uit het moroww-auditsysteem: ${cijfers.aantal_dossier} dossiers bekeken, ${cijfers.aantal_bezoek} fysiek bezocht, ${cijfers.aantal_opgenomen} opgenomen.`}
          url={URL}
          datumGewijzigd={cijfers.bijgewerkt_op.slice(0, 10)}
        />
      )}

      <ArticleLayout
        eyebrow="wat het label anders doet"
        terug={{ href: '/kennis', label: 'kennisbank' }}
        titel="Waarom vakantiewoningen afvallen"
        korteAntwoord={korteAntwoord}
      >
        {/* not-prose zodat de CijferBlok-typografie niet door de artikel-
            prose-stijlen wordt opgeblazen. Zelfde bron, zelfde formulering
            als /de-standaard — één component. */}
        <div className="not-prose my-mw-8">
          <CijferBlok data={cijfers} />
        </div>

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
          nagekekenOp={maand ? `${maand} (moroww-systeem)` : 'moroww-systeem'}
          bron="Cijfers live uit de view screenings_publiek op moroww-os. Redenen-per-categorie volgen zodra screenings_redenen gevuld is."
        />
      </ArticleLayout>
    </>
  )
}
