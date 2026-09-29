export type Locale = 'nl' | 'en'
export type BilingualText = { nl: string; en: string }

// Curatie-grens: gecureerde selectie, geen export. De huisstijl zegt
// letterlijk 'witruimte is je beste vriend, less is more'. Meer dan
// MAX_PHOTOS_PER_PAND in de fotos-array wordt runtime afgekapt met een
// console-warning; update de source om die warning te verhelpen.
export const MAX_PHOTOS_PER_PAND = 30

export function lw(field: BilingualText | string, locale: Locale): string {
  if (typeof field === 'string') return field
  return field[locale] ?? field.nl
}

export function lwArr(fields: (BilingualText | string)[], locale: Locale): string[] {
  return fields.map((f) => lw(f, locale))
}

export interface Woning {
  id: string
  naam: string
  collectie: 'the shore' | 'the fields'
  locatie: string
  // Optioneel: als niet gezet of 0, rendert de UI het veld helemaal niet
  // in plaats van "€0" of "0 slaapkamers" te tonen.
  prijs?: number
  slaapkamers?: number
  badkamers?: number
  maxGasten?: number
  oppervlakte?: string | null
  /** Datum van de laatste audit (ISO 'YYYY-MM-DD' of 'YYYY-MM').
   *  Optional: als leeg, toont de PandKaart geen auditdatum. */
  geauditeerdOp?: string
  tags: BilingualText[]
  slogan: BilingualText
  introductie: BilingualText
  beschrijving: BilingualText
  volledigeBeschrijving: BilingualText
  buurt?: BilingualText
  hoogtepunten: BilingualText[]
  reviews?: Array<{
    citaat: BilingualText
    naam: string
    /** ISO 'YYYY-MM' of 'YYYY-MM-DD'. Zonder datum toont de UI geen
     *  auditlijn — een auditlijn zonder echte metadata is decoratief. */
    datum?: string
  }>
  inCheckin: string
  uitCheckin: string
  heroFoto: string
  fotos: string[]
  /** Alt-teksten per foto, parallel aan `fotos` (index n hoort bij `fotos[n]`).
   *  Optioneel: als leeg of ontbrekend, valt de galerij terug op `naam`.
   *  Kortere array dan `fotos` is toegestaan; ontbrekende indexen vallen
   *  ook terug op `naam`. */
  fotoAlts?: BilingualText[]
  /** Foto tussen de secties op de pandpagina. `undefined` = default
   *  (val terug op fotos[2] resp. fotos[3]). `null` = expliciet geen foto.
   *  Een string overschrijft met een specifiek pad. */
  fotoNaBeschrijving?: string | null
  fotoNaBuurt?: string | null
  boekUrl: string
  /** Publicatiestatus. `undefined` of 'live' = zichtbaar in het raster
   *  en op de sitemap. 'wacht_op_beeld' = geauditeerd en opgenomen,
   *  wacht op de fotoshoot: telt mee in de "binnenkort"-teller op
   *  /the-shore en /collectie, maar rendert niet als kaart of pagina. */
  status?: 'live' | 'wacht_op_beeld'
  comingSoon?: boolean
  vergunningsnummer?: string
  waaromOpgenomen?: BilingualText
  // Alleen expliciet documenteerde voorzieningen. Ontbreekt een amenity in
  // deze lijst, dan komt ze ook niet in de VacationRentalJsonLd — we willen
  // geen voorzieningen bij Google claimen die het pand niet heeft.
  amenities?: string[]
}

