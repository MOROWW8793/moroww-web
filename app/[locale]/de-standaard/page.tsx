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

// Elke sectie krijgt één beeld direct onder de inhoud (space-6 eronder),
// behalve "het slot" en de afsluiter. Beelden liggen in
// /public/images/standaard/. Ontbrekende bestanden verbergen zichzelf via
// InlineFoto's onError.
//
// Wijziging t.o.v. vorige structuur: de zes tech-items uit "de standaard
// stopt niet bij de keuring" zijn uitgesplitst naar individuele secties.
// Per user's spec zijn add_limit ("de grens") en add_invisible ("het
// onzichtbare") uit de publicatie gehaald.

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
          <div className="mt-mw-6 max-w-[62ch]">
            <InlineFoto src="/images/standaard/V2-210.jpg" alt="glas op travertijn, licht dat over het oppervlak strijkt" />
          </div>
        </div>
      </section>

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
          <div className="mt-mw-6">
            <InlineFoto src="/images/standaard/V2-127.jpg" alt="travertijnrand met textuur, laag zonlicht" />
          </div>
        </GridSectie>

        <GridSectie titel="wat er gebeurt voor opname">
          <h2 className="text-h2 text-moroww-dark">{t('visit_title')}</h2>
          <div className="mt-mw-4 space-y-mw-3 text-body text-moroww-dark">
            <p>{t('visit_p1')}</p>
            <p>{t('visit_p2')}</p>
            <p>{t('visit_p3')}</p>
            <p>{t('visit_p4')}</p>
          </div>
          <div className="mt-mw-6">
            <InlineFoto src="/images/standaard/V2-56.jpg" alt="hand onder een regendouche" />
          </div>
        </GridSectie>

        {/* De zes tech-items uit "de standaard stopt niet bij de keuring"
            zijn uitgesplitst naar individuele secties. add_limit en
            add_invisible zijn per user's spec uit de publicatie gehaald. */}
        <GridSectie titel="het slot">
          <h3 className="text-h3 text-moroww-dark">{t('add_lock_title')}</h3>
          <p className="mt-mw-3 text-body text-moroww-dark">{t('add_lock_body')}</p>
        </GridSectie>

        <GridSectie titel="licht, warmte en geluid">
          <h3 className="text-h3 text-moroww-dark">{t('add_ambient_title')}</h3>
          <p className="mt-mw-3 text-body text-moroww-dark">{t('add_ambient_body')}</p>
          <div className="mt-mw-6">
            <InlineFoto src="/images/standaard/V2-63.jpg" alt="kunstwerk aan de muur, speaker in de hoek" />
          </div>
        </GridSectie>

        <GridSectie titel="de geur">
          <h3 className="text-h3 text-moroww-dark">{t('add_scent_title')}</h3>
          <p className="mt-mw-3 text-body text-moroww-dark">{t('add_scent_body')}</p>
          <div className="mt-mw-6">
            <InlineFoto src="/images/standaard/V2-36.jpg" alt="man wast zijn handen aan de wastafel, lachend" />
          </div>
        </GridSectie>

        <GridSectie titel="het gewone">
          <h3 className="text-h3 text-moroww-dark">{t('add_ordinary_title')}</h3>
          <p className="mt-mw-3 text-body text-moroww-dark">{t('add_ordinary_body')}</p>
          <div className="mt-mw-6">
            <InlineFoto src="/images/standaard/V2-19.jpg" alt="linnen wordt opengeslagen, opgemaakt bed" />
          </div>
        </GridSectie>

        <GridSectie titel="elk jaar opnieuw">
          <h2 className="text-h2 text-moroww-dark">{t('reaudit_title')}</h2>
          <div className="mt-mw-4 space-y-mw-3 text-body text-moroww-dark">
            <p>{t('reaudit_p1')}</p>
            <p>{t('reaudit_p2')}</p>
            <p>{t('reaudit_p3')}</p>
            <p className="font-semibold text-moroww-dark">{t('reaudit_p4')}</p>
          </div>
          <div className="mt-mw-6">
            <InlineFoto src="/images/standaard/V2-12.jpg" alt="handdoeken worden op het bed gelegd" />
          </div>
        </GridSectie>

        <ReviewsSectie locale={locale as Locale} />

        {/* Afsluiter · voor eigenaars — geen beeld */}
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
      <div className="mt-mw-6">
        <InlineFoto src="/images/standaard/V2-40.jpg" alt="bed met tijdschrift en handdoek om het hoofd gedraaid" />
      </div>
    </GridSectie>
  )
}
