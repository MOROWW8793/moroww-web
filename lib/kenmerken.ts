import type { Woning } from '@/lib/woningen'

// Kenmerken per woning voor het collectie-overzicht (nov 2026). Alleen
// afgeleid uit wat al in de woningdata staat (tags, hoogtepunten,
// amenities). Staat iets er niet, dan tonen we het ook niet.

export type Kenmerk = 'zeezicht' | 'strand' | 'zwembad' | 'wellness' | 'buiten' | 'parking' | 'smartlock'

export const KENMERK_LABELS: Record<Kenmerk, { nl: string; en: string }> = {
  zeezicht: { nl: 'zeezicht', en: 'sea view' },
  strand: { nl: 'strand dichtbij', en: 'beach nearby' },
  zwembad: { nl: 'zwembad', en: 'pool' },
  wellness: { nl: 'sauna of hottub', en: 'sauna or hot tub' },
  buiten: { nl: 'eigen buitenruimte', en: 'private outdoor space' },
  parking: { nl: 'parking', en: 'parking' },
  smartlock: { nl: 'zelf inchecken', en: 'self check-in' },
}

const REGELS: Array<[Kenmerk, RegExp]> = [
  ['zeezicht', /zeezicht|zeebalkon|recht op zee|zicht op het staketsel/i],
  ['strand', /strand op/i],
  ['zwembad', /zwembad/i],
  ['wellness', /sauna|hottub/i],
  ['buiten', /tuin|terras|patio|balkon|vlonder/i],
  ['parking', /parking|parkeren/i],
  ['smartlock', /smart lock/i],
]

export function kenmerkenVan(w: Woning): Kenmerk[] {
  const tekst = [...w.tags.map((t) => t.nl), ...w.hoogtepunten.map((h) => h.nl), ...(w.amenities ?? [])].join(' · ')
  return REGELS.filter(([, re]) => re.test(tekst)).map(([k]) => k)
}
