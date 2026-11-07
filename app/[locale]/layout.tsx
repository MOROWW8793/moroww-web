import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Analytics } from '@vercel/analytics/next'
import { Fraunces, Instrument_Sans } from 'next/font/google'
import { routing } from '@/i18n/routing'
import { Nav } from '@/components/hallmark/Nav'
import { Footer } from '@/components/hallmark/Footer'
import { OrganizationJsonLd } from '@/components/JsonLd'
import type { ReactNode } from 'react'
import '@/app/hallmark.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal'],
  variable: '--font-fraunces',
  display: 'swap',
})

const instrument = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-instrument',
  display: 'swap',
})

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
    <html lang={htmlLang} className={`${fraunces.variable} ${instrument.variable}`}>
      <body className="hm">
        <OrganizationJsonLd />
        <NextIntlClientProvider messages={messages}>
          <Nav locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
