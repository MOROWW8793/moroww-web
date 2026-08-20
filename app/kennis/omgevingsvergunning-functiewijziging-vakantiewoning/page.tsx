import { kennisMetadata, KENNIS_GEPUBLICEERD } from '@/lib/kennis/meta'
import { ArticleLayout } from '@/components/kennis/ArticleLayout'
import { Cta, VerderLezen } from '@/components/kennis/Cta'
import { Faq } from '@/components/kennis/Faq'
import { H2Section } from '@/components/kennis/H2Section'
import { Actualiteitsblok } from '@/components/kennis/Actualiteitsblok'
import { ArticleJsonLd } from '@/components/kennis/JsonLd'

const URL = 'https://www.moroww.com/kennis/omgevingsvergunning-functiewijziging-vakantiewoning'

export const metadata = kennisMetadata({
  titel: 'Omgevingsvergunning vakantiewoning · functiewijziging naar verblijfsrecreatie',
  beschrijving:
    'Je aanmelding bij Toerisme Vlaanderen is geen omgevingsvergunning. Wanneer je een functiewijziging nodig hebt en wanneer niet.',
  pad: '/kennis/omgevingsvergunning-functiewijziging-vakantiewoning',
})

export default function OmgevingsvergunningPage() {
  return (
    <>
      <ArticleJsonLd
        titel="Omgevingsvergunning voor een vakantiewoning"
        beschrijving="Wanneer je een functiewijziging naar verblijfsrecreatie moet aanvragen, welke vrijstellingen bestaan, en in welke gemeenten geen vergunningen meer afgeleverd worden."
        url={URL}
        datumGepubliceerd={KENNIS_GEPUBLICEERD}
        datumGewijzigd="2026-08-20"
      />

      <ArticleLayout
        eyebrow="regels en vergunningen"
        terug={{ href: '/kennis', label: 'kennisbank' }}
        titel="Omgevingsvergunning voor een vakantiewoning"
        korteAntwoord="Een woning verhuren als vakantiewoning is stedenbouwkundig een functiewijziging van wonen naar verblijfsrecreatie, en die is in principe vergunningsplichtig. Je aanmelding bij Toerisme Vlaanderen levert die vergunning niet. De omgevingsvergunning voor de functiewijziging vraag je apart aan bij je gemeente. Zonder die vergunning mag de woning niet als vakantiewoning verhuurd worden."
      >
        <H2Section titel="Dit is de verplichting waar de meeste eigenaars over vallen" />
        <p>
          Er bestaat een hardnekkig misverstand: dat een aanmelding bij
          Toerisme Vlaanderen volstaat om te mogen verhuren. Dat is niet zo.
          Het zijn twee verschillende overheden met twee verschillende
          bevoegdheden.
        </p>
        <p>
          En er is een tweede misverstand dat duurder is: dat de bouwvergunning
          van je woning ook de verhuur dekt. Werd je woning niet uitdrukkelijk
          als vakantiewoning gebouwd en vergund, dan geeft die bouwvergunning
          je geen enkel recht op de bestemming vakantiewoning.
        </p>

        <H2Section titel="Wanneer heb je geen vergunning nodig?" />
        <p>Twee vrijstellingen, en ze zijn allebei smal.</p>
        <p>
          <strong>Logies complementair aan het wonen.</strong> Je verhuurt een
          deel van je woning, en aan alle vier deze voorwaarden is voldaan:
        </p>
        <table>
          <tbody>
            <tr>
              <th>Ligging</th>
              <td>het woongebouw ligt in woongebied of een vergelijkbaar gebied</td>
            </tr>
            <tr>
              <th>Hoofdfunctie</th>
              <td>wonen blijft de hoofdfunctie van het gebouw</td>
            </tr>
            <tr>
              <th>Oppervlakte</th>
              <td>de verblijfsrecreatie beslaat minder oppervlakte dan de woonfunctie én maximaal 100 m²</td>
            </tr>
            <tr>
              <th>Voorschriften</th>
              <td>niet strijdig met verordeningen, ruimtelijke uitvoeringsplannen of vergunningsvoorwaarden</td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>Tijdelijk gebruik.</strong> Je verhuurt de woning maximaal
          vier periodes van dertig opeenvolgende dagen per jaar, en het pand
          is verder correct vergund.
        </p>
        <p>
          Voor een volledige vakantiewoning van meer dan 100 m² die het hele
          jaar door verhuurd wordt, gelden geen van beide. Dan heb je de
          vergunning nodig.
        </p>

        <Cta
          kind="vraag"
          intro="De vrijstellingen hangen af van je gebiedsbestemming, je oppervlakteverhouding en je bestaande vergunningsvoorwaarden."
        />

        <H2Section titel="Sommige gemeenten geven geen vergunning meer" />
        <p>Dit is het punt dat je moet kennen voor je koopt.</p>
        <p>
          <strong>Brugge</strong> heeft een vakantiewoningenstop in de
          binnenstad, het gebied binnen de vesten. Daar wordt geen
          functiewijziging van eengezinswoning naar vakantiewoning meer
          vergund. In de randgemeenten gelden voorwaarden: de vloeroppervlakte
          moet groter zijn dan 200 m² en de capaciteit beperkt tot maximaal
          acht personen.
        </p>
        <p>
          <strong>De Panne</strong> verbindt de vergunning aan drie
          voorwaarden, waaronder de ligging in een toeristische zone of een
          woonwijk met toerisme.
        </p>
        <p>
          <strong>Oostende</strong> werkt aan een beleidsvisie die bepaalt
          waar vakantieverhuur in de stad nog mogelijk zal zijn.
        </p>
        <p>
          Het patroon is duidelijk: gemeenten die veel toerisme hebben, sturen
          bij. Wie een pand koopt met verhuur als businessmodel en de
          vergunningssituatie niet vooraf nakijkt, koopt een risico dat groter
          is dan de kost.
        </p>

        <H2Section titel="Wat als je vandaag al verhuurt zonder vergunning?" />
        <p>
          Verschillende gemeenten voorzien een regularisatieprocedure. Dat is
          geen automatische goedkeuring: je dossier wordt getoetst aan de
          goede ruimtelijke ordening en aan de plaatselijke voorschriften.
          Maar het bestaat, en het is beter dan wachten tot iemand het opmerkt.
        </p>
        <p>
          Wat je in de aanvraag nodig hebt: een verantwoordingsnota waarin je
          aantoont dat de aanvraag binnen de goede ruimtelijke ordening past,
          en plannen die duidelijk maken welk deel van het gebouw welke
          functie krijgt.
        </p>
        <p>
          Zet dit op je lijst voor de aanpassing van het logiesdecreet die dit
          jaar volgt. Zodra de stedenbouwkundige conformiteit actief
          gecontroleerd wordt, verandert dit van een risico in een probleem.
        </p>

        <Cta kind="poortentoets" />

        <Faq
          items={[
            {
              vraag: 'Ik heb een brandveiligheidsattest. Dekt dat de stedenbouw?',
              antwoord:
                'Nee. Drie verschillende dossiers bij drie verschillende instanties: aanmelding bij Toerisme Vlaanderen, brandveiligheidsattest bij de gemeente of een keuringsinstantie, en omgevingsvergunning bij de dienst omgeving van je gemeente.',
            },
            {
              vraag: 'Verhuis de vergunning mee bij verkoop?',
              antwoord:
                'Omgevingsvergunningen voor stedenbouwkundige handelingen blijven geldig bij overdracht. Andere toelatingen niet noodzakelijk. Laat dat nakijken voor je tekent.',
            },
            {
              vraag: 'Wat kost een aanvraag?',
              antwoord:
                'De retributie verschilt per gemeente en is doorgaans beperkt. De werkelijke kost zit in het opstellen van het dossier, zeker als er een architect of adviseur bij komt.',
            },
            {
              vraag: 'Hoe lang duurt het?',
              antwoord:
                'Reken op de gewone procedure voor een omgevingsvergunning, met openbaar onderzoek waar dat vereist is. Begin er ruim voor je eerste geplande verhuur aan.',
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
              href: '/kennis/verblijfsbelasting-vakantiewoning',
              title: 'Verblijfsbelasting per gemeente',
              eyebrow: 'regels en vergunningen',
            },
          ]}
        />

        <Actualiteitsblok
          nagekekenOp="20 augustus 2026"
          bron="Vlaamse Codex Ruimtelijke Ordening art. 4.2.1, besluit van de Vlaamse Regering van 14 april 2000 tot bepaling van de vergunningsplichtige functiewijzigingen"
        />
      </ArticleLayout>
    </>
  )
}
