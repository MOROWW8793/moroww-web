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
    heroFoto: "/images/woningen/knokke/2026-AmelieBauwens-Moroww-V2-108.jpg",
    boekUrl: "https://book.moroww.com",
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
    heroFoto: "/images/woningen/ursel/Bogaertstraat 17 Ursel-10.jpg",
    boekUrl: "https://book.moroww.com",
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
    heroFoto: "/images/woningen/oostende/6e71ca30-bb8f-11f0-96ff-dd8382026135 kopie.jpg",
    boekUrl: "https://book.moroww.com",
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
      "/images/woningen/beernem/WhatsApp Image 2025-11-02 at 14.18.18 (1).jpeg",
    boekUrl: "https://book.moroww.com",
  },
];
