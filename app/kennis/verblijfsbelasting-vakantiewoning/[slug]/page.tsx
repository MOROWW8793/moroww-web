import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { kennisMetadata, KENNIS_GEPUBLICEERD } from '@/lib/kennis/meta'
import { ArticleLayout } from '@/components/kennis/ArticleLayout'
import { Cta, VerderLezen } from '@/components/kennis/Cta'
import { Actualiteitsblok } from '@/components/kennis/Actualiteitsblok'
import { ArticleJsonLd } from '@/components/kennis/JsonLd'
import {
  alleGemeenten,
  gemeenteBySlug,
  formatDatumNL,
  HEFFINGSVORM_LABEL,
} from '@/lib/kennis/verblijfsbelasting'
import { GEMEENTE_CONTENT } from '@/lib/kennis/gemeenten'

interface Props {
  params: Promise<{ slug: string }>
}

export const revalidate = 3600
// Gemeenten die niet in verblijfsbelasting_publiek zitten mogen geen pagina
// hebben, ook geen dynamisch gerenderde. `dynamicParams = false` zorgt dat
// Next 404 teruggeeft voor elke slug die niet in `generateStaticParams` staat,
// in plaats van hem alsnog on-demand te bouwen met lege velden.
export const dynamicParams = false

export async function generateStaticParams() {
  const gemeenten = await alleGemeenten()
  return gemeenten.map((g) => ({ slug: g.gemeente_slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const gemeente = await gemeenteBySlug(slug)
  if (!gemeente) return {}
  const extra = GEMEENTE_CONTENT[slug]
  return kennisMetadata({
    titel:
      extra?.metaTitel ??
      `Verblijfsbelasting vakantiewoning ${gemeente.gemeente_naam} 2026 · moroww`,
    beschrijving:
      extra?.metaBeschrijving ??
      `Wat de verblijfsbelasting kost in ${gemeente.gemeente_naam} in 2026, hoe ze berekend wordt en wanneer je aangifte doet. Nagekeken op ${formatDatumNL(gemeente.laatst_nagekeken_op)}.`,
    pad: `/kennis/verblijfsbelasting-vakantiewoning/${slug}`,
  })
}

export default async function GemeenteDetailPage({ params }: Props) {
  const { slug } = await params
  const gemeente = await gemeenteBySlug(slug)
  if (!gemeente) notFound()

  const extra = GEMEENTE_CONTENT[slug]
  const URL_ABS = `https://www.moroww.com/kennis/verblijfsbelasting-vakantiewoning/${slug}`

  // De view geeft alleen bevestigde rijen terug, dus we hoeven geen "nog op te
  // vragen"-fallback te vertonen.
  const generiekAntwoord = `In ${gemeente.gemeente_naam} wordt de verblijfsbelasting voor vakantiewoningen in 2026 geheven ${HEFFINGSVORM_LABEL[gemeente.heffingsvorm]}.${
    gemeente.tarief_bedrag != null
      ? ` Het tarief bedraagt € ${gemeente.tarief_bedrag}${gemeente.tarief_eenheid ? ` ${gemeente.tarief_eenheid}` : ''}.`
      : ''
  }${
    gemeente.aangifte_frequentie
      ? ` De aangifte gebeurt ${gemeente.aangifte_frequentie}.`
      : ''
  } Nagekeken tegen het gemeentelijk reglement op ${formatDatumNL(gemeente.laatst_nagekeken_op)}.`

  return (
    <>
      <ArticleJsonLd
        titel={`Verblijfsbelasting vakantiewoning ${gemeente.gemeente_naam} 2026`}
        beschrijving={generiekAntwoord}
        url={URL_ABS}
        datumGepubliceerd={KENNIS_GEPUBLICEERD}
        datumGewijzigd={gemeente.laatst_nagekeken_op}
      />

      <ArticleLayout
        eyebrow={gemeente.provincie}
        terug={{
          href: '/kennis/verblijfsbelasting-vakantiewoning',
          label: 'alle gemeenten',
        }}
        titel={`Verblijfsbelasting voor een vakantiewoning in ${gemeente.gemeente_naam}`}
        korteAntwoord={extra?.korteAntwoord ?? generiekAntwoord}
      >
        {extra?.body ? (
          extra.body
        ) : (
          <>
            <h2>Wat er over deze belasting bekend is</h2>
            <table>
              <tbody>
                <tr><th>Systeem</th><td>{HEFFINGSVORM_LABEL[gemeente.heffingsvorm]}</td></tr>
                {gemeente.tarief_bedrag != null && (
                  <tr>
                    <th>Tarief</th>
                    <td>
                      € {gemeente.tarief_bedrag}
                      {gemeente.tarief_eenheid && ` — ${gemeente.tarief_eenheid}`}
                    </td>
                  </tr>
                )}
                {gemeente.tarief_bedrag_alt != null && (
                  <tr>
                    <th>Alternatief tarief</th>
                    <td>
                      € {gemeente.tarief_bedrag_alt}
                      {gemeente.tarief_eenheid_alt && ` — ${gemeente.tarief_eenheid_alt}`}
                    </td>
                  </tr>
                )}
                {gemeente.doorrekenbaar_max != null && (
                  <tr>
                    <th>Doorrekenbaar aan de gast</th>
                    <td>maximaal € {gemeente.doorrekenbaar_max} per nacht</td>
                  </tr>
                )}
                {gemeente.aangifte_frequentie && (
                  <tr><th>Aangifte</th><td>{gemeente.aangifte_frequentie}</td></tr>
                )}
                {gemeente.status && (
                  <tr><th>Status</th><td>{gemeente.status}</td></tr>
                )}
                {gemeente.reglement_url && (
                  <tr>
                    <th>Reglement</th>
                    <td>
                      <a href={gemeente.reglement_url} target="_blank" rel="noopener noreferrer">
                        {gemeente.reglement_url}
                      </a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

          </>
        )}

        <Cta
          kind="vraag"
          intro={`Zit je met een concrete situatie in ${gemeente.gemeente_naam}?`}
        />

        <Cta kind="poortentoets" />

        <VerderLezen
          items={[
            {
              href: '/kennis/verblijfsbelasting-vakantiewoning',
              title: 'Alle gemeenten',
              eyebrow: 'terug naar het overzicht',
            },
            {
              href: '/kennis/tweedeverblijfsbelasting-of-logiesbelasting',
              title: 'Tweedeverblijf of logies?',
              eyebrow: 'het verschil',
            },
            {
              href: '/kennis/wat-kost-een-nacht-vakantiewoning',
              title: 'Wat een nacht echt kost',
              eyebrow: 'opbrengst en rendement',
            },
          ]}
        />

        <Actualiteitsblok
          nagekekenOp={formatDatumNL(gemeente.laatst_nagekeken_op)}
          bron={
            gemeente.reglement_url
              ? `belastingreglement ${gemeente.gemeente_naam}`
              : `dienst belastingen ${gemeente.gemeente_naam} — reglement schriftelijk opgevraagd`
          }
          bronUrl={gemeente.reglement_url ?? undefined}
        />
      </ArticleLayout>
    </>
  )
}
