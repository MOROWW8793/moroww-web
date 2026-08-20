export type NavHref =
  | '/'
  | '/collectie'
  | '/over-moroww'
  | '/de-standaard'
  | '/moroww-os'
  | '/the-shore'
  | '/the-fields'
  | '/eigenaar-worden'
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
export const gastenNavItems: NavItem[] = [
  { labelKey: 'collection', href: '/collectie' },
  { labelKey: 'standard',   href: '/de-standaard' },
  { labelKey: 'about',      href: '/over-moroww' },
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
  href: string
}
export const eigenaarDropdown: EigenaarDropdownItem[] = [
  {
    titel: 'voor eigenaars',
    toelichting: 'wat het label doet en wat het kost',
    href: '/eigenaar-worden',
  },
  {
    titel: 'wat een nacht kost',
    toelichting: 'btw, schoonmaak, linnen, commissie',
    href: '/kennis/wat-kost-een-nacht-vakantiewoning',
  },
  {
    titel: 'regels en belasting',
    toelichting: 'verblijfsbelasting en brandveiligheid',
    href: '/kennis/verblijfsbelasting-vakantiewoning',
  },
  {
    titel: 'vier manieren',
    toelichting: 'zelf, platform, beheerder of label',
    href: '/kennis/vakantiewoning-verhuren-zelf-platform-beheerder-label',
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

// Voettekst-kolommen. Explicit label + href zodat we niet voor elke nieuwe
// route een NavLabelKey en messages-key hoeven aan te maken. De voettekst
// is NL-only in bewoording (de vertaling per locale zit al in de nav zelf).
export interface FooterLink {
  titel: string
  href: string
  extern?: boolean
}

// Kolom 2 · de collectie
export const footerCollectieLinks: FooterLink[] = [
  { titel: 'de collectie',   href: '/collectie' },
  { titel: 'the shore',      href: '/the-shore' },
  { titel: 'the fields',     href: '/the-fields' },
  { titel: 'de standaard',   href: '/de-standaard' },
  { titel: 'over moroww',    href: '/over-moroww' },
  { titel: 'partners',       href: '/partners' },
]

// Kolom 3 · voor eigenaars. Eén link naar /kennis (was tien) — de hub op
// /kennis toont alle artikels, de voettekst hoeft dat niet te dupliceren.
export const footerEigenaarLinks: FooterLink[] = [
  { titel: 'voor eigenaars',          href: '/eigenaar-worden' },
  { titel: 'kennis voor eigenaars',   href: '/kennis' },
  { titel: 'contact',                 href: '/contact' },
  {
    titel: 'een gesprek inplannen',
    href: 'https://calendar.app.google/BH8wYeA9AGf6KrUz7',
    extern: true,
  },
  { titel: 'privacy',                 href: '/privacy' },
]

// NL-only pagina's: taalwissel-knop is verborgen op deze pagina's, want
// een taalwissel die naar een 404 of home leidt suggereert dat er iets stuk is.
export const nlOnlyRoutes: NavHref[] = [
  '/eigenaar-worden',
  '/vergelijking',
  '/privacy',
]

// Pagina's zonder donkere foto-hero. De Navbar start op deze routes meteen
// in 'scrolled' state (blush of paper, donkere tekst) — anders zou witte
// menutekst op een lichte pagina-achtergrond onleesbaar zijn.
//
// Type is bewust string zodat we prefixen mogen bevatten die niet in NavHref
// zitten (`/kennis` staat niet in de nav zelf). Matching is exact óf via
// startsWith '<prefix>/', dus '/kennis' vangt ook '/kennis/wat-kost-…'.
export const lightHeroRoutes: string[] = [
  '/',
  '/de-standaard',
  '/moroww-os',
  '/kennis',
  '/collectie',
  '/eigenaar-worden',
]
