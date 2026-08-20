import { kennisMetadata, KENNIS_GEPUBLICEERD } from '@/lib/kennis/meta'
import { ArticleLayout } from '@/components/kennis/ArticleLayout'
import { Cta, VerderLezen } from '@/components/kennis/Cta'
import { Faq } from '@/components/kennis/Faq'
import { H2Section } from '@/components/kennis/H2Section'
import { Actualiteitsblok } from '@/components/kennis/Actualiteitsblok'
import { ArticleJsonLd } from '@/components/kennis/JsonLd'

const URL = 'https://www.moroww.com/kennis/is-je-woning-klaar-voor-premium-verhuur'

export const metadata = kennisMetadata({
  titel: 'Is je woning klaar voor het hogere segment? · vier poorten en wat eronder ligt',
  beschrijving:
    'De meeste woningen die we bekijken halen de standaard niet. Dit zijn de punten waarop het misloopt, en welke ervan op te lossen zijn.',
  pad: '/kennis/is-je-woning-klaar-voor-premium-verhuur',
})

export default function IsJeWoningKlaarPage() {
  return (
    <>
      <ArticleJsonLd
        titel="Is je woning klaar voor het hogere segment?"
        beschrijving="De punten waarop een woning in de auditfase struikelt bij moroww: welke zijn vast, welke zijn op te lossen."
        url={URL}
        datumGepubliceerd={KENNIS_GEPUBLICEERD}
        datumGewijzigd="2026-08-20"
      />

      <ArticleLayout
        eyebrow="wat het label anders doet"
        terug={{ href: '/kennis', label: 'kennisbank' }}
        titel="Is je woning klaar voor het hogere segment?"
        korteAntwoord="De meeste woningen die we bekijken, komen niet in de collectie. Dat ligt zelden aan de staat van het huis. Het ligt meestal aan iets wat niet op te lossen is: de oppervlakte, de ligging, of het ontbreken van eigen karakter. Wat wél op te lossen is: inrichting, uitrusting, en alles wat met papieren te maken heeft."
      >
        <H2Section titel="Twee soorten nee" />
        <p>Voor je verder leest, is dit het onderscheid dat telt.</p>
        <table>
          <thead>
            <tr>
              <th>Vast</th>
              <th>Oplosbaar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>minder dan 100 m²</td>
              <td>inrichting die niet klopt</td>
            </tr>
            <tr>
              <td>minder dan twee slaapkamers</td>
              <td>ontbrekende uitrusting</td>
            </tr>
            <tr>
              <td>drukke stadskern of zichtbare drukte</td>
              <td>geen brandveiligheidsattest</td>
            </tr>
            <tr>
              <td>een gebouw zonder eigen gezicht</td>
              <td>geen omgevingsvergunning</td>
            </tr>
            <tr>
              <td>geen zicht op groen of water vanuit de leefruimte</td>
              <td>linnen en essentials onder niveau</td>
            </tr>
          </tbody>
        </table>
        <p>
          Strandt je woning links, dan is er geen investering die dat
          verandert. Strandt ze rechts, dan is het een kwestie van tijd en
          geld, en meestal minder van allebei dan je denkt.
        </p>

        <Cta
          kind="poortentoets"
          intro="De toets stelt dezelfde vragen die wij ter plaatse stellen, op de punten die je zelf kan nagaan."
        />

        <H2Section titel="Waar het in de praktijk misloopt" />
        <p>
          <strong>De ligging is bijna goed.</strong> Dit is de pijnlijkste
          categorie. Een mooi huis in een straat waar het &apos;s ochtends
          niet stil is. Wat je hoort als je het raam opent, bepaalt hoe de
          dag begint, en daar is geen inrichting tegen opgewassen.
        </p>
        <p>
          <strong>Het huis is nieuw maar heeft geen gezicht.</strong> Correct
          afgewerkt, alles werkt, en toch onthoudt niemand het. Karakter is
          geen budget. Het is een authentiek element, een materiaal dat je
          aanraakt, een indeling die ergens vandaan komt.
        </p>
        <p>
          <strong>De oppervlakte klopt op papier.</strong> Honderdtwintig
          vierkante meter waarvan een derde gang en trap is, leest anders dan
          honderd vierkante meter waar je je in kan terugtrekken. Wij meten
          wat bruikbaar is, niet wat er in de akte staat.
        </p>
        <p>
          <strong>De papieren zijn niet in orde.</strong> Geen
          brandveiligheidsattest, geen functiewijziging, een verzekering die
          de uitbating niet dekt. Oplosbaar, maar het kost maanden en het
          moet gebeuren voor er een gast binnenkomt.
        </p>
        <p>
          <strong>Het huis is klaar, de eigenaar niet.</strong> Wie de
          standaard als bemoeienis ervaart in plaats van als afspraak, komt
          in het eerste seizoen in de problemen. Dat is geen oordeel over de
          persoon, het is een verschil in verwachting dat je beter vooraf
          vaststelt.
        </p>

        <H2Section titel="Wat je kan doen voor je ons belt" />
        <p>Vier dingen, in deze volgorde:</p>
        <ol>
          <li>
            <strong>Meet de bruikbare oppervlakte.</strong> Leefruimte en
            slaapkamers, zonder gangen en trappen.
          </li>
          <li>
            <strong>Ga op een doordeweekse ochtend om zeven uur naar je
            woning en luister.</strong> Niet op zondagnamiddag.
          </li>
          <li>
            <strong>Vraag je brandveiligheidsattest en je omgevingsvergunning
            op.</strong> Als je ze niet vindt, heb je ze waarschijnlijk niet.
          </li>
          <li>
            <strong>Laat je verzekeraar schriftelijk bevestigen dat de
            uitbating gedekt is.</strong>
          </li>
        </ol>
        <p>Punt drie en vier hou je nodig, ook als je nooit met ons werkt.</p>

        <Cta
          kind="vraag"
          intro="Twijfel je of jouw woning op een vast of een oplosbaar punt strandt? Stuur foto's en het adres."
        />

        <H2Section titel="Waarom we dit publiceren" />
        <p>
          Omdat het je tijd bespaart en de onze. En omdat een label dat
          alleen vertelt wie er binnen mag, geen label is maar een catalogus.
        </p>
        <p>
          Als je woning het niet haalt, betekent dat niet dat ze slecht is.
          Het betekent dat ze niet past in een collectie die op vier
          voorwaarden is gebouwd. Er zijn uitstekende vakantiewoningen die
          bij ons afvallen, en die het elders prima doen.
        </p>

        <Faq
          items={[
            {
              vraag: 'Kan een woning afvallen om iets kleins?',
              antwoord:
                'Ja, als dat kleine ding op een vast punt zit. Een prachtig huis in een straat met te veel geluid strandt op ligging, en daar helpt geen investering aan.',
            },
            {
              vraag: 'Wat als ik het niet met jullie oordeel eens ben?',
              antwoord:
                'Dan hebben we een verschil van mening. We zeggen dat vooraf zodat je tijd niet verliest, en we motiveren onze beoordeling. De collectie zelf is smal met opzet.',
            },
            {
              vraag: 'Kunnen jullie helpen bij de oplosbare punten?',
              antwoord:
                'We verwijzen naar partners die aan onze standaard voldoen, en we geven interieuradvies bij de audit. De uitvoering en de kost blijven bij de eigenaar.',
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
              href: '/kennis/vakantiewoning-verhuren-zelf-platform-beheerder-label',
              title: 'Zelf, platform, beheerder of label?',
              eyebrow: 'kiezen hoe je verhuurt',
            },
            {
              href: '/kennis/logiesdecreet-vakantiewoning-vlaanderen',
              title: 'Het Vlaams Logiesdecreet',
              eyebrow: 'regels en vergunningen',
            },
          ]}
        />

        <Actualiteitsblok nagekekenOp="20 augustus 2026" />
      </ArticleLayout>
    </>
  )
}
