import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { OrchestrationLoop } from '@/components/sections/OrchestrationLoop'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'morowwos' })
  const isNl = locale === 'nl'
  const canonical = isNl
    ? 'https://www.moroww.com/moroww-os'
    : 'https://www.moroww.com/en/moroww-os'
  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      canonical,
      languages: {
        'nl-BE': 'https://www.moroww.com/moroww-os',
        'nl': 'https://www.moroww.com/moroww-os',
        'en': 'https://www.moroww.com/en/moroww-os',
        'x-default': 'https://www.moroww.com/moroww-os',
      },
    },
  }
}

export default async function MorowwOsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('morowwos')

  const loop = [
    { n: '01', label: t('loop_01') },
    { n: '02', label: t('loop_02') },
    { n: '03', label: t('loop_03') },
    { n: '04', label: t('loop_04') },
    { n: '05', label: t('loop_05') },
    { n: '06', label: t('loop_06') },
    { n: '07', label: t('loop_07') },
  ]

  return (
    <main className="bg-[#FAE4D6]">

      {/* ── HERO ── */}
      <section className="w-full pt-32 pb-16 md:pt-40 md:pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1
            className="font-bold text-[#1A1A1A] leading-[1.05] tracking-[-0.02em] mb-8"
            style={{ fontSize: 'clamp(2.25rem, 6vw, 5rem)' }}
          >
            {t('hero_h1')}
          </h1>
          <p className="text-[#1A1A1A]/70 leading-relaxed" style={{ fontSize: 20 }}>
            {t('hero_intro')}
          </p>
        </div>
      </section>

      {/* ── BODY — brief-kopij letterlijk ── */}
      <section className="w-full py-16 md:py-24 px-6 bg-[#EDD5C0]">
        <div className="max-w-3xl mx-auto space-y-6 text-[#1A1A1A]/85 leading-relaxed" style={{ fontSize: 18 }}>
          <p>{t('body_p1')}</p>
          <p>{t('body_p2')}</p>
          <p className="font-semibold text-[#1A1A1A]">{t('body_p3')}</p>
        </div>
      </section>

      {/* ── DE ORCHESTRATION LOOP — statisch 7-stappen schema ── */}
      <section className="w-full py-20 md:py-28 px-6 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-[#FEA05E] mb-4">
            {t('loop_label')}
          </p>
          <p className="text-white/70 leading-relaxed mb-14 max-w-2xl" style={{ fontSize: 18 }}>
            {t('loop_intro')}
          </p>

          {/* Desktop: cirkel-visualisatie via CSS-keyframes */}
          <OrchestrationLoop />

          {/* Mobiel: bestaande genummerde lijst — 940px cirkel past niet op telefoon */}
          <ol className="md:hidden space-y-0">
            {loop.map((step, i) => (
              <li
                key={step.n}
                className={`flex items-baseline gap-6 py-5 ${i < loop.length - 1 ? 'border-b border-white/10' : ''}`}
              >
                <span
                  className="font-bold text-[#FEA05E] select-none shrink-0"
                  style={{ fontSize: 15, letterSpacing: 2, opacity: 0.6 }}
                >
                  {step.n}
                </span>
                <span
                  className="font-semibold text-white"
                  style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)' }}
                >
                  {step.label}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── EIGENAAR-CTA — 'voor de eigenaar' kopij uit brief deel 3 ── */}
      <section className="w-full py-20 md:py-28 px-6 bg-[#FAE4D6]">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="font-bold text-[#1A1A1A] leading-tight mb-6"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            {t('cta_title')}
          </h2>
          <p className="text-[#1A1A1A]/75 leading-relaxed mb-10" style={{ fontSize: 17 }}>
            {t('cta_body')}
          </p>
          <Link
            href="/eigenaar-worden"
            className="inline-block bg-[#1A1A1A] text-white rounded-full px-10 py-4 font-semibold hover:bg-[#333] transition-colors"
          >
            {t('cta_button')}
          </Link>
        </div>
      </section>

    </main>
  )
}
