import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Analytics } from '@vercel/analytics/next'
import { routing } from '@/i18n/routing'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { OrganizationJsonLd } from '@/components/JsonLd'
import type { ReactNode } from 'react'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

// generateMetadata wordt bewust NIET geëxporteerd op layout-niveau. Vroeger
// zette hij `alternates.canonical` en `alternates.languages` naar de homepage.
// Voor pagina's die geen eigen alternates zetten leidde dat tot een
// homepage-hreflang op elke route; en voor pagina's die alternates wél
// overriden werd de languages-map alsnog weggegooid (Next.js vervangt
// alternates in zijn geheel bij een override). Canonical en hreflang staan
// nu per pagina, via lib/seo/siteMetadata.ts of lib/kennis/meta.ts.

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'nl' | 'en')) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  const htmlLang = locale === 'nl' ? 'nl-BE' : 'en'

  return (
    <html lang={htmlLang}>
      <body className="antialiased font-sans bg-moroww-blush text-moroww-black">
        <OrganizationJsonLd />
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="bg-moroww-blush">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
