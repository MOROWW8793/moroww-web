export type NavHref =
  | '/'
  | '/collectie'
  | '/over-moroww'
  | '/de-standaard'
  | '/eigenaar-worden'
  | '/partners'
  | '/contact'
  | '/privacy'

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

// WP4 zet 'de standaard' aan (labelKey: 'standard', href: '/de-standaard')
// in beide lijsten. Route bestaat al (noindex-stub), messages-keys ook.

export const mainNavItems: NavItem[] = [
  { labelKey: 'collection', href: '/collectie' },
  { labelKey: 'about',      href: '/over-moroww' },
  { labelKey: 'partners',   href: '/partners' },
  { labelKey: 'for_owners', href: '/eigenaar-worden' },
]

export const footerNavItems: NavItem[] = [
  { labelKey: 'home',       href: '/' },
  { labelKey: 'collection', href: '/collectie' },
  { labelKey: 'about',      href: '/over-moroww' },
  { labelKey: 'for_owners', href: '/eigenaar-worden' },
  { labelKey: 'partners',   href: '/partners' },
  { labelKey: 'contact',    href: '/contact' },
  { labelKey: 'privacy',    href: '/privacy' },
]
