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
    '/eigenaar-worden': {
      nl: '/eigenaar-worden',
      en: '/become-an-owner',
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
  },
})
