import { kennisMetadata, KENNIS_GEPUBLICEERD } from '@/lib/kennis/meta'
import { ArticleLayout } from '@/components/kennis/ArticleLayout'
import { H2Section } from '@/components/kennis/H2Section'
import { Cta, VerderLezen } from '@/components/kennis/Cta'
import { Faq } from '@/components/kennis/Faq'
import { Actualiteitsblok } from '@/components/kennis/Actualiteitsblok'
import { ArticleJsonLd, HowToJsonLd } from '@/components/kennis/JsonLd'

const URL = 'https://www.moroww.com/kennis/brandveiligheidsattest-vakantiewoning-vlaanderen'

export const metadata = kennisMetadata({
  titel: 'Brandveiligheidsattest vakantiewoning Vlaanderen · A, Abis, B of C',
  beschrijving:
    'Elke vakantiewoning in Vlaanderen heeft een positief brandveiligheidsattest nodig. Welk type, waar aanvragen, en hoe lang geldig.',
  pad: '/kennis/brandveiligheidsattest-vakantiewoning-vlaanderen',
})

export default function BrandattestPage() {
  return (
    <>
      <ArticleJsonLd
        titel="Brandveiligheidsattest vakantiewoning Vlaanderen"
        beschrijving="Overzicht van attest A, Abis, B en C voor toeristische logies in Vlaanderen. Bijlages, aanvraagprocedure en vervaltermijnen."
        url={URL}
        datumGepubliceerd={KENNIS_GEPUBLICEERD}
        datumGewijzigd="2026-08-19"
      />
      <HowToJsonLd
        naam="Brandveiligheidsattest voor een vakantiewoning aanvragen"
        beschrijving="Zes stappen van dossier tot afgeleverd positief attest, voor een vakantiewoning in Vlaanderen."
        stappen={[
          { naam: 'Bepaal je bijlage', tekst: 'Ga na onder welke bijlage je woning valt op basis van verhuureenheden en slaapplaatsen.' },
          { naam: 'Dien de aanvraag in', tekst: 'Bij de juiste instantie: e-loket van je gemeente of hulpverleningszone, of anders het modelformulier van Toerisme Vlaanderen aan de burgemeester.' },
          { naam: 'Verzamel je keuringen', tekst: 'Elektriciteit, verwarming, schoorsteen en rookkanalen, gasinstallatie. De brandweer vraagt ze op tijdens de controle.' },
          { naam: 'Wees aanwezig bij de controle', tekst: 'Vraag om een snelle aflevering van het verslag.' },
          { naam: 'Werk opmerkingen weg', tekst: 'Vraag een tweede bezoek aan als dat nodig is.' },
          { naam: 'Bewaar het attest', tekst: 'Zichtbaar en beschikbaar. Toerisme Vlaanderen kan er op elk moment naar vragen.' },
        ]}
      />

      <ArticleLayout
        eyebrow="regels en vergunningen"
        terug={{ href: '/kennis', label: 'kennisbank' }}
        titel="Brandveiligheidsattest voor een vakantiewoning in Vlaanderen"
        korteAntwoord="Elke vakantiewoning in Vlaanderen moet beschikken over een positief brandveiligheidsattest. Er zijn vier types: A, Abis, B en C. Attest A is het positieve attest en is acht jaar geldig. Bij attest C mag je niet uitbaten. Een vakantiewoning telt altijd als één verhuureenheid en heeft een eigen, individueel attest nodig, ook als er meerdere vakantiewoningen in hetzelfde gebouw zitten."
      >
        <H2Section titel="De vier attesten" />
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Wat het betekent</th>
              <th>Uitbaten?</th>
              <th>Geldigheid</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A</td>
              <td>De woning voldoet aan de specifieke brandveiligheidsnormen</td>
              <td>Ja</td>
              <td>Acht jaar</td>
            </tr>
            <tr>
              <td>Abis</td>
              <td>Vereenvoudigd attest dat bevestigt dat een verbouwing of uitbreiding conform is</td>
              <td>Ja</td>
              <td>Loopt tot het einde van het oorspronkelijke attest A</td>
            </tr>
            <tr>
              <td>B</td>
              <td>Tijdelijk attest. De woning voldoet niet volledig, maar de veiligheid komt niet ernstig in het gedrang. Enkel met een stappenplan, en enkel af te leveren door de burgemeester</td>
              <td>Tijdelijk</td>
              <td>Beperkt</td>
            </tr>
            <tr>
              <td>C</td>
              <td>Negatief attest. De woning voldoet niet of niet meer</td>
              <td>Nee</td>
              <td>Vervalt pas bij aflevering van een nieuw attest A of B</td>
            </tr>
          </tbody>
        </table>
        <p>
          Het attest vermeldt het aantal verhuureenheden en het maximale aantal
          slaapplaatsen dat in de woning mag voorkomen. Dat getal is geen detail: het
          bepaalt mee je verblijfsbelasting in gemeenten die per slaapplaats heffen, en
          het begrenst wat je op je advertentie mag zetten.
        </p>
        <p>Een divanbed, een stapelbed, een onroerend opklapbed of een bedkast telt mee als slaapplaats.</p>

        <H2Section titel="Welke normen gelden voor jouw woning?" />
        <p>
          De normen hangen af van het aantal verhuureenheden en het aantal slaapplaatsen.
          Voor een vakantiewoning, die altijd één verhuureenheid is, komt het neer op het
          aantal slaapplaatsen en op de vraag of de woning deel uitmaakt van een groter
          gebouw.
        </p>
        <table>
          <thead>
            <tr>
              <th>Jouw situatie</th>
              <th>Bijlage</th>
              <th>Wie controleert en levert af</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 verhuureenheid met max. 9 slaapplaatsen</td>
              <td>bijlage 2</td>
              <td>Een door Toerisme Vlaanderen aangeduide keuringsinstantie. Sinds 28 september 2025 is dat ACEG vzw (voordien Vinçotte)</td>
            </tr>
            <tr>
              <td>1 verhuureenheid met 10 tot 12 slaapplaatsen, niet in een groter bouwgeheel</td>
              <td>bijlage 2</td>
              <td>Idem</td>
            </tr>
            <tr>
              <td>1 verhuureenheid met 10 tot 12 slaapplaatsen, wél in een groter bouwgeheel</td>
              <td>bijlage 2/1</td>
              <td>De burgemeester, na controle door de brandweer</td>
            </tr>
            <tr>
              <td>Meer dan 5 verhuureenheden of meer dan 12 slaapplaatsen</td>
              <td>bijlage 3</td>
              <td>De burgemeester, na controle door de brandweer</td>
            </tr>
          </tbody>
        </table>
        <p>Bron: Toerisme Vlaanderen, brandveiligheid in logies.</p>
        <p>
          Voor de meeste woningen in de moroww-collectie ligt de grens bij twaalf
          slaapplaatsen. Zit je daarboven, dan verschuift je dossier naar bijlage 3 en
          naar de brandweer, met zwaardere eisen rond compartimentering en evacuatie. Dat
          is een reëel verschil in kost en doorlooptijd, en het is een van de redenen om
          goed na te denken voor je een extra slaapplaats toevoegt.
        </p>

        <Cta
          kind="vraag"
          intro="De telling van slaapplaatsen luistert nauw, en of je woning deel uitmaakt van een groter bouwgeheel bepaalt onder welke bijlage je valt."
        />

        <H2Section titel="Stappenplan" />
        <ol>
          <li><strong>Bepaal je bijlage</strong> aan de hand van de tabel hierboven.</li>
          <li><strong>Dien de aanvraag in</strong> bij de juiste instantie. Heeft je gemeente of hulpverleningszone een e-loket, gebruik dat. Anders het modelformulier van Toerisme Vlaanderen, gericht aan de burgemeester.</li>
          <li><strong>Verzamel je keuringen en onderhoudsattesten.</strong> De brandweer vraagt ze op tijdens de controle: elektriciteit, verwarming, schoorsteen en rookkanalen, gasinstallatie. De geldigheidstermijnen verschillen per installatie, dus check ze stuk voor stuk.</li>
          <li><strong>Wees aanwezig bij het controlebezoek</strong> en vraag om een snelle aflevering van het verslag.</li>
          <li><strong>Werk de opmerkingen weg</strong> en vraag een tweede bezoek aan als dat nodig is.</li>
          <li><strong>Bewaar het attest zichtbaar en beschikbaar.</strong> Toerisme Vlaanderen kan er op elk moment naar vragen.</li>
        </ol>
        <p>
          De beslissing volgt binnen twee maanden na ontvangst van de aanvraag. De
          doorlooptijd van eerste aanvraag tot afgeleverd attest is in de praktijk veel
          langer, omdat er tussentijds werken uitgevoerd moeten worden en een tweede
          controle nodig is. Begin er ruim voor je eerste geplande verhuur aan.
        </p>
        <p>
          Kan je woning bouwkundig niet aan een norm voldoen, dan kan je een afwijking
          aanvragen bij de Technische Commissie Brandveiligheid. Je stelt daarbij zelf een
          alternatief voor dat een gelijkwaardig veiligheidsniveau biedt, met het
          brandweerverslag erbij.
        </p>

        <H2Section titel="Vier dingen die eigenaars over het hoofd zien" />
        <p>
          <strong>Je attest A kan vervallen zonder dat er acht jaar voorbij zijn.</strong>{' '}
          Het vervalt van rechtswege bij onder meer: uitbreiding van het aantal
          verhuureenheden, bouwkundige wijziging van de indeling van bestaande
          verhuureenheden, wijziging van de evacuatiemogelijkheden of het traject ervan,
          en de installatie, vernieuwing of uitbreiding van het elektriciteitsnet. Bij
          logies onder bijlage 3 ook bij uitbreiding van het aantal slaapplaatsen. Een
          verbouwing die je als een opknapbeurt ziet, kan je attest ongeldig maken.
        </p>
        <p>
          <strong>Sloten op de evacuatieweg.</strong> Op het evacuatietraject mag een raam
          of deur niet afsluitbaar zijn met een slot waarvoor een sleutel nodig is. Een
          paniekbeslag of een draaiknopcilinder is wel toegestaan. Dit raakt rechtstreeks
          aan slimme sloten en aan sleutelkastjes: het slot moet van binnenuit te openen
          zijn zonder sleutel, code of telefoon. Wij controleren dat bij elke audit, en
          het is een van de punten waarop woningen effectief afvallen.
        </p>
        <p>
          <strong>Brandblussers schalen mee met je oppervlakte.</strong> Per toeristisch
          logies is er per 150 m² minstens één schuim- of poederblusser nodig van minstens
          6 liter of 6 kilogram, geplaatst in de woning of in de onmiddellijke nabijheid.
          Een woning van 320 m² heeft er dus meerdere nodig, niet één bij de voordeur.
        </p>
        <p>
          <strong>Brandinstructies in vier talen.</strong> De instructies voor je gasten
          moeten beschikbaar zijn in het Nederlands, Frans, Duits en Engels.
        </p>

        <H2Section titel="Wat moroww hiermee doet" />
        <p>
          Een geldig positief attest is bij ons een voorwaarde voor opname, geen
          aandachtspunt. Geen attest betekent geen collectie, ook als de woning verder
          uitstekend is.
        </p>
        <p>
          Bij de audit noteren we het attesttype, het aantal toegelaten slaapplaatsen en
          de vervaldatum. Die datum staat in het systeem, en je krijgt ruim op voorhand
          een signaal in plaats van een probleem. Bij de heraudit kijken we of er sinds de
          vorige controle werken zijn uitgevoerd die het attest van rechtswege konden doen
          vervallen.
        </p>
        <p>
          Dat is het verschil tussen een label en een boekingskanaal. Een platform vraagt
          nooit naar je attest. Wij komen kijken, en we komen terug.
        </p>
        <p>Van de woningen die we tot nu toe bekeken, haalde het overgrote deel de standaard niet.</p>

        <Cta kind="poortentoets" />

        <Faq
          items={[
            {
              vraag: 'Volstaat één attest voor een gebouw met twee vakantiewoningen?',
              antwoord:
                'Nee. Een vakantiewoning is altijd één verhuureenheid en elke vakantiewoning moet beschikken over een eigen, individueel brandveiligheidsattest.',
            },
            {
              vraag: 'Ik verhuur maar een paar weekends per jaar. Geldt dit ook voor mij?',
              antwoord:
                'Ja. Het logiesdecreet maakt geen onderscheid tussen professionele en occasionele verhuur. Zodra je tegen betaling toeristen laat overnachten en je verblijf publiek bekendmaakt, val je onder de regels.',
            },
            {
              vraag: 'Mijn attest A dateert van 2019. Tot wanneer loopt het?',
              antwoord:
                'Acht jaar vanaf de afleveringsdatum, dus tot 2027, tenzij het eerder van rechtswege verviel door werken. Attesten uitgereikt tussen 1 april 2017 en 31 december 2022 behouden hun geldigheidsduur van acht jaar, ook als de toepasselijke bijlage ondertussen wijzigde, tenzij je de uitbating hebt gewijzigd of er kamers of slaapplaatsen zijn bijgekomen.',
            },
            {
              vraag: 'Wat kost een brandveiligheidsattest?',
              antwoord:
                'Voor het attest zelf rekent de gemeente doorgaans geen of een beperkte retributie aan; bij een controle door een keuringsinstantie betaal je die instantie. De echte kost zit in de aanpassingswerken die uit de controle volgen. Reken op een marge, niet op nul.',
            },
            {
              vraag: 'Mag ik al verhuren terwijl mijn aanvraag loopt?',
              antwoord:
                'Je moet je logies eerst aanmelden bij Toerisme Vlaanderen. Je hoeft niet te wachten op een controlebezoek om je eerste gasten te ontvangen, maar het decreet verplicht wel dat je over een positief brandveiligheidsattest beschikt. Vraag het dus aan voor je start en laat je vooraf adviseren.',
            },
            {
              vraag: 'Wat gebeurt er als ik geen attest heb?',
              antwoord:
                'Toerisme Vlaanderen voert steekproefsgewijs controles uit en kan het attest opvragen. Wie niet voldoet aan de voorwaarden riskeert een administratieve geldboete die kan oplopen tot € 25.000. Sommige gemeenten belasten niet-aangemelde logies bovendien aan een hoger tarief.',
            },
          ]}
        />

        <Cta kind="gesprek" />

        <VerderLezen
          items={[
            {
              href: '/kennis/verblijfsbelasting-vakantiewoning',
              title: 'Verblijfsbelasting per gemeente',
              eyebrow: 'regels en vergunningen',
            },
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
          ]}
        />

        <Actualiteitsblok
          nagekekenOp="19 augustus 2026"
          bron="Toerisme Vlaanderen (brandveiligheid in logies, basisnormen), besluit van de Vlaamse Regering tot vaststelling van de specifieke brandveiligheidsnormen voor toeristische logies"
        />
      </ArticleLayout>
    </>
  )
}
