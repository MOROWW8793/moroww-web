// Alles wat nog moet worden ingevuld of kan wijzigen, staat hier op één plek.
// Waarden tussen [HAKEN] zijn nog niet beslist.

export const site = {
  url: 'https://www.moroww.com',
  bedrijf: 'MOROWW BV',
  ondernemingsnummer: '[ONDERNEMINGSNUMMER]',
  plaats: 'Waregem',
  contact: {
    naam: 'Noam Landries',
    telefoon: '+32 456 91 20 24',
    email: 'info@moroww.com',
  },
  prijzen: {
    label: '[PRIJS]',
    scan: '€ 450',
    traject: '€ 1.500',
    partner: '[PRIJS]',
    website: '[PRIJS]',
    academyLid: '[PRIJS]',
    academyTicket: '[PRIJS]',
  },
} as const;

export type Merk = 'moroww' | 'how' | 'hub';
