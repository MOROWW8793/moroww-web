// Inhoud van moroww hub op één plek. Waarden tussen [HAKEN] zijn nog niet beslist.
// Een partner komt pas met naam op de site als de samenwerking getekend is
// (status 'live'). Tot dan blijft de categorie zichtbaar, zonder naam.

export type PartnerStatus = 'live' | 'binnenkort';

export interface HubPartner {
  naam: string;
  wat: string;
  /** Voordeel voor leden; leeg laten tot het afgesproken is. */
  voordeel?: string;
  url?: string;
  status: PartnerStatus;
}

export interface PartnerCategorie {
  sleutel: string;
  label: string;
  titel: string;
  tekst: string;
  foto: string;
  partners: HubPartner[];
}

export const partnerCategorieen: PartnerCategorie[] = [
  {
    sleutel: 'tools',
    foto: '/images/hub/tools-laptop.jpg',
    label: 'tools en software',
    titel: 'kalender, prijzen, gastberichten.',
    tekst: 'Voor wie zelf verhuurt: één kalender over alle platformen, prijzen die meebewegen, berichten die op tijd vertrekken.',
    partners: [
      { naam: '[PARTNER]', wat: 'beheersoftware voor wie zelf verhuurt', status: 'binnenkort' },
    ],
  },
  {
    sleutel: 'huis',
    foto: '/images/hub/huis-moro-badkamer.jpg',
    label: 'in het huis',
    titel: 'wat de gast ruikt en voelt.',
    tekst: 'Geur, linnen en de essentials in de badkamer. Dezelfde die we in onze eigen huizen gebruiken.',
    partners: [
      { naam: '[PARTNER]', wat: 'geur', status: 'binnenkort' },
      { naam: '[PARTNER]', wat: 'huurlinnen', status: 'binnenkort' },
      { naam: 'Moro Essentials', wat: 'badkamerproducten, Belgisch merk', url: 'https://moro-essentials.com/nl/collections/all-products-new', status: 'live' },
    ],
  },
  {
    sleutel: 'stil',
    foto: '/images/standaard/V2-63.jpg',
    label: 'stille systemen',
    titel: 'slot, licht, warmte, sensoren.',
    tekst: 'Techniek die werkt zonder dat de gast ze ziet. Met advies over wat past bij je huis.',
    partners: [
      { naam: 'Nuki', wat: 'slimme sloten · moroww is gecertificeerd Nuki Pro Partner en installeert zelf', url: 'https://nuki.io/nl-nl/', status: 'live' },
    ],
  },
  {
    sleutel: 'vakmensen',
    foto: '/images/standaard/V2-19.jpg',
    label: 'vakmensen',
    titel: 'schoonmaak, onderhoud, foto.',
    tekst: 'Mensen die weten wat een wissel is. Per regio, en alleen wie we zelf aan het werk zagen.',
    partners: [
      { naam: 'Opruimingen CB', wat: 'schoonmaak, dieptereiniging en ontruiming · West- en Oost-Vlaanderen', url: 'https://www.opruimingencb.be/', status: 'live' },
      { naam: 'Amelie Bauwens', wat: 'fotografie volgens de moroww-standaard', url: 'https://www.ameliebauwens.com/', status: 'live' },
    ],
  },
];

export const hoeWeKiezen: [string, string][] = [
  ['het past bij het label', 'Wat een partner doet, moet een gast in een moroww-huis merken. Of net niet merken.'],
  ['we gebruiken het zelf', 'Een partner werkt eerst in onze eigen huizen, voor hij in de hub komt.'],
  ['een voordeel voor leden', 'Elke partner geeft eigenaars met het label iets wat anderen niet krijgen.'],
  ['één aanspreekpunt', 'Leden weten wie ze moeten bellen, en krijgen snel antwoord.'],
];

export const ledenKrijgen: [string, string][] = [
  ['vraag het moroww', 'Een extra schoonmaak, de ramen, een herstelling: jij vraagt, wij zoeken een partner in de buurt en volgen op tot het klaar is. Je ziet het met een foto.'],
  ['partners met voordelen', 'Vakmensen, tools en merken die moroww zelf kiest, met een voordeel voor leden.'],
  ['merken in je huis', 'Kleine merken die je gasten gebruiken, in de badkamer, de keuken of de living. Moroww plaatst ze.'],
  ['de academy en de ledenbrief', 'Kleine sessies in een moroww-huis, en één keer per maand wat er verandert.'],
];

export const academyThemas: [string, string][] = [
  ['de eerste tien seconden', 'Geur, licht en warmte bij aankomst, en wat dat doet met je reviews.'],
  ['je cijfers', 'Wat een nacht je echt kost, en hoe je prijzen zet die kloppen.'],
  ['reviews', 'Waarom gasten vijf sterren geven, en waarom niet.'],
  ['de regels', 'Wat verandert er, en wat betekent het voor jouw huis. Met moroww advisory.'],
];

export interface AcademySessie {
  datum: string;
  plaats: string;
  titel: string;
  tekst: string;
}

export const academySessies: AcademySessie[] = [
  {
    datum: '[DATUM]',
    plaats: '[LOCATIE]',
    titel: 'wat een gast ruikt voor hij binnenkomt.',
    tekst: 'Over geur, licht en de eerste tien seconden. En wat dat doet met je reviews.',
  },
];