const _woningenRaw: Woning[] = [
  {
    id: 'nosso-knokke',
    naam: 'Nosso Logies',
    collectie: 'the shore',
    locatie: 'Heist-aan-Zee, Knokke',
    prijs: 370,
    slaapkamers: 2,
    badkamers: 2,
    maxGasten: 6,
    oppervlakte: '110m²',
    geauditeerdOp: '2026-02',
    tags: [
      { nl: 'Strand op 2 min',  en: '2 min to beach' },
      { nl: 'Privé koer',       en: 'Private courtyard' },
      { nl: '2 badkamers',      en: '2 bathrooms' },
    ],
    slogan: {
      nl: 'goed slapen, goed eten, goed ademen. twee minuten van de zee.',
      en: 'sleep well, eat well, breathe well. two minutes from the sea.',
    },
    introductie: {
      nl: 'Een lichtrijk appartement van honderdtien vierkante meter in Heist-aan-Zee, op twee minuten van de Noordzee. Twee slaapkamers, twee volledige badkamers, en een privé koer aan de achterkant.',
      en: 'A bright apartment of one hundred and ten square metres in Heist-aan-Zee, two minutes from the North Sea. Two bedrooms, two full bathrooms, and a private courtyard at the back.',
    },
    beschrijving: {
      nl: 'Appartement van 110m² in Heist-aan-Zee, op twee minuten van de Noordzee. Twee slaapkamers, twee badkamers, privé koer. Max 6.',
      en: '110m² apartment in Heist-aan-Zee, two minutes from the North Sea. Two bedrooms, two bathrooms, private courtyard. Up to 6 guests.',
    },
    volledigeBeschrijving: {
      nl: 'De open leefruimte loopt door in een volledig uitgeruste keuken: oven, vaatwasser, inductiekookplaat, microgolf, koffiemachine, waterkoker, broodrooster. Aan de eettafel is er plek voor het gezelschap.\n\nDe eerste slaapkamer heeft een tweepersoonsbed. De tweede heeft een tweepersoonsbed én een stapelbed. Twee volledige badkamers, elk voorzien van kwaliteitshanddoeken, shampoo, douchegel en haardroger. In de woonkamer een smart-tv, gezelschapsspellen en snelle wifi.\n\nAan de achterkant ligt de privé koer: beschut, groen, helemaal van jou.\n\nJe laat jezelf binnen met je eigen code.',
      en: 'The open living space runs into a fully equipped kitchen: oven, dishwasher, induction hob, microwave, coffee machine, kettle, toaster. The dining table seats the group.\n\nThe first bedroom has a double bed. The second has a double bed and a bunk bed. Two full bathrooms, each with quality towels, shampoo, shower gel and hairdryer. In the living room a smart TV, board games and fast wifi.\n\nThe private courtyard sits at the back: sheltered, green, entirely yours.\n\nYou let yourself in with your own code.',
    },
    buurt: {
      nl: 'Heist-aan-Zee ligt aan het westelijke uiteinde van Knokke-Heist. Het strand ligt op twee minuten te voet: twaalf kilometer breed, van de vissershaven in Heist tot Het Zoute. De Lippenslaan en de Kustlaan van Knokke liggen op een korte tram- of fietsrit, met boetieks en terrassen. Het Zwinnatuurpark is een getijdenreservaat op de Belgisch-Nederlandse grens, voor wie wandelt of vogels kijkt. Door de polders fiets je naar Cadzand, Damme of Brugge. Met de wagen ben je op twintig minuten in Brugge.',
      en: 'Heist-aan-Zee sits at the western tip of Knokke-Heist. The beach is two minutes on foot: twelve kilometres wide, from the fishing harbour in Heist to Het Zoute. Knokke\'s Lippenslaan and Kustlaan are a short tram or bike ride away, with boutiques and terraces. The Zwin nature reserve is a tidal wetland on the Belgian-Dutch border, for walkers and birdwatchers. Through the polders you can cycle to Cadzand, Damme or Bruges. By car you are in Bruges in twenty minutes.',
    },
    hoogtepunten: [
      { nl: '110m²',                                   en: '110m²' },
      { nl: 'Twee volledige badkamers',                en: 'Two full bathrooms' },
      { nl: 'Privé koer aan de achterkant',            en: 'Private courtyard at the back' },
      { nl: 'Strand op 2 minuten te voet',             en: 'Beach 2 minutes on foot' },
      { nl: 'Volledig uitgeruste keuken',              en: 'Fully equipped kitchen' },
      { nl: 'Zelf inchecken via smart lock',           en: 'Self check-in via smart lock' },
    ],
    reviews: [
      {
        citaat: { nl: 'Een heel fijne accommodatie.', en: 'A very nice accommodation.' },
        naam: 'Lin',
      },
      {
        citaat: {
          nl: 'Het is een enorm smaakvol appartement, tot in de puntjes afgewerkt. Ruim, licht en heel luxe. Het ligt heel dicht aan zee maar toch enorm veel rust en geen enkel geluidsoverlast.',
          en: 'A very tasteful apartment, finished down to the last detail. Spacious, light and very luxurious. It sits very close to the sea and still there is complete calm — no noise at all.',
        },
        naam: 'Ragna',
        datum: '2026-08',
      },
      {
        citaat: {
          nl: 'Met zorg ingericht. Dat zie je in de details. Hogere prijsklasse, maar we zagen en voelden dat terug in het appartement.',
          en: 'Furnished with care. You see it in the details. Higher price bracket, but we saw and felt it back in the apartment.',
        },
        naam: 'Alexander',
        datum: '2026-08',
      },
    ],
    inCheckin: '15:00',
    uitCheckin: '10:00',
    heroFoto: '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-132.jpg',
    fotos: [
      '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-132.jpg',
      '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-4.jpg',
      '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-7.jpg',
      '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-11.jpg',
      '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-12.jpg',
      '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-17.jpg',
      '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-21.jpg',
      '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-29.jpg',
      '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-35.jpg',
      '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-40.jpg',
      '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-53.jpg',
      '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-59.jpg',
      '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-60.jpg',
      '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-62.jpg',
      '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-67.jpg',
      '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-68.jpg',
      '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-81.jpg',
      '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-96.jpg',
      '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-108.jpg',
      '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-109.jpg',
      '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-114.jpg',
      '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-115.jpg',
      '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-123.jpg',
      '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-124.jpg',
      '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-127.jpg',
      '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-176.jpg',
      '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-189.jpg',
      '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-195.jpg',
      '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-2 kopie.jpg',
    ],
    boekUrl: 'https://book.moroww.com/nl/properties/698c63ff3d9a2d0013fefd72?minOccupancy=1',
    // Architectuurdetail met het schaduwvlak — override op de default fotos[2].
    fotoNaBeschrijving: '/images/woningen/knokke-new/Nosso Logies_35.jpg',
    // Onder "de buurt" bewust geen foto tot er iets passends is.
    fotoNaBuurt: null,
    amenities: ['Smart lock', 'Wifi'],
  },

  {
    id: 'anna-helena-ursel',
    naam: 'Chalet Anna-Helena',
    collectie: 'the fields',
    locatie: 'Ursel, Meetjesland',
    prijs: 220,
    slaapkamers: 2,
    badkamers: 1,
    maxGasten: 5,
    oppervlakte: null,
    geauditeerdOp: '2026-04',
    tags: [
      { nl: 'Bosrand',                  en: 'Forest edge' },
      { nl: 'Privétuin met vijver',      en: 'Private garden' },
      { nl: 'Gezinsvriendelijk',         en: 'Near Bruges' },
    ],
    slogan: {
      nl: 'tussen Gent en Brugge. maar eigenlijk ergens heel anders.',
      en: 'between Ghent and Bruges. but really somewhere else entirely.',
    },
    introductie: {
      nl: 'Een authentiek houten chalet met twee verdiepingen in Ursel, in het hart van het Drongengoedbos. Twee slaapkamers, een badkamer, een ruim privéterras en een volledig omheinde privétuin met vijver.',
      en: 'An authentic wooden chalet on two floors in Ursel, in the heart of the Drongengoed forest. Two bedrooms, one bathroom, a large private terrace and a fully enclosed private garden with a pond.',
    },
    beschrijving: {
      nl: 'Houten chalet in Ursel, in het hart van het Drongengoedbos. Twee slaapkamers, een badkamer, ruim privéterras, volledig omheinde tuin met vijver. Max 5.',
      en: 'Wooden chalet in Ursel, in the heart of the Drongengoed forest. Two bedrooms, one bathroom, large private terrace, fully enclosed garden with a pond. Up to 5 guests.',
    },
    volledigeBeschrijving: {
      nl: 'De open leefruimte draait om een lichte woonkamer met grote ramen die uitkijken op de tuin. Er is een ruime leren hoeksalon en een eettafel. De volledig uitgeruste keuken heeft oven, vaatwasser, Nespresso-machine, waterkoker en broodrooster.\n\nOp de eerste verdieping liggen twee slaapkamers. De grote slaapkamer heeft een tweepersoonsbed. De tweede is afgestemd op kinderen: stapelbed, extra eenpersoonsbed, reisbedje op aanvraag. De badkamer heeft een bad, een douche en een verwarmd handdoekrek.\n\nBuiten: ruim privéterras, sfeervolle vijver, volledig omheinde tuin. Gratis parkeren voor 2 wagens op het terrein.\n\nHet chalet is bereikbaar via een onverhard bospad — rijd voorzichtig bij nat weer.',
      en: 'The open living space is built around a light living room with large windows facing the garden. There is a spacious leather corner sofa and a dining table. The fully equipped kitchen has an oven, dishwasher, Nespresso machine, kettle and toaster.\n\nOn the first floor are two bedrooms. The main bedroom has a double bed. The second is set up for children: bunk bed, extra single bed, travel cot on request. The bathroom has a bath, shower and heated towel rail.\n\nOutside: a large private terrace, a pond, a fully enclosed garden. Free parking for two cars on site.\n\nThe chalet is accessed via an unpaved forest track — drive carefully in wet weather.',
    },
    buurt: {
      nl: 'Chalet Anna-Helena ligt in het hart van het Drongengoedbos in Ursel, in het Meetjesland. Met 750 hectare is dit het grootste aaneengesloten bos van Oost-Vlaanderen: drevenstructuren, paarse heide, knuppelpaden en stille waterwegen. Meer dan 236 kilometer bewegwijzerde wandelpaden starten aan de voordeur. Voor kinderen zijn er het Kabouter Wandelpad en de natuurspeelplaatsen. De Maldegemse Veldhoek — heide en knuppelpaden — ligt in de buurt. In het dorp: Villa Maria voor diner, Bar Boudoir voor koffie, Brasserie Het Jagershof aan de bosrand. Gent en Brugge liggen op dertig en vijfentwintig minuten met de wagen. Opgelet: het chalet is bereikbaar via een onverhard bospad — rijd voorzichtig bij nat weer.',
      en: 'Chalet Anna-Helena sits in the heart of the Drongengoed forest in Ursel, in the Meetjesland. With 750 hectares it is the largest continuous forest in East Flanders: tree-lined lanes, purple heath, boardwalks and still waterways. More than 236 kilometres of marked walking paths start at the front door. For children there is the Kabouter Wandelpad and the nature playgrounds. The Maldegemse Veldhoek — heath and boardwalks — is nearby. In the village: Villa Maria for dinner, Bar Boudoir for coffee, Brasserie Het Jagershof on the forest edge. Ghent and Bruges are thirty and twenty-five minutes by car. Note: the chalet is accessed via an unpaved forest track — drive carefully in wet weather.',
    },
    hoogtepunten: [
      { nl: 'Hart van het Drongengoedbos',                    en: 'Heart of the Drongengoed forest' },
      { nl: 'Privétuin met vijver — volledig omheind',        en: 'Private garden with pond — fully enclosed' },
      { nl: 'Stapelbed, reisbedje op aanvraag',               en: 'Bunk bed, travel cot on request' },
      { nl: 'Gratis parkeren voor 2 wagens',                  en: 'Free parking for 2 cars' },
      { nl: 'Terras en balkon met bosuitkijk',                en: 'Terrace and balcony with forest view' },
      { nl: 'Gent 30 min, Brugge 25 min',                     en: 'Ghent 30 min, Bruges 25 min' },
    ],
    reviews: [
      {
        citaat: {
          nl: 'We brachten een heel aangenaam weekend door in dit mooie, comfortabele chalet. De prachtige tuin biedt een heerlijk uitzicht en de omgeving is ideaal voor een ontspannende boswandeling. Absolute aanrader.',
          en: 'We spent a wonderful weekend in this beautiful, comfortable chalet. The lovely garden offers a stunning view and the area is ideal for a relaxing forest walk. Highly recommended.',
        },
        naam: 'Jan',
      },
      {
        citaat: {
          nl: 'De rust van deze plek is ongeëvenaard. Het chalet heeft alles en meer. Kaarsen stonden ons op te wachten, het rook er heerlijk, het was verwarmd bij aankomst. We hebben ons helemaal thuis gevoeld.',
          en: 'The peace of this place is unmatched. The chalet has everything and more. Candles were waiting for us, it smelled wonderful, it was warm on arrival. We felt completely at home.',
        },
        naam: 'Sabrina',
      },
    ],
    inCheckin: '17:00',
    uitCheckin: '10:00',
    heroFoto: '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-64.jpg',
    fotos: [
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-64.jpg',
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-2.jpg',
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-3.jpg',
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-4.jpg',
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-5.jpg',
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-6.jpg',
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-7.jpg',
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-8.jpg',
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-9.jpg',
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-10.jpg',
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-11.jpg',
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-12.jpg',
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-13.jpg',
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-14.jpg',
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-15.jpg',
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-16.jpg',
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-17.jpg',
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-18.jpg',
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-19.jpg',
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-20.jpg',
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-21.jpg',
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-22.jpg',
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-23.jpg',
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-24.jpg',
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-25.jpg',
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-26.jpg',
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-27.jpg',
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-28.jpg',
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-29.jpg',
      '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-30.jpg',
    ],
    boekUrl: 'https://book.moroww.com/nl/properties/696b49bf47f69b0013026516?minOccupancy=1',
    amenities: ['Smart lock', 'Wifi', 'Eigen parking'],
  },

  {
    id: 'moroww-oostende',
    naam: 'The Sixteenth',
    collectie: 'the shore',
    locatie: 'Oostende',
    prijs: 210,
    slaapkamers: 2,
    badkamers: 2,
    maxGasten: 4,
    oppervlakte: null,
    geauditeerdOp: '2026-03',
    tags: [
      { nl: '16e verdieping',   en: '16th floor' },
      { nl: 'Zeezicht',         en: 'Sea view' },
      { nl: 'Privé parking',    en: 'Private parking' },
    ],
    slogan: {
      nl: 'hoog boven de kust. helemaal voor jullie.',
      en: 'high above the coast. entirely yours.',
    },
    introductie: {
      nl: 'Een appartement op de 16e verdieping in Oostende, met de Noordzee voor je en de Golf van Oostende naast je. Twee slaapkamers met een eigen ensuite badkamer, een panoramisch balkon, en een privé ondergrondse parking inbegrepen.',
      en: 'An apartment on the sixteenth floor in Ostend, with the North Sea in front of you and the Ostend golf course beside you. Two bedrooms with their own en-suite bathroom, a panoramic balcony, and private underground parking included.',
    },
    beschrijving: {
      nl: 'Appartement op de 16e verdieping in Oostende. Twee slaapkamers met ensuite badkamer, panoramisch balkon, privé ondergrondse parking. Max 4.',
      en: '16th-floor apartment in Ostend. Two bedrooms with en-suite bathroom, panoramic balcony, private underground parking. Up to 4 guests.',
    },
    volledigeBeschrijving: {
      nl: 'De open leefruimte baadt de hele dag in natuurlijk licht, met een salon, eethoek en een volledig uitgeruste keuken: vaatwasser, oven, koffiemachine.\n\nStap op het privébalkon en kijk uit: zonsopgang boven de golfbaan, zonsondergang boven de zee.\n\nBeide slaapkamers hebben een eigen ensuite badkamer met een inloopdouche of een bad.\n\nDe privé ondergrondse parkeerplaats is inbegrepen.',
      en: 'The open living space catches natural light all day, with a sitting area, dining corner and a fully equipped kitchen: dishwasher, oven, coffee machine.\n\nStep onto the private balcony: sunrise over the golf course, sunset over the sea.\n\nBoth bedrooms have their own en-suite bathroom with a walk-in shower or a bath.\n\nPrivate underground parking is included.',
    },
    buurt: {
      nl: 'Oostende is een kuststad met musea, restaurants, markten en boetieks. Vanaf de zestiende verdieping is er zicht rondom over zee, golf en stad. De Kusttram stopt voor de deur, van Knokke tot De Panne. Brugge bereik je in 15 minuten met de trein.',
      en: 'Ostend is a coastal city with museums, restaurants, markets and boutiques. From the sixteenth floor there is a view all around over sea, golf course and city. The coastal tram stops at the door, from Knokke to De Panne. Bruges is 15 minutes by train.',
    },
    hoogtepunten: [
      { nl: '16e verdieping — panoramisch zeezicht',        en: '16th floor — panoramic sea view' },
      { nl: 'Ensuite badkamer in elke slaapkamer',          en: 'En-suite bathroom in every bedroom' },
      { nl: 'Privé ondergrondse parking inbegrepen',        en: 'Private underground parking included' },
      { nl: 'Panoramisch balkon',                           en: 'Panoramic balcony' },
      { nl: 'Kusttram voor de deur',                        en: 'Coastal tram at the door' },
    ],
    reviews: [
      {
        citaat: {
          nl: 'Het appartement ligt op de 16e verdieping met een schitterend uitzicht, ongeacht het weer. Heel proper, mooi ingericht. Wat er echt uitsprong was de snelle en vriendelijke communicatie — we komen zeker terug.',
          en: 'The apartment is on the 16th floor with a stunning view, whatever the weather. Very clean, beautifully furnished. What really stood out was the fast and friendly communication — we\'ll definitely be back.',
        },
        naam: 'Liesbeth',
      },
      {
        citaat: {
          nl: 'Een prachtig appartement in een rustig deel van Oostende. Fantastisch zeezicht. Communicatie verliep heel vlot. We komen zeker nog terug.',
          en: 'A beautiful apartment in a quiet part of Ostend. Fantastic sea view. Communication was very smooth. We\'ll certainly return.',
        },
        naam: 'Valérie',
      },
      {
        citaat: {
          nl: 'Een uiterst proper appartement, smaakvol en modern ingericht met alle oog op comfort. Prachtig uitzicht — niks op aan te merken. Zou zeker opnieuw huren.',
          en: 'An immaculately clean apartment, tastefully and modernly furnished with every attention to comfort. Beautiful view — nothing to fault. Would definitely rent again.',
        },
        naam: 'Stephen',
      },
    ],
    inCheckin: '17:00',
    uitCheckin: '10:00',
    heroFoto: '/images/woningen/oostende-new/6e71ca30-bb8f-11f0-96ff-dd8382026135 kopie.jpg',
    fotos: [
      '/images/woningen/oostende-new/6e71ca30-bb8f-11f0-96ff-dd8382026135 kopie.jpg',
      '/images/woningen/oostende-new/6ed4b090-bb8f-11f0-b593-b7fa59eda9ac kopie.jpg',
      '/images/woningen/oostende-new/6f3e8280-bb8f-11f0-9df9-133c9daab682 kopie.jpg',
      '/images/woningen/oostende-new/6f79d4b0-bb8f-11f0-b879-599fa8385b5e kopie.jpg',
      '/images/woningen/oostende-new/6ffe6340-bb8f-11f0-81e2-97c8d345614a kopie.jpg',
      '/images/woningen/oostende-new/70a4dba0-bb8f-11f0-b9a0-3325af39a98d kopie.jpg',
      '/images/woningen/oostende-new/70ffdb90-bb8f-11f0-a90c-3b5b633348f0 kopie.jpg',
      '/images/woningen/oostende-new/71dd8490-bb8f-11f0-84c1-7f4982eb7516 kopie.jpg',
      '/images/woningen/oostende-new/72c36b20-bb8f-11f0-a453-2ba9b187f403 kopie.jpg',
      '/images/woningen/oostende-new/73b55e20-bb8f-11f0-9b40-efe250da0764 kopie.jpg',
      '/images/woningen/oostende-new/73df46f0-bb8f-11f0-98f2-593cb5634d65 kopie.jpg',
      '/images/woningen/oostende-new/74b5ea50-bb8f-11f0-806d-11c84929dee4 kopie.jpg',
      '/images/woningen/oostende-new/7640bd00-bb8f-11f0-b7ea-d9a1599a120e kopie.jpg',
      '/images/woningen/oostende-new/76a4bcf0-bb8f-11f0-a903-9bb57552af8d kopie.jpg',
      '/images/woningen/oostende-new/76d0bdf0-bb8f-11f0-9659-5b18a83d5fba kopie.jpg',
      '/images/woningen/oostende-new/77af3a80-bb8f-11f0-af23-2d4a83235607 kopie.jpg',
      '/images/woningen/oostende-new/78a76bb0-bb8f-11f0-b5dc-89e4377b09bc kopie.jpg',
      '/images/woningen/oostende-new/79ac93a0-bb8f-11f0-8bc5-659d879ac298 kopie.jpg',
      '/images/woningen/oostende-new/7a1e5ef0-bb8f-11f0-8e02-a5dc325183e4 kopie.jpg',
      '/images/woningen/oostende-new/7ab84070-bb8f-11f0-bcce-731e46b96e9d kopie.jpg',
      '/images/woningen/oostende-new/7af2b8a0-bb8f-11f0-a3be-93967557ddca kopie.jpg',
      '/images/woningen/oostende-new/7b2abb20-bb8f-11f0-937d-a538b705f9da kopie.jpg',
      '/images/woningen/oostende-new/7b939f30-bb8f-11f0-a132-bb0ab281860f kopie.jpg',
      '/images/woningen/oostende-new/7bcaa0a0-bb8f-11f0-986e-2173804c94f8 kopie.jpg',
      '/images/woningen/oostende-new/7bfa4300-bb8f-11f0-9542-3f96c9361152 kopie.jpg',
      '/images/woningen/oostende-new/7ca394b0-bb8f-11f0-bb53-5f8c9e3fee8e kopie.jpg',
      '/images/woningen/oostende-new/7cd24bd0-bb8f-11f0-a48b-cd298ada06b4 kopie.jpg',
      '/images/woningen/oostende-new/7d7c1ad0-bb8f-11f0-bfcf-d3b5274c33c6 kopie.jpg',
      '/images/woningen/oostende-new/7dcb6240-bb8f-11f0-9ad0-9bcd69b0f19a kopie.jpg',
      '/images/woningen/oostende-new/7e137780-bb8f-11f0-8c99-0f32b66097ed kopie.jpg',
    ],
    boekUrl: 'https://book.moroww.com/nl/properties/695140859e91eb0014db3eb1?minOccupancy=1',
    amenities: ['Smart lock', 'Wifi', 'Eigen parking'],
  },

  {
    id: 'cozy-relax-beernem',
    naam: 'The Cozy Relax Home',
    collectie: 'the fields',
    locatie: 'Beernem',
    prijs: 600,
    slaapkamers: 4,
    badkamers: 2,
    maxGasten: 10,
    oppervlakte: null,
    geauditeerdOp: '2026-05',
    tags: [
      { nl: 'Zwembad',          en: 'Private pool' },
      { nl: 'Hottub',           en: 'Hot tub' },
      { nl: 'Tuin met BBQ',     en: 'Max 10 guests' },
    ],
    slogan: {
      nl: 'groot genoeg voor het hele gezelschap. rustig genoeg voor de rest.',
      en: 'big enough for the whole group. quiet enough for everything else.',
    },
    introductie: {
      nl: 'Vier slaapkamers en twee badkamers in Beernem, tussen Brugge en Gent. Volledig uitgeruste keuken, overdekt terras, zwembad, hottub, vuurschaal en pétanquebaan. Ruimte voor tien gasten.',
      en: 'Four bedrooms and two bathrooms in Beernem, between Bruges and Ghent. Fully equipped kitchen, covered terrace, pool, hot tub, fire pit and pétanque court. Room for ten guests.',
    },
    beschrijving: {
      nl: 'Vakantiewoning in Beernem, tussen Brugge en Gent. Vier slaapkamers, twee badkamers, zwembad, hottub, vuurschaal en pétanquebaan. Max 10.',
      en: 'Holiday home in Beernem, between Bruges and Ghent. Four bedrooms, two bathrooms, pool, hot tub, fire pit and pétanque court. Up to 10 guests.',
    },
    volledigeBeschrijving: {
      nl: 'Binnen: vier slaapkamers met boxspringbedden en een mezzanine met twee eenpersoonsbedden. Twee badkamers — één met inloopdouche, één met ligbad — plus een apart gastentoilet. De open leefruimte bestaat uit een lichtrijke zithoek, een grote eettafel en een volledig uitgeruste keuken: vaatwasser, oven, koelkast met diepvries, microgolfoven, koffiemachine en wasmachine.\n\nBuiten: hottub, vuurschaal, zwembad en pétanquebaan. Voor kinderen een trampoline en een speeltuin. Het overdekte terras is bruikbaar bij elk weer. Het buitenzwembad is niet verwarmd. De hottub, BBQ en vuurschaal zijn het hele jaar beschikbaar.',
      en: 'Inside: four bedrooms with box-spring beds and a mezzanine with two single beds. Two bathrooms — one with walk-in shower, one with bath — and a separate guest toilet. The open living space has a bright sitting area, a large dining table and a fully equipped kitchen: dishwasher, oven, fridge-freezer, microwave, coffee machine and washing machine.\n\nOutside: hot tub, fire pit, pool and pétanque court. For children a trampoline and a play area. The covered terrace works in any weather. The outdoor pool is unheated. The hot tub, BBQ and fire pit are available all year round.',
    },
    buurt: {
      nl: 'Beernem ligt in een groene, rustige omgeving tussen Brugge en Gent — de ideale uitvalsbasis voor wie houdt van natuur, fietsen en wandelen. In de buurt vind je mooie bossen, landelijke wegen en charmante dorpjes. Brugge bereik je op 14 km, de kust op 25 km en Gent op 35 km. Tegelijk bereik je vlot culturele hotspots, restaurants en winkels in de omliggende steden. De woning is bereikbaar met de wagen en heeft private parkeergelegenheid voor 5 wagens op het terrein.',
      en: 'Beernem is located between Bruges and Ghent in the heart of the West Flemish countryside. Bruges is 14 km away, the coast 25 km and Ghent 35 km. The surrounding area offers beautiful cycling routes through the polders and forests. The home is accessible by car and has private parking for 5 vehicles on site.',
    },
    hoogtepunten: [
      { nl: 'Zwembad, hottub en vuurschaal',                     en: 'Pool, hot tub and fire pit' },
      { nl: 'Overdekt terras met BBQ en pétanquebaan',           en: 'Covered terrace with BBQ and pétanque court' },
      { nl: 'Max 10 gasten',                                     en: 'Up to 10 guests' },
      { nl: '14 km van Brugge, 25 km van de kust',               en: '14 km from Bruges, 25 km from the coast' },
      { nl: 'Parkeren voor 5 wagens op het terrein',             en: 'Parking for 5 cars on site' },
      { nl: '4 slaapkamers met boxspringbedden',                 en: '4 bedrooms with box-spring beds' },
    ],
    reviews: [
      {
        citaat: {
          nl: 'Verblijven in de hottub terwijl je naar de sterren kijkt met het kampvuur — perfect.',
          en: 'Relaxing in the hot tub while watching the stars by the fire pit — perfect.',
        },
        naam: 'Lucie',
      },
      {
        citaat: {
          nl: 'Uitstekend verblijf met het gezin. De faciliteiten zijn top, veel te doen voor de kinderen. Jammer dat we niet langer konden blijven.',
          en: 'Excellent stay with the family. The facilities are top-notch, plenty to do for the children. A shame we couldn\'t stay longer.',
        },
        naam: 'Tom',
      },
    ],
    inCheckin: '15:00',
    uitCheckin: '11:00',
    heroFoto: '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 14.42.01.jpeg',
    fotos: [
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 14.42.01.jpeg',
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 14.41.11.jpeg',
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 14.41.33.jpeg',
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 14.43.55.jpeg',
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 14.45.31.jpeg',
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 14.47.24.jpeg',
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 14.47.53.jpeg',
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 14.48.52.jpeg',
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 14.51.51.jpeg',
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 14.52.50.jpeg',
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 14.55.29.jpeg',
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 14.55.29 (1).jpeg',
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 14.55.29 (2).jpeg',
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 14.55.56 (1).jpeg',
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 15.01.30.jpeg',
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 15.01.42.jpeg',
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 15.04.58.jpeg',
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 15.05.29.jpeg',
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 15.11.03.jpeg',
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 15.11.03 (1).jpeg',
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 15.11.03 (2).jpeg',
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 14.18.18.jpeg',
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 14.18.18 (1).jpeg',
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 14.18.18 (4).jpeg',
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 14.18.19 (1).jpeg',
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 14.18.19 (2).jpeg',
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 14.18.19 (3).jpeg',
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 14.18.19 (4).jpeg',
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 14.18.19 (5).jpeg',
      '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 14.18.19 (6).jpeg',
    ],
    boekUrl: 'https://book.moroww.com/nl/properties/690781db69d1700012bf6dd3?minOccupancy=1',
    amenities: ['Smart lock', 'Wifi', 'Eigen parking'],
  },

  {
    id: 'sophora',
    naam: 'Sophora',
    collectie: 'the fields',
    locatie: 'Elst (Brakel), Vlaamse Ardennen',
    prijs: 800,
    slaapkamers: 9,
    badkamers: 9,
    maxGasten: 18,
    oppervlakte: null,
    geauditeerdOp: '2026-05',
    tags: [
      { nl: 'Zwembad & sauna',              en: 'Pool & sauna' },
      { nl: '9 kamers, eigen badkamer',     en: '9 rooms, en-suite' },
      { nl: 'Familiehuis met verhaal',      en: 'Family home with a story' },
    ],
    slogan: {
      nl: 'een familiehuis met verhaal, gedragen door drie zussen.',
      en: 'a family home with a story, carried by three sisters.',
    },
    introductie: {
      nl: 'Een familiehuis in het hart van Elst, al generaties van dezelfde familie en vandaag gerund door drie zussen. Het licht valt diep naar binnen, en elk van de negen kamers heeft een eigen badkamer en een eigen rust.',
      en: 'A family home in the heart of Elst, in the same family for generations and today run by three sisters. The light falls deep into the rooms, and each of the nine bedrooms has its own bathroom and its own quiet.',
    },
    beschrijving: {
      nl: 'Een familiehuis in Elst, gedragen door drie zussen. Negen kamers elk met eigen badkamer, zwembad, sauna en een tuin die het hele jaar anders oogt. the fields, Vlaamse Ardennen.',
      en: 'A family home in Elst, run by three sisters. Nine bedrooms each with en-suite bathroom, pool, sauna and a garden that looks different every season. the fields, Vlaamse Ardennen.',
    },
    volledigeBeschrijving: {
      nl: 'Sophora staat al generaties in dezelfde familie. Toen het huis aan vernieuwing toe was, werd het volledig heropgebouwd, maar de oude gevel bleef staan. Wie door Elst wandelt, ziet nog altijd hetzelfde dorpszicht. Binnenin is alles nieuw, en toch voelt het als een huis dat er altijd al stond.\n\nVandaag wordt het gedragen door drie zussen. Dat merk je aan alles. Dit is geen huis dat door een beheerder wordt opengezet, het is een huis dat een familie zelf in handen houdt.\n\nHet licht is het eerste wat opvalt. Het valt diep naar binnen, over de leefruimte, over de lange tafels, over de tuin die er het hele jaar anders bij ligt. \'s Ochtends word je er wakker zonder haast.\n\nEn ook al ben je met een grote groep, je hebt je eigen kamer, je eigen badkamer, je eigen stilte. Negen kamers, telkens voor twee, elk met een badkamer die al klaarstaat. Samen verblijven hoeft niet te betekenen dat je nooit alleen bent.\n\nDe warmte zit in de dingen die je niet kan plannen. Voor elke groep bakken de zussen een cake, en in de koelkast staat huiswijn uit de wijngaard van de familie. Beneden ligt een kamer die volledig toegankelijk is voor wie minder mobiel is, net als de tuin, het zwembad en de sauna. Niemand blijft achter.\n\nDit is geen accommodatie die je afhuurt. Het is een thuis dat een familie even met je deelt.',
      en: 'Sophora has stood in the same family for generations. When the house needed renewal, it was fully rebuilt, but the old facade was kept. Those who walk through Elst still see the same village silhouette. Inside, everything is new, and yet it feels like a house that was always there.\n\nToday it is carried by three sisters. You notice it in everything. This is not a house opened up by a manager, it is a house a family keeps in its own hands.\n\nThe light is the first thing you notice. It falls deep into the rooms, across the living spaces, across the long tables, across the garden that looks different throughout the year. In the morning you wake up without hurry.\n\nAnd even with a large group, you have your own room, your own bathroom, your own quiet. Nine bedrooms, each for two, every one with a bathroom already prepared. Staying together does not have to mean you are never alone.\n\nThe warmth is in the things you cannot plan. For every group, the sisters bake a cake, and in the fridge there is house wine from the family vineyard. Downstairs there is a room fully accessible for those with limited mobility, as is the garden, the pool and the sauna. No one is left behind.\n\nThis is not an accommodation you rent. It is a home a family shares with you for a while.',
    },
    buurt: {
      nl: 'Sophora ligt in het dorpscentrum van Elst, in de Vlaamse Ardennen. De bakker en de beenhouwer liggen op wandelafstand, net als de geutelingenbakkerij waar het dorp om bekendstaat. Rondom wachten de glooiende heuvels en wandelwegen van de streek.',
      en: 'Sophora is situated in the village centre of Elst, in the Vlaamse Ardennen. The baker and the butcher are within walking distance, as is the geutelingen bakery the village is known for. All around, the rolling hills and walking paths of the region await.',
    },
    hoogtepunten: [
      { nl: 'Negen kamers, elk met een eigen badkamer',                  en: 'Nine bedrooms, each with its own bathroom' },
      { nl: 'Een kamer op het gelijkvloers, volledig toegankelijk',      en: 'A ground-floor room, fully accessible' },
      { nl: 'Zwembad, sauna en een grote tuin',                          en: 'Pool, sauna and a large garden' },
      { nl: 'Gerund door drie zussen, met de moeder achter de schermen', en: 'Run by three sisters, with their mother behind the scenes' },
      { nl: 'Op wandelafstand van het dorpscentrum van Elst',            en: 'Within walking distance of the village centre of Elst' },
    ],
    inCheckin: '15:00',
    uitCheckin: '10:00',
    heroFoto: '/images/woningen/sophora/sophora-01.jpg',
    fotos: [
      '/images/woningen/sophora/sophora-01.jpg',
      '/images/woningen/sophora/sophora-02.jpg',
      '/images/woningen/sophora/sophora-03.jpg',
      '/images/woningen/sophora/sophora-04.jpg',
      '/images/woningen/sophora/sophora-05.jpg',
      '/images/woningen/sophora/sophora-06.jpg',
      '/images/woningen/sophora/sophora-07.jpg',
      '/images/woningen/sophora/sophora-08.jpg',
      '/images/woningen/sophora/sophora-09.jpg',
      '/images/woningen/sophora/sophora-10.jpg',
      '/images/woningen/sophora/sophora-11.jpg',
      '/images/woningen/sophora/sophora-12.jpg',
      '/images/woningen/sophora/sophora-13.jpg',
      '/images/woningen/sophora/sophora-14.jpg',
      '/images/woningen/sophora/sophora-15.jpg',
      '/images/woningen/sophora/sophora-16.jpg',
      '/images/woningen/sophora/sophora-17.jpg',
      '/images/woningen/sophora/sophora-18.jpg',
      '/images/woningen/sophora/sophora-19.jpg',
      '/images/woningen/sophora/sophora-20.jpg',
      '/images/woningen/sophora/sophora-21.jpg',
      '/images/woningen/sophora/sophora-22.jpg',
      '/images/woningen/sophora/sophora-23.jpg',
      '/images/woningen/sophora/sophora-24.jpg',
      '/images/woningen/sophora/sophora-25.jpg',
      '/images/woningen/sophora/sophora-26.jpg',
      '/images/woningen/sophora/sophora-27.jpg',
      '/images/woningen/sophora/sophora-28.jpg',
      '/images/woningen/sophora/sophora-29.jpg',
      '/images/woningen/sophora/sophora-30.jpg',
    ],
    boekUrl: 'https://book.moroww.com/nl/properties/6a14520e75302900153585ce?minOccupancy=1',
    comingSoon: false,
    amenities: ['Smart lock', 'Wifi'],
  },
  {
    id: 'lammersdamhoeve',
    naam: 'De Lammersdamhoeve',
    collectie: 'the fields',
    locatie: 'Wingene, Brugse Ommeland',
    prijs: 330,
    slaapkamers: 4,
    badkamers: 2,
    maxGasten: 8,
    oppervlakte: '220m²',
    geauditeerdOp: '2026-07',
    vergunningsnummer: '387650',
    tags: [
      { nl: 'Aan de bosrand',              en: 'On the edge of the forest' },
      { nl: 'Omheinde tuin',               en: 'Fully enclosed garden' },
      { nl: 'Honden welkom, geen toeslag', en: 'Dogs welcome, no surcharge' },
    ],
    slogan: {
      nl: 'vanuit bed over de velden, tot aan de bosrand.',
      en: 'from bed across the fields, to the edge of the forest.',
    },
    introductie: {
      nl: 'Een hoeve aan de rand van natuurgebied De Gulke Putten, waar de open velden overgaan in bos. Vier slaapkamers, een volledig omheinde tuin, en een terras dat de ochtendzon vangt. Buiten is er het bos en het geluid ervan. Binnen ligt alles klaar.',
      en: 'A farmhouse on the edge of the De Gulke Putten nature reserve, where open fields give way to woodland. Four bedrooms, a fully enclosed garden, and a terrace that catches the morning sun. Outside there is the forest and the sound of it. Inside, everything is ready.',
    },
    beschrijving: {
      nl: 'Achter een oude gevel is deze hoeve met zorg opnieuw opgebouwd. Een lichte leefruimte die overloopt in de keuken, vier slaapkamers verspreid over het huis, twee badkamers. De tuin is volledig omheind, veilig voor kinderen en honden. Wandel- en fietsroutes vertrekken aan de voordeur.',
      en: 'Behind an old façade, this farmhouse has been carefully rebuilt. A light living space that opens into the kitchen, four bedrooms spread across the house, two bathrooms. The garden is fully enclosed, safe for children and dogs. Walking and cycling routes start at the front door.',
    },
    volledigeBeschrijving: {
      nl: 'Achter de oude gevel is de hoeve helemaal opnieuw opgebouwd. De leefruimte is licht en loopt over in de keuken: plek om samen te komen, en plek om je terug te trekken zonder het huis te verlaten. De vier slaapkamers liggen verspreid over het huis, met twee badkamers. Er zijn twee aparte zitruimtes, wat bij acht gasten het verschil maakt tussen samen zijn en op elkaar zitten.\n\nEén ding zeggen we liever voor je boekt dan erna. Twee van de slaapkamers liggen in elkaars verlengde: de kamer met het tweepersoonsbed bereik je via de kamer met de twee eenpersoonsbedden. Voor een gezin of voor vrienden die samen reizen werkt dat prima. Voor twee koppels is het goed om te weten.\n\nDe bedden zijn opgemaakt voor je aankomt en het bed- en badlinnen is inbegrepen. Je laat jezelf binnen met je eigen code. Er komt niemand langs, tenzij je erom vraagt — dan is er iemand bereikbaar en dichtbij.\n\nHet volledige huis en de tuin zijn van jou. De tuin is helemaal omheind, veilig voor kinderen en voor honden, met een terras voor trage ochtenden en lange avonden. De parking ligt op het domein: je komt aan en blijft waar je bent.\n\nHuisdieren zijn welkom, zonder toeslag. Stilte tussen tien uur \'s avonds en negen uur \'s ochtends. Dit is een huis om te vertragen, geen uitvalsbasis voor grote gezelschappen en geen feestlocatie.',
      en: 'Behind the old façade, the farmhouse has been rebuilt from the ground up. The living space is light and flows into the kitchen: room to come together, and room to withdraw without leaving the house. The four bedrooms are spread across the house, with two bathrooms. There are two separate sitting areas, which with eight guests is the difference between being together and being on top of one another.\n\nOne thing we would rather tell you before you book than after. Two of the bedrooms run into one another: the room with the double bed is reached through the room with the two single beds. For a family or for friends travelling together this works fine. For two couples it is worth knowing.\n\nBeds are made up before you arrive and all bed and bath linen is included. You let yourself in with your own code. Nobody comes by unless you ask — and then someone is reachable and close.\n\nThe whole house and garden are yours. The garden is fully enclosed, safe for children and for dogs, with a terrace for slow mornings and long evenings. Parking is on the property: you arrive and you stay put.\n\nPets are welcome at no extra charge. Quiet hours from ten at night until nine in the morning. This is a house for slowing down — not a base for large groups, and not an event venue.',
    },
    buurt: {
      nl: 'Het huis staat waar de landbouwgrond overgaat in bos, aan de rand van natuurgebied De Gulke Putten. Wandel- en fietsroutes vertrekken vanaf de voordeur, door de Vagevuurbossen en het Bulskampveld.\n\nHet is hier stil op de manier waarop alleen het platteland stil is.\n\nBrugge en Gent liggen allebei op een halfuur met de auto, voor de dagen dat je de stad opzoekt. De luchthaven Oostende-Brugge op veertig minuten. Met de auto ben je er het snelst, en verken je ook de streek.',
      en: 'The house sits where farmland turns into forest, on the edge of the De Gulke Putten nature reserve. Walking and cycling routes start at the front door, through the Vagevuurbossen and the Bulskampveld.\n\nIt is quiet here in the way only the countryside is quiet.\n\nBruges and Ghent are both about half an hour by car, for the days you want a city. Ostend-Bruges airport is forty minutes. A car is the easiest way to reach the house and to explore the region.',
    },
    hoogtepunten: [
      { nl: 'Aan de rand van het bos',           en: 'On the edge of the forest' },
      { nl: 'Volledig omheinde tuin',            en: 'Fully enclosed garden' },
      { nl: 'Honden welkom, zonder toeslag',     en: 'Dogs welcome, no surcharge' },
      { nl: 'Terras op de ochtendzon',           en: 'Terrace facing the morning sun' },
      { nl: 'Eigen parking op het domein',       en: 'Private parking on the property' },
    ],
    waaromOpgenomen: {
      nl: 'waarom dit huis de standaard haalde\n\nOm het uitzicht. Niet vanaf het terras, maar vanuit de woning zelf. De dakramen op de bovenverdieping staan zo laag dat je vanuit bed over de velden kijkt tot aan de bosrand. Dat is zeldzaam, en het is niet na te bouwen.\n\nOm wat er bewaard is gebleven. De volledige dakstructuur ligt open: donkere balken, eiken vloeren, deuren met smeedijzer. Achter een gerenoveerde gevel zit een huis dat zijn karakter niet heeft ingeruild voor gemak.\n\nEn om de honden. Ze mogen mee, zonder toeslag en zonder gedoe, in een tuin die volledig omheind is. Dat klinkt klein tot je één keer met een hond een vakantiewoning hebt gezocht.',
      en: 'why this house met the standard\n\nFor the view. Not from the terrace, but from inside the house. The roof windows upstairs sit so low that you look out across the fields to the treeline from your bed. That is rare, and it cannot be built in later.\n\nFor what has been kept. The whole roof structure is exposed: dark beams, oak floors, doors with wrought iron. Behind a renovated façade is a house that did not trade its character for convenience.\n\nAnd for the dogs. They come along, no surcharge and no fuss, into a garden that is fully enclosed. That sounds like a small thing until you have looked for a holiday home with a dog.',
    },
    inCheckin: '15:00',
    uitCheckin: '10:00',
    heroFoto: '/images/woningen/lammersdamhoeve/lammersdamhoeve-01-leefruimte.jpg',
    fotos: [
      '/images/woningen/lammersdamhoeve/lammersdamhoeve-01-leefruimte.jpg',
      '/images/woningen/lammersdamhoeve/lammersdamhoeve-02-zicht-veld.jpg',
      '/images/woningen/lammersdamhoeve/lammersdamhoeve-03-leefruimte-2.jpg',
      '/images/woningen/lammersdamhoeve/lammersdamhoeve-04-eettafel.jpg',
      '/images/woningen/lammersdamhoeve/lammersdamhoeve-05-zithoek.jpg',
      '/images/woningen/lammersdamhoeve/lammersdamhoeve-06-overloop-zolder.jpg',
      '/images/woningen/lammersdamhoeve/lammersdamhoeve-07-slaapkamer.jpg',
      '/images/woningen/lammersdamhoeve/lammersdamhoeve-08-slaapkamer-doorloop.jpg',
      '/images/woningen/lammersdamhoeve/lammersdamhoeve-09-badkamer.jpg',
      '/images/woningen/lammersdamhoeve/lammersdamhoeve-10-badkamer-zolder.jpg',
      '/images/woningen/lammersdamhoeve/lammersdamhoeve-11-overloop.jpg',
      '/images/woningen/lammersdamhoeve/lammersdamhoeve-12-trap.jpg',
      '/images/woningen/lammersdamhoeve/lammersdamhoeve-13-terras.jpg',
      '/images/woningen/lammersdamhoeve/lammersdamhoeve-14-gevel.jpg',
      '/images/woningen/lammersdamhoeve/lammersdamhoeve-15-omgeving-veld.jpg',
      '/images/woningen/lammersdamhoeve/lammersdamhoeve-16-omgeving-knooppunt.jpg',
    ],
    boekUrl: 'https://book.moroww.com/nl/properties/6a3a3e76ebec11002bd6c298?minOccupancy=1',
    amenities: ['Smart lock', 'Wifi', 'Eigen parking'],
  },

  // ── WACHT OP BEELD ─────────────────────────────────────────────────
  // Twee kustwoningen zijn geauditeerd en opgenomen. Ze tellen mee voor de
  // "binnenkort"-teller op /the-shore en /collectie, maar renderen niet in
  // het raster of als eigen pandpagina tot de fotoshoot klaar is.
  //
  // Velden die je moet aanleveren voor publicatie zijn met TBD gemarkeerd.
  // Zolang status='wacht_op_beeld' staat, worden deze niet gerenderd.
  // ── The Eighth · Zeedijk 9/801, Nieuwpoort-Bad ─────────────────────
  {
    id: 'zeedijk-nieuwpoort',
    naam: 'The Eighth',
    collectie: 'the shore',
    locatie: 'Nieuwpoort-Bad',
    prijs: 270,
    slaapkamers: 3,
    badkamers: 1,
    maxGasten: 8,
    oppervlakte: '105m²',
    geauditeerdOp: '2026-09',
    vergunningsnummer: 'LD 416795',
    tags: [
      { nl: '8e verdieping',   en: '8th floor' },
      { nl: 'Zeezicht',        en: 'Sea view' },
      { nl: 'Zeebalkon',       en: 'Sea balcony' },
    ],
    slogan: {
      nl: 'Eerste rij op de Zeedijk. Het staketsel in je raam.',
      // TODO: EN-vertaling volgt; voorlopig gelijk aan NL zodat de build niet breekt.
      en: 'Eerste rij op de Zeedijk. Het staketsel in je raam.',
    },
    introductie: {
      nl: 'Achtste verdieping, eerste rij op de Zeedijk. De woonkamer kijkt door ramen van vloer tot plafond uit op de Noordzee, met het staketsel en de vuurtoren in beeld. Drie slaapkamers, plek voor acht.',
      // TODO: EN-vertaling volgt.
      en: 'Achtste verdieping, eerste rij op de Zeedijk. De woonkamer kijkt door ramen van vloer tot plafond uit op de Noordzee, met het staketsel en de vuurtoren in beeld. Drie slaapkamers, plek voor acht.',
    },
    beschrijving: {
      nl: 'Achtste verdieping, eerste rij op de Zeedijk in Nieuwpoort-Bad. Ramen van vloer tot plafond, zeebalkon met houten vlonder en zicht op het staketsel. Drie slaapkamers, max 8.',
      // TODO: EN-vertaling volgt.
      en: 'Achtste verdieping, eerste rij op de Zeedijk in Nieuwpoort-Bad. Ramen van vloer tot plafond, zeebalkon met houten vlonder en zicht op het staketsel. Drie slaapkamers, max 8.',
    },
    volledigeBeschrijving: {
      nl: 'De woonkamer kijkt door ramen van vloer tot plafond uit op de Noordzee. Een diepe zetel, twee fauteuils, een wand met ingebouwde kasten en haard, en de balkondeur binnen handbereik: vanuit de zetel zie je het tij opkomen over het strand. Aan de ovale eettafel zitten zes mensen, onder een groot strandschilderij. De keuken draait rond een eiland met kookplaat, oven, vaatwasser en een volautomatische koffiemachine. Twee slaapkamers met een dubbel bed en een stapelbedkamer liggen aan de achterkant, met een tweede balkon over de daken van Nieuwpoort-Bad.',
      // TODO: EN-vertaling volgt.
      en: 'De woonkamer kijkt door ramen van vloer tot plafond uit op de Noordzee. Een diepe zetel, twee fauteuils, een wand met ingebouwde kasten en haard, en de balkondeur binnen handbereik: vanuit de zetel zie je het tij opkomen over het strand. Aan de ovale eettafel zitten zes mensen, onder een groot strandschilderij. De keuken draait rond een eiland met kookplaat, oven, vaatwasser en een volautomatische koffiemachine. Twee slaapkamers met een dubbel bed en een stapelbedkamer liggen aan de achterkant, met een tweede balkon over de daken van Nieuwpoort-Bad.',
    },
    buurt: {
      nl: 'Onder je het brede strand, rechts de havengeul waar de IJzer in zee uitmondt, en het lange houten staketsel naar de vuurtoren. Wandel het staketsel op bij zonsondergang, koop verse vis aan de kaai, of kijk over de geul naar natuurreservaat De IJzermonding. Met de Kusttram ben je langs de hele kust; met de trein via Oostende.',
      // TODO: EN-vertaling volgt.
      en: 'Onder je het brede strand, rechts de havengeul waar de IJzer in zee uitmondt, en het lange houten staketsel naar de vuurtoren. Wandel het staketsel op bij zonsondergang, koop verse vis aan de kaai, of kijk over de geul naar natuurreservaat De IJzermonding. Met de Kusttram ben je langs de hele kust; met de trein via Oostende.',
    },
    hoogtepunten: [
      { nl: 'Achtste verdieping, eerste rij op de Zeedijk',              en: 'Achtste verdieping, eerste rij op de Zeedijk' },
      { nl: 'Zeebalkon met houten vlonder aan de woonkamer',             en: 'Zeebalkon met houten vlonder aan de woonkamer' },
      { nl: 'Zicht op het staketsel en de vuurtoren vanuit de eethoek',  en: 'Zicht op het staketsel en de vuurtoren vanuit de eethoek' },
      { nl: 'Drie slaapkamers voor 8, met een stapelbedkamer',           en: 'Drie slaapkamers voor 8, met een stapelbedkamer' },
      { nl: 'Inloopdouche met regendouche en dubbele stenen wastafel',   en: 'Inloopdouche met regendouche en dubbele stenen wastafel' },
      { nl: 'Kusttram voor de deur — halte Nieuwpoort Bad',              en: 'Kusttram voor de deur — halte Nieuwpoort Bad' },
    ],
    inCheckin: '17:00',
    uitCheckin: '10:00',
    heroFoto: '/images/woningen/nieuwpoort/the-eight-01.jpg',
    fotos: [
      '/images/woningen/nieuwpoort/the-eight-01.jpg',
      '/images/woningen/nieuwpoort/the-eight-02.jpg',
      '/images/woningen/nieuwpoort/the-eight-03.jpg',
      '/images/woningen/nieuwpoort/the-eight-04.jpg',
      '/images/woningen/nieuwpoort/the-eight-05.jpg',
      '/images/woningen/nieuwpoort/the-eight-06.jpg',
      '/images/woningen/nieuwpoort/the-eight-07.jpg',
      '/images/woningen/nieuwpoort/the-eight-08.jpg',
      '/images/woningen/nieuwpoort/the-eight-09.jpg',
      '/images/woningen/nieuwpoort/the-eight-10.jpg',
      '/images/woningen/nieuwpoort/the-eight-11.jpg',
      '/images/woningen/nieuwpoort/the-eight-12.jpg',
      '/images/woningen/nieuwpoort/the-eight-13.jpg',
      '/images/woningen/nieuwpoort/the-eight-14.jpg',
      '/images/woningen/nieuwpoort/the-eight-15.jpg',
      '/images/woningen/nieuwpoort/the-eight-16.jpg',
      '/images/woningen/nieuwpoort/the-eight-17.jpg',
      '/images/woningen/nieuwpoort/the-eight-18.jpg',
      '/images/woningen/nieuwpoort/the-eight-19.jpg',
      '/images/woningen/nieuwpoort/the-eight-20.jpg',
      '/images/woningen/nieuwpoort/the-eight-21.jpg',
    ],
    fotoAlts: [
      { nl: 'De woonkamer kijkt door ramen van vloer tot plafond uit op de Noordzee.',
        en: 'The living room faces the North Sea through floor-to-ceiling glass.' },
      { nl: 'Woonkamer en eettafel in één open ruimte, met het strandschilderij boven de tafel.',
        en: 'Living room and dining table in one open space, the beach painting above the table.' },
      { nl: 'Diepe zetel voor de kastenwand met haard, rechts de balkondeur.',
        en: 'Deep sofa facing the shelving wall and fireplace, balcony door to the right.' },
      { nl: 'Loungestoel op het zeebalkon, het strand acht verdiepingen lager.',
        en: 'Lounge chair on the sea-facing balcony, the beach eight floors below.' },
      { nl: 'Keukeneiland met de spoelbak naar de leefruimte, de eettafel ernaast.',
        en: 'Kitchen island with the sink facing the room, dining table alongside.' },
      { nl: 'Eettafel voor zes onder het strandschilderij.',
        en: 'Dining table for six under the beach painting.' },
      { nl: 'Eethoek met het staketsel en de vuurtoren in het raam.',
        en: 'Dining corner with the pier and lighthouse framed in the window.' },
      { nl: 'Slaapkamer met dubbel bed, kasten tot aan het plafond en een deur naar het achterbalkon.',
        en: 'Double bedroom with full-height wardrobes and a door to the back balcony.' },
      { nl: 'Tweede slaapkamer met dubbel bed, met zicht over de daken van Nieuwpoort-Bad.',
        en: 'Second double bedroom, looking over the rooftops of Nieuwpoort-Bad.' },
      { nl: 'Stapelbedkamer: twee stapelbedden voor de kinderen, met een deur naar het achterbalkon.',
        en: 'Bunk room: two bunk beds for the kids, with a door to the back balcony.' },
      { nl: 'Dubbele stenen wastafel, met handdoeken klaar voor elke gast.',
        en: 'Double stone basin, towels laid out for every guest.' },
      { nl: 'Inloopdouche met regendouche en handdouche.',
        en: 'Walk-in shower with rain head and hand shower.' },
      { nl: 'Keuken: kookplaat tegen handgemaakte tegels, oven en hoge kasten.',
        en: 'Kitchen: hob against handmade tiles, oven and full-height cabinets.' },
      { nl: 'Twee fauteuils en een lage tafel: de rustige hoek van de woonkamer.',
        en: 'Two armchairs and a low table: the quiet corner of the living room.' },
      { nl: 'Haard in de wand van de woonkamer.',
        en: 'Fireplace set into the living-room wall.' },
      { nl: 'Ingebouwde bank met kussens aan de eettafel.',
        en: 'Built-in bench with cushions at the dining table.' },
      { nl: 'Ingebouwde kasten met boeken, naast de haard.',
        en: 'Built-in shelving with books, next to the fireplace.' },
      { nl: 'Keramiek op de kasten in de woonkamer.',
        en: 'Ceramic detail on the living-room shelves.' },
      { nl: 'De havengeul, het staketsel en De IJzermonding, gezien vanaf het balkon.',
        en: 'The harbour mouth, the pier and the IJzermonding, seen from the balcony.' },
      { nl: 'De residentie op de Zeedijk, eerste rij aan het strand.',
        en: 'The residence on the Zeedijk, front row to the beach.' },
      { nl: 'De residentie vanachter het helmgras.',
        en: 'The residence seen from behind the dune grass.' },
    ],
    boekUrl: 'https://book.moroww.com/properties/6ab65d3568ceea00136f518d',
  },
  {
    id: 'house-1783-11',
    naam: 'House 1783-11',
    collectie: 'the shore',
    locatie: 'Heist-aan-Zee, Knokke',
    slaapkamers: 3,
    badkamers: 2,
    maxGasten: 6,
    oppervlakte: '105m²',
    geauditeerdOp: '2026-08',
    tags: [],
    slogan: {
      nl: 'Twee terrassen, en het strand achter de hoek.',
      // TODO: EN-vertaling volgt.
      en: 'Twee terrassen, en het strand achter de hoek.',
    },
    introductie: {
      nl: 'Honderdvijf vierkante meter op de eerste verdieping, met twee terrassen. Drie slaapkamers, twee badkamers, ruimte voor zes.',
      // TODO: EN-vertaling volgt.
      en: 'Honderdvijf vierkante meter op de eerste verdieping, met twee terrassen. Drie slaapkamers, twee badkamers, ruimte voor zes.',
    },
    // TODO: aparte beschrijving (voor kaart-alt en meta) volgt.
    beschrijving: { nl: '', en: '' },
    volledigeBeschrijving: {
      nl: 'Compact en licht. Drie slaapkamers op deze oppervlakte betekent dat de leefruimte de ruimte krijgt en de kamers precies groot genoeg zijn. Wie met zes komt en veel binnenruimte verwacht, kijkt beter naar een van de andere woningen aan de kust.\n\nWat dit appartement anders maakt dan wat eronder ligt, zijn de materialen. Waar Nosso Logies donker en warm is, is dit lichter en strakker afgewerkt. Twee panden in hetzelfde gebouw, twee verschillende huizen.\n\nDe twee terrassen zijn het echte verschil met de meeste appartementen aan de kust. Je hebt altijd één in de zon en één uit de wind.',
      // TODO: EN-vertaling volgt.
      en: 'Compact en licht. Drie slaapkamers op deze oppervlakte betekent dat de leefruimte de ruimte krijgt en de kamers precies groot genoeg zijn. Wie met zes komt en veel binnenruimte verwacht, kijkt beter naar een van de andere woningen aan de kust.\n\nWat dit appartement anders maakt dan wat eronder ligt, zijn de materialen. Waar Nosso Logies donker en warm is, is dit lichter en strakker afgewerkt. Twee panden in hetzelfde gebouw, twee verschillende huizen.\n\nDe twee terrassen zijn het echte verschil met de meeste appartementen aan de kust. Je hebt altijd één in de zon en één uit de wind.',
    },
    hoogtepunten: [
      { nl: 'Twee terrassen, verschillende oriëntatie', en: 'Twee terrassen, verschillende oriëntatie' },
      { nl: 'Drie slaapkamers, twee badkamers',         en: 'Drie slaapkamers, twee badkamers' },
      { nl: 'Lichte, strakke afwerking',                en: 'Lichte, strakke afwerking' },
      { nl: 'Eerste verdieping',                        en: 'Eerste verdieping' },
      { nl: 'Strand op twee minuten',                   en: 'Strand op twee minuten' },
      { nl: 'In hetzelfde gebouw als Nosso Logies',     en: 'In hetzelfde gebouw als Nosso Logies' },
    ],
    inCheckin: '15:00',
    uitCheckin: '10:00',
    heroFoto: '',
    fotos: [],
    boekUrl: '',
    status: 'wacht_op_beeld',
  },
]

