import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { liveWoningen, sortForCollectie, type Locale } from '@/lib/woningen'
import { countWord } from '@/lib/getallen'
import { Register } from '@/components/Register'
import { SneakPeek } from '@/components/sections/SneakPeek'
import { CollectieHero } from './CollectieHero'
import { CollectieOverzicht } from './CollectieOverzicht'
import { StreekNav } from './StreekNav'

// /the-shore en /the-fields: dezelfde opbouw als /collectie, gefilterd op
// één streek, met de streektekst als lichte glasplaat over een beeld.
export async function StreekPagina({ streek, locale }: { streek: 'the shore' | 'the fields'; locale: string }) {
  const ns = streek === 'the shore' ? 'theshore' : 'thefields'
  const t = await getTranslations(ns)
  const isNl = locale !== 'en'
  const loc: Locale = isNl ? 'nl' : 'en'
  const panden = sortForCollectie(liveWoningen().filter((w) => w.collectie === streek))
  const slides = panden.map((w) => ({ id: w.id, src: w.heroFoto, naam: w.naam, plaats: w.locatie }))
  // Het streekbeeld is een tweede foto van het eerste huis, zodat het niet
  // dezelfde is als de eerste dia.
  const streekBeeld = panden[0]?.fotos.find((f) => f !== panden[0].heroFoto) ?? panden[0]?.heroFoto

  return (
    <Register kant="gast">
      <CollectieHero
        slides={slides}
        labels={{
          pauzeer: isNl ? 'pauzeer de foto’s' : 'pause the photos',
          speel: isNl ? 'speel de foto’s af' : 'play the photos',
          dia: isNl ? 'foto' : 'photo',
        }}
      >
        <p className="text-audit text-white/80">{t('hero_label')}</p>
        <h1 className="mt-mw-3 text-display font-light text-white max-w-[14ch] drop-shadow-md">{t('hero_h1')}</h1>
        <p className="mt-mw-4 text-body-lg text-white/90 max-w-[56ch]">
          {t('hero_intro', { countWord: countWord(panden.length, loc, true) })}
        </p>
        <StreekNav actief={streek} isNl={isNl} />
      </CollectieHero>

      <section className="w-full px-6 md:px-12 mt-mw-8 mb-mw-8 lg:mb-mw-10">
        <div className="mx-auto max-w-7xl">
          <CollectieOverzicht woningen={panden} locale={loc} tabel={false} />
        </div>
      </section>

      <SneakPeek locale={locale} />

      {streekBeeld && (
        <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden">
          <Image src={streekBeeld} alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-7xl px-6 md:px-12 pb-mw-6 md:pb-mw-8">
            <div className="max-w-2xl rounded-3xl border border-white/70 bg-white/75 p-mw-5 md:p-mw-6 backdrop-blur-xl backdrop-saturate-150 shadow-[0_30px_60px_-30px_rgba(26,26,26,0.45)]">
              <p className="text-audit text-moroww-label-tekst">{streek}</p>
              <div className="mt-mw-3 space-y-mw-3 text-body text-moroww-dark">
                <p>{t('streek_p1')}</p>
                <p>{t('streek_p2')}</p>
                <p>{t('streek_p3')}</p>
                <p>{t('streek_p4')}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="w-full py-mw-8 md:py-mw-10 px-6 text-center">
        <Link
          href="/de-standaard"
          className="inline-flex items-center min-h-[48px] rounded-full border border-moroww-dark/20 px-mw-5 text-[0.9375rem] text-moroww-dark hover:bg-moroww-dark hover:text-white transition-colors"
        >
          {t('cta_link')} →
        </Link>
      </section>
    </Register>
  )
}
