import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['nl', 'en'],
  defaultLocale: 'nl',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/collectie': {
      nl: '/collectie',
      en: '/collection',
    },
    '/collectie/[id]': {
      nl: '/collectie/[id]',
      en: '/collection/[id]',
    },
    '/collectie/[id]/boeken': {
      nl: '/collectie/[id]/boeken',
      en: '/collection/[id]/book',
    },
    '/collectie/[id]/bevestigd': {
      nl: '/collectie/[id]/bevestigd',
      en: '/collection/[id]/confirmed',
    },
    '/over-moroww': {
      nl: '/over-moroww',
      en: '/about',
    },
    '/de-standaard': {
      nl: '/de-standaard',
      en: '/the-standard',
    },
    // Collectiepagina's — namen zijn al Engels, dus zelfde pad in beide talen
    '/the-shore': {
      nl: '/the-shore',
      en: '/the-shore',
    },
    '/the-fields': {
      nl: '/the-fields',
      en: '/the-fields',
    },
    '/moroww-os': {
      nl: '/moroww-os',
      en: '/moroww-os',
    },
    // /eigenaar-worden is nu bilinguaal. EN wordt gemount op /en/become-an-owner
    // via de pathnames-mapping; next.config.mjs 301't /en/eigenaar-worden naar
    // /en/become-an-owner.
    '/eigenaar-worden': {
      nl: '/eigenaar-worden',
      en: '/become-an-owner',
    },
    // NL-only pagina's: 'en'-pad is dezelfde string, next.config.mjs
    // redirect /en/... naar de NL-URL. Taalwissel-knop verborgen via nlOnlyRoutes.
    '/partners': {
      nl: '/partners',
      en: '/partners',
    },
    '/contact': {
      nl: '/contact',
      en: '/contact',
    },
    '/privacy': {
      nl: '/privacy',
      en: '/privacy',
    },
    '/vergelijking': {
      nl: '/vergelijking',
      en: '/vergelijking',
    },
  },
})
