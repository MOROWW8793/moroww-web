import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { SCREENINGS_TOTAL, SCREENINGS_ACCEPTED } from '@/lib/screenings'
import { TOTAL_STAYS_REVIEWED } from '@/lib/reviews'
import { SystemenGrid } from '@/components/sections/SystemenGrid'
import { Statrij } from '@/components/sections/Statrij'
import { woningen, lw, type Locale } from '@/lib/woningen'
import { AuditLijn } from '@/components/AuditLijn'
import { formatAuditMaand } from '@/components/PandKaart'

// Categoriekleuren voor de vier poorten (huisstijl: orange, coast, ardennes, brown).
const GATE_COLORS = ['#FEA05E', '#EEBC9D', '#CBD085', '#C08D6E'] as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'destandaard' })
  const isNl = locale === 'nl'
  const canonical = isNl
    ? 'https://www.moroww.com/de-standaard'
    : 'https://www.moroww.com/en/the-standard'
  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      canonical,
      languages: {
        'nl-BE': 'https://www.moroww.com/de-standaard',
        'nl': 'https://www.moroww.com/de-standaard',
        'en': 'https://www.moroww.com/en/the-standard',
        'x-default': 'https://www.moroww.com/de-standaard',
      },
    },
  }
}

export default async function DeStandaardPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('destandaard')

  const gates = [
    { num: t('gate01_num'), title: t('gate01_title'), body: t('gate01_body') },
    { num: t('gate02_num'), title: t('gate02_title'), body: t('gate02_body') },
    { num: t('gate03_num'), title: t('gate03_title'), body: t('gate03_body') },
    { num: t('gate04_num'), title: t('gate04_title'), body: t('gate04_body') },
  ]

  const additions = [
    { title: t('add_lock_title'),       body: t('add_lock_body') },
    { title: t('add_ambient_title'),    body: t('add_ambient_body') },
    { title: t('add_scent_title'),      body: t('add_scent_body') },
    { title: t('add_limit_title'),      body: t('add_limit_body') },
    { title: t('add_invisible_title'),  body: t('add_invisible_body') },
    { title: t('add_ordinary_title'),   body: t('add_ordinary_body') },
  ]

  return (
    <main className="bg-moroww-blush">

      {/* ── HERO ── */}
      <section className="w-full pt-32 pb-16 md:pt-40 md:pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1
            className="font-bold text-moroww-dark leading-[1.05] tracking-[-0.02em] mb-8"
            style={{ fontSize: 'clamp(2.25rem, 6vw, 5rem)' }}
          >
            {t('hero_h1')}
          </h1>
          <p className="text-moroww-dark/70 leading-relaxed" style={{ fontSize: 20 }}>
            {t('hero_intro')}
          </p>
        </div>
      </section>

      {/* ── STATRIJ — 350 · 7 · 129 · 10/10 ── */}
      <Statrij items={[
        { cijfer: String(SCREENINGS_TOTAL),    label: t('stat_screened_label') },
        { cijfer: String(SCREENINGS_ACCEPTED), label: t('stat_accepted_label') },
        { cijfer: String(TOTAL_STAYS_REVIEWED), label: t('stat_stays_label') },
        { cijfer: '10/10',                     label: t('stat_rating_label') },
      ]} />

      {/* ── DE VIER POORTEN — vier gelijke kaarten met kleurbalk ── */}
      <section className="w-full py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-moroww-label mb-4">
            {t('gates_title')}
          </p>
          <p className="text-moroww-dark/75 leading-relaxed mb-14 max-w-2xl" style={{ fontSize: 18 }}>
            {t('gates_intro')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {gates.map((g, i) => (
              <div key={g.num} className="relative bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col">
                {/* Kleurbalk bovenaan — categoriekleur per poort */}
                <div className="h-2" style={{ background: GATE_COLORS[i] }} />
                <div className="relative p-7 flex-1 flex flex-col">
                  {/* Cijfer als grafisch element in blush — geen tekst-hiërarchie, puur visueel */}
                  <span
                    className="absolute right-4 top-2 font-bold select-none pointer-events-none leading-none"
                    style={{ fontSize: 110, color: 'rgba(192,141,110,0.15)' }}
                    aria-hidden="true"
                  >
                    {g.num}
                  </span>
                  <div className="relative flex-1 flex flex-col">
                    <h3
                      className="font-bold text-moroww-dark leading-tight mb-4"
                      style={{ fontSize: 'clamp(1.125rem, 1.6vw, 1.375rem)' }}
                    >
                      {g.title}
                    </h3>
                    <p className="text-moroww-dark/70 leading-relaxed" style={{ fontSize: 14 }}>
                      {g.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HET BEZOEK ── */}
      <section className="w-full py-20 md:py-28 px-6 bg-moroww-brown/15">
        <div className="max-w-3xl mx-auto">
          <h2
            className="font-bold text-moroww-dark leading-tight mb-10"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            {t('visit_title')}
          </h2>
          <div className="space-y-6 text-moroww-dark/85 leading-relaxed" style={{ fontSize: 17 }}>
            <p>{t('visit_p1')}</p>
            <p>{t('visit_p2')}</p>
            <p>{t('visit_p3')}</p>
            <p>{t('visit_p4')}</p>
          </div>
        </div>
      </section>

      {/* ── WAT WIJ TOEVOEGEN — belofte, geen filter ── */}
      <section className="w-full py-20 md:py-28 px-6 bg-moroww-dark">
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-bold text-white leading-tight mb-8"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            {t('add_title')}
          </h2>
          <div className="space-y-4 text-white/75 leading-relaxed mb-16 max-w-2xl" style={{ fontSize: 17 }}>
            <p>{t('add_intro1')}</p>
            <p>{t('add_intro2')}</p>
          </div>

          <SystemenGrid items={additions} />

          <p className="text-white/80 italic mt-16 max-w-2xl leading-relaxed" style={{ fontSize: 17 }}>
            {t('add_closing')}
          </p>

          <Link
            href="/moroww-os"
            className="inline-block mt-8 text-moroww-orange hover:text-white transition-colors underline underline-offset-4"
          >
            {t('add_link')} →
          </Link>
        </div>
      </section>

      {/* ── DE HERAUDIT ── */}
      <section className="w-full py-20 md:py-28 px-6 bg-moroww-blush">
        <div className="max-w-3xl mx-auto">
          <h2
            className="font-bold text-moroww-dark leading-tight mb-10"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            {t('reaudit_title')}
          </h2>
          <div className="space-y-6 text-moroww-dark/85 leading-relaxed" style={{ fontSize: 17 }}>
            <p>{t('reaudit_p1')}</p>
            <p>{t('reaudit_p2')}</p>
            <p>{t('reaudit_p3')}</p>
            <p className="font-semibold text-moroww-dark">{t('reaudit_p4')}</p>
          </div>
        </div>
      </section>

      {/* ── WAT GASTEN OPMERKEN — twee citaten in het labelregister.
             Geen kaders, geen kaarten, geen sterren, geen cijferscore.
             AuditLijn verschijnt zodra elke review een datum heeft; een
             auditlijn met alleen "gast" erin zou decoratief zijn. */}
      <ReviewsSectie locale={locale as Locale} />

      {/* ── VOOR DE GAST ── */}
      <section className="w-full py-16 md:py-24 px-6 bg-moroww-brown/15">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="font-bold text-moroww-dark leading-tight mb-6"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            {t('guest_title')}
          </h2>
          <p className="text-moroww-dark/75 leading-relaxed max-w-2xl mx-auto" style={{ fontSize: 18 }}>
            {t('guest_body')}
          </p>
        </div>
      </section>

      {/* ── VOOR DE EIGENAAR — CTA ── */}
      <section className="w-full py-20 md:py-28 px-6 bg-moroww-dark">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="font-bold text-white leading-tight mb-6"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            {t('owner_title')}
          </h2>
          <p className="text-white/70 leading-relaxed mb-10" style={{ fontSize: 17 }}>
            {t('owner_body')}
          </p>
          <Link
            href="/eigenaar-worden"
            className="inline-block bg-moroww-orange text-moroww-dark rounded-full px-10 py-4 font-semibold hover:bg-moroww-orange/85 transition-colors"
          >
            {t('owner_cta')}
          </Link>
        </div>
      </section>

    </main>
  )
}

// Twee curatie-citaten uit de pand-data — Sabrina (Chalet Anna-Helena) en
// Stephen (The Sixteenth). Selectie hier centraal; passt de user de lijst
// aan, dan is dat één plek.
const REVIEW_KEUZE: Array<{ pandId: string; naam: string }> = [
  { pandId: 'anna-helena-ursel', naam: 'Sabrina' },
  { pandId: 'moroww-oostende',   naam: 'Stephen'  },
]

function ReviewsSectie({ locale }: { locale: Locale }) {
  const geselecteerd = REVIEW_KEUZE.flatMap(({ pandId, naam }) => {
    const w = woningen.find((w) => w.id === pandId)
    const r = w?.reviews?.find((r) => r.naam === naam)
    return r ? [r] : []
  })
  if (geselecteerd.length === 0) return null

  return (
    <section className="w-full py-20 md:py-28 px-6 bg-moroww-brown/15">
      <div className="max-w-6xl mx-auto">
        <p className="text-audit uppercase text-moroww-label mb-mw-6">wat gasten opmerken</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-mw-8">
          {geselecteerd.map((r) => {
            const maand = formatAuditMaand(r.datum)
            return (
              <div key={r.naam}>
                {maand && (
                  <div className="mb-mw-4">
                    <AuditLijn density="quiet" items={['gast', maand]} />
                  </div>
                )}
                <p className="text-body-lg italic text-moroww-dark">
                  &ldquo;{lw(r.citaat, locale)}&rdquo;
                </p>
                <p className="mt-mw-3 text-audit uppercase text-moroww-ink-2">{r.naam}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
