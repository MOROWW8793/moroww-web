export type NavHref =
  | '/'
  | '/collectie'
  | '/over-moroww'
  | '/de-standaard'
  | '/moroww-os'
  | '/the-shore'
  | '/the-fields'
  | '/eigenaar-worden'
  | '/het-label'
  | '/voor-eigenaars'
  | '/partners'
  | '/contact'
  | '/privacy'
  | '/vergelijking'

export type NavLabelKey =
  | 'home'
  | 'collection'
  | 'about'
  | 'standard'
  | 'partners'
  | 'for_owners'
  | 'contact'
  | 'privacy'

export type NavItem = {
  labelKey: NavLabelKey
  href: NavHref
}

// Nav-structuur splitst gast en eigenaar. Bouwspec stap 5A.
//
// Gastenkant komt links: waar de collectie is, waar de standaard uitgelegd
// wordt, wie moroww is. Alles wat een gast nodig heeft om te kiezen.
//
// Eigenaarskant zit als ééne ingang rechts, met een dropdown naar de vier
// kennispagina's en de eigenaars-landing zelf. Vanuit hier vindt Google én
// een bezoeker het volledige kennis-cluster.
//
// 'partners' is uit de nav gehaald. De route blijft bestaan en blijft
// bereikbaar via de voettekst; op de site moet partners bewijsmateriaal
// zijn op /over-moroww, geen bestemming.
// Nov 2026: de standaard en over moroww uit de bovenste navigatie gehaald.
// De pagina's blijven bestaan en staan in de voettekst.
export const gastenNavItems: NavItem[] = [
  { labelKey: 'collection', href: '/collectie' },
]

// Legacy — mainNavItems blijft geëxporteerd voor backwards-compat.
// Gebruik in nieuwe code `gastenNavItems`.
export const mainNavItems: NavItem[] = gastenNavItems

// Dropdown onder "voor eigenaars ▾". Elk item krijgt een korte toelichting
// in type-audit onder de titel; die staat hier bij het item zodat we op één
// plek kunnen wijzigen.
export interface EigenaarDropdownItem {
  titel: string
  toelichting: string
  /** Optionele EN-variant van de toelichting. Als leeg gelaten, valt de
   *  Navbar terug op de NL-tekst (de overige items op /kennis zijn
   *  NL-only inhoud, daar heeft een EN-variant geen doel). */
  toelichtingEn?: string
  href: string
  /** kleur van het blaadje van de tak */
  kleur?: string
}
// Drie ingangen, één per tak van de merkfamilie. De kennisartikels staan
// niet meer los in het menu: ze zitten samen achter "kennis voor eigenaars"
// onderaan het paneel (→ /kennis), net als in de voettekst.
export const eigenaarDropdown: EigenaarDropdownItem[] = [
  {
    titel: 'het label',
    toelichting: 'keuring, collectie en boekingen voor je huis',
    toelichtingEn: 'inspection, collection and bookings for your home',
    href: '/het-label',
    kleur: '#fea05e',
  },
  {
    titel: 'moroww how',
    toelichting: 'vergunning, opstart en je eigen website',
    toelichtingEn: 'permits, set-up and your own website',
    href: '/how',
    kleur: '#a994f0',
  },
  {
    titel: 'moroww hub',
    toelichting: 'partners, academy en market',
    toelichtingEn: 'partners, academy and market',
    href: '/hub',
    kleur: '#7fa0c9',
  },
]

// (De vroegere kennisLinks-array is verwijderd. De voettekst toont sinds
//  deze stap één samengevouwen link "kennis voor eigenaars → /kennis".
//  De hub op /kennis toont alle artikels.)

export const footerNavItems: NavItem[] = [
  { labelKey: 'home',       href: '/' },
  { labelKey: 'collection', href: '/collectie' },
  { labelKey: 'about',      href: '/over-moroww' },
  { labelKey: 'standard',   href: '/de-standaard' },
  { labelKey: 'for_owners', href: '/eigenaar-worden' },
  { labelKey: 'partners',   href: '/partners' },
  { labelKey: 'contact',    href: '/contact' },
  { labelKey: 'privacy',    href: '/privacy' },
]

// Voettekst-kolommen. Elke link verwijst naar een messages-key onder de
// footer-namespace zodat NL en EN hetzelfde array delen en de vertaling
// uit één plek komt (messages/{nl,en}.json → "footer.*").
export type FooterLabelKey =
  | 'collection'
  | 'the_shore'
  | 'the_fields'
  | 'standard'
  | 'about'
  | 'partners'
  | 'for_owners'
  | 'knowledge_for_owners'
  | 'the_label'
  | 'how'
  | 'hub'
  | 'contact'
  | 'calendar_link'
  | 'privacy'
  | 'terms'

export interface FooterLink {
  labelKey: FooterLabelKey
  href: string
  extern?: boolean
}

// Voettekst · drie kolommen, één per publiek.
//   verblijven     → gasten: alles om een huis te kiezen
//   voor eigenaars → één ingang (het label) + kennis + gesprek
//   moroww         → het merk en de twee andere takken (how, hub)
// Juridisch, cookies en socials staan in de onderste balk, niet in een kolom.
// /eigenaar-worden en /partners blijven bestaan maar staan niet meer in de
// voettekst: het label is de ingang voor eigenaars, partners leven in de hub.
export type FooterKolomKey = 'column_stays' | 'column_for_owners' | 'column_moroww'

export interface FooterKolom {
  titelKey: FooterKolomKey
  links: FooterLink[]
}

export const footerKolommen: FooterKolom[] = [
  {
    titelKey: 'column_stays',
    links: [
      { labelKey: 'collection', href: '/collectie' },
      { labelKey: 'the_shore',  href: '/the-shore' },
      { labelKey: 'the_fields', href: '/the-fields' },
      { labelKey: 'standard',   href: '/de-standaard' },
    ],
  },
  {
    titelKey: 'column_for_owners',
    links: [
      { labelKey: 'the_label',            href: '/het-label' },
      { labelKey: 'knowledge_for_owners', href: '/kennis' },
      {
        labelKey: 'calendar_link',
        href: 'https://calendar.app.google/BH8wYeA9AGf6KrUz7',
        extern: true,
      },
    ],
  },
  {
    titelKey: 'column_moroww',
    links: [
      { labelKey: 'about',   href: '/over-moroww' },
      { labelKey: 'how',     href: '/how' },
      { labelKey: 'hub',     href: '/hub' },
      { labelKey: 'contact', href: '/contact' },
    ],
  },
]

// Onderste balk
export const footerJuridisch: FooterLink[] = [
  { labelKey: 'privacy', href: '/privacy' },
  { labelKey: 'terms',   href: '/voorwaarden' },
]

// NL-only pagina's: taalwissel-knop is verborgen op deze pagina's, want
// een taalwissel die naar een 404 of home leidt suggereert dat er iets stuk is.
export const nlOnlyRoutes: NavHref[] = [
  '/het-label',
  '/voor-eigenaars',
  '/vergelijking',
  '/privacy',
]

// Pagina's mét een foto-hero die onder de navbar doorloopt. Op alle andere
// pagina's start de Navbar meteen in 'scrolled' state (blush, donker logo).
// Pandpagina, afrekenen en bevestiging openen allemaal met een foto tot bovenaan.
export function isDarkHeroPath(pathname: string): boolean {
  // Home heeft sinds nov 2026 een foto-slideshow als hero.
  if (pathname === '/' || pathname === '') return true
  return /\/(collectie|collection)\/[^/]+(\/(boeken|book|bevestigd|confirmed))?\/?$/.test(pathname)
}
