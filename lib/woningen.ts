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
  beschrijving: string;
  heroFoto: string;
  fotos: string[];
  boekUrl: string;
}

export const woningen: Woning[] = [
  {
    id: "nosso-knokke",
    naam: "Nosso",
    collectie: "the shore",
    locatie: "Heist-aan-Zee, Knokke",
    prijs: 370,
    slaapkamers: 2,
    badkamers: 2,
    maxGasten: 6,
    oppervlakte: "110m²",
    tags: ["Strand op 2 min", "Privé koer", "2 badkamers"],
    beschrijving:
      "Op twee minuten van de Noordzee, verscholen in een rustige straat in Heist-aan-Zee. Een lichtrijk appartement van 110m² met twee slaapkamers, twee volledige badkamers en een privé koer.",
    heroFoto: "/images/woningen/knokke/2026-AmelieBauwens-Moroww-V2-131.jpg",
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
    naam: "Ann-Helena",
    collectie: "the fields",
    locatie: "Ursel, Meetjesland",
    prijs: 220,
    slaapkamers: 2,
    badkamers: 1,
    maxGasten: 5,
    oppervlakte: null,
    tags: ["Bosrand", "Privétuin met vijver", "Gezinsvriendelijk"],
    beschrijving:
      "Een warme houten chalet in het hart van het grootste bos van Oost-Vlaanderen. Hoge plafonds, natuurlijk hout, een privétuin met vijver en stilte als standaard.",
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
    beschrijving:
      "Zestien verdiepingen hoog, met de Noordzee voor je en de Golf van Oostende aan je zij. Ensuite badkamers, panoramisch balkon en privé ondergrondse parking.",
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
    beschrijving:
      "Stijlvolle vakantiewoning voor maximaal 10 gasten, midden in het groen in Beernem. Luxueuze badkamers, ruime tuin met overdekt terras, zwembad, vuurschaal en petanquebaan.",
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
