import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export async function MorowwOsHome() {
  const t = await getTranslations('morowwos')
  return (
    <section className="w-full py-20 md:py-28 px-6 bg-[#1A1A1A]">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-[#FEA05E] mb-6">
          {t('home_label')}
        </p>
        <h2
          className="font-bold text-white leading-tight mb-8"
          style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)' }}
        >
          {t('home_h2')}
        </h2>
        <p className="text-white/75 leading-relaxed mb-10 max-w-2xl" style={{ fontSize: 18 }}>
          {t('home_body')}
        </p>
        <Link
          href="/moroww-os"
          className="inline-block text-[#FEA05E] hover:text-white transition-colors underline underline-offset-4 font-medium"
        >
          {t('home_link')} →
        </Link>
      </div>
    </section>
  )
}
