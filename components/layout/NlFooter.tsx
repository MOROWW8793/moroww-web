import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Footer } from './Footer'
import { CookieBanner } from '@/components/CookieBanner'

// Advisory en hub staan buiten de [locale]-tree en hebben geen intl-provider.
// De voettekst en de cookiebanner (die de knop "cookie-instellingen" opent)
// krijgen er hier een, in het Nederlands, met enkel hun eigen berichten.
export async function NlFooter() {
  const { footer, cookies } = await getMessages({ locale: 'nl' })
  return (
    <NextIntlClientProvider locale="nl" messages={{ footer, cookies }}>
      <div data-site-voet>
        <Footer />
      </div>
      <CookieBanner />
    </NextIntlClientProvider>
  )
}
