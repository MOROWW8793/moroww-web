import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { liveWoningen, wachtOpBeeldCount, type Locale } from '@/lib/woningen'
import { WoningKaarten } from '@/components/sections/WoningKaarten'
import { AuditLijn } from '@/components/AuditLijn'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'theshore' })
  const isNl = locale === 'nl'
  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      canonical: isNl
        ? 'https://www.moroww.com/the-shore'
        : 'https://www.moroww.com/en/the-shore',
      languages: {
        'nl-BE': 'https://www.moroww.com/the-shore',
        'nl': 'https://www.moroww.com/the-shore',
        'en': 'https://www.moroww.com/en/the-shore',
        'x-default': 'https://www.moroww.com/the-shore',
      },
    },
  }
}

export default async function TheShorePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('theshore')
  const shorePanden = liveWoningen().filter((w) => w.collectie === 'the shore')
  const wachtendCount = wachtOpBeeldCount('the shore')

  return (
    <main className="bg-moroww-blush">

      {/* Hero */}
      <section className="w-full pt-32 pb-16 md:pt-40 md:pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-moroww-brown mb-4">
            {t('hero_label')}
          </p>
          <h1
            className="font-bold text-moroww-black leading-[1.05] tracking-[-0.02em] mb-8"
            style={{ fontSize: 'clamp(2.25rem, 6vw, 5rem)' }}
          >
            {t('hero_h1')}
          </h1>
          <p className="text-moroww-black/70 leading-relaxed" style={{ fontSize: 20 }}>
            {t('hero_intro')}
          </p>
        </div>
      </section>

      {/* Panden */}
      <section className="w-full px-6 md:px-16 lg:px-24 pb-20">
        <div className="max-w-6xl mx-auto">
          <WoningKaarten woningen={shorePanden} locale={locale as Locale} />
        </div>
      </section>

      {/* Binnenkort — geauditeerde panden die wachten op fotoshoot.
          Aantal komt uit lib/woningen.ts (status='wacht_op_beeld'),
          zichtbaar zolang er minstens één wachtend pand in the shore zit. */}
      {wachtendCount > 0 && (
        <section className="w-full px-6 md:px-16 lg:px-24 pb-20">
          <div className="max-w-3xl mx-auto">
            <AuditLijn density="quiet" items={['binnenkort']} />
            <h3 className="mt-mw-4 text-h3 text-moroww-dark">
              {wachtendCount === 1
                ? 'één woning wacht op haar fotoshoot'
                : `${wachtendCount === 2 ? 'twee' : wachtendCount} woningen wachten op hun fotoshoot`}
            </h3>
            <p className="mt-mw-3 text-body text-moroww-dark">
              {wachtendCount === 1 ? 'Eén kustwoning is' : `${wachtendCount === 2 ? 'Twee' : wachtendCount} kustwoningen zijn`}{' '}
              geauditeerd en opgenomen.{' '}
              {wachtendCount === 1 ? 'Ze verschijnt' : 'Ze verschijnen'} hier zodra het beeld klopt.
            </p>
            <p className="mt-mw-5">
              <Link
                href="/de-standaard"
                className="text-audit uppercase text-moroww-dark underline underline-offset-4 decoration-moroww-label hover:decoration-moroww-dark transition-colors"
              >
                lees hoe we keuren →
              </Link>
            </p>
          </div>
        </section>
      )}

      {/* Streektekst */}
      <section className="w-full py-20 md:py-28 px-6 bg-moroww-brown/15">
        <div className="max-w-3xl mx-auto space-y-6 text-moroww-black/85 leading-relaxed" style={{ fontSize: 18 }}>
          <p>{t('streek_p1')}</p>
          <p>{t('streek_p2')}</p>
          <p>{t('streek_p3')}</p>
          <p>{t('streek_p4')}</p>
        </div>
      </section>

      {/* Link naar /de-standaard */}
      <section className="w-full py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Link
            href="/de-standaard"
            className="text-moroww-brown hover:text-moroww-orange transition-colors underline underline-offset-4"
          >
            {t('cta_link')} →
          </Link>
        </div>
      </section>

    </main>
  )
}
