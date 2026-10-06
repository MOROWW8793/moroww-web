// Algemene voorwaarden voor gasten, v1.3. Bron: het document "Algemene
// Voorwaarden voor gasten — v1.3". Wijzigingen eerst daar, dan hier — en de
// versie ophogen, want gasten aanvaarden een specifieke versie bij boeking.

export const VOORWAARDEN_VERSIE = '1.3'

export interface Artikel {
  titel: string
  leden: (string | string[])[]
}

export interface Deel {
  titel: string
  artikelen: Artikel[]
}

export interface Voorwaarden {
  titel: string
  intro: string[]
  delen: Deel[]
  voet: string[]
}

const nl: Voorwaarden = {
  titel: 'Algemene voorwaarden voor gasten',
  intro: [
    'Van toepassing op elk verblijf in een moroww-woning dat geboekt wordt via www.moroww.com of via een ander boekingskanaal waarop moroww de woning aanbiedt.',
    'Versie 1.3 — oktober 2026. Vervangt versie 1.2.',
  ],
  delen: [
    {
      titel: 'Deel A — Definities en toepassingsgebied',
      artikelen: [
        {
          titel: 'Artikel 1. Definities',
          leden: [
            [
              '"moroww" of "wij": moroww BV, een besloten vennootschap naar Belgisch recht, gevestigd te Neerstraat 10, 8790 Waregem, België, ondernemingsnummer BE1030.667.956.',
              '"Platform": de digitale en fysieke diensten van moroww, waaronder www.moroww.com, de tech-stack en de bijhorende communicatiekanalen.',
              '"Host": de eigenaar of rechtmatige gebruiker van een woning in de moroww-collectie, die de woning verhuurt.',
              '"Gast": elke natuurlijke persoon die een verblijf boekt in een moroww-woning.',
              '"Woning": een privé-vakantiewoning die door moroww is gecertificeerd en opgenomen in de collectie.',
              '"moroww-label": het kwaliteitslabel dat moroww toekent aan woningen die voldoen aan het certificeringsprotocol.',
              '"Tech-stack": de door moroww geïnstalleerde technologie in de woning, waaronder smart lock, geluidsmonitor, sfeerautomatisering, geurverspreider en bijhorende software.',
              '"Verblijf": de aaneengesloten periode waarvoor een gast een reservering heeft gemaakt.',
              '"Totaalbedrag": de prijs van het verblijf zoals getoond bij boeking, inclusief schoonmaakkosten, btw, toeristenbelasting en eventuele optionele toeslagen.',
              '"Boekingskanaal": www.moroww.com, Airbnb, Booking.com of een ander kanaal waarop de woning via moroww wordt aangeboden.',
              '"Directe boeking": een boeking die de gast plaatst en betaalt op www.moroww.com.',
            ],
          ],
        },
        {
          titel: 'Artikel 2. Toepassingsgebied',
          leden: [
            '2.1 Deze voorwaarden zijn van toepassing op alle rechtsverhoudingen tussen moroww en gasten.',
            '2.2 Bij een directe boeking aanvaardt de gast deze voorwaarden uitdrukkelijk door ze aan te vinken vóór de betaling. Bij een boeking via een ander boekingskanaal gelden deze voorwaarden naast die van dat kanaal.',
            '2.3 moroww mag deze voorwaarden wijzigen. Wijzigingen worden minstens 30 dagen vóór inwerkingtreding bekendgemaakt op www.moroww.com. Bestaande boekingen blijven onder de voorwaarden die golden bij boeking.',
          ],
        },
        {
          titel: 'Artikel 2bis. Rol van moroww',
          leden: [
            '2bis.1 moroww is een kwaliteitslabel en levert technologische en boekingsinfrastructuur. moroww certificeert woningen en stelt het boekingskanaal, de tech-stack en een ondersteuningslijn ter beschikking.',
            '2bis.2 De huurovereenkomst komt rechtstreeks tot stand tussen de host, als verhuurder, en de gast. moroww is geen verhuurder en geen partij bij die huurovereenkomst.',
            '2bis.3 De host is verantwoordelijk voor de staat en veiligheid van de woning en voor de naleving van de regelgeving die op de verhuur van toepassing is.',
            '2bis.4 Bij een directe boeking int moroww de verschuldigde bedragen in naam en voor rekening van de host. Een betaling aan moroww geldt als betaling aan de host. moroww wordt hierdoor geen partij bij de huurovereenkomst.',
          ],
        },
      ],
    },
    {
      titel: 'Deel B — Boeking en verblijf',
      artikelen: [
        {
          titel: 'Artikel 3. De boeking',
          leden: [
            '3.1 Een boeking is definitief na een schriftelijke bevestiging van moroww of van het boekingskanaal. Bij een directe boeking is dat de bevestiging met boekingscode op het scherm en per e-mail.',
            '3.2 De gast verklaart dat de opgegeven gegevens juist en volledig zijn. moroww mag een boeking weigeren of annuleren als die gegevens onjuist blijken of de boeking niet voldoet aan de screeningscriteria van moroww.',
            '3.3 De gast die boekt, is de hoofdboeker en is verantwoordelijk voor de naleving van deze voorwaarden door alle meereizende personen.',
            '3.4 Het maximale aantal personen staat op de woningpagina. Bij overschrijding mogen moroww en de host de toegang weigeren of het verblijf beëindigen zonder terugbetaling.',
            '3.5 De hoofdboeker is meerderjarig op het moment van boeken.',
          ],
        },
        {
          titel: 'Artikel 4. Betaling',
          leden: [
            '4.1 Een boeking via een ander boekingskanaal wordt betaald volgens de regels van dat kanaal. Een directe boeking wordt betaald met een betaalkaart via Stripe. Kaartgegevens worden rechtstreeks door Stripe verwerkt; moroww ontvangt of bewaart ze niet.',
            '4.2 Bij een directe boeking betaalt de gast 50% van het totaalbedrag bij boeking. Het saldo van 50% is verschuldigd uiterlijk 30 dagen vóór aankomst. Bij een boeking binnen 30 dagen vóór aankomst is het volledige totaalbedrag verschuldigd bij boeking.',
            '4.3 Het saldo wordt op de vervaldag automatisch aangerekend op de betaalkaart die bij boeking werd gebruikt. Het bedrag en de vervaldag staan in de bevestiging.',
            '4.4 Is het saldo 7 dagen vóór aankomst niet betaald, dan wordt de boeking geannuleerd en vervalt het betaalde voorschot.',
            '4.5 Alle prijzen zijn inclusief btw en toeristenbelasting.',
          ],
        },
        {
          titel: 'Artikel 5. Annulering door de gast',
          leden: [
            '5.1 Voor een boeking via een ander boekingskanaal geldt het annuleringsbeleid van dat kanaal.',
            '5.2 Voor een directe boeking geldt:',
            [
              'Annulering tot 14 dagen vóór aankomst: volledige terugbetaling van alle betaalde bedragen.',
              'Annulering binnen 14 dagen vóór aankomst of no-show: geen terugbetaling.',
            ],
            '5.3 Annuleren gebeurt schriftelijk via info@moroww.com. De datum van ontvangst is bepalend. Terugbetalingen gebeuren op de gebruikte betaalkaart.',
            '5.4 moroww is niet verantwoordelijk voor externe omstandigheden die een verblijf verhinderen, tenzij moroww zelf de oorzaak is.',
            '5.5 Het herroepingsrecht voor overeenkomsten op afstand geldt niet voor accommodatie op een specifieke datum, conform artikel VI.53, 12° van het Wetboek van economisch recht en artikel 16(l) van Richtlijn 2011/83/EU.',
          ],
        },
        {
          titel: 'Artikel 6. Annulering door moroww of de host',
          leden: [
            '6.1 Annuleert moroww of de host een bevestigde boeking, dan krijgt de gast alle betaalde bedragen volledig terug.',
            '6.2 moroww spant zich in om een gelijkwaardig alternatief in de moroww-collectie voor dezelfde periode aan te bieden. De gast is niet verplicht dat alternatief te aanvaarden.',
            '6.3 moroww is niet aansprakelijk voor gevolgschade, zoals reiskosten of andere geboekte diensten, tenzij de annulering rechtstreeks te wijten is aan een fout van moroww.',
          ],
        },
        {
          titel: 'Artikel 7. Gedragsregels',
          leden: [
            '7.1 De gast gebruikt de woning als een voorzichtig en redelijk persoon, met respect voor het eigendom, de omgeving en de buurt.',
            '7.2 Tenzij de host schriftelijk toestemming gaf, zijn verboden:',
            [
              'feesten, evenementen of bijeenkomsten met meer personen dan geboekt;',
              'commercieel gebruik van de woning of de faciliteiten;',
              'roken in de woning;',
              'huisdieren in woningen die niet als huisdiervriendelijk zijn aangeduid;',
              'activiteiten die de openbare orde of de rust van de buurt verstoren.',
            ],
            '7.3 De woning heeft een geluidsmonitor die uitsluitend decibelwaarden meet. Bij overschrijding van de geluidsnormen tussen 22:00 en 08:00 kan moroww de gast contacteren. Bij herhaalde of ernstige overschrijding kan het verblijf zonder terugbetaling worden beëindigd.',
            '7.4 De gast laat de woning bij vertrek achter zoals hij ze aantrof, volgens de instructies in het digitale gasthandboek.',
            '7.5 Schade door de gast of meereizende personen wordt aangerekend op basis van de werkelijke herstelkosten. moroww meldt vastgestelde schade schriftelijk binnen 48 uur na vertrek.',
          ],
        },
        {
          titel: 'Artikel 8. Aankomst en vertrek',
          leden: [
            '8.1 De gast krijgt toegang via een smart lock of sleutelkluis. De toegangscode volgt uiterlijk 24 uur vóór aankomst per e-mail of bericht.',
            '8.2 Inchecken kan vanaf het uur op de woningpagina en in de bevestiging. Vroeger inchecken kan alleen na schriftelijke bevestiging.',
            '8.3 Uitchecken gebeurt uiterlijk om het uur op de woningpagina en in de bevestiging. Laattijdig vertrek kan worden aangerekend aan €50 per begonnen uur.',
            '8.4 Werkt de toegang niet, dan contacteert de gast meteen de 24/7-lijn van moroww. moroww zorgt binnen 2 uur voor een werkende toegang of een gelijkwaardig alternatief verblijf. Lukt dat niet, dan krijgt de gast het volledige totaalbedrag terug.',
          ],
        },
        {
          titel: 'Artikel 9. Klachten',
          leden: [
            '9.1 Klachten over de staat van de woning bij aankomst meldt de gast binnen 2 uur na inchecken via de 24/7-lijn van moroww.',
            '9.2 Later gemelde klachten kunnen onontvankelijk zijn, tenzij ze gaan over gebreken die bij aankomst niet zichtbaar waren.',
            '9.3 moroww neemt de klacht in ontvangst, brengt gast en host in contact en volgt de afhandeling op, zonder partij te worden bij de huurovereenkomst.',
            '9.4 moroww beoordeelt per geval of een gedeeltelijke terugbetaling of een alternatief redelijk is. Er is geen automatische compensatie.',
            '9.5 Consumenten kunnen ook terecht bij de Consumentenombudsdienst (www.consumentenombudsdienst.be) of het Meldpunt van de FOD Economie (meldpunt.belgie.be).',
          ],
        },
      ],
    },
    {
      titel: 'Deel C — Aansprakelijkheid en privacy',
      artikelen: [
        {
          titel: 'Artikel 10. Aansprakelijkheid van moroww',
          leden: [
            '10.1 moroww is niet aansprakelijk voor schade die voortvloeit uit het verblijf zelf, behalve bij opzet of grove nalatigheid van moroww.',
            '10.2 moroww garandeert de kwaliteit van een woning op het moment van certificering, niet wijzigingen tussen twee audits die de host niet tijdig heeft gemeld.',
            '10.3 moroww is aansprakelijk voor aantoonbare schade door technische uitval van de tech-stack, als moroww niet binnen de termijn van artikel 8.4 een oplossing biedt.',
            '10.4 De totale aansprakelijkheid van moroww tegenover een gast is beperkt tot het totaalbedrag van het betrokken verblijf.',
          ],
        },
        {
          titel: 'Artikel 11. Persoonsgegevens',
          leden: [
            '11.1 moroww verwerkt persoonsgegevens volgens de AVG (GDPR) en het Belgische recht. Het privacybeleid staat op www.moroww.com/privacy.',
            '11.2 moroww gebruikt contact- en verblijfsgegevens van de gast voor de uitvoering van de boeking en de kwaliteitsopvolging. Bij een directe boeking worden ze daarvoor gedeeld met Guesty (reserveringssysteem), Stripe (betalingen) en de host. Voor marketing vraagt moroww afzonderlijk toestemming.',
            '11.3 De geluidsmonitor meet uitsluitend decibelwaarden. Er wordt geen geluid, stem of gesprek opgenomen.',
            '11.4 Wie een review of andere inhoud deelt via het platform, geeft moroww een niet-exclusieve, kosteloze licentie om die te gebruiken in communicatie en marketing.',
            '11.5 De gast heeft recht op inzage, correctie en verwijdering van zijn gegevens via info@moroww.com.',
          ],
        },
      ],
    },
    {
      titel: 'Deel D — Overige bepalingen',
      artikelen: [
        {
          titel: 'Artikel 12. Intellectuele eigendom',
          leden: [
            "Het moroww-label, de merknaam, het logo, de foto's en de teksten op het platform zijn eigendom van moroww BV en mogen niet zonder toestemming worden gebruikt.",
          ],
        },
        {
          titel: 'Artikel 13. Overmacht',
          leden: [
            '13.1 Geen van de partijen is aansprakelijk voor niet-nakoming door overmacht: een omstandigheid buiten haar redelijke controle, zoals overheidsmaatregelen, pandemieën, natuurrampen, brand of ernstige storingen bij externe dienstverleners.',
            '13.2 Wie zich op overmacht beroept, meldt dat onmiddellijk schriftelijk. Bestaande boekingen worden in overleg geregeld.',
          ],
        },
        {
          titel: 'Artikel 14. Toepasselijk recht en geschillen',
          leden: [
            '14.1 Op deze voorwaarden is Belgisch recht van toepassing.',
            '14.2 Geschillen behoren tot de bevoegdheid van de rechtbanken van West-Vlaanderen, afdeling Kortrijk, tenzij dwingend recht een andere rechter aanwijst.',
            '14.3 Partijen proberen eerst een minnelijke oplossing via schriftelijke communicatie, met een antwoordtermijn van 14 dagen. Consumenten kunnen daarnaast terecht bij de Consumentenombudsdienst (art. 9.5).',
          ],
        },
        {
          titel: 'Artikel 15. Deelbaarheid en volledigheid',
          leden: [
            '15.1 Is een bepaling nietig of niet afdwingbaar, dan blijven de andere bepalingen gelden. De bepaling wordt vervangen door een geldige die zo dicht mogelijk bij de bedoeling ligt.',
            '15.2 Deze voorwaarden en de boekingsbevestiging vormen samen de volledige overeenkomst tussen moroww en de gast.',
          ],
        },
      ],
    },
  ],
  voet: [
    'moroww BV — Neerstraat 10, 8790 Waregem — BE1030.667.956 — info@moroww.com — www.moroww.com',
  ],
}

