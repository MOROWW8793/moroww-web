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
    '/over-moroww': {
      nl: '/over-moroww',
      en: '/about',
    },
    '/de-standaard': {
      nl: '/de-standaard',
      en: '/the-standard',
    },
    // NL-only pagina's: 'en'-pad is dezelfde string, next.config.mjs
    // redirect /en/... naar de NL-URL. Taalwissel-knop verborgen via nlOnlyRoutes.
    '/eigenaar-worden': {
      nl: '/eigenaar-worden',
      en: '/eigenaar-worden',
    },
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
