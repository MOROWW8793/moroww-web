import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Register } from '@/components/Register'
import { Beschikbaarheid, type ZoekWoning, type ZoekBegin } from '@/components/sections/Beschikbaarheid'
import { liveWoningen, sortForCollectie } from '@/lib/woningen'
import { listingIdVoor } from '@/lib/boeking'
import { siteMetadata } from '@/lib/seo/siteMetadata'

// Boeken op data, over de hele collectie (nov 2026). Eigen pagina zodat de
// homepage rustig blijft; de knop 'maak een boeking' in het menu landt hier.

const COPY = {
  nl: {
    eyebrow: 'boeken',
    h1: 'plan je verblijf.',
    lead: 'Kies je data en met hoeveel je bent. We tonen meteen welke huizen vrij zijn, en je boekt rechtstreeks bij ons.',
    zeker: [
      'rechtstreeks bij moroww, zonder servicekosten',
      'kosteloos annuleren tot 30 dagen voor aankomst',
      'elk huis persoonlijk bezocht, elk jaar opnieuw',
    ],
    collectie: 'liever eerst rondkijken? bekijk de collectie →',
  },
  en: {
    eyebrow: 'book',
    h1: 'plan your stay.',
    lead: 'Choose your dates and how many of you there are. We show right away which homes are free, and you book directly with us.',
    zeker: [
      'directly with moroww, no service fees',
      'free cancellation up to 30 days before arrival',
      'every home visited in person, every year again',
    ],
    collectie: 'rather look around first? see the collection →',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isNl = locale === 'nl'
  return siteMetadata({
    titel: isNl ? 'Boek een persoonlijk bezochte vakantiewoning — moroww' : 'Book a holiday home we visited in person — moroww',
    beschrijving: isNl
      ? 'Kies je data en zie meteen welke karaktervolle vakantiewoningen van moroww vrij zijn. Rechtstreeks boeken, zonder servicekosten.'
      : 'Choose your dates and see right away which moroww homes are free. Book directly, without service fees.',
    pad: isNl ? '/boeken' : '/en/book',
    locale: isNl ? 'nl' : 'en',
    hreflang: { nl: '/boeken', en: '/en/book' },
  })
}

const ISO = /^\d{4}-\d{2}-\d{2}$/

export default async function BoekenPagina({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { locale } = await params
  const sp = await searchParams
  const een = (k: string) => (typeof sp[k] === 'string' ? (sp[k] as string) : undefined)
  const streekIn = een('streek')
  const begin: ZoekBegin = {
    streek: streekIn === 'the shore' || streekIn === 'the fields' ? streekIn : undefined,
    aankomst: een('aankomst') && ISO.test(een('aankomst')!) ? een('aankomst') : undefined,
    vertrek: een('vertrek') && ISO.test(een('vertrek')!) ? een('vertrek') : undefined,
    gasten: een('gasten') && /^\d{1,2}$/.test(een('gasten')!) ? Number(een('gasten')) : undefined,
  }
  setRequestLocale(locale)
  const c = locale === 'nl' ? COPY.nl : COPY.en

  const woningen: ZoekWoning[] = sortForCollectie(liveWoningen())
    .filter((w) => w.maxGasten && w.heroFoto)
    .map((w) => ({
      id: w.id,
      naam: w.naam,
      locatie: w.locatie,
      collectie: w.collectie,
      maxGasten: w.maxGasten as number,
      prijs: w.prijs,
      foto: w.heroFoto,
      boekbaar: !w.comingSoon && listingIdVoor(w) !== null,
    }))

  return (
    <Register kant="gast">
      <section className="w-full px-6 md:px-12 pt-mw-8 lg:pt-mw-10">
        <div className="mx-auto max-w-7xl">
          <p className="mw-in text-[0.9375rem] text-moroww-ink-2">{c.eyebrow}</p>
          <h1 className="mw-in mt-mw-4 text-display font-light text-moroww-dark max-w-[14ch]">{c.h1}</h1>
          <p className="mw-in-2 mt-mw-6 text-body-lg text-moroww-dark max-w-[52ch]">{c.lead}</p>
        </div>
      </section>

      <section className="w-full px-6 md:px-12 mt-mw-6 lg:mt-mw-8">
        <div className="mx-auto max-w-7xl bg-white/60 p-mw-5 md:p-mw-6">
          <Beschikbaarheid woningen={woningen} locale={locale} begin={begin} />
        </div>
      </section>

      <section className="w-full px-6 md:px-12 mt-mw-6 lg:mt-mw-8 mb-mw-8 lg:mb-mw-12">
        <div className="mx-auto max-w-7xl">
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-mw-4">
            {c.zeker.map((z) => (
              <li key={z} className="border-t border-moroww-dark/20 pt-mw-3 text-body text-moroww-dark">{z}</li>
            ))}
          </ul>
          <p className="mt-mw-6">
            <Link href="/collectie" className="text-[0.9375rem] text-moroww-dark underline underline-offset-[6px] decoration-moroww-dark/30 hover:decoration-moroww-dark transition-colors">{c.collectie}</Link>
          </p>
        </div>
      </section>
    </Register>
  )
}
