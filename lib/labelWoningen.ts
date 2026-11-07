// Huizen met het moroww-label waarvan de eigenaar (of zijn beheerder) zelf verhuurt.
// Ze staan in de collectie op de homepage, maar de kaart linkt rechtstreeks
// naar de eigen boekingswebsite van de eigenaar in plaats van naar een pandpagina.
//
// Nieuw labelhuis toevoegen: kopieer het voorbeeld hieronder, zet `voorbeeld` weg
// en vul de echte gegevens in. Foto's horen in /public/images/label/<id>/.

export interface LabelWoning {
  id: string
  naam: string
  locatie: string
  collectie: 'the shore' | 'the fields'
  heroFoto: string
  /** De eigen boekingswebsite van de eigenaar. */
  eigenBoekingsUrl: string
  slaapkamers?: number
  maxGasten?: number
  oppervlakte?: string
  /** Jaar van de laatste keuring, getoond op de kaart. */
  gekeurd?: number
  /** Alleen zichtbaar op preview-deploys, nooit op moroww.com. */
  voorbeeld?: boolean
}

// Voorbeeld van een item:
// {
//   id: 'villa-x',
//   naam: 'Villa X',
//   locatie: 'Knokke',
//   collectie: 'the shore',
//   heroFoto: '/images/label/villa-x/hero.jpg',
//   eigenBoekingsUrl: 'https://www.villa-x.be',
//   slaapkamers: 3,
//   maxGasten: 6,
//   gekeurd: 2026,
// },
const alle: LabelWoning[] = []

const isProductie = process.env.VERCEL_ENV === 'production'

export function liveLabelWoningen(): LabelWoning[] {
  return alle.filter((w) => !(w.voorbeeld && isProductie))
}
