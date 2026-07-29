export type NavHref =
  | '/'
  | '/collectie'
  | '/over-moroww'
  | '/de-standaard'
  | '/moroww-os'
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

export const mainNavItems: NavItem[] = [
  { labelKey: 'collection', href: '/collectie' },
  { labelKey: 'about',      href: '/over-moroww' },
  { labelKey: 'standard',   href: '/de-standaard' },
  { labelKey: 'partners',   href: '/partners' },
  { labelKey: 'for_owners', href: '/eigenaar-worden' },
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
// in 'scrolled' state (blush-achtergrond, donkere tekst) — anders zou witte
// menutekst op een lichte pagina-achtergrond onleesbaar zijn.
export const lightHeroRoutes: NavHref[] = [
  '/de-standaard',
  '/moroww-os',
]
