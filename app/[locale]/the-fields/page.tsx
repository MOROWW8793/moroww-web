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
  const t = await getTranslations({ locale, namespace: 'thefields' })
  const isNl = locale === 'nl'
  const fieldsCount = liveWoningen().filter((w) => w.collectie === 'the fields').length
  return siteMetadata({
    titel: t('meta_title'),
    beschrijving: t('meta_description', {
      countWord: countWord(fieldsCount, isNl ? 'nl' : 'en', true),
    }),
    pad: isNl ? '/the-fields' : '/en/the-fields',
    locale: isNl ? 'nl' : 'en',
    hreflang: { nl: '/the-fields', en: '/en/the-fields' },
  })
}

export default async function TheFieldsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return <StreekPagina streek="the fields" locale={locale} />
}