// Runtime-validatie: kap fotos-array af naar MAX_PHOTOS_PER_PAND met een
// warning. Voorkomt dat 31+ foto's er ongemerkt in glippen bij een volgend pand.
export const woningen: Woning[] = _woningenRaw.map((w) => {
  if (w.fotos.length > MAX_PHOTOS_PER_PAND) {
    console.warn(
      `[woningen] "${w.id}": ${w.fotos.length} fotos ingesteld, afgekapt naar ${MAX_PHOTOS_PER_PAND}. ` +
      `Update de source om deze warning te verhelpen.`
    )
    return { ...w, fotos: w.fotos.slice(0, MAX_PHOTOS_PER_PAND) }
  }
  return w
})

export const BADGE_STYLES: Record<Woning['collectie'], { bg: string; color: string }> = {
  'the shore': { bg: '#EEBC9D', color: '#1A1A1A' },
  'the fields': { bg: '#CBD085', color: '#1A1A1A' },
}

// Filters. Alle renderpaden (raster, sitemap, generateStaticParams,
// pandpagina) horen op `liveWoningen` te leunen — panden met status
// 'wacht_op_beeld' tellen wel mee voor de "binnenkort"-teller maar mogen
// niet als lege kaart of pagina verschijnen.
export function liveWoningen(): Woning[] {
  return woningen.filter((w) => w.status !== 'wacht_op_beeld')
}

