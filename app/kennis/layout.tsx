// Kennisbank-layout. Staat bewust buiten de [locale]-tree omdat de kennisbank
// NL-only is (Belgische eigenaars als doelgroep). We bouwen html/body hier
// opnieuw op — de root layout in app/layout.tsx is een pass-through, dus die
// levert dat niet aan.
//
// De bestaande Navbar en Footer zijn client-componenten die uit next-intl
// hooken. Daarom een NextIntlClientProvider met de NL-berichten eromheen, ook
// al is deze tree niet in de intl-router opgenomen. setRequestLocale zorgt dat
// server-side hooks weten in welke taal we renderen.

import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { Analytics } from '@vercel/analytics/next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { OrganizationJsonLd } from '@/components/JsonLd'
import type { ReactNode } from 'react'

export default async function KennisLayout({ children }: { children: ReactNode }) {
  setRequestLocale('nl')
  const messages = await getMessages({ locale: 'nl' })

  return (
    <html lang="nl-BE">
      <body className="antialiased font-sans bg-moroww-blush text-moroww-black">
        <OrganizationJsonLd />
        <NextIntlClientProvider messages={messages} locale="nl">
          <Navbar />
          <main className="bg-[#FAE4D6]">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
