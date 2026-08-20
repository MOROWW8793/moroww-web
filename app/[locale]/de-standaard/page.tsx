import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { woningen, lw, type Locale } from '@/lib/woningen'
import { Register } from '@/components/Register'
import { GridSectie } from '@/components/GridSectie'
import { AuditLijn } from '@/components/AuditLijn'
import { InlineFoto } from '@/components/InlineFoto'
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

// Elke sectie zit in <GridSectie titel="…"> — vanaf lg staat de titel
// sticky in kolom 1-3, de inhoud in kolom 4-10, hairline over kolom 1-10.
// Onder lg vervalt het raster en stapelt de sectie zoals vroeger.

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
          <div className="lg:grid lg:grid-cols-12 lg:gap-mw-5">
            <div className="lg:col-span-10 lg:col-start-1">
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
          </div>
        </div>
      </section>

      {/*  A1 · CIJFERBLOK — tijdelijk uit tot de screenings-view live cijfers
          serveert (WP12). */}

      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <GridSectie titel="de vier poorten" geenHairline>
          <h2 className="text-h2 text-moroww-dark">{t('gates_title')}</h2>
          <p className="mt-mw-4 text-body-lg text-moroww-dark">
            Er is geen weging en er zijn geen uitzonderingen. Alle vier, of het
            huis komt er niet in.
          </p>
          <div className="mt-mw-6 border-t border-moroww-rule">
            {gates.map((g) => (
              <div key={g.title} className="border-b border-moroww-rule py-mw-5">
                <h3 className="text-h3 text-moroww-dark">{g.title}</h3>
                <p className="mt-mw-3 text-body text-moroww-dark">{g.body}</p>
              </div>
            ))}
          </div>
        </GridSectie>

        {/* Foto na "de vier poorten" — vollebreedte binnen de outer 6xl */}
        <div className="mt-mw-6">
          <InlineFoto
            src="/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-53.jpg"
            alt="detail van de inrichting — moroww standaard"
          />
        </div>

        <GridSectie titel="het bezoek">
          <h2 className="text-h2 text-moroww-dark">{t('visit_title')}</h2>
          <div className="mt-mw-4 space-y-mw-3 text-body text-moroww-dark">
            <p>{t('visit_p1')}</p>
            <p>{t('visit_p2')}</p>
            <p>{t('visit_p3')}</p>
            <p>{t('visit_p4')}</p>
          </div>
        </GridSectie>

        {/* Zes tech-items in een twee-koloms grid binnen de sectie. Bewust
            behouden — user's spec: deze werkt en is het model voor de rest. */}
        <GridSectie titel="de standaard stopt niet bij de keuring">
          <h2 className="text-h2 text-moroww-dark">{t('add_title')}</h2>
          <div className="mt-mw-4 space-y-mw-3 text-body text-moroww-dark">
            <p>{t('add_intro1')}</p>
            <p>{t('add_intro2')}</p>
          </div>
          <div className="mt-mw-6 grid grid-cols-1 sm:grid-cols-2 border-t border-moroww-rule">
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
          <p className="mt-mw-6 text-body italic text-moroww-dark">
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
        </GridSectie>

        <GridSectie titel="elk jaar opnieuw">
          <h2 className="text-h2 text-moroww-dark">{t('reaudit_title')}</h2>
          <div className="mt-mw-4 space-y-mw-3 text-body text-moroww-dark">
            <p>{t('reaudit_p1')}</p>
            <p>{t('reaudit_p2')}</p>
            <p>{t('reaudit_p3')}</p>
            <p className="font-semibold text-moroww-dark">{t('reaudit_p4')}</p>
          </div>
        </GridSectie>

        {/* Foto na "elk jaar opnieuw" */}
        <div className="mt-mw-6">
          <InlineFoto
            src="/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-127.jpg"
            alt="materiaal en afwerking — moroww standaard"
          />
        </div>

        <ReviewsSectie locale={locale as Locale} />

        {/* Afsluiter · voor eigenaars */}
        <GridSectie titel="voor eigenaars">
          <h2 className="text-h2 text-moroww-dark">{t('owner_title')}</h2>
          <p className="mt-mw-4 text-body text-moroww-dark">
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
        </GridSectie>
      </div>

    </Register>
  )
}

const REVIEW_KEUZE: Array<{ pandId: string; naam: string }> = [
  { pandId: 'nosso-knokke', naam: 'Ragna'     },
  { pandId: 'nosso-knokke', naam: 'Alexander' },
]

function ReviewsSectie({ locale }: { locale: Locale }) {
  const geselecteerd = REVIEW_KEUZE.flatMap(({ pandId, naam }) => {
    const w = woningen.find((w) => w.id === pandId)
    const r = w?.reviews?.find((r) => r.naam === naam)
    return r ? [r] : []
  })
  if (geselecteerd.length === 0) return null

  return (
    <GridSectie titel="wat gasten opmerken">
      <div className="divide-y divide-moroww-rule border-t border-b border-moroww-rule">
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
    </GridSectie>
  )
}
