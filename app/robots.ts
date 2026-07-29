import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Admin, onboarding, gastwelkom en API-routes horen niet in
        // een zoekmachine-index.
        disallow: [
          '/admin/',
          '/onboarding/',
          '/welcome/',
          '/api/',
        ],
      },
    ],
    sitemap: 'https://www.moroww.com/sitemap.xml',
    host: 'https://www.moroww.com',
  }
}
