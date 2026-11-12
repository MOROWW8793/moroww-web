import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { liveWoningen } from '@/lib/woningen'
import { StreekPagina } from '@/components/collectie/StreekPagina'
import { siteMetadata } from '@/lib/seo/siteMetadata'
import { countWord } from '@/lib/getallen'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'theshore' })
  const isNl = locale === 'nl'
  const shoreCount = liveWoningen().filter((w) => w.collectie === 'the shore').length
  return siteMetadata({
    titel: t('meta_title'),
    beschrijving: t('meta_description', {
      countWord: countWord(shoreCount, isNl ? 'nl' : 'en', true),
    }),
    pad: isNl ? '/the-shore' : '/en/the-shore',
    locale: isNl ? 'nl' : 'en',
    hreflang: { nl: '/the-shore', en: '/en/the-shore' },
  })
}

export default async function TheShorePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return <StreekPagina streek="the shore" locale={locale} />
}
