import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { SystemenGrid } from './SystemenGrid'

/**
 * Homepage-blok voor moroww-os. Toont dezelfde zes systemen als op /de-standaard
 * — één bron van waarheid, geen weesrij. De keys komen uit de destandaard-namespace
 * omdat dat de canonieke plek is; de label/heading/intro komen uit morowwos.
 */
export async function MorowwOsHome() {
  const t = await getTranslations('morowwos')
  const td = await getTranslations('destandaard')

  const items = [
    { title: td('add_lock_title'),      body: td('add_lock_body') },
    { title: td('add_ambient_title'),   body: td('add_ambient_body') },
    { title: td('add_scent_title'),     body: td('add_scent_body') },
    { title: td('add_limit_title'),     body: td('add_limit_body') },
    { title: td('add_invisible_title'), body: td('add_invisible_body') },
    { title: td('add_ordinary_title'),  body: td('add_ordinary_body') },
  ]

  return (
    <section className="w-full py-20 md:py-28 px-6 bg-moroww-dark">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-moroww-orange mb-6">
          {t('home_label')}
        </p>
        <h2
          className="font-bold text-white leading-tight mb-8"
          style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)' }}
        >
          {t('home_h2')}
        </h2>
        <p className="text-white/75 leading-relaxed mb-14 max-w-2xl" style={{ fontSize: 18 }}>
          {t('home_body')}
        </p>

        <SystemenGrid items={items} />

        <div className="mt-14">
          <Link
            href="/moroww-os"
            className="inline-block text-moroww-orange hover:text-white transition-colors underline underline-offset-4 font-medium"
          >
            {t('home_link')} →
          </Link>
        </div>
      </div>
    </section>
  )
}
