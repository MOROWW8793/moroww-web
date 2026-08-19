// Uitgeschreven detail-content per gemeente.
import { H2Section } from '@/components/kennis/H2Section'
//
// Alleen gemeenten waarvan we méér dan tarief en link publiceren, staan hier.
// De rest krijgt een generiek sjabloon in de page-component. Wanneer je een
// nieuwe gemeente handmatig uitwerkt, voeg je een entry toe aan
// `GEMEENTE_CONTENT`; de pagina pikt hem automatisch op.

import type { ReactNode } from 'react'

export interface GemeenteExtra {
  /** Vervangt het generieke antwoord bovenaan (indien aanwezig). */
  korteAntwoord?: string
  /** Volledig eigen body — vervangt de gegenereerde tabel + uitleg. */
  body?: ReactNode
  /** Overschrijft de <title>. */
  metaTitel?: string
  /** Overschrijft de meta-description. */
  metaBeschrijving?: string
}

export const GEMEENTE_CONTENT: Record<string, GemeenteExtra> = {
  oostende: {
    metaTitel:
      'Verblijfsbelasting vakantiewoning Oostende 2026 · € 825 of € 275 · moroww',
    metaBeschrijving:
      'Oostende heft € 825 per verblijfseenheid per jaar, of € 275 bij occasionele verhuur tot 120 dagen. Aangifte, vrijstellingen en doorrekening aan gasten.',
    korteAntwoord:
      'Stad Oostende heft een verblijfsbelasting van € 825 per kamer of verblijfseenheid per jaar voor logies die permanent op de toeristische markt worden aangeboden. Voor occasionele vakantieverhuur, beperkt tot maximaal 120 dagen per jaar, bedraagt de belasting € 275 per jaar. Het bedrag is betaalbaar per kwartaal. Sinds 1 juli 2025 geldt de belasting voor alle logiesverstrekkers, niet enkel hotels.',
    body: (
      <>
        <H2Section titel="De tarieven" />
        <table>
          <tbody>
            <tr><th>Permanent op de toeristische markt</th><td>€ 825 per kamer of verblijfseenheid per jaar</td></tr>
            <tr><th>Occasionele vakantieverhuur, max. 120 dagen per jaar</th><td>€ 275 per kamer of verblijfseenheid per jaar</td></tr>
            <tr><th>Betaling</th><td>forfaitair bedrag, betaalbaar per kwartaal. Te betalen binnen twee maanden na verzending van het aanslagbiljet</td></tr>
            <tr><th>Doorrekenbaar aan de gast</th><td>maximaal € 4,72 exclusief btw per kamer of verblijfseenheid per nacht</td></tr>
            <tr><th>Aangifte</th><td>verplicht voor elke logiesverstrekker. De aangifte blijft geldig tot herroeping. Elke wijziging binnen veertien dagen schriftelijk melden</td></tr>
            <tr><th>Sanctie</th><td>verhoging met 50 % bij een eerste overtreding, 100 % bij herhaling</td></tr>
          </tbody>
        </table>

        <H2Section titel="Wat er veranderde op 1 juli 2025" />
        <p>
          Tot dan gold de verblijfsbelasting in Oostende vooral voor hotels. Sinds 1 juli
          2025 is het toepassingsgebied uitgebreid naar alle aanbieders van toeristische
          logies op het Oostendse grondgebied, dus ook naar B&amp;B&apos;s en vakantiewoningen.
          Het stadsbestuur motiveerde dat met een gelijk speelveld voor alle
          logiesverstrekkers.
        </p>
        <p>
          Er zit een tweede laag onder die maatregel die je moet kennen. Oostende gebruikt
          de aangiftes ook om zicht te krijgen op de impact van vakantieverhuur op de
          beschikbare woningen, en de stad werkt aan een beleidsvisie over
          vakantiewoningen waarin bepaald wordt waar vakantieverhuur in Oostende nog
          mogelijk zal zijn.
        </p>
        <p>
          Voor wie vandaag een pand in Oostende koopt met verhuur als doel, is dat het
          belangrijkste punt op deze pagina. De belasting is een kost. Een beleidsvisie
          die de zone bepaalt, is een risico op je businessmodel.
        </p>

        <H2Section titel="Vrijstellingen" />
        <p>
          Erkende jeugdherbergen, jeugdverblijfscentra en verblijven binnen het kader van
          Toerisme voor Allen vallen niet onder deze belasting. Logies die tijdelijk en
          minstens dertig dagen gesloten zijn voor renovatie kunnen pro rata vrijgesteld
          worden, op voorwaarde dat dit vooraf correct gemeld wordt aan het stadsbestuur.
        </p>
        <p>Let op de volgorde in die laatste zin. Vooraf melden, niet achteraf rechtzetten.</p>

        <H2Section titel="Wat je in Oostende nog meer moet regelen" />
        <p>De verblijfsbelasting is één van vier zaken:</p>
        <ol>
          <li>Aanmelden bij Toerisme Vlaanderen, verplicht, gratis, via het uitbatersportaal</li>
          <li>Registreren als tweede verblijf bij de stad</li>
          <li>Aangifte doen van de verblijfsbelasting</li>
          <li>Een geldig brandveiligheidsattest in bezit hebben</li>
        </ol>
        <p>
          Ook de uitbating moet verzekerd zijn, niet enkel het pand. Een gewone brandpolis
          dekt toeristische verhuur niet automatisch. Laat dat bevestigen door je
          makelaar.
        </p>
      </>
    ),
  },

  'knokke-heist': {
    metaTitel:
      'Logiesbelasting vakantiewoning Knokke-Heist · € 250 per slaapplaats · moroww',
    metaBeschrijving:
      'Knokke-Heist belast vakantiewoningen per slaapplaats per jaar, niet via de tweedeverblijfstaks. Tarieven, het verschil tussen beide belastingen en de lopende procedures.',
    korteAntwoord:
      'Knokke-Heist belast vakantiewoningen via het reglement op het verstrekken van toeristische logies, niet via de belasting op tweede verblijven. Het tarief wordt berekend per slaapplaats per jaar: € 250 voor vakantiewoningen, € 125 per hotelkamer en € 500 voor logies die niet aangemeld of erkend zijn in het basisregister. De gemeenteraad keurde op 27 november 2025 een nieuw reglement goed; controleer de tarieven voor 2026 in dat uittreksel.',
    body: (
      <>
        <H2Section titel="Hoe de berekening werkt" />
        <p>
          De maximumcapaciteit van je logies, dus het aantal slaapplaatsen, wordt
          vermenigvuldigd met het tarief van je categorie.
        </p>
        <table>
          <thead>
            <tr><th>Categorie</th><th>Tarief per slaapplaats per jaar</th></tr>
          </thead>
          <tbody>
            <tr><td>Vakantiewoning</td><td>€ 250</td></tr>
            <tr><td>Hotelkamer</td><td>€ 125</td></tr>
            <tr><td>Informeel logies, niet aangemeld of erkend</td><td>€ 500</td></tr>
          </tbody>
        </table>
        <p>Een vakantiewoning met acht slaapplaatsen komt daarmee op € 2.000 per jaar. Ongeacht de bezetting.</p>
        <p>
          Merk op wat het derde tarief doet. Wie niet aanmeldt bij Toerisme Vlaanderen
          betaalt in Knokke-Heist het dubbele. De aanmelding zelf is gratis en online in
          enkele minuten geregeld. Dit is de duurste administratieve nalatigheid aan de
          kust.
        </p>

        <H2Section titel="Logiesbelasting of tweedeverblijfstaks?" />
        <p>
          Dit is waar het in Knokke-Heist misloopt bij eigenaars. Woningen die als
          vakantiewoning verhuurd worden, vallen onder het belastingreglement op de
          logies en níet onder de belasting op tweede verblijven. Twee reglementen, twee
          dossiers, en je hoort in het juiste te zitten.
        </p>
        <p>
          Ter vergelijking: de tweedeverblijfstaks bedraagt in 2026 € 990, tegenover
          € 810 in 2025, met een verdere indexering tot € 1.090 tegen 2031.
        </p>
        <p>
          Welk van de twee voor jou goedkoper uitvalt, hangt af van het aantal
          slaapplaatsen. Bij vier slaapplaatsen kom je onder het logiesreglement lager
          uit dan de tweedeverblijfstaks. Bij acht ruim erboven. Dat is geen keuze die je
          maakt: ze volgt uit hoe je de woning gebruikt. Maar het verklaart waarom
          sommige eigenaars aan de kust hun verhuur bewust beperkt houden.
        </p>

        <H2Section titel="De lopende procedures" />
        <p>
          Rond de tweedeverblijfstaks in Knokke-Heist loopt al jaren een juridisch
          geschil. De kern: vaste inwoners van Knokke-Heist betalen geen aanvullende
          gemeentebelasting op de personenbelasting, terwijl tweedeverblijvers wel belast
          worden. Volgens de eisers schendt dat het gelijkheidsbeginsel.
        </p>
        <p>De stand van zaken, chronologisch:</p>
        <table>
          <thead>
            <tr><th>Wanneer</th><th>Wat</th></tr>
          </thead>
          <tbody>
            <tr><td>2023</td><td>Het hof van beroep in Gent oordeelt dat de taks ongrondwettig is</td></tr>
            <tr><td>januari 2026</td><td>Het Hof van Cassatie verbreekt dat arrest, maar spreekt zich enkel uit over de procedure, niet over de inhoud</td></tr>
            <tr><td>februari 2026</td><td>De gemeenteraad keurt een nieuw belastingreglement goed dat rekening houdt met de recente rechtspraak</td></tr>
            <tr><td>mei 2026</td><td>Het hof van beroep in Gent verklaart de taks opnieuw onwettig</td></tr>
            <tr><td>2026</td><td>Er lopen vernietigingsberoepen bij de Raad van State tegen de nieuwe reglementen van Knokke, Koksijde en De Panne</td></tr>
          </tbody>
        </table>
        <p>
          Wat dit voor jou betekent: als je een aanslag ontvangt en die wil betwisten,
          moet dat via een bezwaarschrift bij het college van burgemeester en schepenen,
          in te dienen binnen drie maanden vanaf de derde werkdag na verzending van het
          aanslagbiljet. Elke belasting moet apart betwist worden.
        </p>
        <p>
          moroww neemt hierin geen standpunt in en verleent geen juridisch advies. We
          zetten het hier omdat een eigenaar die vandaag een aanslag krijgt, moet weten
          dat de termijn kort is.
        </p>
      </>
    ),
  },
}