// Boekingslink met de juiste locale-prefix en verplichte `minOccupancy=1`.
// De listing-id wordt geparst uit de bestaande boekUrl, zodat de bron één
// veld blijft — al eerder ingevulde URL's zonder locale of query-string
// (bv. The Eighth) worden zo automatisch geregulariseerd.
export function boekUrlFor(w: Woning, locale: Locale): string {
  const m = w.boekUrl.match(/properties\/([a-f0-9]+)/i)
  if (!m) return w.boekUrl
  return `https://book.moroww.com/${locale}/properties/${m[1]}?minOccupancy=1`
}

// Vaste sorteervolgorde voor kaartrasters: eerst the shore, dan the fields,
// binnen een collectie oplopend op prijs. Panden zonder prijs zakken naar
// het einde van hun collectie zonder de rest te storen.
const _collectieRank: Record<Woning['collectie'], number> = {
  'the shore': 0,
  'the fields': 1,
}
export function sortForCollectie(items: Woning[]): Woning[] {
  return [...items].sort((a, b) => {
    const c = _collectieRank[a.collectie] - _collectieRank[b.collectie]
    if (c !== 0) return c
    return (a.prijs ?? Infinity) - (b.prijs ?? Infinity)
  })
}

/** Aantal geauditeerde panden dat wacht op zijn fotoshoot. Filter
 *  optioneel per collectie. */
export function wachtOpBeeldCount(collectie?: Woning['collectie']): number {
  return woningen.filter((w) => {
    if (w.status !== 'wacht_op_beeld') return false
    if (collectie && w.collectie !== collectie) return false
    return true
  }).length
}
