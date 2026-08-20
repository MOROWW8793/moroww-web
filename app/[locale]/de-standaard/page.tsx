import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { woningen, lw, type Locale } from '@/lib/woningen'
import { AuditLijn } from '@/components/AuditLijn'
import { Register } from '@/components/Register'
import { formatAuditMaand } from '@/components/PandKaart'

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

function Hr() {
  return <hr className="my-mw-6 border-0 border-t border-moroww-rule" aria-hidden />
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
    { title: t('gate01_title'), body: t('gate01_body') },
    { title: t('gate02_title'), body: t('gate02_body') },
    { title: t('gate03_title'), body: t('gate03_body') },
    { title: t('gate04_title'), body: t('gate04_body') },
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
    <Register kant="eigenaar">

      {/* ── HERO ── */}
      <section className="w-full pt-28 pb-mw-6 px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <h1
            className="font-bold text-moroww-dark leading-[1.05] tracking-[-0.02em] max-w-[16ch]"
            style={{ fontSize: 'clamp(2.25rem, 6vw, 5rem)' }}
          >
            {t('hero_h1')}
          </h1>
          <p className="mt-mw-5 text-body-lg text-moroww-dark max-w-[62ch]">
            {t('hero_intro')}
          </p>
        </div>
      </section>

      {/*  A1 · CIJFERBLOK — tijdelijk uit tot de screenings-view live cijfers
          serveert. lib/screenings.ts is nog een hardgecodeerde constante
          (WP12 open), en de spec zegt: draait die tabel niet, haal het blok
          weg. */}

      {/* ── A2 · DE VIER POORTEN — ontkaderd, hairlines, geen nummers ── */}
      <section className="w-full py-mw-8 px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <AuditLijn density="quiet" items={['de vier poorten']} />
          <h2 className="mt-mw-4 text-h2 text-moroww-dark max-w-[68ch]">
            {t('gates_title')}
          </h2>
          <p className="mt-mw-4 text-body-lg text-moroww-dark max-w-[62ch]">
            Er is geen weging en er zijn geen uitzonderingen. Alle vier, of het
            huis komt er niet in.
          </p>

          <div className="mt-mw-6 max-w-[68ch] border-t border-moroww-rule">
            {gates.map((g) => (
              <div key={g.title} className="border-b border-moroww-rule py-mw-5">
                <h3 className="text-h3 text-moroww-dark">{g.title}</h3>
                <p className="mt-mw-3 text-body text-moroww-dark">{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HET BEZOEK — ontkaderd, blijft inhoudelijk ongewijzigd ── */}
      <section className="w-full py-mw-8 px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <AuditLijn density="quiet" items={['het bezoek']} />
          <h2 className="mt-mw-4 text-h2 text-moroww-dark max-w-[68ch]">
            {t('visit_title')}
          </h2>
          <div className="mt-mw-4 max-w-[62ch] space-y-mw-3 text-body text-moroww-dark">
            <p>{t('visit_p1')}</p>
            <p>{t('visit_p2')}</p>
            <p>{t('visit_p3')}</p>
            <p>{t('visit_p4')}</p>
          </div>
        </div>
      </section>

      {/* ── WAT WIJ TOEVOEGEN — zes tech-items op deze pagina.
             Op /eigenaar-worden zijn dit er drie omdat ze daar moeten
             overtuigen; hier lezen ze als beschrijving van de standaard. */}
      <section className="w-full py-mw-8 px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <AuditLijn density="quiet" items={['de standaard stopt niet bij de keuring']} />
          <h2 className="mt-mw-4 text-h2 text-moroww-dark max-w-[68ch]">
            {t('add_title')}
          </h2>
          <div className="mt-mw-4 max-w-[62ch] space-y-mw-3 text-body text-moroww-dark">
            <p>{t('add_intro1')}</p>
            <p>{t('add_intro2')}</p>
          </div>

          <div className="mt-mw-6 max-w-[68ch] grid grid-cols-1 sm:grid-cols-2 border-t border-moroww-rule">
            {additions.map((a, i) => (
              <div
                key={a.title}
                className={`border-b border-moroww-rule py-mw-5 ${i % 2 === 1 ? 'sm:pl-mw-5 sm:border-l' : 'sm:pr-mw-5'}`}
              >
                <h3 className="text-h3 text-moroww-dark">{a.title}</h3>
                <p className="mt-mw-3 text-body text-moroww-dark">{a.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-mw-6 max-w-[62ch] text-body italic text-moroww-dark">
            {t('add_closing')}
          </p>
          <p className="mt-mw-4">
            <Link
              href="/moroww-os"
              className="text-audit uppercase text-moroww-dark underline underline-offset-4 decoration-moroww-label hover:decoration-moroww-dark transition-colors"
            >
              {t('add_link')} →
            </Link>
          </p>
        </div>
      </section>

      {/* ── DE HERAUDIT — elk jaar opnieuw ── */}
      <section className="w-full py-mw-8 px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <AuditLijn density="quiet" items={['elk jaar opnieuw']} />
          <h2 className="mt-mw-4 text-h2 text-moroww-dark max-w-[68ch]">
            {t('reaudit_title')}
          </h2>
          <div className="mt-mw-4 max-w-[62ch] space-y-mw-3 text-body text-moroww-dark">
            <p>{t('reaudit_p1')}</p>
            <p>{t('reaudit_p2')}</p>
            <p>{t('reaudit_p3')}</p>
            <p className="font-semibold text-moroww-dark">{t('reaudit_p4')}</p>
          </div>
        </div>
      </section>

      {/* ── A3 · WAT GASTEN OPMERKEN — twee citaten, ontkaderd, hairline
             ertussen. AuditLijn verschijnt zodra elke review een datum
             heeft. */}
      <ReviewsSectie locale={locale as Locale} />

      {/* ── AFSLUITER · denk je dat jouw huis de standaard haalt? ── */}
      <section className="w-full py-mw-8 px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <Hr />
          <AuditLijn density="quiet" items={['voor eigenaars']} />
          <h2 className="mt-mw-4 text-h2 text-moroww-dark max-w-[68ch]">
            {t('owner_title')}
          </h2>
          <p className="mt-mw-4 text-body text-moroww-dark max-w-[62ch]">
            Meld het aan. We nemen binnen twee werkdagen persoonlijk contact
            op, en we komen zelf kijken.
          </p>
          <p className="mt-mw-5">
            <Link
              href="/eigenaar-worden"
              className="inline-flex items-center rounded-full px-mw-4 py-3 font-semibold bg-moroww-orange text-moroww-dark hover:bg-moroww-orange/85 transition-colors"
            >
              {t('owner_cta')}
            </Link>
          </p>
        </div>
      </section>

    </Register>
  )
}

// Twee curatie-citaten uit de pand-data — Sabrina (Chalet Anna-Helena) en
// Stephen (The Sixteenth). Ontkaderd, met een hairline ertussen. AuditLijn
// verschijnt per citaat zodra r.datum gezet is.
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
    <section className="w-full py-mw-8 px-6 md:px-12">
      <div className="mx-auto max-w-6xl">
        <AuditLijn density="quiet" items={['wat gasten opmerken']} />
        <div className="mt-mw-6 max-w-[68ch] divide-y divide-moroww-rule border-t border-b border-moroww-rule">
          {geselecteerd.map((r) => {
            const maand = formatAuditMaand(r.datum)
            return (
              <div key={r.naam} className="py-mw-6">
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
