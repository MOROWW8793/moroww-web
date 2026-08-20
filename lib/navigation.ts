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

// De publieke kennispagina's. Ook naar de voettekst voor Google — twee
// interne routes naar het cluster.
export interface KennisLink {
  titel: string
  href: string
}
export const kennisLinks: KennisLink[] = [
  { titel: 'wat een nacht kost',        href: '/kennis/wat-kost-een-nacht-vakantiewoning' },
  { titel: 'verblijfsbelasting',        href: '/kennis/verblijfsbelasting-vakantiewoning' },
  { titel: 'tweedeverblijf of logies',  href: '/kennis/tweedeverblijfsbelasting-of-logiesbelasting' },
  { titel: 'brandveiligheidsattest',    href: '/kennis/brandveiligheidsattest-vakantiewoning-vlaanderen' },
  { titel: 'vier manieren',             href: '/kennis/vakantiewoning-verhuren-zelf-platform-beheerder-label' },
]

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
