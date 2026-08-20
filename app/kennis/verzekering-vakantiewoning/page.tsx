import { kennisMetadata, KENNIS_GEPUBLICEERD } from '@/lib/kennis/meta'
import { ArticleLayout } from '@/components/kennis/ArticleLayout'
import { Cta, VerderLezen } from '@/components/kennis/Cta'
import { Faq } from '@/components/kennis/Faq'
import { H2Section } from '@/components/kennis/H2Section'
import { Actualiteitsblok } from '@/components/kennis/Actualiteitsblok'
import { ArticleJsonLd } from '@/components/kennis/JsonLd'

const URL = 'https://www.moroww.com/kennis/verzekering-vakantiewoning'

export const metadata = kennisMetadata({
  titel: 'Verzekering vakantiewoning · waarom je brandpolis niet volstaat',
  beschrijving:
    'Een gewone woningpolis dekt toeristische verhuur niet automatisch. Wat je nodig hebt, wat er misgaat, en welke vraag je aan je makelaar moet stellen.',
  pad: '/kennis/verzekering-vakantiewoning',
})

export default function VerzekeringPage() {
  return (
    <>
      <ArticleJsonLd
        titel="Verzekering voor een vakantiewoning"
        beschrijving="Waarom een gewone brandpolis toeristische verhuur niet dekt, wat het logiesdecreet vraagt en welke vraag je schriftelijk aan je makelaar stelt."
        url={URL}
        datumGepubliceerd={KENNIS_GEPUBLICEERD}
        datumGewijzigd="2026-08-20"
      />

      <ArticleLayout
        eyebrow="regels en vergunningen"
        terug={{ href: '/kennis', label: 'kennisbank' }}
        titel="Verzekering voor een vakantiewoning"
        korteAntwoord="Een gewone brandverzekering voor een woning dekt toeristische verhuur niet automatisch. Het logiesdecreet vereist bovendien uitdrukkelijk twee dekkingen: een brandverzekering en een burgerlijke aansprakelijkheid, en die laatste niet alleen voor het gebouw maar ook voor de uitbating. Wie verhuurt zonder dat zijn polis daarop is afgestemd, riskeert dat een schadegeval niet vergoed wordt."
      >
        <H2Section titel="Het probleem in één zin" />
        <p>
          Je polis is afgesloten voor een woning waar jij woont of die je
          langdurig verhuurt. Toeristische verhuur is iets anders: wisselende
          bewoners, korte verblijven, mensen die het huis niet kennen. Dat is
          een ander risicoprofiel, en verzekeraars behandelen het als een
          ander risico.
        </p>
        <p>
          Meld je die wijziging niet, dan spreekt men van een verzwaring van
          het risico die niet is aangegeven. Bij schade kan dat leiden tot een
          vermindering of een weigering van de tussenkomst.
        </p>

        <H2Section titel="Wat je nodig hebt" />
        <table>
          <tbody>
            <tr>
              <th>Brandverzekering</th>
              <td>uitgebreid naar toeristische verhuur, met de gebruiksbestemming correct vermeld</td>
            </tr>
            <tr>
              <th>BA gebouw</th>
              <td>aansprakelijkheid voor schade veroorzaakt door het pand zelf</td>
            </tr>
            <tr>
              <th>BA uitbating</th>
              <td>aansprakelijkheid voor schade die voortkomt uit je activiteit als logiesverstrekker</td>
            </tr>
            <tr>
              <th>Afstand van verhaal</th>
              <td>tegenover je gasten, zodat je hen niet moet aanspreken bij schade</td>
            </tr>
            <tr>
              <th>Inboedel</th>
              <td>met een waardebepaling die klopt na inrichting, niet die van bij aankoop</td>
            </tr>
          </tbody>
        </table>
        <p>
          Die derde rij is degene die vergeten wordt. BA gebouw en BA
          uitbating zijn twee verschillende dekkingen, en het logiesdecreet
          vraagt uitdrukkelijk dat je uitbating verzekerd is.
        </p>

        <Cta
          kind="vraag"
          intro="Twijfel je of je huidige polis de verhuur dekt? Stuur de dekkingen die erin staan door, dan zeggen we welke vragen je aan je makelaar moet stellen."
        />

        <H2Section titel="Wat er in de praktijk misgaat" />
        <p>
          <strong>Een gast veroorzaakt waterschade bij de buren.</strong> Wie
          is aansprakelijk, en dekt je polis dat? Zonder BA uitbating is het
          antwoord vaak nee.
        </p>
        <p>
          <strong>Een gast valt van een steile trap.</strong> Dat is precies
          het soort risico waar een uitbatingsdekking voor bestaat, en waar
          een gewone woningpolis stilzwijgt.
        </p>
        <p>
          <strong>Het pand staat maanden leeg buiten het seizoen.</strong>
          {' '}Veel polissen bevatten een leegstandsclausule die de dekking
          beperkt na een aantal weken zonder bewoning. Bij een vakantiewoning
          is dat structureel, niet uitzonderlijk.
        </p>
        <p>
          <strong>De inboedelwaarde klopt niet meer.</strong> Je hebt voor
          tienduizenden euro&apos;s ingericht sinds de polis werd afgesloten.
          Bij schade wordt vergoed wat verzekerd is, niet wat er stond.
        </p>

        <H2Section titel="De vraag die je moet stellen" />
        <p>
          Niet: &ldquo;is mijn vakantiewoning verzekerd?&rdquo; Daarop krijg
          je altijd ja.
        </p>
        <p>
          Wel:{' '}
          <strong>
            &ldquo;kan je me schriftelijk bevestigen dat deze polis
            toeristische verhuur dekt, inclusief burgerlijke aansprakelijkheid
            uitbating, en dat er geen leegstandsclausule van toepassing
            is?&rdquo;
          </strong>
        </p>
        <p>
          Vraag dat per mail en bewaar het antwoord. Een mondelinge
          geruststelling is bij schade niets waard.
        </p>

        <H2Section titel="Wat moroww hiermee doet" />
        <p>
          Een verzekering die de uitbating dekt is een voorwaarde voor
          opname. Bij de audit vragen we de polis op en kijken we of de
          gebruiksbestemming klopt. Dat is geen administratieve formaliteit:
          het is de post waar een eigenaar het meeste kan verliezen en er het
          minst van weet.
        </p>

        <Cta kind="poortentoets" />

        <Faq
          items={[
            {
              vraag: 'Mijn platform biedt een garantie aan. Volstaat dat?',
              antwoord:
                'Nee. Platformgaranties zijn geen verzekeringen, hebben eigen uitsluitingen en eigen procedures, en dekken doorgaans geen aansprakelijkheid tegenover derden.',
            },
            {
              vraag: 'Ik verhuur maar een paar weken per jaar.',
              antwoord:
                'Dan geldt hetzelfde. Het aantal weken bepaalt niet of het risico gedekt is, alleen hoe vaak je het loopt.',
            },
            {
              vraag: 'Kost dat veel meer?',
              antwoord:
                'Doorgaans is het verschil beperkt in verhouding tot wat er gedekt wordt. De echte kost zit in het geval waarin je niet gedekt bent.',
            },
            {
              vraag: 'Wie regelt dit als ik met moroww werk?',
              antwoord:
                'Jij. De polis staat op jouw naam en op jouw pand. Wij controleren of ze er is en of ze het juiste dekt.',
            },
          ]}
        />

        <Cta kind="gesprek" />

        <VerderLezen
          items={[
            {
              href: '/kennis/logiesdecreet-vakantiewoning-vlaanderen',
              title: 'Het Vlaams Logiesdecreet',
              eyebrow: 'regels en vergunningen',
            },
            {
              href: '/kennis/brandveiligheidsattest-vakantiewoning-vlaanderen',
              title: 'Brandveiligheidsattest',
              eyebrow: 'regels en vergunningen',
            },
            {
              href: '/kennis/omgevingsvergunning-functiewijziging-vakantiewoning',
              title: 'Omgevingsvergunning',
              eyebrow: 'regels en vergunningen',
            },
          ]}
        />

        <Actualiteitsblok
          nagekekenOp="20 augustus 2026"
          bron="uitbatingsvoorwaarden logiesdecreet, Toerisme Vlaanderen"
        />
      </ArticleLayout>
    </>
  )
}
