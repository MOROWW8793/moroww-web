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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isNl = locale === 'nl'
  return {
    alternates: {
      canonical: isNl ? 'https://www.moroww.com' : 'https://www.moroww.com/en',
      languages: {
        'nl-BE': 'https://www.moroww.com',
        'nl': 'https://www.moroww.com',
        'en': 'https://www.moroww.com/en',
        'x-default': 'https://www.moroww.com',
      },
    },
  }
}

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
