import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CollectieOverzicht } from "@/components/collectie/CollectieOverzicht";
import { SneakPeek } from "@/components/sections/SneakPeek";
import { Register } from "@/components/Register";
import { siteMetadata } from "@/lib/seo/siteMetadata";
import { liveWoningen, type Locale } from "@/lib/woningen";
import { countWord } from "@/lib/getallen";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isNl = locale === 'nl'
  return siteMetadata({
    titel: isNl ? 'De collectie — geselecteerde vakantiewoningen' : 'The collection — selected holiday homes',
    beschrijving: isNl
      ? 'Karaktervolle vakantiewoningen, elk persoonlijk bezocht en geselecteerd. Per huis alles op een rij: slaapkamers, gasten, buitenruimte, parking en prijs.'
      : 'Holiday homes with character, each visited in person and selected. Everything per home side by side: bedrooms, guests, outdoor space, parking and price.',
    pad: isNl ? '/collectie' : '/en/collection',
    locale: isNl ? 'nl' : 'en',
    hreflang: { nl: '/collectie', en: '/en/collection' },
  })
}

export default async function CollectiePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const isNl = locale === 'nl'
  const loc: Locale = isNl ? 'nl' : 'en'
  const woningen = liveWoningen()
  const aantal = countWord(woningen.length, loc, false)
  const tab = 'inline-flex items-center min-h-[44px] text-[0.9375rem] underline-offset-[8px] transition-colors'
  return (
    <Register kant="gast">
      {/* ── HERO ── */}
      <section className="w-full px-6 md:px-12 pt-mw-8 lg:pt-mw-10">
        <div className="mx-auto max-w-7xl">
          <p className="mw-in text-[0.9375rem] text-moroww-ink-2">{isNl ? 'de collectie' : 'the collection'}</p>
          <h1 className="mw-in mt-mw-4 text-display font-light text-moroww-dark max-w-[14ch]">
            {isNl ? 'verblijven die kloppen.' : 'stays that are right.'}
          </h1>
          <p className="mw-in-2 mt-mw-6 text-body-lg text-moroww-dark max-w-[56ch]">
            {isNl
              ? `We bouwen de plek waar je overal ter wereld een verblijf vindt dat klopt. We beginnen in België: ${aantal} karaktervolle huizen, elk persoonlijk bezocht.`
              : `We are building the place where you find a stay that is right, anywhere in the world. We start in Belgium: ${aantal} homes with character, each visited in person.`}
          </p>
          <nav aria-label={isNl ? 'streken' : 'regions'} className="mt-mw-6 flex flex-wrap gap-x-mw-5 gap-y-1">
            <span className={`${tab} text-moroww-dark underline decoration-moroww-dark decoration-2`}>{isNl ? 'alles' : 'all'}</span>
            <Link href="/the-shore" className={`${tab} text-moroww-ink-2 hover:text-moroww-dark`}>the shore →</Link>
            <Link href="/the-fields" className={`${tab} text-moroww-ink-2 hover:text-moroww-dark`}>the fields →</Link>
            <Link href="/boeken" className={`${tab} text-moroww-ink-2 hover:text-moroww-dark`}>{isNl ? 'zoek op data →' : 'search by date →'}</Link>
          </nav>
        </div>
      </section>

      {/* ── OVERZICHT ── */}
      <section className="w-full px-6 md:px-12 mt-mw-8 mb-mw-8 lg:mb-mw-10">
        <div className="mx-auto max-w-7xl">
          <CollectieOverzicht woningen={woningen} locale={loc} />
        </div>
      </section>

      {/* Sneak peek: twee panden die nog niet boekbaar zijn. */}
      <SneakPeek locale={locale} />
      <div className="mb-mw-8 lg:mb-mw-12" />
    </Register>
  );
}
