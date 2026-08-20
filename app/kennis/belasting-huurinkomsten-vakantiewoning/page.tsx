import { kennisMetadata, KENNIS_GEPUBLICEERD } from '@/lib/kennis/meta'
import { ArticleLayout } from '@/components/kennis/ArticleLayout'
import { Cta, VerderLezen } from '@/components/kennis/Cta'
import { Faq } from '@/components/kennis/Faq'
import { H2Section } from '@/components/kennis/H2Section'
import { Actualiteitsblok } from '@/components/kennis/Actualiteitsblok'
import { ArticleJsonLd } from '@/components/kennis/JsonLd'

const URL = 'https://www.moroww.com/kennis/belasting-huurinkomsten-vakantiewoning'

export const metadata = kennisMetadata({
  titel: 'Belasting op huurinkomsten vakantiewoning · roerend, onroerend, divers',
  beschrijving:
    'Hoe huurinkomsten uit een vakantiewoning belast worden: de 60/40-opsplitsing, het kadastraal inkomen, en wanneer beroepsinkomen.',
  pad: '/kennis/belasting-huurinkomsten-vakantiewoning',
})

export default function BelastingHuurinkomstenPage() {
  return (
    <>
      <ArticleJsonLd
        titel="Belasting op huurinkomsten uit een vakantiewoning"
        beschrijving="De 60/40-opsplitsing tussen onroerend en roerend inkomen bij gemeubelde verhuur, en wanneer de fiscus alles als beroepsinkomen herkwalificeert."
        url={URL}
        datumGepubliceerd={KENNIS_GEPUBLICEERD}
        datumGewijzigd="2026-08-20"
      />

      <ArticleLayout
        eyebrow="opbrengst en rendement"
        terug={{ href: '/kennis', label: 'kennisbank' }}
        titel="Belasting op huurinkomsten uit een vakantiewoning"
        korteAntwoord="Verhuur je een gemeubelde vakantiewoning als particulier, dan splitst de fiscus je huurinkomsten. Zonder andersluidende afspraak geldt 60 procent als onroerend inkomen en 40 procent als roerend inkomen. Het onroerende deel wordt belast op basis van het geïndexeerde kadastraal inkomen verhoogd met 40 procent. Het roerende deel wordt na een kostenforfait van 50 procent belast aan 30 procent. Vergoedingen voor bijkomende diensten vallen apart, als diverse inkomsten aan 33 procent."
      >
        <H2Section titel="De drie potjes" />
        <table>
          <thead>
            <tr>
              <th>Potje</th>
              <th>Wat erin zit</th>
              <th>Hoe het belast wordt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Onroerend</td>
              <td>het pand zelf, standaard 60 % van de huur</td>
              <td>op het geïndexeerde kadastraal inkomen × 1,4, aan de progressieve tarieven</td>
            </tr>
            <tr>
              <td>Roerend</td>
              <td>het meubilair, standaard 40 % van de huur</td>
              <td>brutobedrag min 50 % kostenforfait, dan 30 %</td>
            </tr>
            <tr>
              <td>Divers</td>
              <td>schoonmaak, ontbijt, andere betalende diensten</td>
              <td>33 %, na aftrek van bewezen kosten</td>
            </tr>
          </tbody>
        </table>
        <p>
          De 60/40-verdeling is een standaard, geen wet. Je mag in de
          overeenkomst een andere verdeling afspreken, zolang die redelijk is.
          Doe je dat niet, dan past de administratie de standaard toe.
        </p>
        <p>
          <strong>Wat dat concreet betekent voor het roerende deel:</strong> van
          € 10.000 huur is € 4.000 roerend, daarvan blijft na het kostenforfait
          € 2.000 belastbaar, en daarop betaal je 30 procent. Dus € 600 aan
          roerende belasting op € 10.000 huur, plus gemeentebelasting.
        </p>

        <H2Section titel="Het onroerende deel is de gunstige kant" />
        <p>
          Verhuur je aan een particulier die het goed niet beroepsmatig
          gebruikt, dan word je niet belast op wat je effectief ontvangt maar
          op het geïndexeerde kadastraal inkomen verhoogd met 40 procent. Dat
          bedrag ligt bij een goed verhurende vakantiewoning doorgaans ver
          onder de werkelijke opbrengst.
        </p>
        <p>
          De indexatiecoëfficiënt bedraagt 2,3000 voor inkomstenjaar 2026. Bij
          een niet-geïndexeerd kadastraal inkomen van € 1.000 kom je op
          € 1.000 × 2,3 × 1,4 = € 3.220 belastbaar onroerend inkomen,
          ongeacht of je woning € 20.000 of € 60.000 per jaar opbrengt.
        </p>
        <p>
          <strong>Eén verandering die veel mensen gemist hebben.</strong> Vanaf
          aanslagjaar 2026, dus inkomsten 2025, is de aftrek van gewone
          leningsintresten op verhuurde panden afgeschaft. Die schrapping geldt
          ook voor lopende leningen. Wie zijn vakantiewoning met krediet
          financierde, ziet daardoor zijn belastbare basis stijgen.
        </p>

        <Cta
          kind="vraag"
          intro="De verdeling tussen roerend en onroerend en de vraag of je diensten apart moet aangeven, hangen af van hoe je afrekent met je gasten."
        />

        <H2Section titel="Wanneer wordt het beroepsinkomen?" />
        <p>
          Dit is de kantelpunt die het meeste geld kost, en de grens is geen
          getal maar een beoordeling.
        </p>
        <p>
          De fiscus kijkt of je activiteit{' '}
          <strong>frequent, intensief, gestructureerd en georganiseerd</strong>
          {' '}is. Signalen die meewegen: meerdere panden, uitgebreide
          dienstverlening, een eigen organisatie rond de verhuur.
        </p>
        <p>
          Wordt je activiteit als beroepsinkomen gekwalificeerd, dan vervallen
          de andere categorieën. Alles wordt dan samen belast aan de
          progressieve tarieven, na aftrek van beroepskosten, en er komen
          sociale bijdragen bij.
        </p>
        <p>
          Dat is niet per definitie ongunstig. Bij hoge werkelijke kosten en
          afschrijvingen kan het beroepsregime beter uitkomen. Maar het is een
          beslissing die je vooraf neemt met je boekhouder, niet iets wat je
          achteraf ontdekt in een aanslagbiljet.
        </p>

        <H2Section titel="En de btw?" />
        <p>
          Dat is een apart verhaal met eigen regels. Kort: wie huishoudlinnen
          ter beschikking stelt en minstens wekelijks vervangt, is btw-plichtig
          vanaf de eerste euro, en het tarief ging op 1 maart 2026 van 6 naar
          12 procent. De volledige uitleg staat op de pagina over wat een nacht
          kost.
        </p>

        <Cta kind="poortentoets" />

        <Faq
          items={[
            {
              vraag: 'Ik verhuur via een platform. Verandert dat iets?',
              antwoord:
                'Aan de fiscale kwalificatie niet. De 60/40-fictie is in rulings uitdrukkelijk bevestigd voor verhuur via online platformen. Wel moet je bij een all-inprijs zelf bepalen welk deel op de dienstverlening slaat.',
            },
            {
              vraag: 'Kan ik de 60/40 zelf aanpassen?',
              antwoord:
                'Ja, in de overeenkomst, mits de verdeling een redelijke verhouding weerspiegelt. Een verdeling die het roerende deel kunstmatig klein maakt, houdt geen stand.',
            },
            {
              vraag: 'Mijn woning staat in een vennootschap.',
              antwoord:
                'Dan gelden de regels van de vennootschapsbelasting en is deze pagina niet van toepassing op jouw situatie.',
            },
            {
              vraag: 'Wat neem ik mee naar mijn boekhouder?',
              antwoord:
                'Drie vragen: welke verdeling roerend en onroerend hanteren we, valt mijn dienstverlening onder divers of beroeps, en wat betekent de geschrapte intrestaftrek voor mijn dossier.',
            },
          ]}
        />

        <Cta kind="gesprek" />

        <VerderLezen
          items={[
            {
              href: '/kennis/wat-kost-een-nacht-vakantiewoning',
              title: 'Wat een nacht echt kost',
              eyebrow: 'opbrengst en rendement',
            },
            {
              href: '/kennis/verblijfsbelasting-vakantiewoning',
              title: 'Verblijfsbelasting per gemeente',
              eyebrow: 'regels en vergunningen',
            },
            {
              href: '/kennis/vakantiewoning-verhuren-zelf-platform-beheerder-label',
              title: 'Zelf, platform, beheerder of label?',
              eyebrow: 'kiezen hoe je verhuurt',
            },
          ]}
        />

        <Actualiteitsblok
          nagekekenOp="20 augustus 2026"
          bron="FOD Financiën, verhuur aan een persoon die het goed niet voor het beroep gebruikt · WIB artikelen inzake onroerende en roerende inkomsten"
        />
      </ArticleLayout>
    </>
  )
}
