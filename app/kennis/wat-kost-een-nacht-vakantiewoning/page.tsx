import { kennisMetadata, KENNIS_GEPUBLICEERD } from '@/lib/kennis/meta'
import { ArticleLayout } from '@/components/kennis/ArticleLayout'
import { H2Section } from '@/components/kennis/H2Section'
import { Cta, VerderLezen } from '@/components/kennis/Cta'
import { Faq } from '@/components/kennis/Faq'
import { ArticleJsonLd } from '@/components/kennis/JsonLd'
import { Register } from '@/components/Register'
import { AuditLijn } from '@/components/AuditLijn'

const URL = 'https://www.moroww.com/kennis/wat-kost-een-nacht-vakantiewoning'

export const metadata = kennisMetadata({
  titel: 'Wat kost één nacht in je vakantiewoning je echt? · kostenstructuur 2026',
  beschrijving:
    'Van bruto nachtprijs naar netto. Btw aan 12 procent sinds maart 2026, schoonmaak, linnen, energie, verblijfsbelasting, commissie en onderhoud, post per post.',
  pad: '/kennis/wat-kost-een-nacht-vakantiewoning',
})

export default function WatKostEenNachtPage() {
  return (
    <Register kant="eigenaar">
      <ArticleJsonLd
        titel="Wat kost één nacht in je vakantiewoning je echt?"
        beschrijving="Kostenstructuur van een vakantiewoning in België in 2026. Btw, schoonmaak, linnen, energie, verblijfsbelasting en commissies uitgesplitst."
        url={URL}
        datumGepubliceerd={KENNIS_GEPUBLICEERD}
        datumGewijzigd="2026-08-19"
      />

      <ArticleLayout
        eyebrow="opbrengst en rendement"
        terug={{ href: '/kennis', label: 'kennisbank' }}
        titel="Wat kost één nacht in je vakantiewoning je echt?"
        korteAntwoord="Van de nachtprijs van een vakantiewoning blijft na btw, schoonmaak, linnen, energie, verblijfsbelasting, commissies en onderhoud beduidend minder over dan de meeste eigenaars inschatten. De grootste wijziging van dit jaar is de btw op gemeubeld logies, die op 1 maart 2026 steeg van 6 naar 12 procent. Voor die btw bestaat geen drempel: wie eronder valt, is belastingplichtig vanaf de eerste euro."
      >
        <H2Section titel="De btw is het eerste wat mensen fout hebben" />
        <p>
          Dit is de belangrijkste fiscale wijziging van 2026 voor vakantieverhuur, en in
          gesprekken met eigenaars merken we dat een groot deel ze nog niet kent of denkt
          dat ze niet van toepassing is.
        </p>

        <h3>Wanneer ben je btw-plichtig?</h3>
        <p>
          De loutere verhuur van een onroerend goed is vrijgesteld van btw. Dat geldt in
          principe ook voor een vakantiewoning. Maar zodra je een verblijf van minder dan
          drie maanden aanbiedt aan dezelfde huurder én je levert minstens één van
          onderstaande diensten, spreekt de fiscus van het verschaffen van gemeubeld logies.
          Dan ben je btw-plichtig.
        </p>

        <table>
          <thead>
            <tr>
              <th>Dienst</th>
              <th>Wat de administratie eronder verstaat</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Fysiek onthaal van gasten</td>
              <td>
                Let op: persoonlijk de sleutel overhandigen en verder telefonisch bereikbaar
                zijn, geldt volgens de FAQ van de FOD Financiën uitdrukkelijk níet als
                fysiek onthaal.
              </td>
            </tr>
            <tr>
              <td>Dagelijks ontbijt verschaffen</td>
              <td></td>
            </tr>
            <tr>
              <td>Huishoudlinnen ter beschikking stellen, met vervanging minstens eenmaal per week</td>
              <td>Bed- en badlinnen tellen mee. Keukenlinnen niet.</td>
            </tr>
          </tbody>
        </table>

        <p>
          Het maakt geen verschil of je verhuurt als privépersoon, via een vennootschap of
          via een platform. Het maakt evenmin verschil of je die diensten uitbesteedt, of
          ze apart aanrekent dan wel in de prijs verwerkt.
        </p>
        <p>
          In de praktijk betekent dat het volgende: elke woning die linnen voorziet, en dat
          is elke woning op niveau, valt vrijwel zeker onder de btw-plicht. Ook zonder
          ontbijt. Ook zonder onthaal. Dat ene criterium volstaat.
        </p>

        <h3>Er is geen drempel van € 25.000</h3>
        <p>
          Dit is de tweede misvatting. Sinds 1 januari 2022 kan je voor het verschaffen van
          gemeubeld logies geen beroep meer doen op de vrijstellingsregeling voor kleine
          ondernemingen. Die uitsluiting geldt per handeling, niet per persoon: heb je
          naast je verhuur nog een andere activiteit, dan kan je voor díe activiteit wel van
          de regeling genieten, en de omzet uit je logies telt niet mee voor de drempel van
          die andere activiteit.
        </p>
        <p>Voor de verhuur zelf ben je btw-plichtig vanaf de eerste euro.</p>

        <h3>Het tarief ging naar 12 procent</h3>
        <p>
          Sinds 1 maart 2026 bedraagt het btw-tarief op het verschaffen van gemeubeld
          logies 12 procent in plaats van 6. De verhoging geldt voor hotels, motels, B&amp;B&apos;s,
          gastenkamers, vakantiewoningen met hotelmatige dienstverlening en kampeerplaatsen.
          Aan de regels die bepalen wát belastbaar is, verandert niets. Alleen het tarief.
        </p>
        <p>
          Er geldt een overgangsregeling: voor reservaties die uiterlijk op 28 februari
          2026 werden gemaakt, blijft 6 procent van toepassing, op voorwaarde dat de btw
          uiterlijk op 30 juni 2026 opeisbaar werd. Een boekingsbevestiging, een
          reservatiesysteem of een betaald voorschot geldt daarbij als bewijs. Bewaar die
          stukken; ze kunnen bij een controle opgevraagd worden.
        </p>
        <p>
          Bron: koninklijk besluit van 14 februari 2026, gepubliceerd in het Belgisch
          Staatsblad op 23 februari 2026, en de FAQ van de FOD Financiën.
        </p>

        <h3>De keerzijde is gunstig</h3>
        <p>
          Btw-plicht klinkt als een last, maar ze opent het recht op aftrek. De btw op
          verbouwing, inrichting, meubilair, linnen, onderhoud en beheer kan je
          recupereren, en die facturen dragen meestal 21 procent. Voor wie nog investeert
          in de woning, weegt dat vaak zwaarder door dan de 12 procent die je afdraagt.
        </p>
        <p>
          Wie een woning grondig aanpakt voor ze op de markt komt, doet er dus goed aan de
          btw-positie te bepalen vóór de eerste factuur binnenkomt, niet erna.
        </p>

        <Cta
          kind="vraag"
          intro="Of je onder de btw-plicht valt, hangt af van welke diensten je precies aanbiedt en hoe ze aangerekend worden."
        />

        <H2Section titel="Van bruto naar netto, post per post" />
        <p>
          Wat volgt is geen rekenblad maar een lijst van waar het misloopt. De bedragen
          verschillen te sterk per woning en per streek om er hier getallen op te plakken.
          Reken zelf per post, op basis van je oppervlakte, je bezetting en je postcode.
        </p>
        <p>
          <strong>Btw op het logies.</strong> Twaalf procent, geen drempel, en de meeste
          eigenaars hebben hun prijzen er niet op aangepast toen het tarief in maart
          wijzigde. Wie het bedrag niet doorrekende, gaf de facto zes procent van zijn
          logiesomzet weg.
        </p>
        <p>
          <strong>Schoonmaak per wissel.</strong> De klassieke fout is dat de
          schoonmaakforfait die je aan de gast aanrekent, niet dekt wat de schoonmaak
          effectief kost. Bij woningen boven de 150 m² met meerdere badkamers loopt dat
          verschil snel op tot enkele tientallen euro&apos;s per verblijf. Vermenigvuldig dat
          met vijftig wissels.
        </p>
        <p>
          <strong>Linnen.</strong> Reken niet met de aankoopprijs maar met de kost per
          wissel: wassen, drogen, strijken, transport, en de vervanging van wat versleten
          of beschadigd is. Linnen is een verbruiksgoed dat eruitziet als een investering.
        </p>
        <p>
          <strong>Verbruiksgoederen.</strong> Zeep, papier, koffie, onderhoudsproducten,
          vuilniszakken. Klein per stuk, structureel per jaar, en zichtbaar in de reviews
          zodra je erop bespaart.
        </p>
        <p>
          <strong>Energie en water.</strong> Gasten gaan niet met de thermostaat om zoals
          jij. Een woning met een groot volume en een gemiddelde isolatie is in het
          laagseizoen duur om warm te houden voor een verblijf van twee nachten.
        </p>
        <p>
          <strong>Verblijfsbelasting.</strong> Verschilt sterk per gemeente, en bij een
          forfaitair systeem per slaapplaats betaal je evenveel in een slecht jaar als in
          een goed jaar. Zie de gemeentepagina&apos;s.
        </p>
        <p>
          <strong>Platformcommissie en betaalkosten.</strong> Twee verschillende posten. De
          tweede vergeet bijna iedereen.
        </p>
        <p>
          <strong>Onderhoud en vervanging.</strong> De post die nooit in een rekenblad
          staat en altijd komt. Een matras, een zetel, een vaatwasser, een schilderbeurt.
          Zet er een jaarlijks percentage tegenover in plaats van te wachten tot het stuk
          is.
        </p>
        <p>
          <strong>Verzekering.</strong> Een gewone brandpolis dekt toeristische verhuur
          niet automatisch. En niet enkel het pand moet verzekerd zijn, ook de uitbating.
          Laat dat schriftelijk bevestigen door je makelaar; een mondelinge geruststelling
          is bij schade niets waard.
        </p>
        <p>
          <strong>Leegstand.</strong> Geen kost maar een correctie. Een woning die € 340
          per nacht vraagt en veertig procent van het jaar leegstaat, verdient minder dan
          een woning die € 260 vraagt en zeventig procent gevuld staat. Reken met wat
          effectief geboekt wordt, niet met wat je vraagt.
        </p>

        <Cta kind="poortentoets" />

        <H2Section titel="Wat moroww kost, zwart op wit" />
        <p>
          moroww is een Belgisch kwaliteitslabel voor vakantiewoningen aan de kust en op
          het platteland. Dit is wat het label kost:
        </p>

        <table>
          <tbody>
            <tr>
              <th>Commissie</th>
              <td>15 % op de logiesfare, exclusief btw en exclusief schoonmaak</td>
            </tr>
            <tr>
              <th>Collectielidmaatschap</th>
              <td>€ 149,99 per maand. Bij jaarlijkse vooruitbetaling geldt 10 % korting</td>
            </tr>
            <tr>
              <th>Onboarding</th>
              <td>eenmalig, via een pakket, afhankelijk van de omvang van de woning</td>
            </tr>
          </tbody>
        </table>

        <p>
          Dat staat hier om twee redenen. Omdat je het liever nu leest dan in maand
          drie. En omdat een label dat over de kosten van andere partijen schrijft,
          niet kan zwijgen over de eigen.
        </p>
        <p>
          Het collectielidmaatschap is geen abonnement op een dienst. Het is het
          lidmaatschap van het label: de audit, de heraudit, de standaard en het systeem
          eronder. Een woning die niet meer voldoet, verlaat de collectie. Dat is precies
          waar het lidmaatschap voor staat.
        </p>

        <Cta kind="poortentoets" />

        <Faq
          items={[
            {
              vraag: 'Ik reken de schoonmaak apart aan de gast aan. Is die dan gratis voor mij?',
              antwoord:
                'Alleen als wat je aanrekent effectief dekt wat de schoonmaak kost. Bij grote woningen is dat vaak niet zo, en het verschil komt uit je marge. Reken één keer uit wat een wissel werkelijk kost, inclusief linnen en verbruik, en vergelijk dat met je forfait.',
            },
            {
              vraag: 'Moet ik de btw doorrekenen of erin verwerken?',
              antwoord:
                'Dat is een prijszettingsbeslissing, geen fiscale. Verwerk je ze in je bestaande prijs, dan daalt je nettotarief. Reken je ze door, dan wordt het verblijf duurder voor de gast. Beide gebeuren in de markt. Wat je niet moet doen, is de beslissing uitstellen tot je btw-aangifte.',
            },
            {
              vraag: 'Geldt de verhoging naar 12 procent ook voor mij als ik geen ontbijt of onthaal doe?',
              antwoord:
                'Als je huishoudlinnen ter beschikking stelt en minstens wekelijks vervangt, wel. Dat criterium alleen volstaat om onder de belaste gemeubelde logies te vallen.',
            },
            {
              vraag: 'Ik had al boekingen staan van vóór maart. Welk tarief geldt daar?',
              antwoord:
                'Voor reservaties gemaakt uiterlijk op 28 februari 2026 blijft 6 procent van toepassing, mits de btw uiterlijk op 30 juni 2026 opeisbaar werd. Werd er pas na die datum gefactureerd of betaald, dan geldt 12 procent. Bewaar je boekingsbevestigingen.',
            },
            {
              vraag: 'Hoe zit het met de personenbelasting?',
              antwoord:
                'Bij een gemeubelde verhuur wordt de huurprijs fiscaal opgesplitst in een onroerend en een roerend deel, en de vergoeding voor bijkomende diensten wordt anders behandeld. Gaat het om een beroepsactiviteit, dan gelden weer andere regels. Dat is een gesprek met je boekhouder, niet met ons.',
            },
            {
              vraag: 'Ik heb hier een boekhouder voor.',
              antwoord:
                'Goed. Neem deze pagina mee naar dat gesprek en vraag specifiek naar je btw-positie en je recht op aftrek. Dat is meestal waar het geld zit.',
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
              href: '/kennis/tweedeverblijfsbelasting-of-logiesbelasting',
              title: 'Tweedeverblijf of logies?',
              eyebrow: 'regels en vergunningen',
            },
            {
              href: '/kennis/vakantiewoning-verhuren-zelf-platform-beheerder-label',
              title: 'Zelf, platform, beheerder of label?',
              eyebrow: 'kiezen hoe je verhuurt',
            },
          ]}
        />

        <div className="mt-16">
          <AuditLijn
            density="structural"
            items={[
              'NAGEKEKEN 19.08.2026',
              'BRON KB 14.02.2026',
              'BRON FOD FINANCIËN',
              'KWARTAALCYCLUS',
            ]}
          />
        </div>
      </ArticleLayout>
    </Register>
  )
}
