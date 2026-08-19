import { kennisMetadata, KENNIS_GEPUBLICEERD } from '@/lib/kennis/meta'
import { ArticleLayout } from '@/components/kennis/ArticleLayout'
import { Cta, VerderLezen } from '@/components/kennis/Cta'
import { Faq } from '@/components/kennis/Faq'
import { Actualiteitsblok } from '@/components/kennis/Actualiteitsblok'
import { ArticleJsonLd, SoftwareApplicationJsonLd } from '@/components/kennis/JsonLd'
import { SCREENINGS_TOTAL, SCREENINGS_ACCEPTED } from '@/lib/screenings'

const URL = 'https://www.moroww.com/kennis/rendement-vakantiewoning-berekenen'

export const metadata = kennisMetadata({
  titel: 'Rendement vakantiewoning berekenen (2026) · rekenmodule',
  beschrijving:
    'Bereken wat je vakantiewoning netto opbrengt, inclusief btw aan 12 procent, schoonmaak, linnen, verblijfsbelasting en commissie. Zonder e-mailadres.',
  pad: '/kennis/rendement-vakantiewoning-berekenen',
})

export default function RendementPage() {
  return (
    <>
      <ArticleJsonLd
        titel="Rendement vakantiewoning berekenen (2026)"
        beschrijving="Rekenmodule voor de netto-opbrengst van een vakantiewoning in België. Rekent alle kostenposten mee, ook die van moroww."
        url={URL}
        datumGepubliceerd={KENNIS_GEPUBLICEERD}
        datumGewijzigd="2026-08-19"
      />
      <SoftwareApplicationJsonLd
        naam="moroww rekenmodule vakantiewoning"
        beschrijving="Gratis online rekenmodule voor de netto-opbrengst van een vakantiewoning in België. Zonder registratie."
        url={URL}
      />

      <ArticleLayout
        eyebrow="opbrengst en rendement"
        terug={{ href: '/kennis', label: 'kennisbank' }}
        titel="Rendement van een vakantiewoning berekenen"
        korteAntwoord="Het rendement van een vakantiewoning is de nettohuurinkomst na btw, schoonmaak, linnen, energie, verblijfsbelasting, commissies en onderhoud, gedeeld door de waarde van de woning. De meeste rekentools laten drie of vier van die posten weg. Deze niet. Ze rekent ook onze eigen kosten mee."
      >
        <div
          id="module"
          className="my-10 rounded-2xl border border-moroww-brown/25 bg-white p-8 md:p-10"
        >
          <p className="text-xs uppercase tracking-widest text-[#C08D6E] mb-3">
            module
          </p>
          <h2 className="mt-0 mb-3 font-bold text-[#1A1A1A]" style={{ fontSize: 22 }}>
            De rekenmodule komt hier
          </h2>
          <p className="text-[#1A1A1A]/75 leading-relaxed">
            We bouwen ze op de streek-ADR-cijfers uit ons eigen boekingssysteem. Zeven
            velden, geen formulier, resultaat op het scherm. Wil je een seintje wanneer ze
            live gaat? Stuur een mail naar{' '}
            <a href="mailto:info@moroww.com" className="underline underline-offset-2">
              info@moroww.com
            </a>{' '}
            en je krijgt hem als eerste.
          </p>
        </div>

        <h2>Waarom deze rekenmodule lager uitkomt dan andere</h2>
        <p>
          Vraag drie partijen wat jouw woning opbrengt en je krijgt drie getallen die ver
          uit elkaar liggen. Dat komt zelden door de omzet. Die schat iedereen ongeveer
          gelijk in. Het verschil zit in wat er van die omzet wordt afgetrokken.
        </p>
        <p>Wij rekenen alles mee. Ook de posten die minder mooi staan. Ook de onze.</p>

        <table>
          <thead>
            <tr>
              <th>Post</th>
              <th>Zit meestal in andere tools</th>
              <th>Zit hierin</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Bruto logiesomzet</td><td>ja</td><td>ja</td></tr>
            <tr><td>Btw op logies (12 % sinds 1 maart 2026)</td><td>zelden</td><td>ja</td></tr>
            <tr><td>Schoonmaak per wissel</td><td>soms</td><td>ja</td></tr>
            <tr><td>Linnen en verbruiksgoederen</td><td>zelden</td><td>ja</td></tr>
            <tr><td>Energie en water</td><td>zelden</td><td>ja</td></tr>
            <tr><td>Verblijfsbelasting gemeente</td><td>zelden</td><td>ja</td></tr>
            <tr><td>Platformcommissie</td><td>soms</td><td>ja</td></tr>
            <tr><td>Commissie label of beheerder</td><td>zelden</td><td>ja</td></tr>
            <tr><td>Onderhoud en vervanging</td><td>nooit</td><td>ja</td></tr>
            <tr><td>Leegstand buiten seizoen</td><td>soms</td><td>ja</td></tr>
          </tbody>
        </table>

        <h2>Wat de module van je vraagt</h2>
        <p>
          Zeven velden. Postcode, oppervlakte, aantal slaapkamers, aantal slaapplaatsen,
          aankoopwaarde of geschatte waarde, aantal weken eigen gebruik, en of je vandaag
          al verhuurt.
        </p>
        <p>
          Meer heeft ze niet nodig. Voor de nachtprijs en de bezetting vertrekt ze van
          wat vergelijkbare woningen in jouw streek effectief halen, niet van wat ze
          vragen. Dat verschil is groot. Een woning die € 340 per nacht vraagt en veertig
          procent van het jaar leegstaat, verdient minder dan een woning die € 260 vraagt
          en zeventig procent gevuld staat.
        </p>

        <h2>Wat de module niet doet</h2>
        <p>
          Ze belooft je niets. Ze geeft een vork, geen getal, en ze zegt erbij hoe breed
          die vork is. Een woning van 180 m² in de duinen heeft een andere spreiding dan
          een hoeve in het Meetjesland, en die spreiding hoort deel van het antwoord te
          zijn.
        </p>
        <p>
          Ze houdt ook geen rekening met jouw persoonlijke fiscale situatie. Of je in de
          personenbelasting of via een vennootschap zit, of je btw-plichtig bent, of je
          geleend hebt: dat verandert het nettoresultaat aanzienlijk. Daarvoor heb je je
          boekhouder nodig.
        </p>

        <Cta
          kind="vraag"
          intro="De rekenmodule geeft een vork, geen advies over jouw fiscale opzet."
        />

        <h2>De poortentoets: haalt je woning de standaard</h2>
        <p>
          Rendement is de helft van het verhaal. De andere helft is of je woning geschikt
          is voor het segment waarin die prijzen gehaald worden.
        </p>
        <p>
          moroww, een Belgisch kwaliteitslabel voor vakantiewoningen aan de kust en op
          het platteland, bezoekt elke woning fysiek voor ze in de collectie komt. Ruim{' '}
          {SCREENINGS_TOTAL} woningen kwamen die weg al langs. {SCREENINGS_ACCEPTED}{' '}
          haalden het.
        </p>
        <p>De poortentoets stelt je dezelfde harde vragen die wij ter plaatse stellen:</p>
        <table>
          <thead>
            <tr><th>Poort</th><th>Voorwaarde</th></tr>
          </thead>
          <tbody>
            <tr><td>Ruimte</td><td>minimaal 100 m², minstens twee slaapkamers</td></tr>
            <tr><td>Ligging</td><td>natuurlijk, landelijk, kust of rustige regio. Geen drukke stadskern</td></tr>
            <tr><td>Karakter</td><td>de woning heeft een eigen gezicht. Geen showroom</td></tr>
            <tr><td>Staat</td><td>klaar vanaf de sleuteloverdracht, volledig ingericht</td></tr>
          </tbody>
        </table>
        <p>
          De toets kan nee zeggen. Dat is geen fout in de toets. Dat is waar ze voor
          dient. Van elke woning die wij bekijken, valt de overgrote meerderheid af, en
          het is eerlijker dat je dat in twee minuten weet dan na drie gesprekken.
        </p>

        <Cta kind="poortentoets" />

        <Faq
          items={[
            {
              vraag: 'Moet ik mijn e-mailadres achterlaten?',
              antwoord:
                'Nee. De rekenmodule en de poortentoets zijn volledig open. Je krijgt je resultaat op het scherm, zonder formulier.',
            },
            {
              vraag: 'Rekenen jullie jullie eigen commissie mee?',
              antwoord:
                'Ja. Vink "via een label of beheerder" aan en de module trekt 15 procent commissie op de logiesfare en het maandelijkse collectielidmaatschap af. We laten het liever zien dan dat je het achteraf ontdekt.',
            },
            {
              vraag: 'Waar komen de nachtprijzen vandaan?',
              antwoord:
                'Uit de effectief geboekte nachten in de moroww-collectie, aangevuld met publiek beschikbare marktdata per streek. Bij elke uitkomst staat op hoeveel waarnemingen ze steunt.',
            },
            {
              vraag: 'Mijn woning haalt de poorten niet. Kan ik dan nog iets?',
              antwoord:
                'Vaak wel. Een woning die op één poort strandt, is soms met beperkte ingrepen wel geschikt. Een woning die op ligging strandt, niet. Stuur je situatie door en we zeggen eerlijk welke van de twee het is.',
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
              href: '/kennis/verblijfsbelasting-vakantiewoning',
              title: 'Verblijfsbelasting per gemeente',
              eyebrow: 'regels en vergunningen',
            },
          ]}
        />

        <Actualiteitsblok
          nagekekenOp="19 augustus 2026"
          bron="KB van 14 februari 2026 (BS 23 februari 2026) voor het btw-tarief"
        />
      </ArticleLayout>
    </>
  )
}