const en: Voorwaarden = {
  titel: 'General terms and conditions for guests',
  intro: [
    'Applies to every stay in a moroww home booked via www.moroww.com or via another booking channel on which moroww offers the home.',
    'Version 1.3 — October 2026. Replaces version 1.2. In case of any discrepancy, the Dutch version prevails.',
  ],
  delen: [
    {
      titel: 'Part A — Definitions and scope',
      artikelen: [
        {
          titel: 'Article 1. Definitions',
          leden: [
            [
              '"moroww" or "we": moroww BV, a private limited company under Belgian law, registered at Neerstraat 10, 8790 Waregem, Belgium, company number BE1030.667.956.',
              '"Platform": the digital and physical services of moroww, including www.moroww.com, the tech stack and the related communication channels.',
              '"Host": the owner or lawful user of a home in the moroww collection, who rents out the home.',
              '"Guest": any natural person who books a stay in a moroww home.',
              '"Home": a private holiday home certified by moroww and included in the collection.',
              '"moroww label": the quality label moroww awards to homes that meet its certification protocol.',
              '"Tech stack": the technology moroww installs in the home, including smart lock, noise monitor, ambience automation, scent diffuser and related software.',
              '"Stay": the continuous period for which a guest has made a reservation.',
              '"Total amount": the price of the stay as shown at booking, including cleaning, VAT, tourist tax and any optional supplements.',
              '"Booking channel": www.moroww.com, Airbnb, Booking.com or any other channel on which the home is offered through moroww.',
              '"Direct booking": a booking the guest places and pays on www.moroww.com.',
            ],
          ],
        },
        {
          titel: 'Article 2. Scope',
          leden: [
            '2.1 These terms apply to all legal relationships between moroww and guests.',
            '2.2 For a direct booking, the guest expressly accepts these terms by ticking the box before payment. For a booking via another booking channel, these terms apply alongside those of that channel.',
            '2.3 moroww may amend these terms. Amendments are published on www.moroww.com at least 30 days before they take effect. Existing bookings remain subject to the terms in force at the time of booking.',
          ],
        },
        {
          titel: 'Article 2bis. Role of moroww',
          leden: [
            '2bis.1 moroww is a quality label and provides technology and booking infrastructure. moroww certifies homes and provides the booking channel, the tech stack and a support line.',
            '2bis.2 The rental agreement is concluded directly between the host, as landlord, and the guest. moroww is not the landlord and not a party to that rental agreement.',
            '2bis.3 The host is responsible for the condition and safety of the home and for compliance with the regulations that apply to the rental.',
            '2bis.4 For a direct booking, moroww collects the amounts due in the name and on behalf of the host. A payment to moroww counts as a payment to the host. This does not make moroww a party to the rental agreement.',
          ],
        },
      ],
    },
    {
      titel: 'Part B — Booking and stay',
      artikelen: [
        {
          titel: 'Article 3. The booking',
          leden: [
            '3.1 A booking is final once moroww or the booking channel confirms it in writing. For a direct booking, this is the confirmation with booking code on screen and by email.',
            "3.2 The guest declares that the information provided is correct and complete. moroww may refuse or cancel a booking if that information proves incorrect or the booking does not meet moroww's screening criteria.",
            '3.3 The guest who books is the lead guest and is responsible for all travelling companions complying with these terms.',
            "3.4 The maximum number of guests is stated on the home's page. If it is exceeded, moroww and the host may refuse access or end the stay without refund.",
            '3.5 The lead guest is of legal age at the time of booking.',
          ],
        },
        {
          titel: 'Article 4. Payment',
          leden: [
            "4.1 A booking via another booking channel is paid according to that channel's rules. A direct booking is paid by card via Stripe. Card details are processed directly by Stripe; moroww does not receive or store them.",
            '4.2 For a direct booking, the guest pays 50% of the total amount at booking. The remaining 50% is due no later than 30 days before arrival. For a booking made within 30 days of arrival, the full total amount is due at booking.',
            '4.3 The balance is charged automatically on its due date to the card used at booking. The amount and due date are stated in the confirmation.',
            '4.4 If the balance has not been paid 7 days before arrival, the booking is cancelled and the deposit paid is forfeited.',
            '4.5 All prices include VAT and tourist tax.',
          ],
        },
        {
          titel: 'Article 5. Cancellation by the guest',
          leden: [
            "5.1 For a booking via another booking channel, that channel's cancellation policy applies.",
            '5.2 For a direct booking:',
            [
              'Cancellation up to 14 days before arrival: full refund of all amounts paid.',
              'Cancellation within 14 days of arrival, or no-show: no refund.',
            ],
            '5.3 Cancellations are made in writing to info@moroww.com. The date of receipt is decisive. Refunds are made to the card used.',
            '5.4 moroww is not responsible for external circumstances that prevent a stay, unless moroww itself is the cause.',
            '5.5 The right of withdrawal for distance contracts does not apply to accommodation on a specific date, in accordance with Article VI.53, 12° of the Belgian Code of Economic Law and Article 16(l) of Directive 2011/83/EU.',
          ],
        },
        {
          titel: 'Article 6. Cancellation by moroww or the host',
          leden: [
            '6.1 If moroww or the host cancels a confirmed booking, the guest receives a full refund of all amounts paid.',
            '6.2 moroww will make reasonable efforts to offer an equivalent alternative in the moroww collection for the same period. The guest is not obliged to accept it.',
            '6.3 moroww is not liable for consequential loss, such as travel costs or other booked services, unless the cancellation is directly due to an error by moroww.',
          ],
        },
        {
          titel: 'Article 7. House rules',
          leden: [
            '7.1 The guest uses the home as a careful and reasonable person, with respect for the property, its surroundings and the neighbourhood.',
            '7.2 Unless the host has given written permission, the following are prohibited:',
            [
              'parties, events or gatherings with more people than booked;',
              'commercial use of the home or its facilities;',
              'smoking inside the home;',
              'pets in homes not marked as pet-friendly;',
              'activities that disturb public order or the peace of the neighbourhood.',
            ],
            '7.3 The home has a noise monitor that measures decibel levels only. If noise limits are exceeded between 22:00 and 08:00, moroww may contact the guest. Repeated or serious breaches may lead to the stay being ended without refund.',
            '7.4 On departure, the guest leaves the home as they found it, following the instructions in the digital guest handbook.',
            '7.5 Damage caused by the guest or travelling companions is charged at the actual cost of repair. moroww reports any damage found in writing within 48 hours of check-out.',
          ],
        },
        {
          titel: 'Article 8. Arrival and departure',
          leden: [
            '8.1 Access is via a smart lock or key safe. The access code is sent by email or message no later than 24 hours before arrival.',
            "8.2 Check-in is from the time stated on the home's page and in the confirmation. Earlier check-in is only possible after written confirmation.",
            "8.3 Check-out is no later than the time stated on the home's page and in the confirmation. Late departure may be charged at €50 per hour or part thereof.",
            "8.4 If access does not work, the guest immediately contacts moroww's 24/7 line. moroww provides working access or an equivalent alternative stay within 2 hours. If this is not possible, the guest receives a full refund of the total amount.",
          ],
        },
        {
          titel: 'Article 9. Complaints',
          leden: [
            "9.1 Complaints about the condition of the home on arrival must be reported via moroww's 24/7 line within 2 hours of check-in.",
            '9.2 Complaints reported later may be inadmissible, unless they concern defects that were not visible on arrival.',
            '9.3 moroww receives the complaint, puts guest and host in contact and follows up on its handling, without becoming a party to the rental agreement.',
            '9.4 moroww assesses case by case whether a partial refund or an alternative is reasonable. There is no automatic compensation.',
            '9.5 Consumers can also contact the Belgian Consumer Mediation Service (www.consumentenombudsdienst.be) or the FPS Economy contact point (meldpunt.belgie.be).',
          ],
        },
      ],
    },
    {
      titel: 'Part C — Liability and privacy',
      artikelen: [
        {
          titel: 'Article 10. Liability of moroww',
          leden: [
            '10.1 moroww is not liable for damage arising from the stay itself, except in the case of intent or gross negligence by moroww.',
            '10.2 moroww guarantees the quality of a home at the time of certification, not changes between two audits that the host failed to report in time.',
            '10.3 moroww is liable for demonstrable damage caused by failure of the tech stack, if moroww does not provide a solution within the period stated in Article 8.4.',
            "10.4 moroww's total liability towards a guest is limited to the total amount of the stay concerned.",
          ],
        },
        {
          titel: 'Article 11. Personal data',
          leden: [
            '11.1 moroww processes personal data in accordance with the GDPR and Belgian law. The privacy policy is available at www.moroww.com/privacy.',
            "11.2 moroww uses the guest's contact and stay details to carry out the booking and for quality follow-up. For a direct booking, these are shared for that purpose with Guesty (reservation system), Stripe (payments) and the host. moroww asks for separate consent for marketing.",
            '11.3 The noise monitor measures decibel levels only. No sound, voice or conversation is recorded.',
            '11.4 Anyone who shares a review or other content via the platform grants moroww a non-exclusive, royalty-free licence to use it in communication and marketing.',
            '11.5 The guest has the right to access, correct and delete their data via info@moroww.com.',
          ],
        },
      ],
    },
    {
      titel: 'Part D — Other provisions',
      artikelen: [
        {
          titel: 'Article 12. Intellectual property',
          leden: [
            'The moroww label, brand name, logo, photos and texts on the platform are the property of moroww BV and may not be used without permission.',
          ],
        },
        {
          titel: 'Article 13. Force majeure',
          leden: [
            '13.1 Neither party is liable for non-performance due to force majeure: a circumstance beyond its reasonable control, such as government measures, pandemics, natural disasters, fire or serious failures at external service providers.',
            '13.2 A party invoking force majeure notifies the other immediately in writing. Existing bookings are handled by mutual agreement.',
          ],
        },
        {
          titel: 'Article 14. Governing law and disputes',
          leden: [
            '14.1 These terms are governed by Belgian law.',
            '14.2 Disputes fall under the jurisdiction of the courts of West Flanders, Kortrijk division, unless mandatory law designates another court.',
            '14.3 The parties first seek an amicable solution in writing, with a response period of 14 days. Consumers can also contact the Consumer Mediation Service (Art. 9.5).',
          ],
        },
        {
          titel: 'Article 15. Severability and entire agreement',
          leden: [
            '15.1 If a provision is void or unenforceable, the other provisions remain in force. It is replaced by a valid provision as close as possible to its intent.',
            '15.2 These terms and the booking confirmation together form the entire agreement between moroww and the guest.',
          ],
        },
      ],
    },
  ],
  voet: [
    'moroww BV — Neerstraat 10, 8790 Waregem, Belgium — BE1030.667.956 — info@moroww.com — www.moroww.com',
  ],
}

export const voorwaarden: Record<'nl' | 'en', Voorwaarden> = { nl, en }
