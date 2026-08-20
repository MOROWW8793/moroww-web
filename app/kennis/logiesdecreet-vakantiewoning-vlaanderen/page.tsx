import { kennisMetadata, KENNIS_GEPUBLICEERD } from '@/lib/kennis/meta'
import { ArticleLayout } from '@/components/kennis/ArticleLayout'
import { Cta, VerderLezen } from '@/components/kennis/Cta'
import { Faq } from '@/components/kennis/Faq'
import { H2Section } from '@/components/kennis/H2Section'
import { Actualiteitsblok } from '@/components/kennis/Actualiteitsblok'
import { ArticleJsonLd } from '@/components/kennis/JsonLd'

const URL = 'https://www.moroww.com/kennis/logiesdecreet-vakantiewoning-vlaanderen'

export const metadata = kennisMetadata({
  titel: 'Het Vlaams Logiesdecreet in mensentaal · aanmelden, attesten, boetes',
  beschrijving:
    'Wat het logiesdecreet vraagt: aanmelden bij Toerisme Vlaanderen, brandveiligheidsattest, verzekering — en wat er in 2026 verandert.',
  pad: '/kennis/logiesdecreet-vakantiewoning-vlaanderen',
})

export default function LogiesdecreetPage() {
  return (
    <>
      <ArticleJsonLd
        titel="Het Vlaams Logiesdecreet in mensentaal"
        beschrijving="Praktisch overzicht van de verplichtingen uit het Vlaamse logiesdecreet voor uitbaters van vakantiewoningen."
        url={URL}
        datumGepubliceerd={KENNIS_GEPUBLICEERD}
        datumGewijzigd="2026-08-20"
      />

      <ArticleLayout
        eyebrow="regels en vergunningen"
        terug={{ href: '/kennis', label: 'kennisbank' }}
        titel="Het Vlaams Logiesdecreet in mensentaal"
        korteAntwoord="Wie in Vlaanderen tegen betaling toeristen laat overnachten, valt onder het logiesdecreet. Aanmelden bij Toerisme Vlaanderen is verplicht, gratis en gebeurt online. Er is geen vergunningsplicht bij Toerisme Vlaanderen zelf, maar je moet wel voldoen aan de uitbatingsvoorwaarden: een positief brandveiligheidsattest, een verzekering voor het pand én voor de uitbating, en een blanco uittreksel uit het strafregister."
      >
        <H2Section titel="Voor wie geldt het?" />
        <p>
          Voor iedereen. Het decreet maakt geen onderscheid tussen professionele
          uitbaters en wie een paar weekends per jaar verhuurt. Zodra je een
          verblijf tegen betaling aanbiedt en dat publiek bekendmaakt, val je
          eronder. Ook als het via een platform loopt, ook als het via een
          verhuurkantoor gaat, ook als het bijverdienste is.
        </p>
        <p>
          Er zijn tien logiescategorieën. Voor de meeste woningen in dit segment
          is dat &ldquo;vakantiewoning&rdquo;: het volledige pand wordt verhuurd
          en de uitbater woont er niet.
        </p>

        <H2Section titel="Wat moet je in orde hebben?" />
        <table>
          <tbody>
            <tr>
              <th>Aanmelding</th>
              <td>verplicht, gratis, via het uitbatersportaal van Toerisme Vlaanderen</td>
            </tr>
            <tr>
              <th>Brandveiligheidsattest</th>
              <td>positief attest verplicht, per verhuureenheid</td>
            </tr>
            <tr>
              <th>Verzekering</th>
              <td>brandverzekering én burgerlijke aansprakelijkheid, voor het pand en voor de uitbating</td>
            </tr>
            <tr>
              <th>Strafregister</th>
              <td>blanco uittreksel op naam van de uitbater, opvraagbaar op elk moment</td>
            </tr>
            <tr>
              <th>Stedenbouw</th>
              <td>het logies moet hoofdzakelijk vergund zijn, inclusief eventuele functiewijziging</td>
            </tr>
          </tbody>
        </table>
        <p>
          Die laatste rij is de meest onderschatte. Zie de aparte pagina over
          de omgevingsvergunning.
        </p>

        <Cta
          kind="vraag"
          intro="Twijfel je onder welke categorie je logies valt of welke attesten je nodig hebt?"
        />

        <H2Section titel="Aanmelding of erkenning: wat is het verschil?" />
        <p>
          <strong>Aanmelding is verplicht.</strong> Ze is gratis, gebeurt
          digitaal en levert je een uniek registratienummer op. Zonder
          aanmelding mag je niet uitbaten.
        </p>
        <p>
          <strong>Erkenning is vrijwillig.</strong> Ze is ook gratis, maar er
          komt een inspecteur van Toerisme Vlaanderen ter plaatse. Erkenning
          geeft je toegang tot een beschermde benaming en tot de
          comfortclassificatie met sterren.
        </p>
        <p>
          Voor wie in het hogere segment zit, is die classificatie zelden
          doorslaggevend. Sterren zeggen iets over voorzieningen, niet over
          karakter. Maar de erkenning zelf is een extra controlemoment, en
          dat is niet niks.
        </p>

        <H2Section titel="Wat verandert er in 2026?" />
        <p>
          Er komt later dit jaar een aanpassing van het logiesdecreet naar
          aanleiding van de Europese verordening rond kortetermijnverhuur.
          Twee punten staan vast in de aankondigingen:
        </p>
        <p>
          <strong>Het unieke registratienummer wordt zichtbaar.</strong>
          {' '}Platformen zullen het nummer moeten tonen en controleren.
          Niet-aangemelde logies worden daarmee zichtbaar in plaats van
          onzichtbaar.
        </p>
        <p>
          <strong>De stedenbouwkundige conformiteit moet aangetoond worden.</strong>
          {' '}Vandaag controleert Toerisme Vlaanderen dat niet actief. Dat
          gaat veranderen. Wie vandaag verhuurt zonder de juiste
          omgevingsvergunning voor functiewijziging, loopt daar straks tegenaan.
        </p>
        <p>
          Dat tweede punt is voor veel eigenaars het zwaarste, en het is
          precies het punt waar de meeste onwetendheid zit.
        </p>

        <H2Section titel="Wat als je niet aanmeldt?" />
        <p>
          Toerisme Vlaanderen voert steekproefsgewijs controles uit. Wie niet
          voldoet aan de uitbatingsvoorwaarden riskeert een administratieve
          geldboete die kan oplopen tot € 25.000.
        </p>
        <p>
          Daarnaast belasten sommige gemeenten niet-aangemelde logies aan een
          hoger tarief. In Knokke-Heist betaal je € 500 per slaapplaats per
          jaar in plaats van € 250. Bij acht slaapplaatsen is dat € 2.000
          extra, elk jaar, voor een aanmelding die gratis is en tien minuten
          duurt.
        </p>

        <Cta kind="poortentoets" />

        <Faq
          items={[
            {
              vraag: 'Ik verhuur maar vier weekends per jaar. Moet ik dan ook aanmelden?',
              antwoord:
                'Ja. De aanmeldingsplicht kent geen ondergrens. De vrijstelling van vier periodes van dertig dagen die je misschien gezien hebt, gaat over de omgevingsvergunning, niet over de aanmelding bij Toerisme Vlaanderen.',
            },
            {
              vraag: 'Ik heb aangemeld. Ben ik dan in orde?',
              antwoord:
                'Niet noodzakelijk. De aanmelding is één van vijf dingen. Een aanmelding zonder brandveiligheidsattest, zonder correcte omgevingsvergunning of zonder verzekering voor de uitbating is een aanmelding die niet standhoudt bij controle.',
            },
            {
              vraag: 'Kan mijn aanmelding ingetrokken worden?',
              antwoord:
                'Ja. Toerisme Vlaanderen kan de aanmelding weigeren, schorsen of intrekken op gemotiveerd verzoek van de vergunningverlenende overheid, bijvoorbeeld wanneer blijkt dat het logies stedenbouwkundig niet hoofdzakelijk vergund is.',
            },
            {
              vraag: 'Wat doet moroww hiermee?',
              antwoord:
                'Aanmelding, attest en vergunning zijn bij ons voorwaarden voor opname, geen aandachtspunten. Bij de audit noteren we ze en bij de heraudit kijken we of ze nog geldig zijn.',
            },
          ]}
        />

        <Cta kind="gesprek" />

        <VerderLezen
          items={[
            {
              href: '/kennis/omgevingsvergunning-functiewijziging-vakantiewoning',
              title: 'Omgevingsvergunning',
              eyebrow: 'regels en vergunningen',
            },
            {
              href: '/kennis/brandveiligheidsattest-vakantiewoning-vlaanderen',
              title: 'Brandveiligheidsattest',
              eyebrow: 'regels en vergunningen',
            },
            {
              href: '/kennis/verzekering-vakantiewoning',
              title: 'Verzekering',
              eyebrow: 'regels en vergunningen',
            },
          ]}
        />

        <Actualiteitsblok
          nagekekenOp="20 augustus 2026"
          bron="Toerisme Vlaanderen, decreet van 5 februari 2016 houdende het toeristische logies"
        />
      </ArticleLayout>
    </>
  )
}
