export interface Woning {
  id: string;
  naam: string;
  collectie: "the shore" | "the fields";
  locatie: string;
  prijs: number;
  slaapkamers: number;
  badkamers: number;
  maxGasten: number;
  oppervlakte: string | null;
  tags: string[];
  slogan: string;
  introductie: string;
  beschrijving: string;
  volledigeBeschrijving: string;
  hoogtepunten: string[];
  inCheckin: string;
  uitCheckin: string;
  heroFoto: string;
  fotos: string[];
  boekUrl: string;
}

export const woningen: Woning[] = [
  {
    id: "nosso-knokke",
    naam: "Nosso Logies",
    collectie: "the shore",
    locatie: "Heist-aan-Zee, Knokke",
    prijs: 370,
    slaapkamers: 2,
    badkamers: 2,
    maxGasten: 6,
    oppervlakte: "110m²",
    tags: ["Strand op 2 min", "Privé koer", "2 badkamers"],
    slogan: "Goed slapen, goed eten, goed ademen. Twee minuten van de zee.",
    introductie:
      "Sommige plekken voel je meteen. Nosso is er één van. Niet omdat het opschept — maar omdat het klopt. Het licht, de ruimte, de stilte van het koertje op een zaterdagochtend. Dit is geen Airbnb-gok. Dit is een woning die we persoonlijk hebben geïnspecteerd, ingericht en klaargemaakt voor mensen die weten wat ze willen.",
    beschrijving:
      "Op twee minuten van de Noordzee, verscholen in een rustige straat in Heist-aan-Zee. Een lichtrijk appartement van 110m² met twee slaapkamers, twee volledige badkamers en een privé koer.",
    volledigeBeschrijving:
      "Op twee minuten van de Noordzee, verscholen in een rustige straat in Heist-aan-Zee. Een lichtrijk appartement van 110m² met twee slaapkamers, twee volledige badkamers en een privé koer — ontworpen voor families en vrienden die van de kust willen genieten zonder de drukte. Geen vroege wekkers. Geen haast. Gewoon rustig opstaan, blootsvoets naar het strand wandelen en thuiskomen in een plek die echt als de jouwe aanvoelt. De open leefruimte baadt de hele dag in natuurlijk licht en loopt naadloos over in een volledig uitgeruste keuken. Stap buiten op het privé koertje: beschut, groen en rustig van jou. Ochtendkoffie, een aperitief bij zonsondergang, een glas wijn nadat de kinderen slapen.",
    hoogtepunten: [
      "110m² — ruimte om te ademen",
      "Strand op 2 minuten te voet",
      "Privé koertje — jouw stille oase",
      "2 volledige badkamers — nooit wachten",
      "Volledig uitgeruste keuken",
      "Zelf inchecken via slim slot",
    ],
    inCheckin: "15:00",
    uitCheckin: "10:00",
    heroFoto: "/images/woningen/knokke/2026-AmelieBauwens-Moroww-V2-132.jpg",
    fotos: [
      "/images/woningen/knokke/2026-AmelieBauwens-Moroww-V2-108.jpg",
      "/images/woningen/knokke/2026-AmelieBauwens-Moroww-V2-109.jpg",
      "/images/woningen/knokke/2026-AmelieBauwens-Moroww-V2-11.jpg",
      "/images/woningen/knokke/2026-AmelieBauwens-Moroww-V2-114.jpg",
      "/images/woningen/knokke/2026-AmelieBauwens-Moroww-V2-115.jpg",
      "/images/woningen/knokke/2026-AmelieBauwens-Moroww-V2-12.jpg",
      "/images/woningen/knokke/2026-AmelieBauwens-Moroww-V2-123.jpg",
      "/images/woningen/knokke/2026-AmelieBauwens-Moroww-V2-124.jpg",
    ],
    boekUrl:
      "https://book.moroww.com/nl/properties/698c63ff3d9a2d0013fefd72?minOccupancy=1",
  },
  {
    id: "ann-helena-ursel",
    naam: "Chalet Ann-Helena",
    collectie: "the fields",
    locatie: "Ursel, Meetjesland",
    prijs: 220,
    slaapkamers: 2,
    badkamers: 1,
    maxGasten: 5,
    oppervlakte: null,
    tags: ["Bosrand", "Privétuin met vijver", "Gezinsvriendelijk"],
    slogan: "Tussen Gent en Brugge. Maar eigenlijk ergens heel anders.",
    introductie:
      "Er bestaat een moment waarop het bos begint te werken. Vijf minuten na aankomst laat je de snelweg los. Tien minuten later begint iedereen zachter te praten. Chalet Ann-Helena is gebouwd voor dat moment. Warm hout, hoge plafonds, een vijver die nergens naartoe hoeft. Dit is hoe ontsnappen aanvoelt als je het goed doet.",
    beschrijving:
      "Een warme houten chalet in het hart van het grootste bos van Oost-Vlaanderen. Hoge plafonds, natuurlijk hout, een privétuin met vijver en stilte als standaard.",
    volledigeBeschrijving:
      "Een warme houten chalet in het hart van het grootste bos van Oost-Vlaanderen. Hoge plafonds, natuurlijk hout door het hele huis, een privétuin met vijver en stilte als standaard. Wandel door eeuwenoude boswegen vanaf de voordeur, ontdek het Kabouter Wandelpad met de kinderen, of ontspan op het terras met een glas wijn. De open leefruimte draait om een lichte woonkamer met grote ramen die uitkijken op de tuin. Nestel je in de ruime leren hoeksalon met een plaid en een kaars, of kom samen aan de eettafel voor lange, ongehaaste maaltijden. Buiten nodigt een ruim privéterras met tuinmeubelen uit tot buiten eten, terwijl de sfeervol vijver en de volledig omheinde tuin kinderen de vrijheid geven om veilig te spelen.",
    hoogtepunten: [
      "Hart van het Drongengoedbos",
      "Privétuin met vijver",
      "Gratis parkeren voor 2 wagens",
      "Kindvriendelijk — stapelbed, reisbedje, speelgoed",
      "Terras en balkon met bosuitkijk",
      "Tussen Gent (30 min) en Brugge (25 min)",
    ],
    inCheckin: "17:00",
    uitCheckin: "10:00",
    heroFoto: "/images/woningen/ursel/Bogaertstraat 17 Ursel-64.jpg",
    fotos: [
      "/images/woningen/ursel/Bogaertstraat 17 Ursel-10.jpg",
      "/images/woningen/ursel/Bogaertstraat 17 Ursel-11.jpg",
      "/images/woningen/ursel/Bogaertstraat 17 Ursel-12.jpg",
      "/images/woningen/ursel/Bogaertstraat 17 Ursel-13.jpg",
      "/images/woningen/ursel/Bogaertstraat 17 Ursel-14.jpg",
      "/images/woningen/ursel/Bogaertstraat 17 Ursel-15.jpg",
      "/images/woningen/ursel/Bogaertstraat 17 Ursel-16.jpg",
      "/images/woningen/ursel/Bogaertstraat 17 Ursel-17.jpg",
    ],
    boekUrl:
      "https://book.moroww.com/nl/properties/696b49bf47f69b0013026516?minOccupancy=1",
  },
  {
    id: "moroww-oostende",
    naam: "Oostende",
    collectie: "the shore",
    locatie: "Oostende",
    prijs: 210,
    slaapkamers: 2,
    badkamers: 2,
    maxGasten: 4,
    oppervlakte: null,
    tags: ["16e verdieping", "Zeezicht", "Privé parking"],
    slogan: "Hoog boven de kust. Helemaal voor jullie.",
    introductie:
      "Er is zeezicht. En dan is er dit. Zestien verdiepingen boven de drukte, met de Noordzee voor je neus en de golfers onder je. Geen gedeelde gang. Geen toevallige buren. Gewoon een appartement dat je het gevoel geeft dat Oostende van jou is — en een parkeerplaats die er echt bij hoort.",
    beschrijving:
      "Zestien verdiepingen hoog, met de Noordzee voor je en de Golf van Oostende aan je zij. Ensuite badkamers, panoramisch balkon en privé ondergrondse parking.",
    volledigeBeschrijving:
      "Zestien verdiepingen hoog, met de Noordzee voor je en de Golf van Oostende aan je zij. Een licht, modern appartement met ensuite badkamers in elke slaapkamer, een panoramisch balkon en privé ondergrondse parking — een van de zeldzaamste dingen die je in Oostende vindt. De open leefruimte baadt de hele dag in natuurlijk licht. Stap op het privébalkon en laat het uitzicht de rest doen: zonsopgang boven de golfbaan, zonsondergang boven de zee. Elke slaapkamer is een privéretraite met eigen ensuite badkamer. En dan is er nog de parking. Een privé ondergrondse plaats, inbegrepen — een echte zeldzaamheid in Oostende.",
    hoogtepunten: [
      "16e verdieping — panoramisch zeezicht",
      "Ensuite badkamer in elke slaapkamer",
      "Privé ondergrondse parking inbegrepen",
      "Golf van Oostende aan je zij",
      "Kusttram voor de deur",
      "Brugge op 15 min met de trein",
    ],
    inCheckin: "17:00",
    uitCheckin: "10:00",
    heroFoto:
      "/images/woningen/oostende/6e71ca30-bb8f-11f0-96ff-dd8382026135 kopie.jpg",
    fotos: [
      "/images/woningen/oostende/6e71ca30-bb8f-11f0-96ff-dd8382026135 kopie.jpg",
      "/images/woningen/oostende/6ed4b090-bb8f-11f0-b593-b7fa59eda9ac kopie.jpg",
      "/images/woningen/oostende/6f3e8280-bb8f-11f0-9df9-133c9daab682 kopie.jpg",
      "/images/woningen/oostende/6f79d4b0-bb8f-11f0-b879-599fa8385b5e kopie.jpg",
      "/images/woningen/oostende/6ffe6340-bb8f-11f0-81e2-97c8d345614a kopie.jpg",
      "/images/woningen/oostende/706e8930-bb8f-11f0-b388-2db85122e7fa (1) kopie.jpg",
      "/images/woningen/oostende/706e8930-bb8f-11f0-b388-2db85122e7fa kopie.jpg",
      "/images/woningen/oostende/70a4dba0-bb8f-11f0-b9a0-3325af39a98d kopie.jpg",
    ],
    boekUrl:
      "https://book.moroww.com/nl/properties/695140859e91eb0014db3eb1?minOccupancy=1",
  },
  {
    id: "cozy-relax-beernem",
    naam: "The Cozy Relax Home",
    collectie: "the fields",
    locatie: "Beernem",
    prijs: 600,
    slaapkamers: 4,
    badkamers: 2,
    maxGasten: 10,
    oppervlakte: null,
    tags: ["Zwembad", "Hottub", "Tuin met BBQ"],
    slogan: "Groot genoeg voor het hele gezelschap. Rustig genoeg voor de rest.",
    introductie:
      "Voor groepen die echt samen willen zijn. Niet op elkaars lip — maar wel samen. Vier slaapkamers, een zwembad, een hottub, een vuurschaal en een tuin die groot genoeg is om iedereen hun eigen hoekje te geven. Beernem is geen bestemming die je kent. Dat is precies waarom het zo goed werkt.",
    beschrijving:
      "Stijlvolle vakantiewoning voor maximaal 10 gasten, midden in het groen in Beernem. Luxueuze badkamers, ruime tuin met overdekt terras, zwembad, vuurschaal en petanquebaan.",
    volledigeBeschrijving:
      "Kom volledig tot rust in deze stijlvolle vakantiewoning voor maximaal 10 gasten, midden in het groen in Beernem. Luxueuze badkamers, een ruime tuin met overdekt terras, zwembad, vuurschaal, BBQ en petanquebaan. Binnen vind je vier gezellige slaapkamers met kwalitatieve boxspringbedden. De open leefruimte bestaat uit een lichtrijke zithoek, een grote eettafel en een volledig uitgeruste keuken. Buiten wacht je privé tuin — de absolute troef van deze woning. Ontspan in de hottub, steek de vuurschaal aan, neem een duik in het zwembad of speel een potje pétanque. Met een centrale ligging op 14 km van Brugge, 25 km van de kust en 35 km van Gent biedt deze woning de perfecte balans tussen rust en bereikbaarheid.",
    hoogtepunten: [
      "Zwembad, hottub en vuurschaal",
      "Tuin met BBQ en petanquebaan",
      "Tot 10 gasten",
      "14 km van Brugge",
      "Parkeren voor 5 wagens",
      "4 slaapkamers met boxspringbedden",
    ],
    inCheckin: "15:00",
    uitCheckin: "11:00",
    heroFoto:
      "/images/woningen/beernem/WhatsApp Image 2025-11-02 at 14.42.01.jpeg",
    fotos: [
      "/images/woningen/beernem/WhatsApp Image 2025-11-02 at 14.18.18 (1).jpeg",
      "/images/woningen/beernem/WhatsApp Image 2025-11-02 at 14.18.18 (2).jpeg",
      "/images/woningen/beernem/WhatsApp Image 2025-11-02 at 14.18.18 (3).jpeg",
      "/images/woningen/beernem/WhatsApp Image 2025-11-02 at 14.18.18 (4).jpeg",
      "/images/woningen/beernem/WhatsApp Image 2025-11-02 at 14.18.18.jpeg",
      "/images/woningen/beernem/WhatsApp Image 2025-11-02 at 14.18.19 (1).jpeg",
      "/images/woningen/beernem/WhatsApp Image 2025-11-02 at 14.18.19 (10).jpeg",
      "/images/woningen/beernem/WhatsApp Image 2025-11-02 at 14.18.19 (2).jpeg",
    ],
    boekUrl:
      "https://book.moroww.com/nl/properties/690781db69d1700012bf6dd3?minOccupancy=1",
  },
];

export const BADGE_STYLES: Record<Woning["collectie"], { bg: string; color: string }> = {
  "the shore": { bg: "#EEBC9D", color: "#1A1A1A" },
  "the fields": { bg: "#CBD085", color: "#1A1A1A" },
};
